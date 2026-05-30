# MCP — ツールコンテキスト

🌐 [English](/topics/mcp)

> [!NOTE]
> Model Context Protocol (MCP) サーバは、外部サービスを LLM が呼び出せるツールとして公開する。**ツール定義そのものがコンテキストを消費する**ため、設計とディスカバリの仕組みが重要。

## 仕組み

- 接続中の MCP ツールは**名前・説明・スキーマ**を毎回コンテキストに同梱する
- Tool Search（遅延ツール）により、**必要時だけスキーマを取得**できるため初期コンテキストを軽く保てる
- MCP は「**接地 (grounding)**」の主要経路 — 一次情報源から最新の事実を取得する

## 関連する章

- [Part 6 — ツールコンテキスト（概要）](/ja/06-tool-context/)
- [MCP のコンテキストコスト](/ja/06-tool-context/mcp-context-cost)
- [Tool Search](/ja/06-tool-context/tool-search)
- [Claude Code 設定リファレンス](/ja/appendix/claude-code-config-reference)

## 関連する構造的問題

- [Hallucination](/ja/01-llm-structural-problems/hallucination) — MCP が回答を実データに接地する
- [Knowledge Boundary](/ja/01-llm-structural-problems/knowledge-boundary) — 学習カットオフをツール経由で越える
- [Context Rot](/ja/01-llm-structural-problems/context-rot) — ツールスキーマの詰め込みすぎは逆効果、Tool Search で解決

## 関連トピック

- [Topic: Skills & Agents](/ja/topics/skills-and-agents) — 外部サービスではなく自己完結的な能力
- [Topic: Plugins](/ja/topics/plugins) — MCP サーバを含むバンドル配布
- [機能別早見表](/ja/appendix/feature-index)
