🌐 [日本語](../ja/06-tool-context/index.md)

# Part 6: Context as Tool Definitions — MCP

> [!NOTE]
> Context consumed by tools.
> As more MCP servers are connected, the context available for actual work decreases.
> MCP is both a representative example in Claude Code and an open way to connect external tools. That tool definitions are a fixed cost on Context is not product-specific.

## Why This Matters

When you connect an MCP server, tool definitions (name, parameter schema, description) are injected into the context window **every turn**. When multiple MCPs are connected, tool definitions alone can consume 20K+ tokens, drastically reducing the context available for actual work.

## → Why: Which Structural Problems Does This Address?

- **Context Rot**: The constant consumption of tool definitions puts pressure on context
- **Knowledge Boundary**: External knowledge retrieval via MCP reduces dependency on the LLM's internal knowledge

> [!TIP]
> MCP grounds the LLM in **external-world facts** (APIs, databases, wikis). For **code-world facts** (symbols, types, references in the repository), see [Part 9: Code Intelligence](../09-code-intelligence/index.md). Together they form the two pillars of factual grounding.

## Documentation in This Part

| Document | Content |
|:--|:--|
| [MCP Context Cost](mcp-context-cost.md) | The reality of how many tokens tool definitions consume |
| [Tool Search / Deferred Loading](tool-search.md) | Lazy loading automatically enabled above 10% |

---

> **Previous**: [Part 5: On-Demand Context](../05-on-demand-context/index.md)

> **Next**: [Part 7: The Layer LLMs Don't See](../07-runtime-layer/index.md)
