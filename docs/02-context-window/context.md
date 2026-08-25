---
title: 'Context'
description: 'Context is everything passed to an LLM for one inference. The model does not keep prior turns internally; it only reads what is in the current Context.'
---

🌐 [日本語](../ja/02-context-window/context.md)

# Context — Everything Passed in One Inference

> [!NOTE]
> **In a nutshell**: Context is all information passed to an LLM for a single inference.
> The model does not keep prior turns internally. It reads only the Context it is given.

## What Is Context?

Context is **all the text an LLM uses to generate one response**. It includes system instructions, project rules, conversation history, tool definitions, and tool results.

As a developer, you might map it as follows.

| Analogy | What Corresponds to Context |
| :-- | :-- |
| Function call | All data passed as arguments |
| HTTP request | The entire request body |
| Compilation | All source files passed to the compiler |

## Why It Matters

LLMs are **stateless**. They do not "remember" past conversations. The application repacks the full history into Context on every turn, and the model reads that pack to respond.

What you put in and what you leave out is a design choice. As history grows, Context expands. That is the physical cause of [Context Rot](../01-llm-structural-problems/context-rot.md) and [Instruction Decay](../01-llm-structural-problems/instruction-decay.md) from Part 1.

## What Can Enter Context

Using Claude Code as a representative example, one inference's Context may include the following.

```mermaid
graph TD
    subgraph CONTEXT["Context (All text passed to LLM)"]
        direction TB
        SP["System Prompt<br/>(Behavior definition)"]
        CLAUDE["CLAUDE.md<br/>(Project knowledge)"]
        RULES["Rules<br/>(Conditional rules)"]
        HISTORY["Conversation History<br/>(User input + past responses)"]
        TOOLS["MCP Tool Definitions"]
    end

    USER["User's New Input"]
    LLM_PROC(["LLM reads entire Context and generates response"])
    RESPONSE["Response"]

    USER --> CONTEXT
    CONTEXT --> LLM_PROC
    LLM_PROC --> RESPONSE

    classDef ctx fill:#fef9c3,stroke:#a16207,color:#000
    classDef process fill:#eff6ff,stroke:#1d4ed8,color:#1e40af,font-weight:bold
    classDef io fill:#f3f4f6,stroke:#374151,color:#000
    class SP,CLAUDE,RULES,HISTORY,TOOLS ctx
    class LLM_PROC process
    class USER,RESPONSE io
```

Other tools may not use the same file names. What is shared is the distinction among always-loaded information, conditionally loaded information, and history that accumulates over turns.

## What "Stateless" Means

If you know REST APIs, this is intuitive. Generating a response is like an HTTP request: **each call is independent**.

```mermaid
timeline
    title Each turn, the app passes the full history as Context
    section Turn 1
        Context : System Prompt
                : CLAUDE.md
                : User Input 1
        Output  : → Response 1
    section Turn 2
        Context : System Prompt
                : CLAUDE.md
                : User Input 1
                : Response 1
                : User Input 2
        Output  : → Response 2
    section Turn 3
        Context : System Prompt
                : CLAUDE.md
                : User Input 1
                : Response 1
                : User Input 2
                : Response 2
                : User Input 3
        Output  : → Response 3
```

The model does not remember past turns; it rereads the full history each time. As turns accumulate, Context grows.

Memory that must survive across sessions belongs outside Context—in files, for example. If it is not passed in, it does not exist for the next inference.

## Connection to Part 1

- **Context Rot**: Quality degrades as input tokens grow. Longer Context makes this more likely.
- **Instruction Decay**: Compliance with early instructions falls in long conversations. History growth acts over time.

The response pattern is shared: select what to load, cut or compress when it grows long, and persist important decisions in files.

## Before Moving On

Context is the *content*. Next, the Context Window is the *upper bound* on that content. Using the full bound is not safe.

---

> **Previous**: [Token — The LLM's Processing Unit](token.md)

> **Next**: [Context Window — Capacity and the Safe Range](context-window.md)
