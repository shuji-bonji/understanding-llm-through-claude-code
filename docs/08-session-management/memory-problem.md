🌐 [日本語](../ja/08-session-management/memory-problem.md)

# Why Memory Becomes a Problem

> [!NOTE]
> Sessions are finite, but projects are permanent.
> Information loss between sessions creates the "memory persistence" problem.

## The Finiteness of Sessions

LLM sessions have a clear lifespan.

- Quality degrades over time due to Context Rot
- `/compact` can extend the session but has limits
- `/clear` resets everything—all conversation history is lost

## The Problem of Information Loss

When a session ends, the following information is lost:

- The rationale behind design decisions ("Why did we choose this architecture?")
- The process of debugging and root cause analysis
- User preferences and work style
- Project-specific implicit knowledge

## The Need for Persistence

Projects continue beyond sessions. A mechanism to carry information forward across sessions is necessary.

- **CLAUDE.md**: Project conventions and technical stack (manual management)
- **Git commits**: Code change history (automatic management)
- **Memory tools**: Design decisions, user preferences, etc. (semi-automatic management)

---

> **Previous**: [Using /compact and /clear](compact-and-clear.md)

> **Next**: [What to Remember](what-to-remember.md)
