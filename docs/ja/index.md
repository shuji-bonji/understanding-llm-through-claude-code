---
layout: home
hero:
  name: LLMを理解する
  text: Claude Code を通じて
  tagline: LLMの構造的制約を理解し、設定が「なぜ」そのように設計されているかを学ぶ
  actions:
    - theme: brand
      text: 読み始める
      link: /ja/01-llm-structural-problems/
    - theme: alt
      text: GitHub で見る
      link: https://github.com/shuji-bonji/understanding-llm-through-claude-code
features:
  - title: "Part 1: 構造的問題"
    details: LLMが自力で乗り越えられない8つの限界 — Context Rot、Lost in the Middle、Hallucination ほか。
    link: /ja/01-llm-structural-problems/
  - title: "Part 2: コンテキストウィンドウ"
    details: LLMの「思考空間」— トークン、コンテキストバジェット、注入タイミング。
    link: /ja/02-context-window/
  - title: "Part 3: 常駐コンテキスト"
    details: CLAUDE.md の設計原則、階層マージ、CLAUDE.local.md の運用。
    link: /ja/03-always-loaded-context/
  - title: "Part 4: 条件付きコンテキスト"
    details: Rules と Glob パターン — ファイルがマッチした時だけ読み込まれる文脈。
    link: /ja/04-conditional-context/
  - title: "Part 5: オンデマンドコンテキスト"
    details: Skills と Agents — LLMが要求した時だけ読み込まれる文脈。
    link: /ja/05-on-demand-context/
  - title: "Part 6: ツールコンテキスト — MCP"
    details: ツール定義のコンテキストコストと、Tool Search による回避策。
    link: /ja/06-tool-context/
  - title: "Part 7: ランタイムレイヤー"
    details: settings.json と Hooks — LLMが見ない層。
    link: /ja/07-runtime-layer/
  - title: "Part 8: セッション管理"
    details: /compact、/clear、セッション間で何を永続化すべきか。
    link: /ja/08-session-management/
  - title: "Part 9: Code Intelligence"
    details: LSP によるコードシンボルへの接地 — MCP と並ぶ「事実への接地」の第二の柱。
    link: /ja/09-code-intelligence/
  - title: "Part 10: マルチセッション協調"
    details: Agent Teams によるスケール時の Context Rot 根本対策。
    link: /ja/10-multi-session/
  - title: "Part 11: 他LLMへの応用"
    details: Cursor、Cline、Copilot にも適用できる普遍的パターン。
    link: /ja/11-cross-llm-principles/
  - title: "付録"
    details: 各種マップ、設定リファレンス、FAQ、Plugins、用語集。
    link: /ja/appendix/problem-countermeasure-map
---

## 📚 姉妹プロジェクト

「LLM を知る → AI Agent 設計を知る → システムに適用する」を順序立てて学べる 3 つの姉妹プロジェクトです。

| フェーズ | プロジェクト | 内容 |
| --- | --- | --- |
| **1. LLM を知る** | 👈 **このサイト** | LLM の構造的制約と「なぜそう設計するのか」（Why の本棚） |
| **2. AI Agent 設計を知る** | [ai-agent-architecture](https://shuji-bonji.github.io/ai-agent-architecture/ja/) | MCP・Skills・Agent の構成と実装パターン（What/How の地図） |
| **3. システムに適用する** | [Management-of-software-systems-and-services](https://github.com/shuji-bonji/Management-of-software-systems-and-services) | _準備中_ — AI 時代のシステム運用 |

> [!TIP]
> **このサイトで Why を理解した方へ** — 具体的な実装パターン（MCP カタログ、Skills 設計、Agent 分類、A2A プロトコル等）を求める場合は、姉妹サイトの [ai-agent-architecture](https://shuji-bonji.github.io/ai-agent-architecture/ja/) を併読すると、Why と How が繋がります。
