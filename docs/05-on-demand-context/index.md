🌐 [日本語](../ja/05-on-demand-context/index.md)

# Part 5: On-Demand Context — Skills & Agents

> [!NOTE]
> Expanded only when called.
> Skills are "import"; Agents are "delegation to separate process."

## Why They Exist

Resident context (CLAUDE.md) and conditional context (Rules) alone cannot provide task-specific detailed procedures. Skills and Agents are mechanisms that "provide only the necessary knowledge when needed."

## Fundamental Difference Between Skills and Agents

```
Main Claude (context window)
  ├─ Skill loaded → executed in same context (consumes context)
  │               → equivalent to import / require
  │
  └─ Agent launched
       └─ separate context window (independent)
          → only result returned to main (distilled summary)
          → equivalent to delegation to separate process
```

## → Why: Which Structural Problems Do They Address?

> [!IMPORTANT]
> - **Context Rot**: Skills expand only when needed. Agents fundamentally avoid it with independent context
> - **Sycophancy**: Cross-model QA via Agents eliminates compliance bias
> - **Knowledge Boundary**: Delegate specific domains to specialist Agents, narrowing knowledge boundaries
> - **Prompt Sensitivity**: Improve auto-invocation accuracy through Skill description design

## Documents in This Part

| Document | Content |
|:--|:--|
| [Skills Design Principles](skills.md) | How to write SKILL.md, importance of description |
| [Agents Design Principles](agents.md) | Independent context, Cross-model QA |
| [Criteria for Skill vs Agent](skill-vs-agent.md) | Decision flow for which to use |

---

> **Previous**: [Part 4: Conditional Context](../04-conditional-context/index.md)

> **Next**: [Part 6: Context as Tool Definition](../06-tool-context/index.md)
