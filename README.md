# Claude を通じて LLM を知る

> **LLM の構造的制約を理解し、「なぜそう設定するのか」を知る。**
>
> 「What（何を設定するか）」「How（どう設定するか）」はもちろん、
> **「Why（なぜその設定が必要か）」** を重視した学習リポジトリです。

## このプロジェクトの位置づけ

3つのプロジェクトが「学ぶ → 知る → 適用する」の順序で繋がります。

| フェーズ                              | プロジェクト                                                                                                              | 状態                  |
| :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------ | :-------------------- |
| **1. LLM を知る**                     | [understanding-llm-through-claude-code](https://github.com/shuji-bonji/understanding-llm-through-claude-code)             | 👈 **このリポジトリ** |
| 2. AI エージェントの設計を知る        | [ai-agent-architecture](https://github.com/shuji-bonji/ai-agent-architecture)                                             | 準備中                |
| 3. システム・サービスに AI を適用する | [Management-of-software-systems-and-services](https://github.com/shuji-bonji/Management-of-software-systems-and-services) | 準備中                |

## 目次

### Part 1: LLMの構造的制約を知る

> LLM が抱える 8 つの構造的問題。ツール非依存の理論的基盤。

- [概要：8つの構造的問題の全体像](docs/01-llm-structural-problems/index.md)
- [Context Rot — トークン増で品質劣化](docs/01-llm-structural-problems/context-rot.md)
- [Lost in the Middle — 中間部の情報喪失](docs/01-llm-structural-problems/lost-in-the-middle.md)
- [Priority Saturation — 指示過多で遵守率低下](docs/01-llm-structural-problems/priority-saturation.md)
- [Hallucination — 構造的に不可避な幻覚](docs/01-llm-structural-problems/hallucination.md)
- [Sycophancy — 正確性より同意を優先](docs/01-llm-structural-problems/sycophancy.md)
- [Knowledge Boundary — 「知らない」と言えない](docs/01-llm-structural-problems/knowledge-boundary.md)
- [Prompt Sensitivity — 表現で結果が変動](docs/01-llm-structural-problems/prompt-sensitivity.md)
- [Instruction Decay — 長会話でルール忘却](docs/01-llm-structural-problems/instruction-decay.md)

### Part 2: コンテキストウィンドウを理解する

> LLM の「思考空間」の構造。Part 3 以降の全設計判断の理論的基盤。

- [概要：LLMの「思考空間」](docs/02-context-window/index.md)
- [Token・Context・Context Window — 3つの基礎概念](docs/02-context-window/token-context-basics.md)
- [コンテキストウィンドウとは何か](docs/02-context-window/what-llm-sees.md)
- [注入タイミングの全体像](docs/02-context-window/injection-timing.md)
- [コンテキスト予算という考え方](docs/02-context-window/context-budget.md)

### Part 3: 常駐コンテキスト — CLAUDE.md

> セッション開始時に常に読み込まれる情報。→ Why: Priority Saturation / Prompt Sensitivity 対策

- [概要](docs/03-always-loaded-context/index.md)
- [CLAUDE.md の設計原理](docs/03-always-loaded-context/claude-md.md)
- [階層マージの仕組み](docs/03-always-loaded-context/hierarchy.md)
- [CLAUDE.local.md の運用](docs/03-always-loaded-context/local-md.md)

### Part 4: 条件付きコンテキスト — Rules

> 必要な時だけ注入する仕組み。→ Why: Priority Saturation / Lost in the Middle 対策

- [概要](docs/04-conditional-context/index.md)
- [.claude/rules/ の設計原理](docs/04-conditional-context/rules.md)
- [globパターン設計の実践](docs/04-conditional-context/glob-patterns.md)

### Part 5: オンデマンドコンテキスト — Skills & Agents

> 呼び出された時だけ展開される。→ Why: Context Rot / Sycophancy / Knowledge Boundary 対策

- [概要](docs/05-on-demand-context/index.md)
- [Skills の設計原理](docs/05-on-demand-context/skills.md)
- [Agents の設計原理](docs/05-on-demand-context/agents.md)
- [import vs 別プロセスの判断基準](docs/05-on-demand-context/skill-vs-agent.md)

### Part 6: ツール定義としてのコンテキスト — MCP

> ツールが消費するコンテキスト。→ Why: Context Rot / Knowledge Boundary 対策

- [概要](docs/06-tool-context/index.md)
- [MCPのコンテキストコスト](docs/06-tool-context/mcp-context-cost.md)
- [Tool Search / Deferred Loading](docs/06-tool-context/tool-search.md)

### Part 7: LLMが見ないレイヤー — Settings & Hooks

> コンテキスト外の制御。→ Why: Hallucination / Sycophancy / Instruction Decay 対策

- [概要](docs/07-runtime-layer/index.md)
- [settings.json の役割](docs/07-runtime-layer/settings-json.md)
- [Hooks のライフサイクル](docs/07-runtime-layer/hooks.md)
- [なぜLLMに見せないのか](docs/07-runtime-layer/why-not-in-context.md)

### Part 8: セッション管理と記憶の永続化

> 会話の寿命と記憶の運用。→ Why: Context Rot / Lost in the Middle / Instruction Decay 対策

- [概要](docs/08-session-management/index.md)
- [/compact と /clear の使い分け](docs/08-session-management/compact-and-clear.md)
- [なぜメモリが問題になるのか](docs/08-session-management/memory-problem.md)
- [何を覚えるか](docs/08-session-management/what-to-remember.md)
- [いつ・どう思い出すか](docs/08-session-management/when-to-recall.md)
- [ツール比較と選定基準](docs/08-session-management/tools-comparison.md)

### Part 9: 他LLMへの応用

> Claude Code 固有の知識を他ツール・他LLMに応用可能な形に昇華する。

- [概要](docs/09-cross-llm-principles/index.md)
- [構造的制約は全モデル共通](docs/09-cross-llm-principles/universal-patterns.md)
- [ツール支援がない環境での実践](docs/09-cross-llm-principles/prompt-driven-development.md)
- [Cursor / Cline / Copilot 対応表](docs/09-cross-llm-principles/cursor-cline-mapping.md)

### 付録

- [構造的問題 × Claude Code 対策マップ（詳細版）](docs/appendix/problem-countermeasure-map.md)
- [ライフサイクル × 設定マップ](docs/appendix/lifecycle-config-map.md)
- [Claude Code 設定ファイル一覧](docs/appendix/claude-code-config-reference.md)
- [FAQ — よくある質問と設計判断](docs/appendix/faq.md)
- [用語集](docs/appendix/glossary.md)

### 実践例

- [実践例の概要と本編との対応](examples/index.md)
- [Angular/NgRx プロジェクト設定例](examples/angular-ngrx/)
- [SvelteKit プロジェクト設定例](examples/svelte-kit/)
- [e-shiwake — 実プロジェクトでの設定例](https://github.com/shuji-bonji/e-shiwake/tree/main/.claude)

## 関連リンク

- [Discussion: プロジェクトの構成を考える](https://github.com/shuji-bonji/understanding-llm-through-claude-code/discussions/4)
- [Discussion: LLM が抱える構造的問題 × Claude Code の対策](https://github.com/shuji-bonji/understanding-llm-through-claude-code/discussions/5)
- [Issue: プロジェクト内容の構想](https://github.com/shuji-bonji/understanding-llm-through-claude-code/issues/2)
