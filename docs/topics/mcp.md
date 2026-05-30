# MCP — Tool context

🌐 [日本語](/ja/topics/mcp)

> [!NOTE]
> Model Context Protocol (MCP) servers expose external services as tools the LLM can call. Tool definitions themselves consume context — design and discovery matters.

## How it works

- Every connected MCP tool ships its **name, description, and schema** into context.
- Tool Search (deferred tools) lets the LLM fetch a tool's schema **only when needed**, keeping the default context lean.
- MCP is the primary path for *grounding* — pulling fresh facts from authoritative sources.

## Related chapters

- [Part 6 — Tool Context (overview)](/06-tool-context/)
- [MCP Context Cost](/06-tool-context/mcp-context-cost)
- [Tool Search](/06-tool-context/tool-search)
- [Configuration Reference](/appendix/claude-code-config-reference)

## Structural problems it addresses

- [Hallucination](/01-llm-structural-problems/hallucination) — MCP grounds answers in real data.
- [Knowledge Boundary](/01-llm-structural-problems/knowledge-boundary) — bypass the training cutoff with live tools.
- [Context Rot](/01-llm-structural-problems/context-rot) — too many tool schemas defeats the purpose; Tool Search fixes this.

## See also

- [Topic: Skills & Agents](/topics/skills-and-agents) — for self-contained capabilities (vs. external services).
- [Topic: Plugins](/topics/plugins) — for distributing bundles that include MCP servers.
- [Feature Index](/appendix/feature-index)
