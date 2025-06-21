---
sidebar_position: 5
---

# ビジュアルデザインシステム

Chemaryの美しく統一されたデザインシステムについて説明します。

## カラーパレット

### プライマリカラー
科学と信頼性を表現する深い青系統を採用：

```css
--primary-50: #eff6ff
--primary-100: #dbeafe
--primary-500: #3b82f6  /* メインブランドカラー */
--primary-600: #2563eb  /* ダークモード対応 */
--primary-900: #1e3a8a
```

### セカンダリカラー
暖かみのあるアクセントカラー：

```css
--accent-50: #fef3c7
--accent-400: #fbbf24  /* アクセント */
--accent-500: #f59e0b
```

### ジャーナル別カラー
各論文誌を視覚的に区別：

- **Nature Chemistry**: `#4ade80` (グリーン)
- **JACS**: `#f97316` (オレンジ) 
- **Angewandte**: `#8b5cf6` (パープル)

## タイポグラフィ

### フォントファミリー

#### 見出し（Display）
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
font-weight: 700; /* Bold */
letter-spacing: -0.025em; /* Tight */
```

#### 論文タイトル（Academic）
```css
font-family: 'Crimson Text', Georgia, serif;
font-weight: 600; /* Semi-bold */
line-height: 1.4;
```

#### 本文（Body）
```css
font-family: system-ui, -apple-system, sans-serif;
font-weight: 400; /* Regular */
line-height: 1.6;
```

### フォントサイズスケール

```css
--text-xs: 0.75rem    /* 12px - メタ情報 */
--text-sm: 0.875rem   /* 14px - 著者名 */
--text-base: 1rem     /* 16px - 本文 */
--text-lg: 1.125rem   /* 18px - 論文タイトル */
--text-xl: 1.25rem    /* 20px - サブヘッダー */
--text-2xl: 1.5rem    /* 24px - セクション見出し */
--text-3xl: 1.875rem  /* 30px - ページタイトル */
```

## スペーシング

### グリッドシステム
レスポンシブなレイアウトシステム：

```css
.container {
  max-width: 900px;  /* 最大幅を縮小し大画面での余白を削減 */
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .container { 
    padding: 0 2rem; 
    max-width: 800px;  /* タブレット向け最適化 */
  }
}

@media (min-width: 1024px) {
  .container { 
    max-width: 900px;  /* デスクトップでも適度な幅制限 */
  }
}
```

### レイアウト最適化の原則
- **余白最小化**: 大画面での不要な余白を削減
- **読みやすい行長**: 最適な読書体験のための幅制御
- **情報密度**: より多くの論文を同時に表示

### 余白の原則
8pxベースのスペーシングシステム：

```css
--space-1: 0.25rem   /* 4px */
--space-2: 0.5rem    /* 8px */
--space-4: 1rem      /* 16px */
--space-6: 1.5rem    /* 24px */
--space-8: 2rem      /* 32px */
```

## カードデザイン

### エレベーション
階層を表現する影の設計：

```css
/* 低位エレベーション */
.card-low {
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
}

/* 中位エレベーション（ホバー時） */
.card-hover {
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.06);
}
```

### ボーダーラディウス
モダンな角丸デザイン：

```css
--radius-sm: 0.375rem  /* 6px - 小要素 */
--radius-md: 0.5rem    /* 8px - ボタン */
--radius-lg: 0.75rem   /* 12px - カード */
--radius-xl: 1rem      /* 16px - モーダル */
```

## アニメーション

### トランジション
滑らかなユーザー体験のための設定：

```css
.transition-default {
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-slow {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### ホバーエフェクト
カードのインタラクション：

```css
.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}
```

## レスポンシブデザイン

### ブレークポイント
```css
/* Mobile First */
--breakpoint-sm: 640px   /* スマートフォン */
--breakpoint-md: 768px   /* タブレット */
--breakpoint-lg: 1024px  /* ラップトップ */
--breakpoint-xl: 1280px  /* デスクトップ */
```

### モバイル最適化
- **タップターゲット**: 最小44px×44px
- **スワイプジェスチャー**: 水平スクロール対応
- **フォントサイズ**: モバイルで最小16px

## ダークモード

### カラー適応
```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0f172a;
    --text-primary: #f1f5f9;
    --card-bg: #1e293b;
    --border-color: #334155;
  }
}
```

### 自動切り替え
- システム設定を優先
- ユーザー設定で上書き可能
- 滑らかなトランジション

## アクセシビリティ

### カラーコントラスト
- **AAA準拠**: 最小7:1のコントラスト比
- **カラーブラインド対応**: 色以外の視覚的手がかり併用

### フォーカス表示
```css
.focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}
```

### 読みやすさ
- **行長**: 最大75文字（大画面では適度な幅制限）
- **行間**: 1.6以上
- **段落間**: 十分な余白確保
- **レイアウト密度**: 情報密度と読みやすさのバランス

このデザインシステムにより、一貫性があり美しく、使いやすいインターフェースを実現します。