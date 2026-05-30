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

## See also

- [Topic: Skills & Agents](/topics/skills-and-agents)
- [Topic: MCP](/topics/mcp)
- [Topic: Hooks](/topics/hooks)
- [Feature Index](/appendix/feature-index)
