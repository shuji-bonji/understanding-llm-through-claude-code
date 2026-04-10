🌐 [日本語](README.ja.md)

# Understanding LLMs Through Claude Code

> **Understand the structural constraints of LLMs and learn "why" configurations are designed the way they are.**
>
> This learning repository emphasizes not just "What" and "How,"
> but **"Why"** — the reasoning behind each design decision.

## Project Positioning

Three projects connect in a "Learn → Understand → Apply" sequence.

| Phase                                     | Project                                                                                                                   | Status                    |
| :---------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ | :------------------------ |
| **1. Understand LLMs**                    | [understanding-llm-through-claude-code](https://github.com/shuji-bonji/understanding-llm-through-claude-code)             | 👈 **This repository** |
| 2. Understand AI Agent Architecture       | [ai-agent-architecture](https://github.com/shuji-bonji/ai-agent-architecture)                                             | In progress               |
| 3. Apply AI to Systems & Services         | [Management-of-software-systems-and-services](https://github.com/shuji-bonji/Management-of-software-systems-and-services) | In progress               |

## Table of Contents

### Part 1: Structural Constraints of LLMs

> 8 structural problems inherent to LLMs. Tool-independent theoretical foundations.

- [Overview: The 8 Structural Problems](docs/01-llm-structural-problems/index.md)
- [Context Rot — Quality Degrades as Tokens Increase](docs/01-llm-structural-problems/context-rot.md)
- [Lost in the Middle — Information Loss in the Middle](docs/01-llm-structural-problems/lost-in-the-middle.md)
- [Priority Saturation — Compliance Drops with Too Many Instructions](docs/01-llm-structural-problems/priority-saturation.md)
- [Hallucination — Structurally Unavoidable Confabulation](docs/01-llm-structural-problems/hallucination.md)
- [Sycophancy — Agreement Over Accuracy](docs/01-llm-structural-problems/sycophancy.md)
- [Knowledge Boundary — Unable to Say "I Don't Know"](docs/01-llm-structural-problems/knowledge-boundary.md)
- [Prompt Sensitivity — Results Vary by Phrasing](docs/01-llm-structural-problems/prompt-sensitivity.md)
- [Instruction Decay — Rules Forgotten in Long Conversations](docs/01-llm-structural-problems/instruction-decay.md)

### Part 2: Understanding the Context Window

> The structure of LLM's "thinking space." Theoretical foundation for all design decisions from Part 3 onward.

- [Overview: The LLM's "Thinking Space"](docs/02-context-window/index.md)
- [Token, Context, Context Window — 3 Fundamental Concepts](docs/02-context-window/token-context-basics.md)
- [What the Context Window Really Is](docs/02-context-window/what-llm-sees.md)
- [Injection Timing Overview](docs/02-context-window/injection-timing.md)
- [The Context Budget Concept](docs/02-context-window/context-budget.md)

### Part 3: Always-Loaded Context — CLAUDE.md

> Information loaded at session start. → Why: Priority Saturation / Prompt Sensitivity countermeasures

- [Overview](docs/03-always-loaded-context/index.md)
- [CLAUDE.md Design Principles](docs/03-always-loaded-context/claude-md.md)
- [Hierarchical Merging](docs/03-always-loaded-context/hierarchy.md)
- [CLAUDE.local.md Operations](docs/03-always-loaded-context/local-md.md)

### Part 4: Conditional Context — Rules

> Injected only when needed. → Why: Priority Saturation / Lost in the Middle countermeasures

- [Overview](docs/04-conditional-context/index.md)
- [.claude/rules/ Design Principles](docs/04-conditional-context/rules.md)
- [Glob Pattern Design in Practice](docs/04-conditional-context/glob-patterns.md)

### Part 5: On-Demand Context — Skills & Agents

> Expanded only when invoked. → Why: Context Rot / Sycophancy / Knowledge Boundary countermeasures

- [Overview](docs/05-on-demand-context/index.md)
- [Skills Design Principles](docs/05-on-demand-context/skills.md)
- [Agents Design Principles](docs/05-on-demand-context/agents.md)
- [Import vs Separate Process Decision Criteria](docs/05-on-demand-context/skill-vs-agent.md)

### Part 6: Tool Definition as Context — MCP

> Context consumed by tools. → Why: Context Rot / Knowledge Boundary countermeasures

- [Overview](docs/06-tool-context/index.md)
- [MCP Context Cost](docs/06-tool-context/mcp-context-cost.md)
- [Tool Search / Deferred Loading](docs/06-tool-context/tool-search.md)

### Part 7: The Layer LLMs Don't See — Settings & Hooks

> Control outside the context. → Why: Hallucination / Sycophancy / Instruction Decay countermeasures

- [Overview](docs/07-runtime-layer/index.md)
- [The Role of settings.json](docs/07-runtime-layer/settings-json.md)
- [Hooks Lifecycle](docs/07-runtime-layer/hooks.md)
- [Why Keep It Out of Context](docs/07-runtime-layer/why-not-in-context.md)

### Part 8: Session Management and Memory Persistence

> Conversation lifespan and memory operations. → Why: Context Rot / Lost in the Middle / Instruction Decay countermeasures

- [Overview](docs/08-session-management/index.md)
- [/compact vs /clear](docs/08-session-management/compact-and-clear.md)
- [Why Memory Becomes a Problem](docs/08-session-management/memory-problem.md)
- [What to Remember](docs/08-session-management/what-to-remember.md)
- [When and How to Recall](docs/08-session-management/when-to-recall.md)
- [Tool Comparison and Selection Criteria](docs/08-session-management/tools-comparison.md)

### Part 9: Applying to Other LLMs

> Elevating Claude Code-specific knowledge into universally applicable principles.

- [Overview](docs/09-cross-llm-principles/index.md)
- [Structural Constraints Are Universal](docs/09-cross-llm-principles/universal-patterns.md)
- [Practice Without Tool Support](docs/09-cross-llm-principles/prompt-driven-development.md)
- [Cursor / Cline / Copilot Mapping](docs/09-cross-llm-principles/cursor-cline-mapping.md)

### Appendix

- [Structural Problems × Claude Code Countermeasures Map (Detailed)](docs/appendix/problem-countermeasure-map.md)
- [Lifecycle × Configuration Map](docs/appendix/lifecycle-config-map.md)
- [Claude Code Configuration Reference](docs/appendix/claude-code-config-reference.md)
- [FAQ — Frequently Asked Questions and Design Decisions](docs/appendix/faq.md)
- [Glossary](docs/appendix/glossary.md)

### Practical Examples

- [Examples Overview and Part Mapping](examples/index.md)
- [Angular/NgRx Project Configuration](examples/angular-ngrx/)
- [SvelteKit Project Configuration](examples/svelte-kit/)
- [e-shiwake — Real Project Configuration](https://github.com/shuji-bonji/e-shiwake/tree/main/.claude)

## Related Links

- [Discussion: Project Structure](https://github.com/shuji-bonji/understanding-llm-through-claude-code/discussions/4)
- [Discussion: LLM Structural Problems × Claude Code Countermeasures](https://github.com/shuji-bonji/understanding-llm-through-claude-code/discussions/5)
- [Issue: Project Concept](https://github.com/shuji-bonji/understanding-llm-through-claude-code/issues/2)
