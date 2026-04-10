🌐 [日本語](../ja/02-context-window/index.md)

# Part 2: Understanding Context Window

> [!NOTE]
> Learn the structure of the LLM's "thinking space."
> The physical foundation for "why" the structural problems you learned in Part 1 occur lies here.
> All design decisions from Part 3 onward are based on the constraints of this context window.

## What is Context Window?

An LLM thinks within a single "context window." For Claude, this is typically 200K to 1M tokens (depending on model generation). All configuration files in Claude Code are mechanisms to control "when, what, and how much" to inject into this window.

## What You'll Learn in This Part

| Document | Content |
|:--|:--|
| [Token・Context・Context Window](token-context-basics.md) | Three foundational concepts. Prerequisites for understanding this entire repository |
| [Chat / Session](chat-session.md) | The "temporal container" where context accumulates. Physical explanation for why context grows |
| [What is Context Window](what-llm-sees.md) | The complete picture of what the LLM "sees" |
| [Injection Timing Overview](injection-timing.md) | When and how each configuration file enters the context |
| [Context Budget as a Strategy](context-budget.md) | How to allocate finite tokens strategically |

## Why It's Between Part 1 and Part 3

In Part 1, you learn "LLMs have these problems." In Part 2, you understand "the LLM's thinking space has this structure." Then in Part 3 onward, you proceed to "therefore, configure it this way."

This follows the same order as understanding the Node.js runtime before writing TypeScript. Without knowing the runtime's constraints, you can't understand why code doesn't work.

---

> **Previous**: [Part 1: Understanding LLM Structural Constraints](../01-llm-structural-problems/index.md)
> **Next**: [Part 3: Always-Loaded Context](../03-always-loaded-context/index.md)
