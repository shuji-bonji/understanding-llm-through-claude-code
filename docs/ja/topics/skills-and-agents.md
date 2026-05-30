# Skills & Agents — オンデマンドコンテキスト

🌐 [English](/topics/skills-and-agents)

> [!NOTE]
> Skills と Agents は、LLM（またはユーザー）が明示的に呼び出した時だけ読み込まれる。サイズが大きい・専門性が高い・たまにしか使わない、そういう指示の置き場所として最適。

## 仕組み

- **Skills**: LLM が名前で呼び出せる宣言的な「能力パケット」(`skill: "pdf"`)
- **Agents**: 焦点を絞ったタスクを別コンテキストで実行し結果だけ返す
- どちらも**起動するまで本体はメインコンテキストに乗らない**

## 関連する章

- [Part 5 — オンデマンドコンテキスト（概要）](/ja/05-on-demand-context/)
- [Skills の設計原則](/ja/05-on-demand-context/skills)
- [Agents の設計原則](/ja/05-on-demand-context/agents)
- [Skills vs Agents 判断基準](/ja/05-on-demand-context/skill-vs-agent)
- [Claude Code 設定リファレンス](/ja/appendix/claude-code-config-reference)

## 関連する構造的問題

- [Context Rot](/ja/01-llm-structural-problems/context-rot) — 専門知識を必要時まで外に置ける
- [Knowledge Boundary](/ja/01-llm-structural-problems/knowledge-boundary) — Skills で最新の手順知識を注入
- [Hallucination](/ja/01-llm-structural-problems/hallucination) — Agents によりリスクの高い推論を別コンテキストに隔離

## 単発の Agent では足りなくなったら

単発委譲なら Agent（サブエージェント）が正しいプリミティブ。だが作業が**複数セッションを跨いで生存する必要がある**、**子同士が話す必要がある**、**親のコンテキストがサマリで埋まる**といった状況になったら、次のステップは [Agent Teams](/ja/topics/agent-teams) — Part 10 で扱うピアツーピアの永続セッション群。

## 関連トピック

- [Topic: CLAUDE.md](/ja/topics/claude-md) — 常駐させたい場合
- [Topic: Rules](/ja/topics/rules) — ファイルマッチで読み込みたい場合
- [Topic: MCP](/ja/topics/mcp) — ツール経由で外部情報を取り込みたい場合
- [Topic: Agent Teams](/ja/topics/agent-teams) — 単発 Subagent では足りないマルチセッション協調
- [機能別早見表](/ja/appendix/feature-index)
