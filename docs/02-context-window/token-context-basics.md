🌐 [日本語](../ja/02-context-window/token-context-basics.md)

# Token, Context, and Context Window — Three Foundational Concepts

> [!NOTE]
> This page is the starting point for Part 2 and serves as prerequisite knowledge for the entire repository.
> Neither the structural problems in Part 1 nor the design decisions from Part 3 onward will make sense without understanding these three concepts.

## Token — The "Character" Unit of LLMs

### What Is a Token?

LLMs don't process text by individual characters or even words. Instead, they use their own unit called a **Token**.

```
Input text:    "Claude Code でコードを書く"
               ↓ tokenizer splits it
Token stream:  ["Claude", " Code", " で", "コード", "を", "書", "く"]
```

In English, roughly "1 word ≈ 1–1.3 tokens," while in Japanese "1 character ≈ 1–3 tokens." The same content consumes more tokens in Japanese.

### Why Tokens?

The internal machinery of an LLM is built on **arithmetic with numerical vectors**. Since text cannot be processed directly, it must be converted: text → token (integer ID) → vector.

```mermaid
graph LR
    TEXT["Text<br/>『Writing Code』"]
    TOKENIZER(["Tokenizer"])
    TOKENS["Token Stream<br/>[15234, 835, 9021]"]
    VECTORS["Vector Sequence<br/>[[0.12, -0.34, ...], ...]"]
    LLM(["LLM (Transformer)"])
    OUTPUT["Output Token"]

    TEXT --> TOKENIZER
    TOKENIZER --> TOKENS
    TOKENS --> VECTORS
    VECTORS --> LLM
    LLM --> OUTPUT

    classDef process fill:#eff6ff,stroke:#1d4ed8,color:#1e40af,font-weight:bold
    classDef data fill:#f3f4f6,stroke:#374151,color:#000
    class TOKENIZER,LLM process
    class TEXT,TOKENS,VECTORS,OUTPUT data
```

The token unit threads through this entire pipeline. That's why every capability and constraint of an LLM is discussed in token terms.

### Getting a Feel for Tokens

| Reference                        | Token Count                    |
| :------------------------------- | :------------------------------ |
| 1 English word                   | ~1 token                        |
| 1 Japanese character             | ~1–3 tokens                     |
| This README.md (~135 lines)       | ~2,000 tokens                   |
| A typical source file (200 lines) | ~1,000–3,000 tokens             |
| Claude's 200K context            | ~2 books in English / ~1 book in Japanese |

> [!TIP]
> **Developer analogy**: A token is like a byte in memory. It's the smallest unit that the CPU (LLM) processes, and the memory capacity (context window) is measured in bytes (tokens).

## Context — All "Information" Passed to an LLM

### What Is Context?

Context is **all the text that an LLM reads to generate a single response**.

As a developer, you might think of it this way:

| Analogy          | What Corresponds to Context     |
| :--------------- | :------------------------------ |
| Function call    | All data passed as arguments    |
| HTTP request     | The entire request body         |
| Compilation      | All source files passed to compiler |

LLMs are stateless. They don't "remember" past conversations; instead, **each time, the entire conversation history is passed as Context, and the LLM reads it to generate a response**.

```mermaid
graph TD
    subgraph CONTEXT["Context (All text passed to LLM)"]
        direction TB
        SP["System Prompt<br/>(Defines LLM behavior)"]
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

### What "Stateless" Means

If you're familiar with REST APIs, this should be intuitive. LLM response generation works like an HTTP request: **each invocation is independent**.

```mermaid
block-beta
  columns 4

  block:all:5
    columns 8

    t1["Turn 1"]:8
    sp1["System Prompt"] cm1["CLAUDE.md"] u1["User Input 1"] r1<["→ Response 1"]>(right) space:4

    space:8

    t2["Turn 2"]:8
    sp2["System Prompt"] cm2["CLAUDE.md"] u2a["User Input 1"] a1["Response 1"] u2b["User Input 2"] r2<["→ Response 2"]>(right) space:2

    space:8

    t3["Turn 3"]:8
    sp3["System Prompt"] cm3["CLAUDE.md"] u3a["User Input 1"] a2["Response 1"] u3b["User Input 2"] a3["Response 2"] u3c["User Input 3"] r3<["→ Response 3"]>(right)
  end

  style t1 fill:#e5e7eb,stroke:none,color:#000
  style t2 fill:#e5e7eb,stroke:none,color:#000
  style t3 fill:#e5e7eb,stroke:none,color:#000

  style r1 fill:#e5e7eb,stroke:none,color:#000
  style r2 fill:#e5e7eb,stroke:none,color:#000
  style r3 fill:#e5e7eb,stroke:none,color:#000

  style sp1 fill:#eff6ff,stroke:#1d4ed8,color:#000
  style sp2 fill:#eff6ff,stroke:#1d4ed8,color:#000
  style sp3 fill:#eff6ff,stroke:#1d4ed8,color:#000

  style cm1 fill:#dcfce7,stroke:#15803d,color:#000
  style cm2 fill:#dcfce7,stroke:#15803d,color:#000
  style cm3 fill:#dcfce7,stroke:#15803d,color:#000

  style u1 fill:#fef9c3,stroke:#a16207,color:#000
  style u2a fill:#fef9c3,stroke:#a16207,color:#000
  style u2b fill:#fef9c3,stroke:#a16207,color:#000
  style u3a fill:#fef9c3,stroke:#a16207,color:#000
  style u3b fill:#fef9c3,stroke:#a16207,color:#000
  style u3c fill:#fef9c3,stroke:#a16207,color:#000

  style a1 fill:#f3e8ff,stroke:#7c3aed,color:#000
  style a2 fill:#f3e8ff,stroke:#7c3aed,color:#000
  style a3 fill:#f3e8ff,stroke:#7c3aed,color:#000
