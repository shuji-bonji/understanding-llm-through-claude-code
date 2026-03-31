# Hooks のライフサイクル

> [!IMPORTANT]
> → Why: **Hallucination** 対策（テスト実行 Hook で機械的に検出）
> → Why: **Sycophancy** 対策（コンパイラ・テストランナーは追従しない）
> → Why: **Instruction Decay** 対策（コンテキストに依存しない強制実行）

## Hooks とは

Hooks は Claude Code のライフサイクルイベントにフックして実行されるコンテキスト外の処理。LLM のコンテキストウィンドウを消費しない。

| 属性             | 値                                      |
| :--------------- | :-------------------------------------- |
| 注入タイミング   | **コンテキストに注入されない**          |
| コンテキスト消費 | なし（Prompt Hook を除く）              |
| 実行場所         | Claude Code ランタイム（シェル / HTTP） |
| 定義場所         | settings.json 内の `hooks` キー         |

## なぜ存在するのか

LLM に「毎回 eslint を実行しろ」と指示すると、

1. コンテキストウィンドウを消費する
2. Instruction Decay で忘れることがある
3. Sycophancy で「問題ない」と判断をスキップする可能性がある

Hooks はランタイムレベルで強制実行するため、これらの問題を全て回避する。

## イベント一覧

| イベント             | 発火タイミング            | 主な用途                             |
| :------------------- | :------------------------ | :----------------------------------- |
| `SessionStart`       | セッション開始時          | 環境チェック、ログ初期化             |
| `UserPromptSubmit`   | ユーザー入力送信時        | 入力バリデーション、コンテキスト追加 |
| `PreToolUse`         | ツール実行前              | 危険なコマンドのブロック             |
| `PostToolUse`        | ツール実行後              | 自動フォーマット、lint 実行          |
| `PostToolUseFailure` | ツール失敗後              | エラーログ                           |
| `Stop`               | レスポンス完了時          | セッションログ更新、ビルドチェック   |
| `Notification`       | 通知発生時                | デスクトップ通知                     |
| `SubagentStart/Stop` | サブエージェント開始/終了 | ログ、サウンド再生                   |

## Hook の種類

### Command Hook（最も一般的）

```jsonc
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "npx prettier --write $CLAUDE_FILE_PATH",
        "matcher": {
          "toolName": "edit_file",
          "pathPattern": "**/*.ts",
        },
        "timeout": 10000,
      },
    ],
  },
}
```

### Prompt Hook（唯一コンテキストに影響する）

```jsonc
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "type": "prompt",
        "prompt": "必ず変更前にgit stashしてください",
      },
    ],
  },
}
```

### HTTP Hook（外部サービス連携）

```jsonc
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "http",
        "url": "https://my-service.com/webhook",
        "matcher": { "toolName": "execute_command" },
      },
    ],
  },
}
```

## Exit Code の意味

| Exit Code | 意味                                               |
| :-------- | :------------------------------------------------- |
| 0         | 操作を許可（そのまま続行）                         |
| 1         | 操作をブロック（stderr の内容を Claude に表示）    |
| 2         | イベント固有の特殊動作（PreToolUse: 再考を促す等） |

---

> **前へ**: [settings.json の役割](settings-json.md)

> **次へ**: [なぜLLMに見せないのか](why-not-in-context.md)
