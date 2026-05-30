# Project Skills Index

This project provides AI agent skills for documentation and translation workflows in the "Understanding LLMs Through Claude Code" repository.

## Available Skills

| Skill | Description | Command |
|-------|-------------|---------|
| [translation-quality](./translation-quality/SKILL.md) | EN ↔ JA translation quality evaluation using xCOMET | `/check-translation` |

## Quick Start

### Translation Quality Check

```
/check-translation docs/                                # Check all English ↔ Japanese pairs
/check-translation docs/ja/01-llm-structural-problems/  # Check single section
/check-translation README.md                            # Check README pair
/check-translation docs/ --fix                          # Auto-fix low quality
```

**Quality Criteria:**

| Score | Action |
|-------|--------|
| ≥ 0.95 | ✅ Publish |
| 0.85-0.94 | ✅ Minor review |
| < 0.85 | ⚠️ Review / Re-translate |

**Required MCP:** \`xcomet-mcp-server\`

→ [Full documentation](./translation-quality/SKILL.md)

## Adding Skills

\`\`\`bash
mkdir -p .claude/skills/my-skill
# Create SKILL.md with frontmatter (name, description, version, owner, last_reviewed)
\`\`\`

## Related

- [Command Templates](../commands/)
- [Sister project: ai-agent-architecture / Skills](https://shuji-bonji.github.io/ai-agent-architecture/skills/)
