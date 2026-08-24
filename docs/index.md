---
layout: home
hero:
  name: Understanding LLMs
  text: Through Claude Code
  tagline: Understand the structural constraints of LLMs and learn why designs look the way they do. The subject is Claude Code. The principles are not product-specific.
  actions:
    - theme: brand
      text: Start Reading
      link: /01-llm-structural-problems/
    - theme: alt
      text: View on GitHub
      link: https://github.com/shuji-bonji/understanding-llm-through-claude-code
features:
  - title: "Part 1: Structural Problems"
    details: The 8 limits LLMs cannot overcome by themselves — Context Rot, Lost in the Middle, Hallucination, and more.
    link: /01-llm-structural-problems/
  - title: "Part 2: Context Window"
    details: The LLM's thinking space — tokens, context budget, and injection timing.
    link: /02-context-window/
  - title: "Part 3: Always-Loaded Context"
    details: CLAUDE.md design, hierarchical merging, and CLAUDE.local.md.
    link: /03-always-loaded-context/
  - title: "Part 4: Conditional Context"
    details: Rules and glob patterns — context loaded only when files match.
    link: /04-conditional-context/
  - title: "Part 5: On-Demand Context"
    details: Skills and Agents — context loaded only when the LLM asks for it.
    link: /05-on-demand-context/
  - title: "Part 6: Tool Context — MCP"
    details: Tool definitions as context cost, and how Tool Search avoids it.
    link: /06-tool-context/
  - title: "Part 7: Runtime Layer"
    details: settings.json and Hooks — the layer LLMs never see.
    link: /07-runtime-layer/
  - title: "Part 8: Session Management"
    details: /compact, /clear, and what to persist across sessions.
    link: /08-session-management/
  - title: "Part 9: Code Intelligence"
    details: LSP-driven grounding for code symbols — the second pillar alongside MCP.
    link: /09-code-intelligence/
  - title: "Part 10: Multi-Session Coordination"
    details: Agent Teams as the root-cause fix for Context Rot at scale.
    link: /10-multi-session/
  - title: "Part 11: Cross-LLM Principles"
    details: The destination of the whole work. Extract product-independent principles and apply them to Cursor, Cline, and plain prompt design.
    link: /11-cross-llm-principles/
  - title: "Appendix"
    details: Maps, configuration reference, FAQ, plugins, and glossary.
    link: /appendix/problem-countermeasure-map
---

## About this site

LLMs are not omnipotent. Transformer-based models have structural constraints: quality falls as input grows, information in the middle is missed, and content that contradicts facts is generated.

This site is a "bookshelf of Why." It is for learning those constraints and the design principles that transfer across prompt and agent design.

The intended reader is a developer who uses cloud LLMs daily. The goal is to understand the constraints and apply them in one's own environment.

Claude Code is the main subject because it is a representative example that can be described in detail and accurately today. The structural constraints and design principles here do not depend on a specific product. The same constraints appear in Cursor, Cline, or plain prompt design. The same way of thinking applies.

The destination is [Part 11: Cross-LLM Principles](/11-cross-llm-principles/). Parts 1–10 confirm the principles through Claude Code as a representative example. Part 11 then extracts what does not depend on the product.

## Sister projects

Three sister projects can be read in order: "Know LLMs → Know Agent Design → Apply to Systems." This site is the "bookshelf of Why."

| Phase | Project | Focus |
| --- | --- | --- |
| **1. Know LLMs** | **This site** | LLM structural constraints and why designs look the way they do (bookshelf of Why) |
| **2. Know Agent Design** | [ai-agent-architecture](https://shuji-bonji.github.io/ai-agent-architecture/) | MCP, Skills, and Agent composition with implementation patterns (map of What/How) |
| **3. Apply to Systems** | [Management-of-software-systems-and-services](https://github.com/shuji-bonji/Management-of-software-systems-and-services) | Coming soon — system operations in the AI era |

> [!TIP]
> After the Why is clear, read the sister site [ai-agent-architecture](https://shuji-bonji.github.io/ai-agent-architecture/) for concrete implementation patterns (MCP catalog, Skills design, Agent taxonomy, A2A protocol, and so on). Why and How then connect.