```

The LLM doesn't "remember" past conversations; it "reads" the entire history on each turn. As turns progress, the Context grows. This is the physical cause of the **Context Rot** and **Instruction Decay** we learned in Part 1.

## Context Window — The Finite "Thinking Space"

### What Is a Context Window?

A Context Window is **the maximum size of Context that an LLM can process at one time**.

| Model                        | Context Window Size         |
| :--------------------------- | :--------------------------- |
| Claude Sonnet 4.6 / Opus 4.6 | 1M tokens (200K+ at standard rate) |
| Claude Sonnet 4 / Opus 4     | 200K tokens                 |
| GPT-4o                       | 128K tokens                 |
| Gemini 2.5 Pro               | 1M tokens                   |

> [!TIP]
> **Developer analogy**: A context window is like the memory space allocated to a process. Just as exceeding this space causes OOM (Out of Memory), exceeding the context window results in tokens being truncated.

### "Bigger Isn't Safer"

This is the most crucial point and where the structural problems from Part 1 connect.

```mermaid
graph TD
    CW["Context Window<br/>200K–1M tokens"]

    SAFE["Effectively Safe Range<br/>~50K tokens"]
    DANGER["Range Where Degradation Progresses<br/>50K and Beyond"]

    CW --> SAFE
    CW --> DANGER

    CR["Context Rot<br/>Quality degradation with token growth"]
    LM["Lost in the Middle<br/>Information loss at middle positions"]
    PS["Priority Saturation<br/>Saturation at ~3,000 token instructions"]

    DANGER -->|"Emerges beyond 50K"| CR
    DANGER -->|"U-shaped collapse beyond 50%"| LM
    SAFE -->|"When instruction volume exceeds threshold"| PS

    classDef window fill:#eff6ff,stroke:#1d4ed8,color:#000,font-weight:bold
    classDef safe fill:#dcfce7,stroke:#15803d,color:#000
    classDef danger fill:#fee2e2,stroke:#b91c1c,color:#000
    classDef problem fill:#fef9c3,stroke:#a16207,color:#000
    class CW window
    class SAFE safe
    class DANGER danger
    class CR,LM,PS problem
```

A context window should not be thought of as "usable up to full capacity," but rather "of the available capacity, only a portion can maintain quality." This principle holds regardless of whether the window is expanded to 1M tokens. We'll cover the quantitative details in [Context Budget](context-budget.md).

## The Relationship Between the Three Concepts

```mermaid
graph LR
    TOKEN["Token<br/>Smallest processing unit of LLM"]
    CONTEXT["Context<br/>All text passed to LLM<br/>(Collection of tokens)"]
    CW["Context Window<br/>Maximum size of Context<br/>(Limited by token count)"]

    TOKEN -->|"Grouped together to form"| CONTEXT
    CONTEXT -->|"Size is limited by"| CW
    CW -->|"Measured in units of"| TOKEN

    classDef concept fill:#eff6ff,stroke:#1d4ed8,color:#000,font-weight:bold
    class TOKEN,CONTEXT,CW concept
```

| Concept            | In One Word      | Developer Analogy     |
| :----------------- | :--------------- | :-------------------- |
| **Token**          | LLM's processing unit | Memory bytes         |
| **Context**        | All input to LLM | HTTP request body     |
| **Context Window** | Input size limit | Process memory space  |

## All Claude Code Design Is Based on Context Window Constraints

Every Claude Code feature you'll learn in Part 3 and beyond is a mechanism to **use the context window efficiently**.

| Claude Code Feature | Context Window Strategy                 |
| :------------------ | :--------------------------------------- |
| CLAUDE.md 200-line limit | Keep resident Context to a minimum  |
| `.claude/rules/`    | Inject Context only on glob match        |
| Skills              | Consume Context only on user call or LLM decision |
| Agents              | Run in a separate context window         |
| `/compact`          | Compress Context to recover space        |
| `/clear`            | Reset Context                            |
| Hooks               | Consume zero Context                     |

The next page explores the full picture of **what, when, and how** enters the context window.

---

> **Next**: [Chat / Session — "Container of Time" Where Context Accumulates](chat-session.md)

> **Previous**: [Part 1: Structural Problems](../01-llm-structural-problems/index.md)

> **Discussion**: [GitHub Discussions](https://github.com/shuji-bonji/understanding-llm-through-claude-code/discussions)
