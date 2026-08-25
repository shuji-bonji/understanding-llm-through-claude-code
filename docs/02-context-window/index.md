---
title: "Part 2: Understanding the Context Window"
description: "Define Token, Context, and Context Window separately. Understand the structure of the LLM's thinking space and why quality degrades with input length."
---

🌐 [日本語](../ja/02-context-window/index.md)

# Part 2: Understanding the Context Window

> [!NOTE]
> Learn the structure of the LLM's "thinking space."
> The physical basis for *why* the structural problems in Part 1 occur is here.
> Window constraints are not product-specific. Claude Code is used as a concrete example of injection.

## Three Concepts to Fix First

Token, Context, and Context Window are prerequisites for every later design decision. Each is defined on its own page.

| Document | Content |
| :-- | :-- |
| [Token](token.md) | The LLM's processing unit—neither character nor word |
| [Context](context.md) | Everything passed in one inference; history is resent each turn |
| [Context Window](context-window.md) | The ceiling, and the fact that the safe range is smaller |
| [How the three relate](token-context-basics.md) | Relationship diagram for unit, content, and ceiling |

## What You'll Learn in This Part

| Document | Content |
| :-- | :-- |
| [Chat / Session](chat-session.md) | Why Context grows over time |
| [What the LLM "Sees"](what-llm-sees.md) | The view inside the window |
| [Injection Timing](injection-timing.md) | When each setting enters Context |
| [Context Budget](context-budget.md) | How to allocate finite tokens |

## Why This Sits Between Part 1 and Part 3

Part 1 shows *what* goes wrong. Part 2 shows *the structure of the thinking space*. Part 3 onward shows *where to put controls*.

Copying settings without knowing runtime constraints hides why those limits exist. This Part is that physical layer.

---

> **Previous**: [Part 1: Understanding LLM Structural Constraints](../01-llm-structural-problems/index.md)

> **Next**: [Token — The LLM's Processing Unit](token.md)
