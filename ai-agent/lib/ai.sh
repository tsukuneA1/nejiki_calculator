#!/bin/bash

# AI Agent呼び出し関数

run_ai_agent() {
    local prompt="$1"
    local result

    # カスタムスクリプトを優先
    if [[ -f "$SCRIPT_DIR/custom-agent.sh" ]]; then
        result=$(echo "$prompt" | bash "$SCRIPT_DIR/custom-agent.sh" 2>&1)
        if [[ $? -ne 0 ]]; then
            log_error "AI Agentの実行に失敗しました"
            echo "$result" >&2
            exit 1
        fi
        echo "$result"
    # Aider
    elif command -v aider &> /dev/null; then
        echo "$prompt" | aider --no-git --yes --message - 2>/dev/null
    # LLM CLI
    elif command -v llm &> /dev/null; then
        echo "$prompt" | llm
    # Shell-GPT
    elif command -v sgpt &> /dev/null; then
        echo "$prompt" | sgpt
    else
        log_error "AI Agent CLIが見つかりません"
        log_info "以下のいずれかをインストールしてください:"
        log_info "  - Aider: pip install aider-chat"
        log_info "  - LLM: pip install llm"
        log_info "  - Shell-GPT: pip install shell-gpt"
        log_info "  - または $SCRIPT_DIR/custom-agent.sh を作成してください"
        exit 1
    fi
}
