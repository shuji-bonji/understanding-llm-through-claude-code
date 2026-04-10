🌐 [日本語](ja/index.md)

# Practical Examples

> [!NOTE]
> A collection of real-world project configurations that put into practice the LLM structural constraints and Claude Code design principles covered in Parts 1–9.

## Configuration Examples by Project

| Project | Tech Stack | Status |
|:--|:--|:--|
| [Angular/NgRx](./angular-ngrx/) | Angular 18 + NgRx + RxJS | 🚧 Coming Soon |
| [SvelteKit](./svelte-kit/) | SvelteKit + Svelte 5 | 🚧 Coming Soon |
| [e-shiwake](https://github.com/shuji-bonji/e-shiwake/tree/main/.claude) | SvelteKit + Svelte 5 + Dexie.js (PWA) | ✅ Real Project |

## Mapping Examples to Main Content

A reference table showing which Part's concepts each example puts into practice.

| Config File / Feature | Related Part | Structural Problem Addressed |
|:--|:--|:--|
| `CLAUDE.md` (under 200 lines) | [Part 3: Always-Loaded Context](../docs/03-always-loaded-context/) | Priority Saturation, Prompt Sensitivity |
| `CLAUDE.local.md` | [Part 3: Always-Loaded Context](../docs/03-always-loaded-context/) | Context Rot |
| `llms.txt` + `content.md` (external spec delegation) | [Part 3: Always-Loaded Context](../docs/03-always-loaded-context/) | Priority Saturation |
| `.claude/rules/` (conditional) | [Part 4: Conditional Context](../docs/04-conditional-context/) | Priority Saturation, Lost in the Middle |
| `.claude/skills/` | [Part 5: On-Demand Context](../docs/05-on-demand-context/) | Context Rot, Knowledge Boundary |
| Hooks (automated lint & test) | [Part 7: Runtime Layer](../docs/07-runtime-layer/) | Hallucination, Sycophancy |
| Agents (dedicated reviewers) | [Part 5: On-Demand Context](../docs/05-on-demand-context/) | Sycophancy, Knowledge Boundary |
| Session management strategy | [Part 8: Session Management](../docs/08-session-management/) | Instruction Decay |

## How to Use

Each project directory will contain working configuration files with annotated explanations. Use them as a reference to see "how it's actually written" while reading the main content.
