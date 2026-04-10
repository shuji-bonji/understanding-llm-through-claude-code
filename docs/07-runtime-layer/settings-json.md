🌐 [日本語](../ja/07-runtime-layer/settings-json.md)

# The Role of settings.json

> [!NOTE]
> "Runtime configuration" not injected into the LLM's context.

## What Is settings.json?

settings.json is a configuration file that controls the behavior of the Claude Code application (runtime). **It is not injected into the LLM's context window**.

| Attribute | Value |
|:--|:--|
| Injection Timing | **Not injected into context** |
| Context Consumption | None |
| Role | Control runtime behavior |

## Fundamental Difference from CLAUDE.md

```
CLAUDE.md      = Instructions for the LLM ("what should be known" "how should it behave")
settings.json  = Configuration for the runtime ("what to allow" "how to execute")
```

Comparison with Node.js:
- CLAUDE.md → Source code (interpreted by V8 engine)
- settings.json → Runtime flags like `node --max-old-space-size=4096`

## Hierarchy and Priority

| Priority | Layer | File | Git Managed |
|:--|:--|:--|:--|
| Highest | Managed | server-managed / MDM / managed-settings.json | — |
| ↓ | Project | `.claude/settings.json` | Yes (team shared) |
| ↓ | Project Local | `.claude/settings.local.json` | No (personal) |
| Lowest | User | `~/.claude/settings.json` | — |

**Higher always wins**. If something is denied in project settings, it will be rejected even if allowed in user settings.

## Main Configuration Categories

```jsonc
{
  // Permission control: restrict tools available to LLM
  "permissions": {
    "allow": ["Read", "Write", "Bash(npm run *)", "Bash(ng *)"],
    "deny": ["Read(./.env)", "Read(./secrets/**)"]
  },

  // Environment variables
  "env": {
    "ANTHROPIC_MODEL": "claude-sonnet-4-20250514"
  },

  // Hooks definition
  "hooks": { },

  // Allow MCP connections
  "enableAllProjectMcpServers": true,

  // Thinking mode
  "thinking": true
}
```

---

> **前へ**: [Part 7: The Layer LLMs Don't See](index.md)

> **次へ**: [Hooks Lifecycle](hooks.md)
