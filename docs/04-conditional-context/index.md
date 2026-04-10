🌐 [日本語](../ja/04-conditional-context/index.md)

# Part 4: Conditional Context — Rules

> [!NOTE]
> Injection mechanism that activates only when needed.
> A "conditional distribution" approach that solves the Priority Saturation problem in CLAUDE.md.

## Why It Exists

If you put all rules in CLAUDE.md, then API validation rules are loaded alongside React component conventions, and they compete for attention. `.claude/rules/` maximizes the effective density of instructions within a limited context by showing the LLM "only rules relevant to the file being modified."

## → Why: Which Structural Problems Does It Address?

> [!IMPORTANT]
> - **Priority Saturation**: Reduces simultaneously active instructions by distributing rules conditionally rather than keeping all rules loaded
> - **Lost in the Middle**: Injects only necessary rules at the end (high-attention position)

## Documentation in This Part

| Document | Content |
|:--|:--|
| [Design Principles of .claude/rules/](rules.md) | Why it exists and how to design it |
| [Practical glob Pattern Design](glob-patterns.md) | Concrete examples of effective pattern design |

---

> **Previous**: [Part 3: Always-Loaded Context](../03-always-loaded-context/index.md)
> **Next**: [Part 5: On-Demand Context](../05-on-demand-context/index.md)
