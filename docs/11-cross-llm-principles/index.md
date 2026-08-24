🌐 [日本語](../ja/11-cross-llm-principles/index.md)

# Part 11: Applying to Other LLMs

> [!NOTE]
> This Part is the destination of the whole work.
> Parts 1–10 used Claude Code as a representative example to match constraints with countermeasures.
> Here we leave the representative example and extract what does not depend on the product.

## Why This Part Exists

The goal is not to port Claude Code setup steps to other products. What transfers is not the procedure. It is the principle.

The same structural constraints appear in Cursor, Cline, or plain prompt design. The same way of thinking applies. The same file names and the same commands are not guaranteed to exist.

This Part draws the following distinction:

- **Product-independent**: the mechanism of the constraint, and the way of thinking about a response
- **Belonging to the representative example**: concrete measures in Claude Code, such as CLAUDE.md or `/compact`

## Product-independent principles

1. **Keep always-on instructions short** — the more instructions that are active at once, the lower the compliance
2. **Read only when needed** — do not load unused rules all the time
3. **Separate generation from verification** — do not produce and then ratify in the same conversation
4. **Put mechanical checks outside the model** — tests, lint, and CI do not sycophantically agree
5. **Keep conversations short** — growing history degrades quality
6. **Make the axes you do not want to vary explicit** — unspecified axes are filled from the prior
7. **Ground in primary sources outside the model** — do not rely on the model's internal knowledge alone

For mechanisms, see Part 1. For concrete measures in the representative example, see Parts 3–10. For term mapping, see the [Glossary](../appendix/glossary.md).

## Documents in This Part

| Document | Content |
| :------- | :------ |
| [Structural Constraints Are Universal Across Models](universal-patterns.md) | What comes from the architecture, and what is product-independent |
| [Practice Without Tool Support](prompt-driven-development.md) | Reproducing the same principles by hand when dedicated machinery is missing |
| [Cursor / Cline / Copilot Mapping](cursor-cline-mapping.md) | Placement, limited to what official docs confirm |

---

> **Previous**: [Part 10: Multi-Session Coordination — Agent Teams](../10-multi-session/index.md)

> **Next**: [Structural Constraints Are Universal Across Models](universal-patterns.md)
