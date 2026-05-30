# Code Intelligence — Code-world grounding

🌐 [日本語](/ja/topics/code-intelligence)

> [!NOTE]
> The Language Server Protocol (LSP) lets Claude consult **the symbols, types, and references that actually exist in this repository** instead of guessing. Where MCP grounds the LLM in external facts, Code Intelligence grounds it in the code in front of it.

## How it works

- **Definition** — confirms a symbol exists; a null answer is *proof of non-existence* before code is committed.
- **Hover** — returns the real type signature (RxJS operator overloads, Angular signal API, etc.) so generation is constrained to the installed version.
- **References** — lists exact call sites without loading every file, cutting investigation tokens dramatically.
- **Diagnostics** — push type and lint errors *during* the edit loop, so most Hallucination-class symbol errors never reach disk.

## Related chapters

- [Part 9 — Code Intelligence (overview)](/09-code-intelligence/)
- [LSP as Grounding](/09-code-intelligence/lsp-as-grounding)
- [Hallucination and Symbols](/09-code-intelligence/hallucination-and-symbols)
- [Live Type Errors](/09-code-intelligence/live-type-errors)
- [Grep / Read / LSP — Which Tool When?](/09-code-intelligence/vs-grep-vs-read)

## Structural problems it addresses

- [Hallucination](/01-llm-structural-problems/hallucination) — symbol-level grounding stops the most common code-generation failures (made-up function names, wrong signatures, fake import paths) before they reach disk.
- [Knowledge Boundary](/01-llm-structural-problems/knowledge-boundary) — project-private types and post-cutoff APIs become *resolvable* instead of guessable.
- [Context Rot](/01-llm-structural-problems/context-rot) (secondary) — symbol queries return precise targets instead of forcing whole-file reads, leaving more budget for actual work.

## See also

- [Topic: MCP](/topics/mcp) — the *other* grounding pillar (external-world facts).
- [Topic: Hooks](/topics/hooks) — test-execution Hooks catch semantic bugs LSP cannot see.
- [Feature Index](/appendix/feature-index)
