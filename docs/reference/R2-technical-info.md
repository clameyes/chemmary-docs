---
sidebar_position: 2
---

# 技術情報

開発者や技術に興味のある方向けの技術情報です。

## アーキテクチャ概要

### フロントエンド
- **Astro.js**: 静的サイト生成フレームワーク
- **shadcn/ui**: UIコンポーネントライブラリ
- **TypeScript**: 型安全な開発環境

### デプロイメント
- **Cloudflare Pages**: 静的サイトホスティング
- **GitHub Actions**: 自動ビルド・デプロイ
- **CDN**: 世界各地での高速配信

## データ取得

### RSS/Atomフィード
主要な化学系論文誌のRSSフィードから自動取得：
- 1日2回の定期実行（日本時間 8:00, 17:00）
- 重複記事の自動除去
- データの正規化処理

### 更新フロー
1. GitHub Actionsでスケジュール実行
2. 各論文誌のRSSフィードを取得
3. データの正規化・重複除去
4. 静的サイトを再生成
5. Cloudflare Pagesに自動デプロイ

## パフォーマンス最適化

### 静的サイト生成（SSG）
- 事前にHTMLを生成してCDNで配信
- サーバーサイド処理が不要
- 高いパフォーマンスと可用性を実現

### 最適化技術
- 画像の遅延読み込み
- CSSの最小化
- 不要なJavaScriptの除去
- ブラウザキャッシュの活用

## セキュリティ

### 静的サイトの利点
- サーバーサイドの脆弱性がない
- DDoS攻撃に対する耐性
- データベースなしでのセキュアな運用

### HTTPS暗号化
- Cloudflare経由でのHTTPS配信
- セキュアな通信の保証

## オープンソース

### ライセンス
- **MIT License**: 商用利用可能
- ソースコードの完全公開
- コミュニティによる貢献歓迎

### リポジトリ構成
- **chemary-docs**: ドキュメントサイト（このサイト）
- **chemary-e2e**: E2Eテスト
- **chemary-dev**: アプリケーション本体

## 技術スタック

### 開発環境
```bash
Node.js: 18.x以上
npm: 9.x以上
TypeScript: 5.x
```

### 主要ライブラリ
```json
{
  "astro": "^4.0.0",
  "@astrojs/react": "^3.0.0",
  "@astrojs/tailwind": "^5.0.0",
  "typescript": "^5.0.0"
}
```

## API仕様（将来実装）

### RESTful API
将来的にAPIを提供予定：
- 論文データの取得
- 検索機能
- フィルタリング

### エンドポイント例
```
GET /api/articles?date=2024-12-21
GET /api/search?q=catalyst&limit=20
GET /api/journals
```

## 貢献方法

### 開発への参加
1. GitHubリポジトリをfork
2. 機能ブランチを作成
3. 変更をcommit
4. Pull Requestを作成

### 課題報告
- GitHub Issuesで課題を報告
- 機能要求も歓迎
- コミュニティでの議論

## ブラウザサポート

### 対応ブラウザ
- Chrome: 90+
- Firefox: 88+
- Safari: 14+
- Edge: 90+

### モバイルブラウザ
- iOS Safari: 14+
- Chrome for Android: 90+
- Samsung Internet: 15+