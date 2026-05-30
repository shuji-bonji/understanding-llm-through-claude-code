---
name: translation-quality
description: English ↔ Japanese translation quality evaluation using xCOMET for the "Understanding LLMs Through Claude Code" repository
version: 1.0.0
owner: @shuji-bonji
last_reviewed: 2026-05-30
---

# Translation Quality Evaluation Skill

## Purpose

Evaluate and ensure high-quality translations between English (`docs/`) and Japanese (`docs/ja/`) using automated quality metrics (xCOMET) with clear decision criteria and actionable outputs.

### Why This Skill?

- The "Understanding LLMs" repository has English as the primary language and Japanese as the secondary language
- Manual translation review is time-consuming and subjective for 11 Parts × 4-5 pages each
- xCOMET provides objective, reproducible quality scores
- Clear thresholds enable automated decision-making
- Results can be directly embedded into PR comments or documentation

## Repository-Specific Context

This repository has a special bilingual structure:

- **English version (main)**: `docs/01-llm-structural-problems/`, `docs/02-context-window/`, ...
- **Japanese version (sub)**: `docs/ja/01-llm-structural-problems/`, `docs/ja/02-context-window/`, ...
- **README**: `README.md` (English) ↔ `README.ja.md` (Japanese)

The naming convention here differs from typical `*.ja.md` projects — Japanese files have the **same filename** but live under `docs/ja/`. This Skill auto-detects this convention.

## Inputs

| Input | Type | Description |
|-------|------|-------------|
| target | path | File or directory to check |
| direction | `ja-en` \| `en-ja` | Source language direction (default: auto-detect from path) |
| threshold | number (0-1) | Minimum acceptable score (default: 0.85) |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| quality_report | Markdown | Embeddable report with scores and recommendations |
| segment_details | Table | Per-segment scores and issues |
| action_items | List | Specific corrections needed |
| terminology_check | List | Specialized terms that should remain in English (Context Rot, Lost in the Middle, etc.) |

## Constraints

### MUST

- Use `xcomet:xcomet_batch_evaluate` for multi-segment evaluation
- Set `source_lang` and `target_lang` correctly based on which is primary
- Generate report in embeddable Markdown format
- Include both summary and detailed segment scores
- **Preserve specialized terms in English on both sides** (Context Rot, Lost in the Middle, Priority Saturation, Hallucination, Sycophancy, Knowledge Boundary, Prompt Sensitivity, Instruction Decay, MCP, Skill, Sub-agent, etc.)

### SHOULD

- Evaluate at least 10 representative segments per document
- Include segment text in reports for segments scoring < 0.90
- Use `deepl:translate-text` for re-translation when `--fix` is specified
- Flag mismatched terminology (e.g., one side uses "コンテキストロット", the other uses "Context Rot")

### MUST NOT

- Mark documents as "Excellent" if any segment scores < 0.85
- Skip segments containing only code blocks
- Include raw JSON in final report (format as Markdown tables)
- Translate specialized English terms into Japanese katakana

## Workflow

### Step 1: File Pair Detection

```
For docs/ structure:
  EN file: docs/PART/FILE.md
  JA file: docs/ja/PART/FILE.md

For root:
  EN file: README.md
  JA file: README.ja.md

Detect pairs automatically. If only one side exists, report as missing translation.
```

### Step 2: Segment Extraction

```
Extract translatable segments from both files:
1. Document title (# heading)
2. Section headings (## / ### headings)
3. Key paragraphs (first 2-3 sentences per section)
4. Table content (cell text)
5. List items with substantive content
6. GitHub Alerts content ([!NOTE], [!TIP], [!IMPORTANT], etc.)

Skip:
- Code blocks (triple-backtick fences)
- URLs and links (but keep link text)
- Mermaid diagrams (but flag node labels for terminology check)
- Pure formatting elements
- Navigation footers (Previous / Next / 次へ / 前へ)
```

### Step 3: Quality Evaluation

```
Call xCOMET MCP with extracted pairs:

mcp: xcomet
tool: xcomet_batch_evaluate
params:
  pairs: [{ source: "English original", translation: "日本語訳" }, ...]
  source_lang: "en"
  target_lang: "ja"
  response_format: "markdown"
```

### Step 4: Terminology Check

In addition to xCOMET scores, verify these terms remain consistent on both sides:

| English term | Should remain as |
| --- | --- |
| Context Rot | Context Rot (NOT コンテキストロット) |
| Lost in the Middle | Lost in the Middle |
| Priority Saturation | Priority Saturation |
| Hallucination | Hallucination |
| Sycophancy | Sycophancy |
| Knowledge Boundary | Knowledge Boundary |
| Prompt Sensitivity | Prompt Sensitivity |
| Instruction Decay | Instruction Decay |
| CLAUDE.md | CLAUDE.md |
| MCP | MCP |
| Skill / Sub-agent | Skill / Sub-agent |
| /compact, /clear | /compact, /clear |

