🌐 [English](../../11-cross-llm-principles/cursor-cline-mapping.md)

# Cursor / Cline / Copilot 対応表

> [!NOTE]
> 本ページは機能の 1 対 1 対応表ではない。
> 確認した公式ドキュメントの範囲で、常駐指示の置き場所だけを示す。
> 確認していない設定キーは書かない。同じ名前の機能が他製品にあるとは限らない。

## 先に原則を置く

ツールが変わっても、次の考え方は変わらない。

1. **常駐の指示は短く保つ** — 毎回読まれる情報は Priority Saturation を起こす
2. **必要なときだけ読む** — 全ルールを一箇所に積み上げない
3. **機械的検証はモデルの外に置く** — テスト、lint、CI は LLM に依存しない
4. **会話は短く区切る** — Context Rot と Instruction Decay は製品を問わず現れる

ファイル名が違うことは、原則が違うことではない。揃っていない機能があることは、原則が使えないことではない。

## 確認した置き場所

以下は、執筆時点で公式ドキュメントに記載があるものを書いた。製品の更新でパスは変わりうる。運用前に各公式ドキュメントを確認する。

| 役割 | Claude Code（代表例） | 確認した他製品の置き場所 |
| :--- | :-------------------- | :----------------------- |
| プロジェクトで毎回読む指示 | `CLAUDE.md` | Cursor: [`.cursor/rules`](https://cursor.com/docs/rules)（`.mdc`）。Cline: [`.clinerules/`](https://docs.cline.bot/customization/cline-rules)。GitHub Copilot: [`.github/copilot-instructions.md`](https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot) |
| 外部ツール接続 | MCP | Cursor と Cline は MCP を公式に扱う。Copilot 側の対応は製品の更新が速いため、ここでは断定しない |

Cursor の `.cursorrules`（プロジェクト直下の単一ファイル）は、公式の現行方式ではない。現行は `.cursor/rules` の `.mdc` である。

## 対応表に載せないもの

次は、Claude Code における代表例である。他製品に同じ粒度があるとは確認していない。推測の対応づけはしない。

- `.claude/rules/` の glob 条件付き注入
- Skills のオンデマンド展開
- Agents の独立 Context
- Hooks
- `/compact` と `/clear`

これらの役割（条件付きで読む、別会話で検証する、モデルの外で検証する、履歴を圧縮または捨てる）は、専用コマンドがなくても実行できる。手動での再現は [ツール支援がない環境での実践](prompt-driven-development.md) を読む。

> [!IMPORTANT]
> 「Cursor でも同じファイルを書けば解決する」とは言えない。
> 使えるのは、短い常駐指示、必要な情報だけの注入、モデルの外の検証、短いセッション、という考え方である。

---

> **前へ**: [ツール支援がない環境での実践](prompt-driven-development.md)

> **シリーズ完了**: [トップページに戻る](/ja/)
