---
title: "Hallucination — Two Sides of the Same Coin as Creativity"
description: "LLM hallucination and creativity are mathematically equivalent — eliminating one eliminates the other. How to keep both while detecting and managing false outputs in Claude Code."
---

🌐 [日本語](../ja/01-llm-structural-problems/hallucination.md)

# Hallucination — LLMs Structurally Generate False Information

> [!NOTE]
> **In short**: The phenomenon where an LLM confidently generates content that contradicts facts.
> This is not a "bug" but a **structural constraint inherent to Transformer architecture**, and it has been mathematically proven that it cannot be reduced to zero.

## What is Hallucination?

Hallucination is the phenomenon where an LLM generates content that contradicts facts while presenting it as if it were correct. The critical point is that this is not due to insufficient training or design flaws, but rather **a structural constraint inherent to the architecture itself**.

## Three Mathematical Foundations

```mermaid
graph TD
    A["Diagonal Argument<br>(Xu et al., 2024)"]
    B["Connection to Incompleteness Theorem<br>(Banerjee et al., 2025)"]
    C["Equivalence with Creativity<br>(Karpowicz, 2025)"]
    D(["Hallucination Cannot Be<br>Structurally Eliminated"])
    E(["Paradigm Shift:<br>From Elimination to Management"])

    A -->|"Every LLM has<br>infinitely many hallucinating inputs"| D
    B -->|"Probability cannot be zero<br>at any processing stage"| D
    C -->|"Eliminating it also<br>eliminates creativity"| D
    D --> E

    style A fill:#dbeafe,stroke:#1d4ed8,color:#000
    style B fill:#dbeafe,stroke:#1d4ed8,color:#000
    style C fill:#dbeafe,stroke:#1d4ed8,color:#000
    style D fill:#fee2e2,stroke:#b91c1c,color:#000
    style E fill:#dcfce7,stroke:#15803d,color:#000
```

### 1. Proof via Diagonal Argument (Xu et al., 2024)

Using Cantor's diagonal argument, it has been proven that **every LLM necessarily has infinitely many inputs that cause hallucinations**. This holds regardless of model size or training data quality.

### 2. Connection to Gödel's Incompleteness Theorem (Banerjee et al., 2025)

It has been demonstrated that hallucination probability cannot reach zero at any stage of LLM processing (encoding, attention mechanisms, decoding). Just as formal systems cannot prove their own consistency, LLMs cannot completely guarantee the accuracy of their outputs.

### 3. Equivalence of Hallucination and Creativity (Karpowicz, 2025)

It has been proven that complete hallucination control is fundamentally impossible. When hallucinations are completely eliminated, creativity is simultaneously lost. In other words, **hallucination and creativity are mathematically equivalent operations**.

## Impact on Coding

- Generating code that confidently calls non-existent APIs or methods
- Presenting outdated syntax as current standard
- Generating type definitions for non-existent methods in proprietary codebases
- Writing assertions in test code that will actually fail

## Mitigation Strategies in Claude Code

Hallucination cannot be eliminated. Mitigation is based on a **detection and management paradigm**. The following are representative examples in Claude Code.

| Strategy | Mechanism | Why It Works |
|:--|:--|:--|
| **Hooks (Test Execution)** | Automatically runs tests after code changes | Compilers and test runners don't hallucinate |
| **Cross-Model QA** | Review by different models (Agents) | Two models simultaneously hallucinating the same error is unlikely |
| **CLAUDE.md Constraints** | Explicit version information and forbidden patterns | Narrows the domain where hallucinations can occur |
| **MCP External References** | Direct reference to trusted external sources | Based on external facts, not internal LLM knowledge |
| **Code Intelligence (LSP)** | Symbol-level grounding via language server | See [Part 9](../09-code-intelligence/hallucination-and-symbols.md) — confirms symbols exist before code is committed |
| **Agents (Knowledge Separation)** | Delegate specific domains to specialized agents | Narrower knowledge domain reduces hallucination probability |

## Managing the Trade-off with Creativity

Since hallucination and creativity are mathematically equivalent (Karpowicz, 2025), **you cannot eliminate one without losing the other**. The practical question is not "how do I make Claude stop hallucinating?" but rather **"how do I keep creativity for design tasks while suppressing hallucination for factual tasks?"**

Claude Code's design implicitly answers this by separating the two regimes:

| Task type | What you want | Recommended setup |
|:--|:--|:--|
| **Design / brainstorming** (architecture proposals, refactoring ideas, naming) | Creativity ON — accept some hallucination as the price | Plain conversation, no LSP grounding required |
| **Factual / code generation** (API calls, type signatures, version-specific syntax) | Hallucination suppressed — accept narrower output | LSP grounding (Part 9), Hooks (test execution), CLAUDE.md version pinning, MCP external references |

In other words, the trade-off is not resolved by a single setting — it is resolved by **switching mitigation layers on and off depending on the task**. The mitigation table above is the toolbox for the "suppress" mode; for "creative" mode you deliberately leave most of them off.

> [!IMPORTANT]
> **Why the trade-off cannot be optimized away**: Karpowicz (2025) proves this via mechanism design — any scoring rule that strictly penalizes false outputs also penalizes novel-but-plausible outputs. The two are not separable signals. Trying to "tune up truthfulness without losing creativity" is mathematically equivalent to trying to find a free lunch.

## Paradigm Shift: From Elimination to Management

The key is shifting from trying to "eliminate" hallucinations to "managing" them:

```
Software engineering approach to bug management:
  Eliminating bugs completely is impossible
  → Detect and manage through testing, review, CI/CD

LLM hallucination management:
  Eliminating hallucinations completely is impossible
  → Detect and manage through Hooks, Cross-Model QA, test code
```

## Relationship to Other Structural Problems

- **Knowledge Boundary**: The point where hallucinations occur when exceeding knowledge boundaries
- **Sycophancy**: User agreement may reinforce hallucinated content
- **Context Rot**: Hallucination rate increases as context length grows
- **Instruction Decay**: The instruction itself to "verify facts" may be forgotten

## This constraint is not unique to Claude

Hallucination comes from next-token prediction. Regardless of model size or product, content that contradicts facts can be generated with confidence. It cannot be reduced to zero. Detection and management are the response.

How it shows up elsewhere:

- Non-existent APIs or papers are presented as if they had a source
- Version or date questions get a plausible value from training data
- Compilers, tests, and checks against primary sources work outside the model, on any tool

Other tools do not necessarily ship features at the same granularity. Product-independent principles are extracted in [Part 11: Cross-LLM Principles](../11-cross-llm-principles/index.md).

## References

- Xu, Z. et al. (2024). "Hallucination is Inevitable: An Innate Limitation of Large Language Models." [arXiv:2401.11817](https://arxiv.org/abs/2401.11817) — Formal proof of hallucination inevitability using diagonal argument
- Banerjee, S., Agarwal, A., & Singla, S. (2024). "LLMs Will Always Hallucinate, and We Need to Live With This." [arXiv:2409.05746](https://arxiv.org/abs/2409.05746) — Proof of inevitability via connection to Gödel's first incompleteness theorem
- Karpowicz, M. P. (2025). "On the Fundamental Impossibility of Hallucination Control in Large Language Models." [arXiv:2506.06382](https://arxiv.org/abs/2506.06382) — Proof of equivalence between hallucination and creativity using mechanism design and scoring rules

---

> **Previous**: [Priority Saturation](priority-saturation.md)

> **Next**: [Sycophancy](sycophancy.md)

> **Discussion**: [#7 Hallucination](https://github.com/shuji-bonji/understanding-llm-through-claude-code/discussions/7)
