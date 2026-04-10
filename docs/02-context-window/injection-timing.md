🌐 [日本語](../ja/02-context-window/injection-timing.md)

# Injection Timing Overview

> [!NOTE]
> Each configuration file has a defined "when" and "how" it gets injected into the LLM's context window.
> Understanding this mechanism reveals principles that apply to other LLM tools (Cursor, Cline, Copilot, etc.).

## Injection Timing Inventory

| Layer              | Target           | Injection Timing           | Context Consumption                  |
| :----------------- | :--------------- | :------------------------- | :----------------------------------- |
| **Resident**       | System Prompt    | Session start              | Always (every turn)                  |
| **Resident**       | CLAUDE.md        | Session start              | Always (every turn)                  |
| **Conditional**    | `.claude/rules/` | Glob pattern match         | Only when conditions match           |
| **On-Demand**      | Skills           | User call or LLM decision  | Only when invoked                    |
| **On-Demand**      | Agents           | Agent() tool invocation    | **Separate context** (no main consumption) |
| **Tool Definition**| MCP Tools        | Session start              | Always (as tool definitions)         |
| **Accumulated**    | Conversation history | Added each turn          | Cumulative (compressible via /compact) |
| **Outside Context**| settings.json    | -                          | None                                 |
| **Outside Context**| Hooks            | -                          | None (except Prompt Hook)            |

## Four Injection Patterns

### 1. Resident Injection (Always Loaded)

Loaded at session start and **consumed every turn**.

```
Session start → Inject System Prompt + CLAUDE.md
Turn 1: [System Prompt][CLAUDE.md][User Input 1]
Turn 2: [System Prompt][CLAUDE.md][User Input 1][Response 1][User Input 2]
...
```

Because it's always resident, the impact on context budget is largest. → This is the basis for the 200-line limit in CLAUDE.md

### 2. Conditional Injection

Injected only when specific conditions (glob pattern match) are met.

```
Edit *.component.ts → component-rules are injected
Edit *.spec.ts → testing-rules are injected
Edit *.cs → the above rules are not injected
```

→ Countermeasure for Priority Saturation. Inject needed rules only when needed.

### 3. On-Demand Injection

Injected via user invocation or LLM's automatic decision.

Skills are **deployed within the main context** (equivalent to import).
Agents **execute in independent context** (equivalent to separate process).

### 4. Outside Context (Runtime Layer)

Never enters the LLM's context window. Claude Code's runtime handles it.

settings.json → Permission control, environment variables
Hooks → Execute shell commands on lifecycle events

## Design Decision Flowchart

When adding new rules or information, decide in the following order.

```mermaid
flowchart TD
    START(["Want to add new rule or information"])
    Q1{"Should the LLM know this?"}
    Q2{"Should the LLM know this<br/>at ALL times?"}
    Q3{"Limited to specific<br/>file types?"}
    Q4{"Should it run in<br/>independent context?"}

    R1["⚙️ settings.json / Hooks<br/>Processed mechanically at runtime"]
    R2["📋 .claude/rules/<br/>Conditional glob injection"]
    R3["📘 CLAUDE.md<br/>⚠️ Always verify 200 lines max"]
    R4["🛠️ .claude/skills/<br/>Deployed only when task runs"]
    R5["🤖 .claude/agents/<br/>Runs in independent context"]

    W1(["⛔ Not affected by Context Rot"])
    W2(["🔸 Cost occurs only when conditions match"])
    W3(["🔴 Consumed every turn (fixed cost)"])
    W4(["🔸 Cost occurs only when invoked"])
    W5(["✅ Does not consume main context"])

    START --> Q1
    Q1 -->|No| R1
    Q1 -->|Yes| Q2
    Q2 -->|Yes| Q3
    Q2 -->|No| Q4
    Q3 -->|Yes| R2
    Q3 -->|No| R3
    Q4 -->|No| R4
    Q4 -->|Yes| R5

    R1 -.- W1
    R2 -.- W2
    R3 -.- W3
    R4 -.- W4
    R5 -.- W5

    classDef decision fill:#fef3c7,stroke:#d97706,color:#000
    classDef runtime fill:#f3f4f6,stroke:#6b7280,color:#000
    classDef conditional fill:#fef9c3,stroke:#ca8a04,color:#000
    classDef always fill:#fee2e2,stroke:#dc2626,color:#000
    classDef ondemand fill:#dbeafe,stroke:#2563eb,color:#000
    classDef independent fill:#dcfce7,stroke:#16a34a,color:#000
    classDef note fill:#fff,stroke:#999,color:#000

    class Q1,Q2,Q3,Q4 decision
    class R1 runtime
    class R2 conditional
    class R3 always
    class R4 ondemand
    class R5 independent
    class W1,W2,W3,W4,W5 note
```

---

> **Previous**: [What the LLM Sees in the Context Window](what-llm-sees.md)

> **Next**: [Context Budget as a Concept](context-budget.md)
