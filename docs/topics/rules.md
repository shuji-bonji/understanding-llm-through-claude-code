# Rules — Conditional context

🌐 [日本語](/ja/topics/rules)

> [!NOTE]
> Rules are markdown files loaded **only when a glob pattern matches** the files in the current turn. They keep CLAUDE.md small by deferring domain-specific guidance until it's relevant.

## How it works

- Each rule declares a `globs:` frontmatter (e.g. `"**/*.test.ts"`).
- The rule body is injected into context only when the LLM touches a matching file.
- Multiple rules can match — they accumulate, so design for additivity.

## Related chapters

- [Part 4 — Conditional Context (overview)](/04-conditional-context/)
- [Rules Design](/04-conditional-context/rules)
- [Glob Patterns](/04-conditional-context/glob-patterns)
- [Configuration Reference](/appendix/claude-code-config-reference)

## Structural problems it addresses

- [Context Rot](/01-llm-structural-problems/context-rot) — don't pay for context you don't need.
- [Priority Saturation](/01-llm-structural-problems/priority-saturation) — narrow scope keeps signal high.
- [Instruction Decay](/01-llm-structural-problems/instruction-decay) — re-injected each time a matching file appears.

## See also

- [Topic: CLAUDE.md](/topics/claude-md) — for always-loaded context.
- [Topic: Skills & Agents](/topics/skills-and-agents) — for context loaded by the LLM's decision rather than by file match.
- [Feature Index](/appendix/feature-index)
