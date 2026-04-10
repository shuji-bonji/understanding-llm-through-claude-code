🌐 [日本語](../ja/08-session-management/what-to-remember.md)

# What to Remember

> [!NOTE]
> Trying to remember everything causes Priority Saturation.
> The selection of "what to remember" is the core of memory persistence.

## Information Worth Remembering

| Category | Example | Reason |
|:--|:--|:--|
| Design decision rationale | "Chose NgRx for predictable state management" | The "Why" cannot be inferred from code alone |
| User preferences | "Prefers functional style" or "Respond in Japanese" | Inefficient to repeat every session |
| Project-specific knowledge | "Authentication uses OAuth2 + PKCE" | Too detailed for CLAUDE.md |
| Past failures and solutions | "RxJS subscribe leak caused memory leak" | Avoid repeating the same mistake |

## Information NOT Worth Remembering

| Category | Reason |
|:--|:--|
| Code implementation details | Read directly from the codebase |
| Library APIs | Refer to official documentation |
| Temporary work state | Information contained within the session |

## Relationship with Priority Saturation

When memory grows too large, loading the memory itself consumes context, triggering Priority Saturation. The principle is "fewer, more important memories."

---

> **Previous**: [Why Memory Becomes a Problem](memory-problem.md)

> **Next**: [When and How to Recall](when-to-recall.md)
