🌐 [日本語](../ja/07-runtime-layer/index.md)

# Part 7: The Layer LLMs Don't See — Settings & Hooks

> [!NOTE]
> Control outside the context. **Consumes zero context budget**.
> Place verification mechanisms here that don't rely on LLM judgment.

## Why It Exists

If you instruct an LLM to "run eslint every time," it consumes context window capacity and may forget (Instruction Decay). Hooks enforce execution at the runtime level, consuming no instruction frame in the LLM and ensuring reliable execution.

**Principle: Place rules requiring judgment in CLAUDE.md / Rules; place mechanically enforceable rules in Hooks.**

## → Why: Which Structural Problems Does It Address?

> [!IMPORTANT]
> - **Hallucination**: Test execution Hooks mechanically detect hallucinated outputs
> - **Sycophancy**: Compilers and test runners don't follow along. Objective verification
> - **Instruction Decay**: Not dependent on context, ensuring reliable execution even in long conversations
> - **Context Budget**: Zero budget consumption. The most budget-efficient solution

## Documentation for This Part

| Document | Content |
|:--|:--|
| [The Role of settings.json](settings-json.md) | Runtime configuration. Permission control, environment variables |
| [Hooks Lifecycle](hooks.md) | Event list, Hook types, Exit Codes |
| [Why Not Show LLMs](why-not-in-context.md) | Design rationale for placing outside context |

---

> **前へ**: [Part 6: Context as Tool Definition](../06-tool-context/index.md)

> **次へ**: [Part 8: Session Management and Memory Persistence](../08-session-management/index.md)
