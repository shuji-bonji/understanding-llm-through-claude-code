🌐 [日本語](../ja/03-always-loaded-context/local-md.md)

# Operating CLAUDE.local.md

> [!NOTE]
> Personal configuration outside Git. Managed independently from team rules.

## What Is CLAUDE.local.md?

CLAUDE.local.md is automatically added to `.gitignore` and is a local-only version of CLAUDE.md. It merges with the team-shared `./CLAUDE.md` but is not included in the Git repository.

```sh
my-project/
├── CLAUDE.md              # Team-shared
├── CLAUDE.local.md        # ← Personal (in .gitignore)
└── src/
    └── CLAUDE.md
```

## When to Use It

- Local database connection endpoints (`localhost:5432`)
- Personal API key reference methods
- Experimental configurations or workflows
- Local environment-specific build options

## Difference from `settings.local.json`

| | `CLAUDE.local.md` | `.claude/settings.local.json` |
| :--- | :--- | :--- |
| Target | LLM instructions | Runtime configuration |
| Does LLM see it? | **Yes** | No |
| Example content | "Local DB is localhost:5432" | Local MCP server settings |

## Operations Best Practices

- Avoid duplicating content from the team's `./CLAUDE.md`
- Put environment-dependent information here (port numbers, paths)
- Test experimental rules in `CLAUDE.local.md` first, then promote to the team version (`CLAUDE.local.md` → validate → move to `./CLAUDE.md`)

---

> **Previous**: [How Hierarchical Merging Works](hierarchy.md)

> **Part 3 Complete → Next**: [Part 4: Conditional Context](../04-conditional-context/index.md)
