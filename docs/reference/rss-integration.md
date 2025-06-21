---
sidebar_position: 6
---

# RSS統合システム

Chemaryの自動データ取得システムについて詳しく説明します。

## RSS取得システム概要

### アーキテクチャ
```
RSS Sources → Data Processor → Translation → Static Site → Deployment
    ↓              ↓             ↓            ↓           ↓
各論文誌      統一フォーマット   日本語翻訳    Astro.js    Cloudflare
```

### 技術スタック
- **RSS Parser**: `fast-xml-parser` または `rss-parser`
- **翻訳API**: Google Translate API または OpenAI API
- **データ保存**: JSON形式の静的ファイル
- **自動化**: GitHub Actions による定期実行

## 対応論文誌の詳細仕様

### Nature Chemistry
```yaml
source:
  name: "Nature Chemistry"
  rss_url: "https://feeds.nature.com/nchem/rss/current"
  website: "https://www.nature.com/nchem/"
  
schedule:
  frequency: "週2-3回"
  typical_days: ["火", "木"]
  
data_format:
  title_xpath: "//item/title/text()"
  author_xpath: "//item/dc:creator/text()"
  abstract_xpath: "//item/description/text()"
  doi_xpath: "//item/link/@href"
  
processing:
  title_cleanup: "Remove 'Nature Chemistry -' prefix"
  author_parsing: "Split by comma, trim whitespace"
  abstract_length: "Max 500 characters for preview"
```

### JACS (Journal of the American Chemical Society)
```yaml
source:
  name: "JACS"
  rss_url: "https://pubs.acs.org/action/showFeed?type=etoc&feed=rss&jc=jacsat"
  website: "https://pubs.acs.org/journal/jacsat"
  
schedule:
  frequency: "週5-6回"
  typical_days: ["月", "火", "水", "木", "金", "土"]
  
data_format:
  title_xpath: "//item/title/text()"
  author_xpath: "//item/author/text()"
  abstract_xpath: "//item/description/text()"
  doi_xpath: "//item/guid/text()"
  
processing:
  title_cleanup: "Remove journal prefix and issue info"
  author_parsing: "ACS format: 'LastName, FirstName; ...'"
  abstract_extraction: "Remove HTML tags, keep plain text"
```

### Angewandte Chemie International Edition
```yaml
source:
  name: "Angewandte Chemie"
  rss_url: "https://onlinelibrary.wiley.com/action/showFeed?jc=15213773&type=etoc&feed=rss"
  website: "https://onlinelibrary.wiley.com/journal/15213773"
  
schedule:
  frequency: "週3-4回"
  typical_days: ["月", "水", "金"]
  
data_format:
  title_xpath: "//item/title/text()"
  author_xpath: "//item/dc:creator/text()"
  abstract_xpath: "//item/description/text()"
  doi_xpath: "//item/link/@href"
  
processing:
  title_cleanup: "Remove 'Angewandte Chemie International Edition' prefix"
  author_parsing: "Wiley format processing"
  doi_extraction: "Extract DOI from Wiley URL"
```

## データ処理パイプライン

### 1. RSS取得フェーズ
```typescript
interface RSSConfig {
  journals: {
    name: string;
    rssUrl: string;
    parser: JournalParser;
  }[];
  schedule: {
    cron: "0 8,17 * * *"; // 8:00 and 17:00 daily
  };
}

async function fetchRSSFeeds(): Promise<RawPaperData[]> {
  const feeds = await Promise.all(
    RSS_CONFIG.journals.map(journal => 
      fetchAndParse(journal.rssUrl, journal.parser)
    )
  );
  return feeds.flat();
}
```

### 2. データ正規化フェーズ
```typescript
interface ProcessingPipeline {
  steps: [
    "duplicate_removal",    // DOIベースの重複除去
    "date_filtering",       // 30日以内のもののみ
    "quality_check",        // アブストラクトの存在確認
    "text_cleaning",        // HTMLタグ除去、文字整形
    "author_normalization"  // 著者名の統一フォーマット
  ];
}

function normalizePaperData(raw: RawPaperData): PaperData {
  return {
    id: generateId(raw.doi),
    title: cleanTitle(raw.title),
    titleJa: null, // 翻訳フェーズで処理
    authors: parseAuthors(raw.authors, raw.journal),
    journal: raw.journal,
    abstract: cleanAbstract(raw.abstract),
    abstractPreview: truncate(raw.abstract, 150),
    doi: extractDOI(raw.doi),
    publishedDate: parseDate(raw.date),
    originalLink: buildOriginalLink(raw.doi, raw.journal),
    rssDate: new Date()
  };
}
```

### 3. 翻訳フェーズ
```typescript
interface TranslationService {
  provider: "google" | "openai";
  batchSize: 10; // 一度に翻訳するタイトル数
  cacheExpiry: "30d"; // 翻訳キャッシュ期間
}

async function translateTitles(papers: PaperData[]): Promise<PaperData[]> {
  const untranslated = papers.filter(p => !p.titleJa);
  
  const translations = await batchTranslate(
    untranslated.map(p => p.title),
    { from: 'en', to: 'ja', context: 'academic chemistry' }
  );
  
  return papers.map(paper => ({
    ...paper,
    titleJa: findTranslation(paper.title, translations) || paper.title
  }));
}
```

### 4. サイト生成フェーズ
```typescript
interface StaticGeneration {
  dataFile: "src/data/papers.json";
  grouping: "by_date"; // 日付ごとにグループ化
  sorting: "desc"; // 新しい順
  pagination: false; // 1ページに全表示
}

function generateSiteData(papers: PaperData[]): SiteData {
  const groupedByDate = groupBy(papers, 'publishedDate');
  
  return {
    lastUpdated: new Date().toISOString(),
    totalPapers: papers.length,
    dateGroups: Object.entries(groupedByDate)
      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
      .map(([date, papers]) => ({
        date,
        count: papers.length,
        papers: papers.sort((a, b) => b.rssDate.getTime() - a.rssDate.getTime())
      }))
  };
}
```

## GitHub Actions自動化

### ワークフロー設定
```yaml
name: Update RSS Feeds
on:
  schedule:
    - cron: '0 8,17 * * *'  # 毎日8:00と17:00
  workflow_dispatch:  # 手動実行も可能

jobs:
  update-feeds:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Fetch RSS feeds
        run: npm run fetch-rss
        env:
          GOOGLE_TRANSLATE_API_KEY: ${{ secrets.TRANSLATE_API_KEY }}
      
      - name: Build site
        run: npm run build
      
      - name: Deploy to Cloudflare Pages
        run: npm run deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

### エラーハンドリング
```typescript
interface ErrorHandling {
  strategies: {
    rss_fetch_failure: "Use cached data, notify via email";
    translation_api_limit: "Skip translation, use English titles";
    build_failure: "Rollback to previous version";
    deployment_failure: "Retry 3 times, then alert";
  };
  
  monitoring: {
    health_checks: "Every 15 minutes";
    alert_channels: ["email", "slack"];
    metrics: ["success_rate", "processing_time", "paper_count"];
  };
}
```

## データ品質管理

### 検証ルール
- **タイトル**: 10文字以上、500文字以下
- **著者**: 最低1名、最大20名
- **アブストラクト**: 50文字以上
- **DOI**: 有効なDOI形式
- **日付**: 過去30日以内

### 監視とアラート
- RSS取得失敗時の通知
- 翻訳API制限到達時の警告
- 論文数の異常な変動検知
- サイト生成エラーの即座通知

このシステムにより、研究者に常に最新で正確な論文情報を提供します。