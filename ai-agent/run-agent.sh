#!/bin/bash

set -e

# カラー定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ヘルパー関数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 使い方を表示
show_usage() {
    cat << EOF
Usage: $0 [OPTIONS]

AI Agentを実行してコミットとPR作成を自動化するスクリプト

OPTIONS:
    -t, --task TASK          実行するタスク内容 (必須)
    -b, --branch BRANCH      作業ブランチ名 (デフォルト: feature/ai-agent-\$(date +%Y%m%d-%H%M%S))
    -d, --draft              Draft PRとして作成
    -s, --skip-commit        コミット処理をスキップ (既にコミット済みの場合)
    -h, --help               ヘルプを表示

EXAMPLES:
    # タスクを指定してAI Agentを実行
    $0 -t "ユーザープロフィール機能の追加"

    # ブランチ名を指定してDraft PRとして作成
    $0 -t "API仕様書の更新" -b feature/update-api-docs -d

    # コミットをスキップしてPRのみ作成
    $0 -t "リファクタリング" -s

EOF
}

# PRテンプレートを読み込んでAI用のプロンプトを生成
generate_pr_description_prompt() {
    local task="$1"
    local template_path=".github/pull_request_template.md"

    if [[ ! -f "$template_path" ]]; then
        log_error "PRテンプレートが見つかりません: $template_path"
        exit 1
    fi

    cat << EOF
以下のタスクに対して、GitHubのPR descriptionを生成してください。

タスク: $task

以下のPRテンプレートに従って、適切な内容を記入してください。
Optionalのセクションで内容が空の場合は、セクション全体（見出しを含む）を削除してください。
コメント（<!-- -->で囲まれた部分）は全て削除してください。

PRテンプレート:
---
$(cat "$template_path")
---

必ず上記のテンプレート形式に従い、実際の変更内容に基づいて記入してください。
EOF
}

# コミットメッセージを生成するプロンプト
generate_commit_message_prompt() {
    local task="$1"

    cat << EOF
以下のタスクに対して、適切なgit commitメッセージを生成してください。

タスク: $task

git statusとgit diffの内容を確認して、以下の形式でコミットメッセージを作成してください:

<1行目: 変更内容の要約（50文字以内）>

<3行目以降: 詳細な説明（必要に応じて）>

変更内容に基づいて、簡潔かつ明確なコミットメッセージを作成してください。
日本語でも英語でも構いませんが、プロジェクトの慣例に従ってください。
EOF
}

# PR titleを生成するプロンプト
generate_pr_title_prompt() {
    local task="$1"

    cat << EOF
以下のタスクに対して、GitHubのPR titleを生成してください。

タスク: $task

git logとgit diffを確認して、50文字以内で簡潔なPRタイトルを作成してください。
タイトルのみを出力し、余計な説明は含めないでください。
EOF
}

# AI Agentを実行
run_ai_agent() {
    local prompt="$1"
    local output_file="$2"

    log_info "AI Agentを実行中..."

    # カスタムスクリプトを優先
    if [[ -f "./ai-agent/custom-agent.sh" ]]; then
        echo "$prompt" | bash ./ai-agent/custom-agent.sh > "$output_file"
    # Aider (AI pair programming tool)
    elif command -v aider &> /dev/null; then
        echo "$prompt" | aider --no-git --yes --message - > "$output_file"
    # LLM CLI
    elif command -v llm &> /dev/null; then
        echo "$prompt" | llm > "$output_file"
    # Shell-GPT
    elif command -v sgpt &> /dev/null; then
        echo "$prompt" | sgpt > "$output_file"
    else
        log_error "AI Agent CLIが見つかりません"
        log_info "以下のいずれかをインストールしてください:"
        log_info "  - Aider: pip install aider-chat"
        log_info "  - LLM: pip install llm"
        log_info "  - Shell-GPT: pip install shell-gpt"
        log_info "  - または ./ai-agent/custom-agent.sh を作成してください"
        exit 1
    fi

    if [[ ! -s "$output_file" ]]; then
        log_error "AI Agentの出力が空です"
        exit 1
    fi

    log_success "AI Agentの実行完了"
}

