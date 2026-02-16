#!/bin/bash

# カスタムAI Agentスクリプト
# Claude CLIを使って応答を取得します

set -e

# 標準入力からプロンプトを読み込む
PROMPT=$(cat)

# Claude CLIが使えるか確認
if ! command -v claude &> /dev/null; then
    echo "エラー: claude コマンドが見つかりません" >&2
    echo "" >&2
    echo "Claude CLIをインストールしてください" >&2
    exit 1
fi

# Claude CLIで処理
claude -p "$PROMPT"
