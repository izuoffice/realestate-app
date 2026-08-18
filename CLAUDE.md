# CLAUDE.md

このファイルは、このリポジトリでClaude Codeが作業する際のガイドラインです。

## プロジェクト概要

realestate-app プロジェクト。Supabase認証機能付きの不動産管理Webアプリ（React + Vite）。

- メールアドレス＋パスワードで会員登録・ログインできる
- 未ログインの場合はログイン画面にリダイレクトする
- ログイン後は物件一覧画面に遷移する
- 物件ごとに「物件名」「家賃（円）」「エリア名」「間取り」を登録・編集・削除できる（一覧表示・新規登録・編集・削除）
- 物件は登録したユーザーに紐づき、他ユーザーの物件は閲覧・操作できない（Supabase RLSで制御）
- ログアウトボタンを設ける

## デプロイ情報

- 本番URL: https://realestate-app.vercel.app
- Supabaseプロジェクト名: realestate-app
- ホスティング: Vercel（[vercel.json](vercel.json) で全パスを `index.html` にリライトし、React Routerのクライアントサイドルーティングに対応）
- 環境変数（`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`）はVercelダッシュボードで設定する（`vercel.json` には含めない）

## 技術スタック

- React 18
- Vite 5（ビルドツール・開発サーバー）
- React Router（`react-router-dom`）によるクライアントサイドルーティング
- Supabase（`@supabase/supabase-js`）
  - Auth: メールアドレス＋パスワード認証
  - Database: Postgres。`properties` テーブルにRLSを設定し、`auth.uid() = user_id` の行のみ操作可能（[supabase/schema.sql](supabase/schema.sql)）
- プレーンCSS（CSSフレームワーク・CSS-in-JSは未使用）
- 状態管理: Reactの `useState` / `useEffect` / Context APIのみ（外部の状態管理ライブラリは未使用）

## 環境変数

SupabaseのProject URLとPublishable keyは `.env`（Git管理対象外）で管理する。

```
VITE_SUPABASE_URL=SupabaseのProject URL
VITE_SUPABASE_ANON_KEY=SupabaseのPublishable key
```

値の入っていない `.env.example` をコミット対象として用意している。

## 開発コマンド

- `npm install` — 依存パッケージのインストール
- `npm run dev` — 開発サーバーの起動（デフォルト: http://localhost:5173 ）
- `npm run build` — 本番ビルド（`dist/` に出力）
- `npm run preview` — ビルド済みファイルをローカルでプレビュー

## Git運用ルール

### 基本方針: コード変更ごとにGitHubへプッシュする

- コードに変更を加えたら、そのたびにコミットを作成し、GitHubへプッシュすること。
  作業をローカルに溜め込まず、こまめにコミット・プッシュを行う。
- 1つのコミットは意味のある単位にまとめ、変更内容がわかるコミットメッセージを書くこと。
- プッシュ前に `git status` / `git diff` で変更内容を確認し、意図しないファイル（`.env` や秘密情報・不要な生成物など）が含まれていないか確認すること。
- force push（`git push --force` 等）や履歴を書き換える操作は、ユーザーの明示的な許可がない限り行わない。
- コミット・プッシュはユーザーから明示的に依頼された場合、またはこのファイルで許可された範囲で行う。

### コミットメッセージの書き方

- 変更の「なぜ」が伝わる簡潔な説明を1〜2文で書く。
- 日本語・英語どちらでも構わないが、リポジトリ内で表記を統一する。

### ブランチ運用

<!-- TODO: mainへ直接コミットするか、feature branch + PR運用にするか等が決まったら記載してください -->

## コーディング規約

### コンポーネントの命名規約

- コンポーネントのファイル名・関数名はPascalCase（例: `PropertyCard.jsx` の `PropertyCard`）。
- 1ファイル1コンポーネントを基本とする。
- コンポーネントは関数コンポーネント（`function` 宣言）で記述し、`export default` する。
- コンポーネント用のCSSは同名の `.css` ファイルに分け、対応するコンポーネントと同じ階層に置く（例: `PropertyCard.jsx` ⇔ `PropertyCard.css`）。共通のグローバルスタイルは `src/index.css` に置く。
- props・state・関数・変数はcamelCase（例: `fetchProperties`, `handleSubmitForm`）。
- 定数はSCREAMING_SNAKE_CASE（例: `TABLE_NAME`, `EMPTY_FORM`）。
- ページ単位のコンポーネントは `src/pages/`、再利用可能な部品は `src/components/`、Supabaseとのデータ操作は `src/services/` に置く。
- イベントハンドラは `on〜`（props経由で渡す場合）または `handle〜`（コンポーネント内定義の場合）で命名する。