# メイン処理
main() {
    local task=""
    local branch=""
    local is_draft=false
    local skip_commit=false

    # 引数のパース
    while [[ $# -gt 0 ]]; do
        case $1 in
            -t|--task)
                task="$2"
                shift 2
                ;;
            -b|--branch)
                branch="$2"
                shift 2
                ;;
            -d|--draft)
                is_draft=true
                shift
                ;;
            -s|--skip-commit)
                skip_commit=true
                shift
                ;;
            -h|--help)
                show_usage
                exit 0
                ;;
            *)
                log_error "不明なオプション: $1"
                show_usage
                exit 1
                ;;
        esac
    done

    # 必須パラメータのチェック
    if [[ -z "$task" ]]; then
        log_error "タスクを指定してください (-t オプション)"
        show_usage
        exit 1
    fi

    # ブランチ名のデフォルト値設定
    if [[ -z "$branch" ]]; then
        branch="feature/ai-agent-$(date +%Y%m%d-%H%M%S)"
    fi

    log_info "==== AI Agent 自動化スクリプト ===="
    log_info "タスク: $task"
    log_info "ブランチ: $branch"
    log_info "Draft PR: $is_draft"
    log_info "======================================"
    echo

    # gitリポジトリのチェック
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        log_error "gitリポジトリではありません"
        exit 1
    fi

    # 未コミットの変更があるか確認
    if [[ "$skip_commit" == true ]]; then
        if [[ -n "$(git status --porcelain)" ]]; then
            log_warn "未コミットの変更があります。--skip-commit 使用時は作業ツリーをクリーンにしてください。"
            exit 1
        fi
    fi

    # 作業ディレクトリの作成
    WORK_DIR="./ai-agent/.tmp"
    mkdir -p "$WORK_DIR"

    # ブランチの作成とチェックアウト
    log_info "ブランチを作成: $branch"
    if git rev-parse --verify "$branch" > /dev/null 2>&1; then
        log_warn "ブランチ '$branch' は既に存在します"
        read -p "既存のブランチをチェックアウトしますか? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_error "処理を中断しました"
            exit 1
        fi
        git checkout "$branch"
    else
        git checkout -b "$branch"
    fi

    # コミット処理
    if [[ "$skip_commit" == false ]]; then
        log_info "コミットメッセージを生成中..."
        commit_prompt=$(generate_commit_message_prompt "$task")
        run_ai_agent "$commit_prompt" "$WORK_DIR/commit_message.txt"

        commit_message=$(cat "$WORK_DIR/commit_message.txt")
        log_info "生成されたコミットメッセージ:"
        echo "---"
        echo "$commit_message"
        echo "---"
        echo

        read -p "このコミットメッセージでコミットしますか? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_warn "コミットをスキップしました"
        else
            git add -A
            git commit -m "$commit_message"
            log_success "コミット完了"
        fi
    fi

    # 変更がない場合は終了
    current_branch=$(git symbolic-ref --short HEAD)

    # リモートブランチが存在する場合のみ差分をチェック
    if git rev-parse --verify --quiet "origin/${current_branch}" >/dev/null; then
        if git diff --quiet "origin/${current_branch}"; then
            log_warn "コミットする変更がありません"
            exit 0
        else
            log_info "リモートブランチとの差分があります"
        fi
    else
        log_info "リモートブランチ origin/${current_branch} はまだ存在しません。新しいブランチとしてプッシュします。"
    fi

    # ブランチをプッシュ
    log_info "ブランチをプッシュ中..."
    git push -u origin "$branch"
    log_success "プッシュ完了"

    # PR titleを生成
    log_info "PR titleを生成中..."
    title_prompt=$(generate_pr_title_prompt "$task")
    run_ai_agent "$title_prompt" "$WORK_DIR/pr_title.txt"
    pr_title=$(cat "$WORK_DIR/pr_title.txt" | head -1 | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')

    # PR descriptionを生成
    log_info "PR descriptionを生成中..."
    desc_prompt=$(generate_pr_description_prompt "$task")
    run_ai_agent "$desc_prompt" "$WORK_DIR/pr_description.txt"
    pr_description=$(cat "$WORK_DIR/pr_description.txt")

    # PR内容を表示
    log_info "生成されたPR内容:"
    echo "===== TITLE ====="
    echo "$pr_title"
    echo
    echo "===== DESCRIPTION ====="
    echo "$pr_description"
    echo "================="
    echo

    read -p "このPRを作成しますか? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_warn "PR作成をスキップしました"
        log_info "以下のコマンドで手動でPRを作成できます:"
        log_info "  gh pr create --title \"$pr_title\" --body-file $WORK_DIR/pr_description.txt"
        exit 0
    fi

    # PRを作成
    log_info "PRを作成中..."

    gh_cmd="gh pr create --title \"$pr_title\" --body-file $WORK_DIR/pr_description.txt"

    if [[ "$is_draft" == true ]]; then
        gh_cmd="$gh_cmd --draft"
    fi

    pr_url=$(eval $gh_cmd)

    log_success "PR作成完了"
    log_success "PR URL: $pr_url"

    # 一時ファイルのクリーンアップ
    rm -rf "$WORK_DIR"
}

# スクリプトの実行
main "$@"
