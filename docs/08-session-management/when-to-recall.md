🌐 [日本語](../ja/08-session-management/when-to-recall.md)

# When and How to Recall

> [!NOTE]
> Having memories is meaningless without using them.
> A mechanism to retrieve the right memory at the right time is needed.

## Memory Retrieval Patterns

### 1. Automatic Loading at Session Start

Information in CLAUDE.md is automatically loaded every session. Most reliable, but constantly consumes context budget.

### 2. Conditional Loading

Like `.claude/rules/`, memories are loaded under specific conditions (file operations). Budget-efficient.

### 3. On-Demand Loading

Like Skills, memories are retrieved only when needed. Triggered by user or LLM decision.

### 4. Loading via External Tools

Memories stored externally are retrieved through MCP servers or memory tools.

## Design Principles

- **Frequently needed memory** → CLAUDE.md (always available)
- **Memory tied to file type** → Rules (conditional)
- **Task-specific memory** → Skills (on-demand)
- **Long-term knowledge** → External memory tools

---

> **Previous**: [What to Remember](what-to-remember.md)

> **Next**: [Tool Comparison and Selection](tools-comparison.md)
