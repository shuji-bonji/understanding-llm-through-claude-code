🌐 [日本語](../ja/04-conditional-context/rules.md)

# Design Principles of .claude/rules/

> [!IMPORTANT]
> → Why: **Priority Saturation** mitigation (reduces simultaneously active instructions through conditional distribution)
> → Why: **Lost in the Middle** mitigation (injects only necessary rules at high-attention positions)

## What are Rules?

`.claude/rules/` are rule files that get injected into the context only when you operate on files matching glob patterns.

| Attribute | Value |
| :--- | :--- |
| Injection timing | Only when operating on files matching glob patterns |
| Context consumption | Only when condition is met |
| How LLM sees it | Project instructions with same priority as CLAUDE.md |
| Recommended size | One domain per file, maintain focus |

## Why It Exists

It's a mechanism to solve the **Priority Saturation problem** in CLAUDE.md.

If you write all rules in CLAUDE.md, API validation rules are loaded simultaneously with React component conventions, competing for attention. Rules maximize the effective density of instructions within limited context by showing the LLM "only rules relevant to the file being modified." From the Context Budget perspective (Part 2), injecting only when conditions match allows you to reduce always-resident context consumption and maintain flexibility in the variable frame.

## How to Write Rules

In the YAML frontmatter's `globs` field, specify conditions for **files that Claude Code operates on** (reads or edits).

```markdown
---
globs: 'src/app/**/*.component.ts'
---

# Angular Component Rules

- OnPush change detection is mandatory
- Use inline templates, not templateUrl
- @Input() must always use set/get with immutable handling
```

In this case, the rules are injected only when editing `.component.ts` files under `src/app/`.

## Design Example in an Angular Project

```sh
.claude/rules/
├── ngrx-patterns.md        # globs: "**/*.actions.ts,**/*.effects.ts,**/*.reducer.ts"
├── rxjs-practices.md       # globs: "**/*.ts"
├── component-rules.md      # globs: "**/*.component.ts"
├── testing.md              # globs: "**/*.spec.ts"
└── e2e-testing.md          # globs: "e2e/**/*.ts"
```

## Real Example: e-shiwake Rules (SvelteKit + PWA)

[e-shiwake](https://github.com/shuji-bonji/e-shiwake/tree/main/.claude/rules) operates three distinct patterns of Rules.

```sh
.claude/rules/
├── help-sync.md          # Documentation synchronization rules
├── indexeddb-proxy.md    # Framework-specific workarounds
└── route-change.md       # Checklist for route changes
```

### Pattern 1: Synchronization Rules (help-sync.md)

When changing a page or UI component, enforce simultaneous updates to corresponding help documentation (`content.md` + `+page.svelte`). The LLM tends to focus on "fixing the feature" but forgets "updating the documentation." Without this rule, code and documentation diverge.

<details>
<summary>Actual content of help-sync.md</summary>

```markdown
# Help Documentation Synchronization Rule

When modifying the following files, also update the corresponding help page.

| File to change | Help to update |
|---|---|
| src/routes/{slug}/+page.svelte | src/routes/help/{slug}/content.md + +page.svelte |
| src/lib/components/** | Related help pages |

- Always update content.md and +page.svelte simultaneously (updating only one is prohibited)
- content.md is the Single Source of Truth for that feature's specification
- If the feature list is affected, also update llms.txt/+server.ts
```

</details>

### Pattern 2: Technical Workarounds (indexeddb-proxy.md)

Svelte 5's `$state` generates Proxy objects that cannot be directly stored in IndexedDB. `$state.snapshot()` alone is insufficient; you need `JSON.parse(JSON.stringify($state.snapshot(value)))`. This knowledge is likely not sufficiently included in the LLM's training data, making it highly valuable to specify in Rules.

<details>
<summary>Actual content of indexeddb-proxy.md</summary>

```markdown
# Svelte 5 + IndexedDB: Proxy Problem

Svelte 5's $state generates Proxy objects that cannot be
directly stored in IndexedDB.

## Safe Conversion Pattern
JSON.parse(JSON.stringify($state.snapshot(value)))

## NG Patterns
- structuredClone() → DataCloneError occurs
- $state.snapshot() only → Nested arrays/objects remain as Proxy

Target paths: src/lib/db/**/*.ts, src/lib/components/**/*.svelte
```

</details>

### Pattern 3: Checklists (route-change.md)

Enumerate the list of files that must be updated when adding/deleting routes in SvelteKit (`svelte.config.js`, `sitemap.xml`, `CLAUDE.md`, `README.md`, `llms.txt`). Prevents forgetting procedures during long sessions due to Instruction Decay.

<details>
<summary>Actual content of route-change.md</summary>

```markdown
# Required Checklist for Route Changes

When adding, deleting, or changing routes, update all of the following.

1. svelte.config.js — Update prerender.entries
2. static/sitemap.xml — Add/delete URLs
3. CLAUDE.md — Update sitemap section
4. README.md — Update page structure section

Additionally, for help pages:
5. Create/delete content.md
6. Update help link list in llms.txt/+server.ts
```

</details>

> [!TIP]
> Note how the three Rules address different structural problems:
> - **help-sync.md** → Problem of forgetting propagation points of changes (Instruction Decay)
> - **indexeddb-proxy.md** → Complementing knowledge the LLM doesn't have (Knowledge Boundary)
> - **route-change.md** → Preventing omissions in procedures (Instruction Decay, Priority Saturation)

## Criteria for Moving Rules from CLAUDE.md to Rules

Rules meeting the following conditions should be moved from CLAUDE.md to Rules.

1. **Applicable only to specific file types**: Rules specific to `.component.ts`, etc.
2. **CLAUDE.md is approaching 200 lines**: Move lower-priority rules
3. **Rules compete for attention with each other**: Rules from unrelated domains

---

> **Previous**: [Part 3: Designing Always-Loaded Context](../03-always-loaded-context/index.md)

> **Next**: [Practical glob Pattern Design](glob-patterns.md)
