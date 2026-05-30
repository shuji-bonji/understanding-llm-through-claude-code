# CLAUDE.md — Always-loaded project memory

🌐 [日本語](/ja/topics/claude-md)

> [!NOTE]
> `CLAUDE.md` is the file Claude Code reads at the start of every session. It defines project-wide context that should always be available: conventions, terminology, build commands, and behavioral expectations.

## How it works

- Loaded into context **once per session**, before the first user message.
- Hierarchical: project-level, user-level (`~/.claude/CLAUDE.md`), and `CLAUDE.local.md` merge in a defined order.
- Every token here is paid on every turn — keep it terse.

## Related chapters

- [Part 3 — Always-Loaded Context (overview)](/03-always-loaded-context/)
- [CLAUDE.md Design](/03-always-loaded-context/claude-md)
- [Hierarchical Merging](/03-always-loaded-context/hierarchy)
- [CLAUDE.local.md](/03-always-loaded-context/local-md)
- [Configuration Reference](/appendix/claude-code-config-reference)

## Structural problems it addresses

- [Context Rot](/01-llm-structural-problems/context-rot) — keep CLAUDE.md small to slow accuracy decay.
- [Instruction Decay](/01-llm-structural-problems/instruction-decay) — re-grounding through always-loaded content.
- [Priority Saturation](/01-llm-structural-problems/priority-saturation) — too much in CLAUDE.md blurs what matters.

## See also

- [Topic: Rules](/topics/rules) — for context that should load only sometimes.
- [Topic: Skills & Agents](/topics/skills-and-agents) — for context that should load on demand.
- [Feature Index](/appendix/feature-index) — cross-feature cheatsheet.
