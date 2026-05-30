# Angular/NgRx プロジェクト設定例

> Angular 18 + NgRx + RxJS プロジェクトにおける Claude Code 設定の実践例。

> [!NOTE]
> このページは「[Part 7: Runtime Layer](../../docs/ja/07-runtime-layer/hooks.md) で解説した Hooks を、実プロジェクトでどう書くか」のレシピ集です。`.claude/settings.json` の表記は [Claude Code 公式の Hooks 形式](https://code.claude.com/docs/en/hooks-guide) に準拠しています。

## 概要

Angular/NgRx プロジェクトにおいて、LLM の構造的問題に対応した Claude Code の設定をどう構築するかを示す。

## 予定する内容

- [ ] CLAUDE.md の設計例（200行以内）
- [ ] `.claude/rules/` の設計例（NgRx, RxJS, Component, Testing）
- [ ] `.claude/skills/` の設計例（コンポーネント生成、PRレビュー）
- [ ] `.claude/agents/` の設計例（コードレビュー専門エージェント）
- [x] **Hooks の設計例（lint, テスト自動実行）← このページ**
- [x] **settings.json の設計例 ← このページ**

## 対応する構造的問題

| 設定 | 対応する問題 |
|:--|:--|
| CLAUDE.md 200行以内 | Priority Saturation |
| NgRx ルール（条件付き） | Priority Saturation, Lost in the Middle |
| テスト自動実行 Hook | Hallucination, Sycophancy |
| レビュー専門 Agent | Sycophancy, Knowledge Boundary |

---

## Hooks の設計例（中強度）

> [!IMPORTANT]
> → Why: **コンパイラ・lint は LLM の判断より信頼できる**（Sycophancy 回避）
> → Why: **「テストを実行しろ」と CLAUDE.md に書いても忘れる**（Instruction Decay 回避）
> → Why: **コンテキストを消費せず強制実行**（Priority Saturation 回避）

### ファイル構成

```
.claude/
├── settings.json              # Hooks 定義本体
└── hooks/
    ├── block-dangerous-commands.sh  # 破壊的 Bash コマンドのブロック
    └── protect-files.sh             # .env / lock ファイル等の保護
```

### Hook 構成の全体像

| イベント | Hook | 目的 | 対応する構造問題 |
|:--|:--|:--|:--|
| `PostToolUse` (Edit\|Write\|MultiEdit) | `prettier --write` | 編集後の自動整形 | Hallucination |
| `PostToolUse` (Edit\|Write\|MultiEdit) | `eslint --fix` | TS の lint 自動修正 | Hallucination, Sycophancy |
| `PreToolUse` (Bash) | `block-dangerous-commands.sh` | `rm -rf /` 等のブロック | （安全性） |
| `PreToolUse` (Edit\|Write\|MultiEdit) | `protect-files.sh` | `.env` / lock ファイルの保護 | （安全性） |
| `Stop` | `tsc --noEmit` | レスポンス完了時に型チェック強制 | Instruction Decay |
| `SessionStart` (compact) | プロジェクト規約の echo | コンパクション後に再注入 | Context Rot |

### `.claude/settings.json`

```jsonc
{
  "hooks": {
    "PostToolUse": [
      {
        "// Hallucination 対策": "編集後に自動整形して文法エラーを早期発見",
        "matcher": "Edit|Write|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs -r npx prettier --write --ignore-unknown"
          }
        ]
      },
      {
        "// Hallucination + Sycophancy 対策": "TypeScript の lint 自動修正",
        "matcher": "Edit|Write|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | grep -E '\\.ts$' | xargs -r npx eslint --fix --no-warn-ignored 2>&1 || true"
          }
        ]
      }
    ],

    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-dangerous-commands.sh"
          }
        ]
      },
      {
        "matcher": "Edit|Write|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-files.sh"
          }
        ]
      }
    ],

    "Stop": [
      {
        "// Instruction Decay 対策": "レスポンス完了時に型チェック強制",
        "hooks": [
          {
            "type": "command",
            "command": "cd \"$CLAUDE_PROJECT_DIR\" && npx tsc --noEmit -p tsconfig.json 2>&1 | head -50"
          }
        ]
      }
    ],

    "SessionStart": [
      {
        "matcher": "compact",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'リマインダ: NgRx Action は createActionGroup を使用、Effect は ofType + concatMap/exhaustMap で書く、テストは Jasmine + Karma。コミット前に npm test を必ず実行。'"
          }
        ]
      }
    ]
  }
}
```

### `.claude/hooks/block-dangerous-commands.sh`

```bash
#!/bin/bash
# 破壊的 Bash コマンドをブロックする PreToolUse Hook。
# Exit code 2 で stderr の内容が Claude にフィードバックされる。

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

DANGEROUS_PATTERNS=(
  'rm -rf /'
  'rm -rf ~'
  'rm -rf *'
  'git push --force'
  'git push -f'
  'git reset --hard origin'
  'npm publish'
  'yarn publish'
  'pnpm publish'
  ':(){:|:&};:'
  'chmod -R 777'
  'sudo rm'
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if [[ "$COMMAND" == *"$pattern"* ]]; then
    echo "❌ ブロック: 破壊的コマンドが検出されました（pattern: '$pattern'）" >&2
    exit 2
  fi
done

# --force-with-lease は安全な force push として許可
if [[ "$COMMAND" == *"git push"* ]] && [[ "$COMMAND" == *"--force-with-lease"* ]]; then
  exit 0
fi

exit 0
```

### `.claude/hooks/protect-files.sh`

```bash
#!/bin/bash
# 保護対象ファイルへの書き込みをブロックする PreToolUse Hook。

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

PROTECTED_PATTERNS=(
  '.env'
  '.env.local'
  '.env.production'
  'package-lock.json'
  'yarn.lock'
  'pnpm-lock.yaml'
  '.git/'
  'angular.json'
  'nx.json'
  '.npmrc'
)

for pattern in "${PROTECTED_PATTERNS[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "❌ ブロック: $FILE_PATH は保護対象ファイルです（pattern: '$pattern'）" >&2
    exit 2
  fi
done

exit 0
```

### セットアップ

```bash
# 1. ファイル配置
mkdir -p .claude/hooks
# settings.json, hooks/*.sh を配置

# 2. 実行権限の付与（macOS/Linux）
chmod +x .claude/hooks/*.sh

# 3. jq のインストール（macOS）
brew install jq

# 4. Hook の確認
# Claude Code 内で `/hooks` を実行し、登録状況を確認
```

### 拡張オプション

> [!TIP]
> 以下は本レシピには含めていない強化案。プロジェクトの成熟度に応じて段階的に導入する。

- **Stop 時のテスト実行**: `Stop` イベントに `npx ng test --watch=false --browsers=ChromeHeadless` を追加。実行時間が長い場合は Agent Hook（`type: agent`）でサブエージェントに委譲。
- **UserPromptSubmit で NgRx ルール注入**: 「Action は `createActionGroup` を使う」「Effect は `concatMap`/`exhaustMap` を選ぶ」等のドメインルールを毎ターン注入。
- **HTTP Hook で CI 連携**: `PostToolUse` で外部サービスに編集通知を送信。

### 制限事項と注意点

> [!WARNING]
> - `Stop` Hook の `tsc --noEmit` は型チェックに数秒〜数十秒かかる。Stop で毎回走らせるとレスポンスが遅くなるため、影響範囲が広い大規模リポジトリでは `Agent Hook` 化を検討する。
> - `prettier`・`eslint` は `npm install` 済みであることを前提とする。CI 環境では Hook 実行前に依存を解決すること。
> - 保護対象ファイル一覧は **プロジェクト固有**。本レシピは Angular 標準構成を想定しているため、Nx / Monorepo / カスタム設定では追加・削除すること。

---

> **TODO**: CLAUDE.md / `.claude/rules/` / `.claude/skills/` / `.claude/agents/` の設計例を順次追加
