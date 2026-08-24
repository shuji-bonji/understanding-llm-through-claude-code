🌐 [日本語](../ja/11-cross-llm-principles/universal-patterns.md)

# Structural Constraints Are Universal Across Models

> [!NOTE]
> The eight problems in Part 1 are not defects of Claude as a product.
> They come from Transformer-based models and their training.
> In any environment that uses cloud LLMs, the same constraints appear, to varying degrees.

## Why they are shared

It is more accurate to explain the eight problems as two layers than as bugs in a particular implementation.

- **Transformer structure** — self-attention, positional encoding, next-token prediction
- **Training objective and RLHF** — reward for predicting the next token and for producing preferred replies

Models that share these two layers fail in the same kinds of ways, even away from a given product. Degree and presentation differ by model. The same failure does not occur at the same magnitude.

| Problem | Mainly arises from | Product-independent implication |
| :------ | :----------------- | :------------------------------ |
| Context Rot | Cost of self-attention and dilution of attention | Keep input short |
| Lost in the Middle | Bias of attention from positional encoding | Do not put important information in the middle |
| Priority Saturation | Limit on how many instructions can condition at once | Do not grow always-on instructions |
| Hallucination | Next-token prediction | Put factual checks outside the model |
| Sycophancy | RLHF preferring agreement | Separate generation from verification. Do not ask "is this fine?" |
| Knowledge Boundary | Weak reward for "I don't know" | Ground in primary sources outside the model |
| Prompt Sensitivity | Dependence on statistical patterns in the token sequence | Make the axes you do not want to vary explicit |
| Instruction Decay | The above stacking over time | Keep conversations short. Persist decisions in files |

Sycophancy is especially visible in models that went through RLHF. Base models can look different. Measured Prompt Sensitivity also depends on the evaluation method. The constraint is not absent. Its apparent size changes with how it is measured.

## What in the countermeasures does not depend on the product

Each Claude Code feature is a representative example. Feature names need not be ported. What transfers is the way of thinking.

1. **Keep always-on context minimal** — keep instructions that are passed every turn short
2. **Read conditionally** — load rules only when they apply
3. **Verify in an independent Context** — do not ratify in the same conversation that produced the output
4. **Put mechanical checks outside Context** — tests, lint, and CI do not depend on the LLM
5. **Keep sessions short** — drop or summarize history at task boundaries

These five can be done without dedicated commands. The procedure is in [Practice Without Tool Support](prompt-driven-development.md). Confirmed placement on other products is in [Cursor / Cline / Copilot Mapping](cursor-cline-mapping.md).

---

> **Previous**: [Part 11: Applying to Other LLMs](index.md)

> **Next**: [Practice Without Tool Support](prompt-driven-development.md)
