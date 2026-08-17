# realestate-app

第13章のrealestate-app

Supabase認証機能付きの不動産管理Webアプリ（React + Vite）。

## 機能

- メールアドレス＋パスワードでの会員登録・ログイン
- 未ログイン時はログイン画面へリダイレクト
- ログイン後は物件一覧画面（ダミーデータ）を表示
- ログアウト

## セットアップ

```bash
npm install
cp .env.example .env  # .envにSupabaseのProject URL・Publishable keyを設定する
npm run dev
```

## 環境変数

`.env`（Git管理対象外）に以下を設定してください。

```
VITE_SUPABASE_URL=SupabaseのProject URL
VITE_SUPABASE_ANON_KEY=SupabaseのPublishable key
```
