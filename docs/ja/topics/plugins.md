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

## 構造的問題の外にある価値

Plugins は LLM の制約だけでなく、運用上の課題も解く。Skills / MCP / Hooks の上位レイヤーとして Plugin が独立して存在する理由は、ここにある。

- **再現性 (Reproducibility)** — どのマシンでも、どのチームメンバーでも、どのセッションでも同じ構成が動く
- **バージョン管理 (Versioning)** — Plugin が Skills/MCP/Hooks の正確なバージョンを固定し、挙動が静かにドリフトしない
- **配布 (Distribution)** — Marketplace により、プライベートな設定が共有可能・発見可能な単位になる
- **標準化 (Standardization)** — 各開発者が個別に `.claude/` を組み立てるのではなく、チームが既知の良いベースラインに収束する

## 関連トピック

- [Topic: Skills & Agents](/ja/topics/skills-and-agents)
- [Topic: MCP](/ja/topics/mcp)
- [Topic: Hooks](/ja/topics/hooks)
- [機能別早見表](/ja/appendix/feature-index)
