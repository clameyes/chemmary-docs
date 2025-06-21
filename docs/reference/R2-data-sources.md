---
sidebar_position: 2
---

# R2: データソース仕様

## 対応論文誌

### 第1フェーズ（MVP）

<div data-testid="R2-phase1-journals">
主要3誌からスタート：

1. **Nature Chemistry**
   - RSS Feed: https://www.nature.com/nchem.rss
   - 更新頻度: 毎日
   - 記事数/日: 約3-5本

2. **Journal of the American Chemical Society (JACS)**
   - RSS Feed: https://pubs.acs.org/action/showFeed?type=axatoc&feed=rss&jc=jacsat
   - 更新頻度: 毎日
   - 記事数/日: 約10-15本

3. **Angewandte Chemie International Edition**
   - RSS Feed: https://onlinelibrary.wiley.com/feed/15213773/most-recent
   - 更新頻度: 毎日
   - 記事数/日: 約5-10本
</div>

### 第2フェーズ

<div data-testid="R2-phase2-journals">
追加予定の論文誌：

- Chemical Science
- ACS Central Science
- Chemical Communications
- Chemistry - A European Journal
- The Journal of Physical Chemistry
- Organic Letters
- Inorganic Chemistry
</div>

## データ取得仕様

### RSS/Atom フィード構造

<div data-testid="R2-feed-structure">
```xml
<item>
  <title>論文タイトル</title>
  <link>https://example.com/article</link>
  <description>アブストラクト</description>
  <pubDate>公開日時</pubDate>
  <author>著者名</author>
  <category>カテゴリー</category>
</item>
```
</div>

### データ変換ルール

<div data-testid="R2-data-transformation">
1. **タイトル**: HTMLタグを除去、エンコーディング正規化
2. **著者**: "LastName, FirstName" 形式に統一
3. **日付**: ISO 8601形式 (YYYY-MM-DD)
4. **アブストラクト**: 
   - 最大500文字で切り詰め
   - HTMLタグを除去
   - 改行を保持
</div>

## 更新スケジュール

### 定期実行

<div data-testid="R2-update-schedule">
GitHub Actions による自動更新：

```yaml
schedule:
  - cron: '0 23 * * *'  # 日本時間 8:00 (UTC 23:00)
  - cron: '0 8 * * *'   # 日本時間 17:00 (UTC 8:00)
```
</div>

### 更新プロセス

<div data-testid="R2-update-process">
1. **データ取得** (5分)
   - 各RSSフィードを並列取得
   - エラーハンドリング（3回リトライ）

2. **データ処理** (3分)
   - 重複チェック
   - データ正規化
   - 日付でソート

3. **サイト生成** (5分)
   - Astroビルド実行
   - 静的ファイル生成

4. **デプロイ** (2分)
   - Cloudflare Pagesへアップロード
   - キャッシュクリア
</div>

## データストレージ

### ファイル構造

<div data-testid="R2-file-structure">
```
src/content/articles/
├── 2024-12-21.json
├── 2024-12-20.json
├── 2024-12-19.json
└── ...（最大30ファイル）
```
</div>

### JSONスキーマ

<div data-testid="R2-json-schema">
```json
{
  "date": "2024-12-21",
  "articles": [
    {
      "id": "unique-article-id",
      "title": "論文タイトル",
      "journal": "Nature Chemistry",
      "authors": ["Author1", "Author2"],
      "abstract": "アブストラクト全文",
      "url": "https://example.com/article",
      "publishedAt": "2024-12-21T10:00:00Z",
      "categories": ["Catalysis", "Organic"]
    }
  ]
}
```
</div>

## エラーハンドリング

### フィード取得エラー

<div data-testid="R2-feed-errors">
- **タイムアウト**: 30秒でタイムアウト、3回リトライ
- **404エラー**: その日のデータをスキップ
- **パースエラー**: エラーログに記録、手動確認
</div>

### データ品質チェック

<div data-testid="R2-quality-checks">
1. **必須フィールド確認**
   - title, url, publishedAt は必須
   - 欠落時はその記事をスキップ

2. **文字数制限**
   - タイトル: 最大300文字
   - アブストラクト: 最大5000文字

3. **日付の妥当性**
   - 未来の日付は除外
   - 30日以上前の記事は除外
</div>

## API仕様（将来実装）

### エンドポイント

<div data-testid="R2-api-endpoints">
```
GET /api/articles?date=2024-12-21
GET /api/articles?from=2024-12-01&to=2024-12-21
GET /api/search?q=catalyst&limit=20
GET /api/journals
```
</div>

### レスポンス形式

<div data-testid="R2-api-response">
```json
{
  "status": "success",
  "data": {
    "articles": [...],
    "total": 125,
    "page": 1,
    "per_page": 20
  },
  "meta": {
    "last_updated": "2024-12-21T08:00:00Z"
  }
}
```
</div>

## ライセンスと利用規約

<div data-testid="R2-license">
- RSSフィードの利用は各出版社の利用規約に準拠
- メタデータ（タイトル、著者）の表示は学術目的での公正利用
- アブストラクト全文へのリンクは必須
- 商用利用は各出版社との個別契約が必要
</div>