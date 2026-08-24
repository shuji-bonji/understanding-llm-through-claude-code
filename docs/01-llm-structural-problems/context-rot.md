---
title: "Context Rot"
description: "Why output quality measurably degrades as token count grows, even within the official context window."
---

🌐 [日本語](../ja/01-llm-structural-problems/context-rot.md)

# Context Rot — Output Quality Degrades as Token Count Increases

> [!NOTE]
> **In short**: A phenomenon where LLM output quality deteriorates as the number of input tokens increases.
> Even with a 200K token capacity, degradation begins around 50K tokens.
> Because it doesn't produce errors, it's the most insidious structural constraint in LLMs.

## What is Context Rot?

Context Rot is a **phenomenon where performance degrades as input length increases**.

Confirmed across all 18 models—including GPT-4.1 and Claude Opus 4—in Chroma's 2025 research. Critically, this is *not* a **context window overflow**. Models with 200K capacity already degrade at 50K tokens. It's difficult to notice because it doesn't manifest as errors.

## Three Mechanisms

Context Rot is not a single phenomenon but a compound of three distinct mechanisms.

### 1. Lost in the Middle (Information Loss in the Middle Ranks)

LLMs direct strong attention to beginning and ending tokens while attention to middle sections drops dramatically (U-curve pattern). Beyond 50%, the U-curve shifts, prioritizing the most recent tokens instead.

→ See [Lost in the Middle](lost-in-the-middle.md) for details

### 2. Attention Dilution

The Transformer self-attention mechanism performs O(N²) pairwise computations. When token count increases 10-fold, processing pairs grow 100-fold, causing relative attention to each token to decrease proportionally.

### 3. Distractor Interference

When unrelated but semantically similar information is **present in the input context**, the model cannot separate it from the target and returns wrong output. In Chroma's experiments, a single distractor already reduced accuracy, and accuracy kept dropping as distractors were added. Moreover, a logically coherent haystack (text that preserves its original flow) performed *worse* than a shuffled one, because coherent prose blurs the boundary between distractor and target. This is especially severe in coding, where similar function names and import statements cause interference.

> [!NOTE]
> This is an **input-side** phenomenon. The separate claim that "forcing an output format such as JSON lowers accuracy" is an output-side issue, covered in [Output Format Constraints and Accuracy](../appendix/output-format-constraints.md).

## Impact on Semantic Understanding

Context Rot becomes most severe in coding tasks. Understanding code requires broad contextual semantic comprehension—tracking variables, grasping dependencies, and recognizing design patterns all depend on context length.

## Quantitative Evidence

| Model        | Short Context Accuracy | Long Context Accuracy | Degradation |
| :----------- | :--------------------- | :--------------------- | :---------- |
| GPT-4.1      | High                   | Medium                 | Significant |
| Claude Opus 4 | High                   | Medium                 | Significant |
| All 18 models | —                      | —                      | **Confirmed across all models** |

> [!IMPORTANT]
> The main cause of quality drop is not that "the LLM is unintelligent." It is input design.

## Mitigation in Claude Code

The following are representative examples in Claude Code.

| Mitigation              | Mechanism                                      | Addresses Mechanism(s)                   |
| :---------------------- | :---------------------------------------------- | :---------------------------------------- |
| **`/compact`**          | Summarizes and compresses conversation history | Attention Dilution, Distractor Interference |
| **`/clear`**            | Resets session for fresh context               | All mechanisms                            |
| **CLAUDE.md 200-line limit** | Minimizes resident context consumption    | Attention Dilution                        |
| **`.claude/rules/`**    | Injects rules only when conditions match       | Distractor Interference                   |
| **Skills**              | Loads specialized knowledge only when needed   | Attention Dilution, Distractor Interference |
| **Agents**              | Execute in independent context windows         | All mechanisms (fundamental mitigation)   |
| **Hooks**               | Mechanical verification outside context        | Unaffected by Context Rot                 |
| **MCP Tool Search**     | Lazy-loads tool definitions                    | Attention Dilution                        |

## Related Structural Problems

- [Lost in the Middle](lost-in-the-middle.md) — Most concrete manifestation of Context Rot
- [Priority Saturation](priority-saturation.md) — Degradation from instruction density perspective
- [Instruction Decay](instruction-decay.md) — Accumulation of Context Rot over time

## This constraint is not unique to Claude

Context Rot is not a defect of a specific product. It is a phenomenon that appears when Transformer-based models process long input. As prompts grow, or as chat history accumulates, output quality drops on cloud LLMs as well. The essence is input length and how attention is allocated.

How it shows up elsewhere:

- As chat history grows, agreements made in the middle stop showing up in later replies
- Pasting a long spec or log in one shot lets similar but irrelevant information interfere
- Quality starts falling before the displayed capacity is exhausted

Other tools do not necessarily ship features at the same granularity. Product-independent principles are extracted in [Part 11: Cross-LLM Principles](../11-cross-llm-principles/index.md).

## References

- Hong, K., Troynikov, A., & Huber, J. (2025). "Context Rot: How Increasing Input Tokens Impacts LLM Performance." Chroma Research. [research.trychroma.com](https://research.trychroma.com/context-rot) — Quantitative measurement of Context Rot across 18 models

---

> **Next**: [Lost in the Middle](lost-in-the-middle.md)

> **Discussion**: [#6 Context Rot](https://github.com/shuji-bonji/understanding-llm-through-claude-code/discussions/6)
