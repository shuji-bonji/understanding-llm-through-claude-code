🌐 [日本語](../ja/11-cross-llm-principles/cursor-cline-mapping.md)

# Cursor / Cline / Copilot Mapping

> [!NOTE]
> This page is not a one-to-one feature map.
> It shows only where always-on instructions live, limited to official documentation that was checked.
> Unverified setting keys are not listed. A feature with the same name is not assumed to exist on other products.

## Principles first

The following way of thinking does not change when the tool changes.

1. **Keep always-on instructions short** — information read every turn causes Priority Saturation
2. **Read only when needed** — do not pile every rule in one place
3. **Put mechanical checks outside the model** — tests, lint, and CI do not depend on the LLM
4. **Keep conversations short** — Context Rot and Instruction Decay appear regardless of product

A different file name is not a different principle. A missing feature is not a missing principle.

## Confirmed placement

The following were taken from official documentation at the time of writing. Paths can change as products update. Check each vendor's docs before relying on them in production.

| Role | Claude Code (representative) | Confirmed placement on other products |
| :--- | :--------------------------- | :------------------------------------ |
| Instructions read on every project turn | `CLAUDE.md` | Cursor: [`.cursor/rules`](https://cursor.com/docs/rules) (`.mdc`). Cline: [`.clinerules/`](https://docs.cline.bot/customization/cline-rules). GitHub Copilot: [`.github/copilot-instructions.md`](https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot) |
| External tool connection | MCP | Cursor and Cline document MCP officially. Copilot's surface moves quickly, so this page does not assert it. |

Cursor's `.cursorrules` (a single file at the project root) is not the current official method. The current method is `.mdc` files under `.cursor/rules`.

## What this table does not include

The following are representative examples in Claude Code. Matching granularity on other products was not confirmed. Speculative mappings are not written.

- glob-conditional injection of `.claude/rules/`
- on-demand expansion of Skills
- independent Context for Agents
- Hooks
- `/compact` and `/clear`

Their roles (read when needed, verify in another conversation, verify outside the model, compress or drop history) can be performed without dedicated commands. For a manual reproduction, see [Practice Without Tool Support](prompt-driven-development.md).

> [!IMPORTANT]
> It is not valid to say that writing the same file in Cursor solves the problem.
> What transfers is the way of thinking: short always-on instructions, inject only what is needed, verify outside the model, keep sessions short.

---

> **Previous**: [Practice Without Tool Support](prompt-driven-development.md)

> **End of series**: [Back to the top](/)
