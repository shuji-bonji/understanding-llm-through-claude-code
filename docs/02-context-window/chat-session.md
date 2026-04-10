🌐 [日本語](../ja/02-context-window/chat-session.md)

# Chat / Session — The "Container of Time" Where Context Accumulates

> [!NOTE]
> **In a nutshell**: Chat (conversation / session) is a "container" in which Context accumulates and expands over time.
> If Token, Context, and Context Window represent "space," then Chat represents "time."
> By understanding this container, we can physically explain "why Context expands" and "why Instruction Decay occurs."

## What is Chat?

Chat (chat / session / conversation) is **a collection of a series of exchanges (turns) between a user and an LLM**.

ChatGPT's "chat," Claude.ai's "conversation," Claude Code's "session" — the names differ, but the essence is the same. **Context accumulates within a single Chat.**

```
Chat (Session)
├── Turn 1: User input + LLM response
├── Turn 2: User input + LLM response
├── Turn 3: User input + LLM response
│     ↑ All history up to this point is passed as Context each time
└── ...
```

## Relationship Between Four Core Concepts

Token, Context, and Context Window are static concepts at a given moment. By adding Chat, we can explain **changes over time**.

```mermaid
graph TD
    TOKEN["Token<br>Minimum processing unit for LLM"]
    CONTEXT["Context<br>All text passed to LLM"]
    CW["Context Window<br>Maximum size of Context"]
    CHAT["Chat / Session<br>Container of time where Context accumulates"]

    TOKEN -->|"Combine to form"| CONTEXT
    CONTEXT -->|"Size is limited by"| CW
    CHAT -->|"Expands Context<br>each turn"| CONTEXT
    CHAT -->|"When expansion reaches limit<br>discard or compress"| CW

    style TOKEN fill:#f3f4f6,stroke:#374151,color:#000
    style CONTEXT fill:#fef9c3,stroke:#a16207,color:#000
    style CW fill:#eff6ff,stroke:#1d4ed8,color:#000
    style CHAT fill:#f3e8ff,stroke:#7c3aed,color:#000
```

| Concept            | Nature                      | Developer Analogy      |
| :----------------- | :-------------------------- | :---------------------- |
| **Token**          | Minimum unit of space       | Memory byte             |
| **Context**        | Complete input at a moment  | HTTP request body       |
| **Context Window** | Space limit                 | Process memory space    |
| **Chat / Session** | Container of time           | TCP connection          |

> [!TIP]
> **Developer analogy**: Chat is similar to a TCP connection. Multiple requests (turns) are exchanged within the connection, and state (Context) accumulates. When you close the connection (`/clear`), the state resets.

## What Happens Within a Chat?

### Context Expansion per Turn

The LLM is stateless. It doesn't "remember" — instead, **each turn it reads the entire history from the beginning as Context**.

```mermaid
graph LR
    subgraph T1 ["Turn 1"]
        C1["Context<br>System Prompt + CLAUDE.md<br>+ User input 1<br>━━━━━<br>~5K tokens"]
    end
    subgraph T2 ["Turn 2"]
        C2["Context<br>... + Response 1 + User input 2<br>━━━━━<br>~15K tokens"]
    end
    subgraph T3 ["Turn 3"]
        C3["Context<br>... + Response 2 + User input 3<br>━━━━━<br>~30K tokens"]
    end
    subgraph TN ["Turn N"]
        CN["Context<br>... All history<br>━━━━━<br>~100K+ tokens"]
    end

    T1 --> T2 --> T3 -->|"..."| TN

    style C1 fill:#dcfce7,stroke:#15803d,color:#000
    style C2 fill:#fef9c3,stroke:#a16207,color:#000
    style C3 fill:#ffedd5,stroke:#c2410c,color:#000
    style CN fill:#fee2e2,stroke:#b91c1c,color:#000
```

### Context Expansion Triggers Structural Problems

As Chat grows longer (more turns), the structural problems learned in Part 1 emerge in sequence.

| Chat Stage       | Context State          | Emerging Problems                         |
| :--------------- | :--------------------- | :---------------------------------------- |
| Early (~30%)     | Small and stable       | Almost no issues                          |
| Middle (30-50%)  | Expansion underway     | Context Rot begins                        |
| Late (50-70%)    | Middle section fades   | Lost in the Middle, Priority Saturation   |
| Final (70%+)     | Approaching limit      | Increased Hallucination, worse Sycophancy |
| Throughout       | Complex over time axis | **Instruction Decay** (culmination)       |

> [!IMPORTANT]
> **Chat is the physical cause of Instruction Decay.** In Part 1, we learned "39% average performance degradation in multi-turn," but that "multi-turn" is precisely the accumulation of turns within a single Chat.

## The Idea of "Managing" Chat

Once you understand Chat, Claude Code's countermeasures become visible as "Chat management strategies."

| Countermeasure | Operation on Chat                              |
| :------------- | :--------------------------------------------- |
| **`/compact`** | Compress the content within Chat (replace history with summary) |
| **`/clear`**   | End Chat and start a new one                   |
| **Agents**     | Execute in a separate Chat from the main one   |
| **Hooks**      | Execute outside Chat (without going through LLM) |
| **CLAUDE.md**  | "Initial Context" automatically injected at the beginning of each Chat |

```mermaid
flowchart TD
    CHAT["Chat / Session"]
    COMPACT(["⚡ /compact<br>Compress Chat and continue"])
    CLEAR(["🔄 /clear<br>End Chat and start new"])
    AGENTS(["🤖 Agents<br>Execute in separate Chat"])
    HOOKS(["🔧 Hooks<br>Verify outside Chat"])

    CHAT -->|"When approaching 50% threshold"| COMPACT
    CHAT -->|"If task complete or degradation evident"| CLEAR
    CHAT -->|"For independent tasks"| AGENTS
    CHAT -->|"For mechanical verification"| HOOKS

    style CHAT fill:#f3e8ff,stroke:#7c3aed,color:#000
    style COMPACT fill:#fef9c3,stroke:#a16207,color:#000
    style CLEAR fill:#dcfce7,stroke:#15803d,color:#000
    style AGENTS fill:#eff6ff,stroke:#1d4ed8,color:#1e40af
    style HOOKS fill:#eff6ff,stroke:#1d4ed8,color:#1e40af
```

## Design Principle for Chat

```
Principle: 1 Chat = 1 Task

The basic strategy is to keep Chat "as short as possible."
A long Chat means Context expansion,
and Context expansion means emergence of structural problems.
```

This principle is covered in detail in Part 8 (session management).

---

> **Previous**: [Token, Context, Context Window](token-context-basics.md)

> **Next**: [What is the Context Window — What the LLM "Sees"](what-llm-sees.md)
