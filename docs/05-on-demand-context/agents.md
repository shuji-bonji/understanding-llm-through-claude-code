🌐 [日本語](../ja/05-on-demand-context/agents.md)

# Agents Design Principles

> [!IMPORTANT]
> → Why: **Context Rot** mitigation (execution in independent context window)
> → Why: **Sycophancy** mitigation (eliminate compliance bias via Cross-model QA)
> → Why: **Knowledge Boundary** mitigation (narrow knowledge domains to reduce boundary-crossing probability)

## What Are Agents?

Agents are **sub-agents operating in independent context windows**. They do not consume the main context.

| Attribute | Value |
|:--|:--|
| Invocation Timing | Called via `Agent()` / `Task()` tools |
| Context Consumption | **Independent context window, separate from main** |
| Appearance to LLM | Separate LLM instance with its own system prompt |

## Biggest Difference from Skills

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

## Addressing Structural Problems

### Context Rot Mitigation

Agents run in fresh, independent context, unaffected by main Context Rot. Even mid-session with long history, delegating to an Agent yields high-quality output.

### Sycophancy Mitigation (Cross-Model QA)

Review with different models or fresh context enables verification without shared compliance bias.

### Knowledge Boundary Mitigation

Delegate tasks requiring specific domain knowledge to specialist agents, narrowing knowledge domains and reducing boundary-crossing probability.

## Agent Definition Example

```markdown
<!-- .claude/agents/code-reviewer.md -->
---
name: code-reviewer
description: Specialist agent for code review of PRs
model: sonnet
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash(git diff *)
---

You are an Angular/NgRx code review specialist.

## Review Perspectives
1. NgRx pattern compliance
2. RxJS memory leaks (missing takeUntilDestroy)
3. Alignment with OnPush change detection
4. Test coverage
```

## Important Constraints

- Sub-agents **cannot invoke other sub-agents**
- Indirect invocation via bash commands is also prohibited
- Always use the `Agent(subagent_type="agent-name", ...)` tool

---

> **Previous**: [Skills Design Principles](skills.md)

> **Next**: [Criteria for Skill vs Agent](skill-vs-agent.md)
