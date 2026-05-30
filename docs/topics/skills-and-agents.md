# Skills & Agents — On-demand context

🌐 [日本語](/ja/topics/skills-and-agents)

> [!NOTE]
> Skills and Agents are loaded only when the LLM (or the user) explicitly invokes them. They are the right home for instructions that are large, specialized, or only occasionally relevant.

## How it works

- **Skills**: declarative capability packets the LLM can call by name (`skill: "pdf"`).
- **Agents**: separate execution contexts that run a focused task and return a result.
- Both keep their bodies *out* of the main context until activation.

## Related chapters

- [Part 5 — On-Demand Context (overview)](/05-on-demand-context/)
- [Skills Design](/05-on-demand-context/skills)
- [Agents Design](/05-on-demand-context/agents)
- [Skills vs Agents — decision criteria](/05-on-demand-context/skill-vs-agent)
- [Configuration Reference](/appendix/claude-code-config-reference)

## Structural problems it addresses

- [Context Rot](/01-llm-structural-problems/context-rot) — specialized knowledge stays out of context until needed.
- [Knowledge Boundary](/01-llm-structural-problems/knowledge-boundary) — Skills inject up-to-date procedural knowledge.
- [Hallucination](/01-llm-structural-problems/hallucination) — Agents isolate risky reasoning into a fresh context.

## When a single Agent isn't enough

For a one-shot delegation, an Agent (sub-agent) is the right primitive. When the work needs to **survive across many sessions**, **let children talk to each other**, or **avoid filling the parent's context with summaries**, the next step is [Agent Teams](/topics/agent-teams) — peer-to-peer, persistent sessions covered in Part 10.

## See also

- [Topic: CLAUDE.md](/topics/claude-md) — for always-loaded context.
- [Topic: Rules](/topics/rules) — for context triggered by file globs.
- [Topic: MCP](/topics/mcp) — for tool-based external context.
- [Topic: Agent Teams](/topics/agent-teams) — multi-session coordination when one Subagent isn't enough.
- [Feature Index](/appendix/feature-index)
