🌐 [日本語](../ja/02-context-window/what-llm-sees.md)

# What Is the Context Window? — What the LLM "Sees"

> [!NOTE]
> In the [previous page](chat-session.md), we learned the concepts of Chat / Session.
> On this page, we examine the overall structure of **what Claude Code specifically places inside the Context Window**.

## The LLM's Thinking Space

For an LLM, the context window is "everything in the world." Information outside the window simply does not exist.

In Claude Code, the following are all placed within this Context Window:

## Context Window Structure

| Element                    | Injection Timing              | Description                                                |
| :------------------------- | :---------------------------- | :--------------------------------------------------------- |
| **System Prompt**          | Always (at session start)     | Claude Code's internal system prompt. Users cannot modify  |
| **CLAUDE.md**              | Always (at session start)     | Project knowledge and conventions. Hierarchically merged. Recommended under 200 lines |
| **Rules** (`.claude/rules/`)   | Conditional (on glob match)   | Injected only when file patterns match                     |
| **Skills** (`.claude/skills/`) | On-demand                     | LLM decides, or user invokes with `/`                      |
| **MCP Tools** (`.mcp.json`)    | Always (as tool definitions)  | Performance degrades over 20K tokens                       |
| **Conversation History**   | Always (accumulates per turn) | User-LLM dialogue log. Compressible with `/compact`        |

> [!WARNING]
> **Elements Outside Context**: `settings.json` and `Hooks` are **not** in the LLM's context window. These are processed by Claude Code's "runtime" (the Node.js equivalent), and do not directly affect the LLM's "thinking."

## Difference Between "In Context" and "Outside Context"

```mermaid
graph TB
    subgraph OutsideContext["Outside Context (LLM cannot see)"]
      direction LR
        ST[settings.json]
        HK[Hooks]
    end
    subgraph ContextWindow["Context Window"]
      direction TB
        SP[System Prompt<br/>(Private, Always)]
        CM[CLAUDE.md<br/>(Always, Hierarchically merged)]
        RL[Rules<br/>(Conditional)]
        SK[Skills<br/>(On-demand)]
        MCP[MCP Tools<br/>(Tool definitions)]
        CH[Conversation History<br/>(Accumulates per turn)]
    end
```

| Category               | Target                                      | Impact on LLM                              |
| :--------------------- | :------------------------------------------- | :----------------------------------------- |
| **Within Context**      | CLAUDE.md, Rules, Skills, MCP, Conversation History | LLM directly "reads" and uses for decisions |
| **Outside Context**     | settings.json, Hooks                        | LLM is unaware. Runtime handles it        |

Understanding this distinction is key to grasping the design decisions in Parts 3–7.

## Connection to Structural Problems

The structural problems we learned in Part 1 all stem from constraints of this context window:

- **Context Rot**: Quality degrades as context fills up
- **Lost in the Middle**: Attention to middle sections of context decreases
- **Priority Saturation**: Compliance with instructions decreases as instructions within context increase

---

> **Previous**: [Chat / Session](chat-session.md)

> **Next**: [Injection Timing Overview](injection-timing.md)
