🌐 [日本語](../ja/06-tool-context/tool-search.md)

# Tool Search / Deferred Loading

> [!NOTE]
> A lazy loading mechanism that automatically activates when MCP tool definitions exceed 10% of context.

## What is Tool Search?

A feature introduced in Claude Code v2.1.7+. When MCP tool definitions exceed 10% of context, the system automatically switches to "Tool Search" mode.

## How It Works

```mermaid
flowchart TD
    START["Session Start"]
    CHECK{"MCP Tool Definitions<br>Exceed 10% of Context?"}
    FULL["Preload All Definitions<br>(consumed every turn)"]
    INDEX["Load Tool Name + Brief Description Only<br>(lightweight index)"]
    USE["When Tool Is Used<br>Load Full Definition On-Demand"]

    START --> CHECK
    CHECK -->|"No"| FULL
    CHECK -->|"Yes (Tool Search Enabled)"| INDEX
    INDEX --> USE

    style CHECK fill:#eff6ff,stroke:#1d4ed8,color:#000
    style FULL fill:#fee2e2,stroke:#b91c1c,color:#000
    style INDEX fill:#dcfce7,stroke:#15803d,color:#000
    style USE fill:#dcfce7,stroke:#15803d,color:#000
```

## Impact on Context Budget

Tool Search reduces constant consumption even when many MCPs are connected. However, there is search overhead, so it's best to minimize the number of frequently-used tools.

## Tool Search as Context Rot Mitigation

Tool Search addresses the "Attention Dilution" mechanism of Context Rot:

- When all tool definitions are in context, attention to individual tools gets diluted
- Loading only needed tools maintains attention concentration

---

> **Previous**: [MCP Context Cost](mcp-context-cost.md)

> **Part 6 Complete → Next**: [Part 7: The Layer LLMs Don't See](../07-runtime-layer/index.md)
