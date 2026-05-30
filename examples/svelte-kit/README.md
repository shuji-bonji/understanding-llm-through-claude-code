# SvelteKit プロジェクト設定例

> SvelteKit + Svelte 5 プロジェクトにおける Claude Code 設定の実践例。

> [!NOTE]
> このページは「[Part 7: Runtime Layer](../../docs/ja/07-runtime-layer/hooks.md) で解説した Hooks を、実プロジェクトでどう書くか」のレシピ集です。`.claude/settings.json` の表記は [Claude Code 公式の Hooks 形式](https://code.claude.com/docs/en/hooks-guide) に準拠しています。

> [!CAUTION]
> **用語の重要な区別**: SvelteKit の `src/hooks.server.ts` / `src/hooks.client.ts` と、Claude Code の Hooks は**別物**です。前者は SvelteKit のリクエスト処理ライフサイクル、後者は Claude Code のエージェントループに介入する仕組み。本ページは後者を扱います。

## 概要

SvelteKit プロジェクトにおいて、LLM の構造的問題に対応した Claude Code の設定をどう構築するかを示す。

## 予定する内容

- [ ] CLAUDE.md の設計例
- [ ] `.claude/rules/` の設計例（Svelte コンポーネント、ルーティング）
- [ ] `.claude/skills/` の設計例
- [x] **Hooks の設計例 ← このページ**
- [x] **settings.json の設計例 ← このページ**

## 関連する実プロジェクト

| プロジェクト | 構成 | リンク |
|:--|:--|:--|
| e-shiwake | SvelteKit + Svelte 5 + Dexie.js (PWA) | [GitHub: .claude/](https://github.com/shuji-bonji/e-shiwake/tree/main/.claude) |

---

## Hooks の設計例（中強度）

> [!IMPORTANT]
> → Why: **`svelte-check` は `.svelte` 内の TypeScript と Svelte 5 rune の整合性を機械的に検証**（Hallucination 対策）
> → Why: **Svelte 5 で deprecated になった構文（`$:`、`export let`）を LLM が混在させがち**（Knowledge Boundary 対策）
> → Why: **`vite.config.ts` / `svelte.config.js` の直編集で PWA や SSR が壊れやすい**（保護ファイル化）

### ファイル構成

```
.claude/
├── settings.json              # Hooks 定義本体
└── hooks/
    ├── block-dangerous-commands.sh  # 破壊的 Bash コマンドのブロック
    └── protect-files.sh             # SvelteKit 固有の保護ファイル
```

### Hook 構成の全体像

| イベント | Hook | 目的 | 対応する構造問題 |
|:--|:--|:--|:--|
| `PostToolUse` (Edit\|Write\|MultiEdit) | `prettier --write` (+ `prettier-plugin-svelte`) | `.svelte` 含む自動整形 | Hallucination |
| `PostToolUse` (Edit\|Write\|MultiEdit) | `eslint --fix` (.ts/.svelte/.js) | lint 自動修正 | Hallucination, Sycophancy |
| `PreToolUse` (Bash) | `block-dangerous-commands.sh` | `rm -rf /` 等のブロック | （安全性） |
| `PreToolUse` (Edit\|Write\|MultiEdit) | `protect-files.sh` | `vite.config.ts` / `app.html` 等の保護 | （安全性） |
| `Stop` | `svelte-check` | `.svelte` 内の型 + Svelte 5 構文検証 | Instruction Decay, Knowledge Boundary |
| `SessionStart` (compact) | Svelte 5 / SvelteKit 規約の echo | コンパクション後に再注入 | Context Rot |

### `.claude/settings.json`

```jsonc
{
  "hooks": {
    "PostToolUse": [
      {
        "// Hallucination 対策": "編集後に自動整形（.svelte は prettier-plugin-svelte で整形）",
        "matcher": "Edit|Write|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs -r npx prettier --write --ignore-unknown --plugin prettier-plugin-svelte"
          }
        ]
      },
      {
        "// Hallucination + Sycophancy 対策": "TypeScript と Svelte ファイルの lint 自動修正",
        "matcher": "Edit|Write|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | grep -E '\\.(ts|svelte|js)$' | xargs -r npx eslint --fix --no-warn-ignored 2>&1 || true"
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
        "// Instruction Decay + Knowledge Boundary 対策": "svelte-check で .svelte 内 TS と Svelte 5 rune の整合性を検証",
        "hooks": [
          {
            "type": "command",
            "command": "cd \"$CLAUDE_PROJECT_DIR\" && npx svelte-check --tsconfig ./tsconfig.json --threshold error 2>&1 | tail -40"
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
            "command": "echo 'リマインダ: Svelte 5 では rune（$state / $derived / $effect / $props）を使う。レガシーな reactive 構文（$:、export let）は新規コードでは避ける。load 関数の使い分け: +page.ts（クライアント実行可）/ +page.server.ts（サーバー専用）。テストは vitest、E2E は playwright。'"
          }
        ]
      }
    ]
  }
}
```

### `.claude/hooks/protect-files.sh`（SvelteKit 固有部分）

> Angular 版との差分は **保護対象パターン** のみ。

```bash
PROTECTED_PATTERNS=(
  '.env'
  '.env.local'
  '.env.production'
  'package-lock.json'
  'yarn.lock'
  'pnpm-lock.yaml'
  '.git/'
  'svelte.config.js'      # SvelteKit ビルド設定
  'vite.config.ts'        # Vite 設定（PWA プラグイン含む）
  'vite.config.js'
  'src/app.html'          # ルート HTML テンプレート
  'src/app.d.ts'          # アンビエント型定義（壊すと全 .svelte が型エラー）
  'src/service-worker'    # PWA Service Worker（バージョン管理が必要）
  '.npmrc'
)
```

> Angular 版（`angular.json`, `nx.json` を保護）と並列構造。スクリプト本体は同じ。

### `.claude/hooks/block-dangerous-commands.sh`

Angular 版と完全に同じ（`rm -rf /` / force push / npm publish 等）。詳細は [Angular/NgRx 版](../angular-ngrx/README.md#claudehooksblock-dangerous-commandssh) を参照。

### セットアップ

```bash
# 1. ファイル配置
mkdir -p .claude/hooks
# settings.json, hooks/*.sh を配置

# 2. 実行権限の付与（macOS/Linux）
chmod +x .claude/hooks/*.sh

# 3. 依存パッケージの確認
npm install -D prettier prettier-plugin-svelte eslint svelte-check jq

# 4. jq のインストール（macOS 環境側）
brew install jq

# 5. Hook の確認
# Claude Code 内で `/hooks` を実行し、登録状況を確認
```

### 拡張オプション

> [!TIP]
> プロジェクトの成熟度に応じて段階的に導入する。

- **Stop で `vitest run`**: 単体テストを強制実行。実行時間が長い場合は Agent Hook（`type: agent`）に委譲。
- **Stop で `playwright test`**: E2E テストの自動実行（CI 環境では推奨、ローカル開発では重い）。
- **PostToolUse で `svelte-check` を逐次実行**: ファイル単位ではなくプロジェクト全体を毎回チェックすると重いので、Stop に集約する形を推奨。
- **PreToolUse で PWA manifest の保護**: `src/manifest.webmanifest` や `static/manifest.json` も保護対象に追加。
- **HTTP Hook で Cloudflare Pages デプロイ通知**: `PostToolUse` で外部サービスに編集通知を送信。

### 制限事項と注意点

> [!WARNING]
> - `svelte-check` は SvelteKit プロジェクト全体を解析するため、大規模リポジトリでは Stop ごとに数秒〜数十秒かかる。Agent Hook 化を検討する。
> - `prettier-plugin-svelte` は `package.json` の依存に含めること（さもないと `.svelte` ファイルが整形されない）。
> - 保護対象ファイルは **SvelteKit + Svelte 5 + PWA 構成** を前提。Tauri / Electron / Cloudflare Workers 等の特殊構成では追加・削除が必要。
> - `src/hooks.server.ts` / `src/hooks.client.ts` は **SvelteKit のリクエストフック** であって、Claude Code の Hooks とは別物。混同しないこと（このページ冒頭の CAUTION 参照）。

---

> **TODO**: CLAUDE.md / `.claude/rules/` / `.claude/skills/` の設計例を順次追加
