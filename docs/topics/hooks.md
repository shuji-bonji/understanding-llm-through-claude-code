# Hooks — Runtime layer

🌐 [日本語](/ja/topics/hooks)

> [!NOTE]
> Hooks are scripts that fire at defined lifecycle events (PreToolUse, PostToolUse, UserPromptSubmit, etc.). They run **outside** the LLM's context — deterministic checks and side effects that the model never sees.

## How it works

- Defined in `settings.json` under `hooks.<event>`.
- The LLM cannot disable, bypass, or even read its own hooks — that's the point.
- Best used for guardrails (lint, secret scan, format) that you want to be unskippable.

## Related chapters

- [Part 7 — Runtime Layer (overview)](/07-runtime-layer/)
- [settings.json](/07-runtime-layer/settings-json)
- [Hooks Lifecycle](/07-runtime-layer/hooks)
- [Why Not in Context](/07-runtime-layer/why-not-in-context)
- [Configuration Reference](/appendix/claude-code-config-reference)

## Structural problems it addresses

- [Instruction Decay](/01-llm-structural-problems/instruction-decay) — enforcement happens regardless of memory drift.
- [Sycophancy](/01-llm-structural-problems/sycophancy) — the LLM can't talk its way past a hook.
- [Prompt Sensitivity](/01-llm-structural-problems/prompt-sensitivity) — phrasing doesn't change what the script does.

## See also

- [Topic: CLAUDE.md](/topics/claude-md) — for instructions the LLM is *expected* to follow voluntarily.
- [Topic: Plugins](/topics/plugins) — for distributing hooks alongside skills and MCPs.
- [Feature Index](/appendix/feature-index)
