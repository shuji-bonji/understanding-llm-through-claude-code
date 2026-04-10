🌐 [日本語](../ja/09-cross-llm-principles/universal-patterns.md)

# Structural Constraints Are Universal Across All Models

> [!NOTE]
> The 8 structural problems learned in Part 1 are not specific to Claude, but common to all LLMs.

## Why They Are Common

All 8 structural problems stem from the **Transformer architecture** and the **RLHF training process**. These are foundational technologies commonly adopted by modern LLMs, not problems unique to specific models.

| Problem | Root Cause | GPT | Claude | Gemini | LLaMA |
| :--- | :--- | :-- | :----- | :----- | :---- |
| Context Rot | O(N²) self-attention | ✓ | ✓ | ✓ | ✓ |
| Lost in the Middle | RoPE / positional encoding | ✓ | ✓ | ✓ | ✓ |
| Priority Saturation | Limitations of in-context learning | ✓ | ✓ | ✓ | ✓ |
| Hallucination | Next-token prediction structure | ✓ | ✓ | ✓ | ✓ |
| Sycophancy | RLHF side effect | ✓ | ✓ | ✓ | ✓ |
| Knowledge Boundary | No reward for "I don't know" in objective function | ✓ | ✓ | ✓ | ✓ |
| Prompt Sensitivity | Non-clustering in embedding space | ✓ | ✓ | ✓ | ✓ |
| Instruction Decay | Temporal composition of above 7 problems | ✓ | ✓ | ✓ | ✓ |

## The Principles of Solutions Are Also Universal

The mitigation principles adopted by Claude Code are applicable regardless of which tool is used.

1. **Keep resident context minimal** → Instruction files should be concise in any tool
2. **Distribute instructions with conditional injection** → Load rules only when needed
3. **Validate with independent context** → Separate generation and verification
4. **Mechanical validation outside context** → Testing, linting, CI/CD don't depend on LLMs
5. **Keep sessions short** → Reset per task

## Common Design Patterns Across Tools

> See [Cursor / Cline / Copilot Reference Table](cursor-cline-mapping.md) for details

| Principle | Claude Code | Implementation in Other Tools |
| :--- | :--- | :--- |
| Resident context | CLAUDE.md | .cursorrules, .clinerules |
| Conditional injection | .claude/rules/ | @ mentions (Cursor) |
| On-demand knowledge | Skills | Docs reference (Cursor) |
| Context-external validation | Hooks | CI/CD, pre-commit hooks |
| External knowledge reference | MCP | MCP (Cursor, Cline) |

---

> **Previous**: [Part 9: Applying to Other LLMs](index.md)

> **Next**: [Practical Application Without Tool Support](prompt-driven-development.md)
