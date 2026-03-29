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

## 構造的問題 × Claude Code 対策マップ

LLM には 8 つの構造的問題があり、Claude Code の各機能はそれぞれの問題に対する設計的な回答です。

| 構造的問題                                                                        | 概要                                     | 主な対策（Claude Code）                       | 対応ドキュメント   |
| :-------------------------------------------------------------------------------- | :--------------------------------------- | :-------------------------------------------- | :----------------- |
| [**Context Rot**](docs/01-llm-structural-problems/context-rot.md)                 | トークン増で出力品質が劣化               | `/compact`, `/clear`, コンテキスト予算管理    | Part 2, 3, 5, 6, 8 |
| [**Lost in the Middle**](docs/01-llm-structural-problems/lost-in-the-middle.md)   | コンテキスト中間部の情報を無視           | `/compact`（50%閾値）, 条件付きルール, Agents | Part 2, 4, 5, 8    |
| [**Priority Saturation**](docs/01-llm-structural-problems/priority-saturation.md) | 指示過多で全体の遵守率低下               | CLAUDE.md 200行制限, `.claude/rules/`, Skills | Part 3, 4, 5       |
| [**Hallucination**](docs/01-llm-structural-problems/hallucination.md)             | 事実に反する内容を生成（構造的に不可避） | Hooks（機械的検証）, テストコード, MCP        | Part 6, 7          |
| [**Sycophancy**](docs/01-llm-structural-problems/sycophancy.md)                   | ユーザーに同意し正確性を犠牲に           | Cross-model QA（Agents）, Hooks, 問い方設計   | Part 5, 7          |
| [**Knowledge Boundary**](docs/01-llm-structural-problems/knowledge-boundary.md)   | 知識外で「知らない」と言えない           | MCP外部参照, バージョン明示, 専門Agents       | Part 3, 5, 6       |
| [**Prompt Sensitivity**](docs/01-llm-structural-problems/prompt-sensitivity.md)   | 表現の違いで結果が大きく変動             | CLAUDE.md の書き方, Skills description設計    | Part 3, 5          |
| [**Instruction Decay**](docs/01-llm-structural-problems/instruction-decay.md)     | 長会話でルール忘却（7問題の複合結果）    | `/compact`, `/clear`, Hooks, セッション分割   | Part 7, 8          |

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
- [Cursor / Cline / Copilot 対応表](docs/09-cross-llm-principles/cursor-cline-mapping.md)

### 付録

- [構造的問題 × Claude Code 対策マップ（詳細版）](docs/appendix/problem-countermeasure-map.md)
- [用語集](docs/appendix/glossary.md)

### 実践例

- [Angular/NgRx プロジェクト設定例](examples/angular-ngrx/)
- [SvelteKit プロジェクト設定例](examples/svelte-kit/)

## 関連リンク

- [Discussion: プロジェクトの構成を考える](https://github.com/shuji-bonji/understanding-llm-through-claude-code/discussions/4)
- [Discussion: LLM が抱える構造的問題 × Claude Code の対策](https://github.com/shuji-bonji/understanding-llm-through-claude-code/discussions/5)
- [Issue: プロジェクト内容の構想](https://github.com/shuji-bonji/understanding-llm-through-claude-code/issues/2)
