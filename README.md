# IMA-JUKU 生成AI活用セミナー 事前アンケート

太郎坊ベースで開催される「IMA-JUKU」生成AI活用セミナーの事前アンケートフォームです。

## 🚀 デプロイ方法

### Vercelにデプロイ

```bash
# Vercel CLIをインストール（初回のみ）
npm install -g vercel

# このディレクトリで実行
vercel

# 本番環境にデプロイ
vercel --prod
```

### ローカルで確認

```bash
# シンプルなHTTPサーバーを起動
npx http-server -p 3000

# ブラウザで http://localhost:3000 を開く
```

## 📋 機能

- レスポンシブデザイン（PC・タブレット・スマホ対応）
- Formspree連携（https://formspree.io/f/mdkyeywy）
- 自動返信メール機能
- スパム対策（ハニーポット）
- 二重送信防止

## 🔧 カスタマイズ

### Formspree設定

Formspreeダッシュボードで以下を設定してください：

1. **通知メール設定**
   - Settings → Notifications
   - 管理者のメールアドレスを追加

2. **自動返信メール**
   - Settings → Autoresponder
   - 回答者への確認メッセージをカスタマイズ

3. **reCAPTCHA追加（オプション）**
   - Settings → Spam Protection
   - より強固なスパム対策

## 📁 ファイル構成

```
.
├── index.html          # アンケートフォーム本体
├── vercel.json        # Vercelデプロイ設定
├── package.json       # プロジェクト情報
└── README.md          # このファイル
```

## 🔗 リンク

- Formspree Dashboard: https://formspree.io/forms/mdkyeywy
- 太郎坊ベース: https://tarobo-base.vercel.app/

---

**制作:** Step Out Marketing LLC
**更新日:** 2025年11月16日
