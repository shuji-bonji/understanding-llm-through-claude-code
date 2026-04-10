🌐 [日本語](../ja/08-session-management/tools-comparison.md)

# Tool Comparison and Selection

> [!NOTE]
> Comparison of tools available for memory persistence.

## Tool Comparison Table

| Tool | Memory Write | Memory Read | Context Cost | Use Cases |
| :--- | :--- | :--- | :--- | :--- |
| **CLAUDE.md** | Manual | Automatic (every session) | Always | Project conventions, technical stack |
| **Git commits** | Automatic | Manual (git log) | None | Code change history |
| **`.claude/rules/`** | Manual | Conditional automatic | Condition-dependent | File type rules |
| **MCP memory tools** | Automatic/semi-automatic | Search-based | Search-time only | Long-term design decisions, user info |
| **Auto Memory** | Automatic | Automatic | At session start | User preferences, project knowledge |

## Selection Criteria

```mermaid
flowchart LR
    Q1{"Needed every session?"}
    Q2{"Needed at specific<br>file operations?"}
    Q3{"Want to keep<br>long-term?"}
    CLAUDE(["CLAUDE.md<br>(Verify fits in 200 lines)"])
    RULES([".claude/rules/"])
    MEMORY(["Memory tool / Auto Memory"])
    GIT(["Record in Git commit message"])

    Q1 -->|"Yes"| CLAUDE
    Q1 -->|"No"| Q2
    Q2 -->|"Yes"| RULES
    Q2 -->|"No"| Q3
    Q3 -->|"Yes"| MEMORY
    Q3 -->|"No"| GIT

    style Q1 fill:#eff6ff,stroke:#1d4ed8,color:#000
    style Q2 fill:#eff6ff,stroke:#1d4ed8,color:#000
    style Q3 fill:#eff6ff,stroke:#1d4ed8,color:#000
    style CLAUDE fill:#fef9c3,stroke:#a16207,color:#000
    style RULES fill:#dcfce7,stroke:#15803d,color:#000
    style MEMORY fill:#f3e8ff,stroke:#7c3aed,color:#000
    style GIT fill:#f3f4f6,stroke:#374151,color:#000
```

---

> **Previous**: [When and How to Recall](when-to-recall.md)

> **Part 8 Complete → Next**: [Part 9: Application to Other LLMs](../09-cross-llm-principles/index.md)
