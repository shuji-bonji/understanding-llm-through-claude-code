---
layout: home
hero:
  name: LLMを理解する
  text: Claude Code を通じて
  tagline: LLM の構造的制約を理解し、「なぜ」そう設計するかを学ぶ。題材は Claude Code。原則は製品を問わない。
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
    details: 全体の到達点。製品に依存しない原則を抽出し、Cursor / Cline / 汎用プロンプト設計へ応用する。
    link: /ja/11-cross-llm-principles/
  - title: "付録"
    details: 各種マップ、設定リファレンス、FAQ、Plugins、用語集。
    link: /ja/appendix/problem-countermeasure-map
---

## このサイトについて

LLM は万能ではない。Transformer 系モデルには、入力が長くなるほど品質が落ちる、中間の情報を見落とす、事実と異なる内容を生成する、といった構造的な制約がある。

本サイトは、それらの制約を理解し、プロンプトやエージェント設計に横断して使える原則を学ぶための「Why の本棚」である。

想定読者は、クラウド LLM を日常的に使う開発者である。構造的制約を理解し、自分の環境へ横断して適用したい人を対象とする。

Claude Code を主な題材とする。これは現時点で詳細かつ正確に記述できる代表例だからである。ここで扱う構造的制約と設計原則は、特定の製品に依存しない。Cursor や Cline、あるいは素のプロンプト設計においても、同じ制約が現れる。同じ考え方で対処できる。

最終的な到達点は [Part 11: 他LLMへの応用](/ja/11-cross-llm-principles/) である。Part 1〜10 では Claude Code を代表例として原理を確認する。そのうえで、製品に依存しない原則を抽出する。

## 姉妹プロジェクト

「LLM を知る → AI Agent 設計を知る → システムに適用する」を順序立てて学べる 3 つの姉妹プロジェクトがある。本サイトはそのうち「Why の本棚」にあたる。

| フェーズ | プロジェクト | 内容 |
| --- | --- | --- |
| **1. LLM を知る** | **このサイト** | LLM の構造的制約と「なぜそう設計するのか」（Why の本棚） |
| **2. AI Agent 設計を知る** | [ai-agent-architecture](https://shuji-bonji.github.io/ai-agent-architecture/ja/) | MCP・Skills・Agent の構成と実装パターン（What/How の地図） |
| **3. システムに適用する** | [Management-of-software-systems-and-services](https://github.com/shuji-bonji/Management-of-software-systems-and-services) | 準備中 — AI 時代のシステム運用 |

> [!TIP]
> Why を理解したあと、具体的な実装パターン（MCP カタログ、Skills 設計、Agent 分類、A2A プロトコルなど）を求める場合は、姉妹サイトの [ai-agent-architecture](https://shuji-bonji.github.io/ai-agent-architecture/ja/) を併読するとよい。Why と How がつながる。
