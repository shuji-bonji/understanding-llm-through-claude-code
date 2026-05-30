# Plugins & Marketplaces

🌐 [English](/topics/plugins)

> [!NOTE]
> Plugin は、Skills / MCP サーバ / Hooks / スラッシュコマンドをまとめてインストール可能にしたバンドル。Marketplace は Plugin を発見するためのカタログ。アドホックな設定を「再利用可能でバージョン付きの単位」に変える。

## 仕組み

- Plugin は `skills/` / `mcp/` / `hooks/` / `commands/` を任意に組み合わせて同梱できる
- インストール済み Plugin は、ユーザーレベル設定と同じロードルールで統合される
- Marketplace は本質的に「キュレーションされた Plugin リスト」

## 関連する章

- [付録 — Plugins & Marketplaces](/ja/appendix/plugins-and-marketplaces)
- [Claude Code 設定リファレンス](/ja/appendix/claude-code-config-reference)

## 関連する構造的問題

- [Knowledge Boundary](/ja/01-llm-structural-problems/knowledge-boundary) — モデルに欠けている専門手順をパッケージ化
- [Context Rot](/ja/01-llm-structural-problems/context-rot) — 能力を Skills/MCP として配布することで常駐面を最小化

## 関連トピック

- [Topic: Skills & Agents](/ja/topics/skills-and-agents)
- [Topic: MCP](/ja/topics/mcp)
- [Topic: Hooks](/ja/topics/hooks)
- [機能別早見表](/ja/appendix/feature-index)
