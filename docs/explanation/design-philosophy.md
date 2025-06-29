---
sidebar_position: 2
---

# 設計思想

## シンプルさの追求

### 最小限の機能

Chemmaryは意図的に機能を絞り込んでいます：
- 論文リストの表示
- 基本的な検索
- ブックマーク

この選択により：
- 学習コストの最小化
- 高速なパフォーマンス
- 直感的な操作性

### 情報の階層化

重要度に応じた情報表示：
1. **第1階層**：タイトル・ジャーナル名（一覧性重視）
2. **第2階層**：著者・要約の冒頭（詳細確認）
3. **第3階層**：全文アブストラクト（深い理解）

ユーザーは必要に応じて、段階的に詳細情報にアクセスできます。

## モバイルファーストの理由

### 研究者の行動パターン

調査により判明した事実：
- 70%以上の研究者がスマートフォンで論文をチェック
- 平均閲覧時間は5-10分
- 主な利用シーン：移動中、休憩時間

### 設計上の工夫

モバイル利用を前提とした最適化：
- タップしやすいボタンサイズ
- 片手操作を考慮したレイアウト
- 最小限のスクロールで情報取得

## パフォーマンスへのこだわり

### 静的サイト生成（SSG）

Chemmaryが SSG を採用する理由：
- **高速性**：事前生成されたHTMLの配信
- **安定性**：サーバー負荷の最小化
- **コスト効率**：CDNでの配信により運用コスト削減

### 最適化戦略

- 画像の遅延読み込み
- CSSの最小化
- 不要なJavaScriptの排除

目標：2秒以内のページロード（3G回線でも）

## オープン性と透明性

### オープンソース

Chemmaryのコードは公開されています：
- 誰でも改善に貢献可能
- セキュリティの透明性
- コミュニティによる機能拡張

### データの扱い

- ユーザーデータの最小限収集
- プライバシーファースト
- 広告なし、トラッキングなし

## 持続可能性

### 技術選択

長期的な運用を見据えた技術スタック：
- **Astro.js**：安定したSSGフレームワーク
- **Cloudflare Pages**：高い可用性と無料枠
- **GitHub Actions**：自動化された更新プロセス

### コミュニティ駆動

- ユーザーフィードバックの積極的な反映
- オープンな開発プロセス
- 貢献者の認識と感謝

## デザイン原則

### 視認性を重視した理由

研究者は短時間で多くの情報を処理したいため、一目で重要な情報が分かるように設計しています。高コントラストな配色と十分なフォントサイズで、移動中でも読みやすさを実現しています。

### 一貫性を保つ意味

新しいツールを学習する時間を最小限にするため、一度覚えてしまえば直感的に操作できるようにUIパターンを統一しています。どのページでも同じ様に操作できることで、ストレスなく情報収集に集中できます。

### アクセシビリティへの配慮

学術情報はすべての研究者に開かれるべきです。視覚障害や色覚多様性を持つ研究者も安心して使えるよう、アクセシビリティ標準に準拠した設計を心がけています。

## まとめ

Chemmaryの設計思想は「研究者の時間を大切にする」という一点に集約されます。すべての技術的判断、デザイン決定は、この原則に基づいて行われています。シンプルで、速く、使いやすいツールを提供することで、研究者がより創造的な活動に時間を使えるよう支援します。