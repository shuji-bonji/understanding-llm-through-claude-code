🌐 [日本語](../ja/03-always-loaded-context/index.md)

# Part 3: Always-Loaded Context — CLAUDE.md

> [!NOTE]
> Information that is always loaded when a session begins.
> This is a "fixed cost" in your context budget and requires the most careful management.

## Why It Matters

CLAUDE.md is information that the LLM **reads every turn**. This means everything you write here consumes your context budget continuously. Write too much and you trigger Priority Saturation; write too little and the LLM generates code without knowing important constraints.

## → Why: Which Structural Problems Does It Address?

> [!IMPORTANT]
> - **Priority Saturation**: The 200-line limit is designed to keep the number of simultaneously active instructions below the degradation threshold.
> - **Prompt Sensitivity**: Concrete, directive language reduces result variance caused by ambiguous phrasing.
> - **Context Rot**: Hierarchical merging and scope separation prevent the accumulation of unnecessary information.

## Documents in This Section

| Document | Content |
|:--|:--|
| [Design Principles of CLAUDE.md](claude-md.md) | What to write and why 200 lines |
| [How Hierarchical Merging Works](hierarchy.md) | Global → Project → Local → Subdirectory |
| [Operating CLAUDE.local.md](local-md.md) | Personal configuration outside Git |

---

> **Previous**: [Part 2: Understanding the Context Window](../02-context-window/index.md)
> **Next**: [Part 4: Conditional Context](../04-conditional-context/index.md)
