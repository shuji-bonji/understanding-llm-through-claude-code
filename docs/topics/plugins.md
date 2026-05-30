# Plugins & Marketplaces

🌐 [日本語](/ja/topics/plugins)

> [!NOTE]
> A plugin is an installable bundle of Skills, MCP servers, hooks, and slash commands. Marketplaces group plugins for discovery. They turn ad-hoc configuration into reusable, versioned units.

## How it works

- A plugin can ship any combination of: `skills/`, `mcp/`, `hooks/`, `commands/`.
- Installed plugins integrate with the same loading rules as user-level configuration.
- Marketplaces are essentially curated lists of plugins.

## Related chapters

- [Appendix — Plugins & Marketplaces](/appendix/plugins-and-marketplaces)
- [Configuration Reference](/appendix/claude-code-config-reference)

## Structural problems it addresses

- [Knowledge Boundary](/01-llm-structural-problems/knowledge-boundary) — plugins package up specialized procedures the base model lacks.
- [Context Rot](/01-llm-structural-problems/context-rot) — by shipping capabilities as Skills/MCP, plugins keep the always-loaded surface minimal.

## Beyond structural problems

Plugins also solve **operational** problems that aren't LLM constraints — and this is the main reason they exist as a layer above individual Skills/MCP/Hooks:

- **Reproducibility** — the same setup works on every machine, every teammate, every session.
- **Versioning** — a plugin pins exact Skills/MCP/Hooks versions, so behavior doesn't silently drift.
- **Distribution** — Marketplaces turn private configuration into shareable, discoverable units.
- **Standardization** — teams converge on a known-good baseline instead of each developer wiring up their own `.claude/`.

## See also

- [Topic: Skills & Agents](/topics/skills-and-agents)
- [Topic: MCP](/topics/mcp)
- [Topic: Hooks](/topics/hooks)
- [Feature Index](/appendix/feature-index)
