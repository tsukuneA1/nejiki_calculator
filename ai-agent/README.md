# AI Agent 自動化スクリプト

AI Agentを使ってコミット作成とPR生成を自動化する超シンプルなスクリプト群です。

## 概要

- `commit`: AI Agentがコミットメッセージを生成してコミット
- `pr`: AI AgentがPRを作成/更新

## インストール

### 1. AI Agent CLIをインストール

以下のいずれかをインストール：

```bash
# Aider (推奨)
pip install aider-chat

# または LLM
pip install llm
llm keys set claude
llm models default claude-3-5-sonnet-20241022

# または Shell-GPT
pip install shell-gpt
```

### 2. エイリアスを設定（オプション）

`.bashrc` または `.zshrc` に追加：

```bash
alias commit='./ai-agent/commit'
alias pr='./ai-agent/pr'
```

または、PATHに追加：

```bash
export PATH="$PATH:$(pwd)/ai-agent"
```

## 使い方

### コミット

```bash
# 対話的にコミット（メッセージを確認してからコミット）
./ai-agent/commit

# 確認なしで自動コミット
./ai-agent/commit -y
```

**動作:**
1. `git status` と `git diff` を確認
2. AI Agentがコミットメッセージを生成
3. 確認後（または `-y` で自動的に）コミット実行

### PR作成

```bash
# 対話的にPR作成
./ai-agent/pr

# または明示的に作成モード
./ai-agent/pr -c

# Draft PRとして作成
./ai-agent/pr -d

# 確認なしで自動PR作成
./ai-agent/pr -c -y
```

**動作:**
1. ブランチをプッシュ（未プッシュの場合）
2. AI Agentがコミット履歴から PR title と description を生成
3. description は [.github/pull_request_template.md](../.github/pull_request_template.md) に従う
4. 確認後（または `-y` で自動的に）PR作成

### PR更新

```bash
# PRのタイトルと説明を更新
./ai-agent/pr -u

# 確認なしで自動更新
./ai-agent/pr -u -y
```

**動作:**
1. 現在のブランチに対応するPRを検索
2. AI Agentが最新の変更から PR title と description を再生成
3. PRを更新

## コマンドリファレンス

### commit

```
Usage: commit [OPTIONS]

OPTIONS:
    -y, --yes    確認をスキップして自動でコミット
    -h, --help   ヘルプを表示

EXAMPLES:
    commit           # 対話的にコミット
    commit -y        # 確認なしで自動コミット
```

### pr

```
Usage: pr [OPTIONS]

OPTIONS:
    -c, --create    PR新規作成 (デフォルト)
    -u, --update    PR更新 (タイトルと説明を更新)
    -d, --draft     Draft PRとして作成
    -y, --yes       確認をスキップして自動実行
    -h, --help      ヘルプを表示

EXAMPLES:
    pr              # 対話的にPR作成
    pr -c           # PR新規作成
    pr -u           # PR更新
    pr -d           # Draft PRとして作成
    pr -c -y        # 確認なしで自動PR作成
```

## 実際のワークフロー例

### 1. 機能開発からPR作成まで

```bash
# ブランチ作成
git checkout -b feature/new-feature

# コード編集...

# AI Agentにコミットさせる
./ai-agent/commit -y

# さらにコード編集...

# 追加コミット
./ai-agent/commit -y

# PRを作成
./ai-agent/pr -c
```

### 2. レビュー指摘を受けて修正

```bash
# 修正コード編集...

# コミット
./ai-agent/commit -y

# ブランチをプッシュ
git push

# PR説明を最新の変更に合わせて更新
./ai-agent/pr -u
```

### 3. エイリアス設定後

```bash
# さらに短く
commit -y
pr -c
pr -u
```

## PRテンプレートの遵守

`pr` コマンドは [.github/pull_request_template.md](../.github/pull_request_template.md) に定義されたテンプレートに従います。

AI Agentには以下のルールが適用されます：
- Requiredセクションは必ず記入
- Optionalセクションは内容がない場合はセクションごと削除
- コメント（`<!-- -->`）は全て削除
- セクションの順序は変更しない

## カスタマイズ

### custom-agent.sh のカスタマイズ

独自のAI Agentを使いたい場合は、[custom-agent.sh](custom-agent.sh) を編集してください。

要件：
- 標準入力からプロンプトを受け取る
- AI応答を標準出力に返す

```bash
#!/bin/bash
set -e

PROMPT=$(cat)

# 独自のAI Agent CLIを呼び出す
echo "$PROMPT" | your-custom-ai-cli
```

### プロンプトのカスタマイズ

- コミットメッセージ: [commit](commit) の `commit_prompt` を編集
- PRタイトル: [pr](pr) の `title_prompt` を編集
- PR説明: [pr](pr) の `desc_prompt` を編集

## トラブルシューティング

### AI Agent CLIが見つからない

```
[ERROR] AI Agent CLIが見つかりません
```

→ 上記の「インストール」セクションを参照してAI Agent CLIをインストールしてください。

### ghコマンドがない

```
gh: command not found
```

→ GitHub CLIをインストール：

```bash
# macOS
brew install gh

# Ubuntu/Debian
sudo apt install gh

# 認証
gh auth login
```

### コミットする変更がない

```
[WARN] コミットする変更がありません
```

→ ファイルを編集してから `commit` を実行してください。

### PRが見つからない（pr -u時）

```
[ERROR] このブランチに対応するPRが見つかりません
```

→ 先に `pr -c` でPRを作成してください。

## ディレクトリ構造

```
ai-agent/
├── README.md              # このファイル
├── commit                 # コミットコマンド
├── pr                     # PRコマンド
├── custom-agent.sh        # AI Agentラッパー
├── lib/
│   ├── common.sh          # 共通ユーティリティ
│   └── ai.sh              # AI Agent呼び出し
└── run-agent.sh           # 旧スクリプト（後方互換性のため残存）
```

## ライセンス

プロジェクトのライセンスに従います。
