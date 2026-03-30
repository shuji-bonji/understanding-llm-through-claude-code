# Cursor / Cline / Copilot 対応表

> [!NOTE]
> Claude Code の「コンテキスト注入制御」という原理は、他の LLM ツールにも共通する。

## ツール間の機能マッピング

| Claude Code       | Cursor         | Cline         | GitHub Copilot                    | 共通原理                 |
| :---------------- | :------------- | :------------ | :-------------------------------- | :----------------------- |
| `CLAUDE.md`       | `.cursorrules` | `.clinerules` | `.github/copilot-instructions.md` | 常駐コンテキスト         |
| `.claude/rules/`  | `@` メンション | -             | -                                 | 条件付きコンテキスト     |
| `.claude/skills/` | Docs参照       | -             | -                                 | オンデマンドコンテキスト |
| `.claude/agents/` | -              | -             | -                                 | 独立コンテキスト実行     |
| `settings.json`   | IDE設定        | IDE設定       | IDE設定                           | ランタイム制御           |
| Hooks             | -              | -             | -                                 | ライフサイクル制御       |
| MCP               | MCP            | MCP           | -                                 | ツール定義注入           |
| `/compact`        | -              | -             | -                                 | コンテキスト圧縮         |

## 原理の普遍性

ツールが変わっても、以下の原理は同じ。

1. **常駐コンテキストは最小限に**: どのツールでも常駐情報は Priority Saturation を引き起こす
2. **条件付き注入で分散**: 全ルールを一箇所に集中させない
3. **機械的検証はコンテキスト外で**: テスト、lint、CI/CD は LLM に依存しない
4. **セッションは短く保つ**: Context Rot と Instruction Decay は全モデル共通

---

> [!WARNING]
> TODO: 各ツールの詳細な比較を追加予定
