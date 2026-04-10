🌐 [日本語](../ja/03-always-loaded-context/hierarchy.md)

# How Hierarchical Merging Works

> [!IMPORTANT]
> → Why: **Context Rot** mitigation (scope-based separation prevents accumulation of unnecessary information)
> → Why: **Priority Saturation** mitigation (merge only necessary layers to minimize resident tokens)

## CLAUDE.md Hierarchy

CLAUDE.md can be placed in multiple locations and is hierarchically merged.

```sh
~/.claude/
└── CLAUDE.md                  # Global (shared across all projects, top-level)

my-project/                    # Project root
├── CLAUDE.md                  # Project-wide (Git-tracked recommended)
├── CLAUDE.local.md            # Local only (.gitignore recommended)
└── src/                       # Working directory example
    ├── CLAUDE.md              # Subdirectory-specific (merged only when working here)
    └── features/
        └── CLAUDE.md          # Even deeper nesting is possible

```

**Key principle**: More specific (deeper) instructions override more general (shallower) instructions.

## Role of Each Layer

| File | Git-Tracked | Purpose | Example |
| :--- | :--- | :--- | :--- |
| `~/.claude/CLAUDE.md` | No | Personal preferences (all projects) | "Respond in English," "prefer functional style" |
| `./CLAUDE.md` | Yes | Team rules and project overview | Tech stack, testing approach |
| `./CLAUDE.local.md` | No | Personal local environment info | Local DB connection, experimental settings |
| `./src/CLAUDE.md` | Yes | Subdirectory-specific design decisions | Feature module responsibility separation rules |

## Why Hierarchical Merging?

### Context Rot Mitigation

A subdirectory's CLAUDE.md is merged only when you're working in that directory. If you're not working in `src/features/`, its CLAUDE.md doesn't consume your context. This minimizes the total resident instructions and reduces Priority Saturation risk.

### Team vs. Personal Separation

By separating `./CLAUDE.md` (team-shared) and `./CLAUDE.local.md` (personal), you manage team conventions and personal preferences independently.

## Design Guidelines

- **Global**: Only information that applies across all projects—language settings, personal preferences
- **Project root**: Rules everyone on the team must follow. Enforce the 200-line limit strictly
- **Local**: Personal settings not tracked in Git. Environment-dependent information
- **Subdirectory**: Design decisions specific to that directory. Complements the project root CLAUDE.md

---

> **Previous**: [Design Principles of CLAUDE.md](claude-md.md)

> **Next**: [Operating CLAUDE.local.md](local-md.md)
