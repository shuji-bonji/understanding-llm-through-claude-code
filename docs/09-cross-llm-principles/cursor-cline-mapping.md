🌐 [日本語](../ja/09-cross-llm-principles/cursor-cline-mapping.md)

# Cursor / Cline / Copilot Reference Table

> [!NOTE]
> The principle of "context window injection control" in Claude Code is shared with other LLM tools.

## Feature Mapping Across Tools

| Claude Code | Cursor | Cline | GitHub Copilot | Common Principle |
| :--- | :--- | :--- | :--- | :--- |
| `CLAUDE.md` | `.cursorrules` | `.clinerules` | `.github/copilot-instructions.md` | Resident context |
| `.claude/rules/` | `@` mentions | - | - | Conditional context |
| `.claude/skills/` | Docs reference | - | - | On-demand context |
| `.claude/agents/` | - | - | - | Independent context execution |
| `settings.json` | IDE settings | IDE settings | IDE settings | Runtime control |
| Hooks | - | - | - | Lifecycle control |
| MCP | MCP | MCP | - | Tool definition injection |
| `/compact` | - | - | - | Context compression |

## Universality of Principles

Regardless of tools, the following principles remain constant:

1. **Keep resident context minimal**: Resident information in any tool triggers Priority Saturation
2. **Distribute with conditional injection**: Don't concentrate all rules in one place
3. **Mechanical validation outside context**: Testing, linting, CI/CD don't depend on LLMs
4. **Keep sessions short**: Context Rot and Instruction Decay are universal across all models

---

> [!WARNING]
> TODO: Detailed comparison of each tool to be added

> **Previous**: [Practical Application Without Tool Support](prompt-driven-development.md)

> **Series Complete**: [Return to Top Page](/)