### Step 5: Result Classification

Apply decision criteria to scores and generate report.

### Step 6: Report Generation

Output embeddable Markdown with:
- Summary table
- Quality criteria reference
- Segment details (for scores < 0.95)
- Terminology check findings
- Recommendations

## Decision Criteria

| Condition | Action | Rationale |
|-----------|--------|-----------|
| Average ≥ 0.95 | ✅ Excellent - Publish | Professional quality |
| 0.90 ≤ Average < 0.95 | ✅ Good - Minor review | May benefit from polish |
| 0.85 ≤ Average < 0.90 | ⚠️ Review required | Check flagged segments |
| 0.70 ≤ Average < 0.85 | 🔄 Re-translate | Parameter adjustment needed |
| Average < 0.70 | ❌ Manual revision | Significant issues present |

### Per-Segment Criteria

| Score | Label | Action |
|-------|-------|--------|
| ≥ 0.95 | Excellent | No action needed |
| 0.90-0.94 | Good | Review if time permits |
| 0.85-0.89 | Acceptable | Consider revision |
| < 0.85 | Problematic | Must revise |

### Terminology Failure Criteria

Any of the following is treated as a **fail regardless of xCOMET score**:

- Specialized term translated into katakana when it should remain in English
- Code names (`/compact`, `CLAUDE.md`) translated
- Mismatched casing/spelling between English and Japanese sides

## Examples

### Example 1: Single Part Evaluation

**Input:**

```
/check-translation docs/ja/01-llm-structural-problems/context-rot.md
```

**Process:**

1. Detect pair: `docs/01-llm-structural-problems/context-rot.md` ↔ `docs/ja/01-llm-structural-problems/context-rot.md`
2. Extract 18 segments
3. Call `xcomet:xcomet_batch_evaluate`
4. Average score: 0.973
5. Terminology check: ✅ All specialized terms preserved
6. Generate report

**Output:**

```markdown
## Translation Quality Report

### Summary

| Metric | Value |
|--------|-------|
| Files checked | 1 |
| Segments evaluated | 18 |
| Average score | **0.973** |
| Status | ✅ Excellent |
| Terminology | ✅ Pass |

### Recommendation

✅ Ready for publication without changes.
```

### Example 2: Full Repository Batch Evaluation

**Input:**

```
/check-translation docs/
```

**Process:**

1. Find all file pairs across `docs/` and `docs/ja/` (50+ pages)
2. Extract 400+ total segments
3. Batch evaluate
4. Generate comprehensive report

**Output:**

```markdown
## Translation Quality Report

### Summary

| Metric | Value |
|--------|-------|
| Files checked | 52 |
| Segments evaluated | 423 |
| Average score | **0.964** |
| Status | ✅ Excellent |
| Critical errors | 0 |
| Terminology issues | 2 |

### Per-Part Results

| Part | Score | Status |
|------|-------|--------|
| Part 1: Structural Problems | 0.978 | ✅ |
| Part 2: Context Window | 0.971 | ✅ |
| Part 3: CLAUDE.md | 0.962 | ✅ |
| Part 10: Multi-Session | 0.945 | ✅ |

### Terminology Findings

| File | Issue |
|------|-------|
| 04-conditional-context/rules.md | "Glob Pattern" → "グロブパターン" (should remain "Glob Pattern") |

### Recommendation

✅ Overall excellent quality. Review 1 segment and fix 1 terminology issue above.
```

## Anti-Patterns

### Pattern: Raw Score Reporting

**Problematic:** `Score: 0.9750812888145447`

**Correct:** `Score: **0.975** (Excellent)`

### Pattern: Translating Specialized Terms

**Problematic:**

| Source | Translation |
|--------|-------------|
| Context Rot causes degradation | コンテキストの腐敗が劣化を引き起こす |

**Correct:**

| Source | Translation |
|--------|-------------|
| Context Rot causes degradation | Context Rot が劣化を引き起こす |

### Pattern: Missing Context in Report

**Problematic:** `3 segments below threshold`

**Correct:**

| Source | Translation | Score |
|--------|-------------|-------|
| Actual text here | 実際のテキスト | 0.84 |

## Related MCPs

| MCP | Usage | Required |
|-----|-------|----------|
| xcomet-mcp-server | xcomet_batch_evaluate, xcomet_evaluate | Required |
| deepl-mcp | translate-text (for --fix option) | Optional |

## References

- [xCOMET MCP Server](https://github.com/shuji-bonji/xcomet-mcp-server)
- [Sister project: ai-agent-architecture / translation-quality skill](https://github.com/shuji-bonji/ai-agent-architecture/blob/main/.claude/skills/translation-quality/SKILL.md) — Reference implementation
- [CLAUDE.md (this project)](../../../CLAUDE.md) — Style and language conventions
