# /check-translation

Evaluate translation quality of English ↔ Japanese documents using xCOMET.

## Usage

```
/check-translation <path> [options]
```

## Arguments

| Argument | Description | Example |
|----------|-------------|---------|
| `<path>` | File or directory to check | `docs/ja/01-llm-structural-problems/` |

## Options

| Option | Description |
|--------|-------------|
| `--direction <ja-en\|en-ja>` | Source language direction (default: auto-detect) |
| `--threshold <score>` | Custom quality threshold (default: 0.85) |
| `--fix` | Attempt to fix low-quality translations with DeepL |

## Workflow

This command uses the `translation-quality` skill and performs:

1. **Detect pairs**: Find English ↔ Japanese file pairs
   - For `docs/`: pairs `docs/PART/FILE.md` ↔ `docs/ja/PART/FILE.md`
   - For root: pairs `README.md` ↔ `README.ja.md`
2. **Extract segments**: Parse markdown and extract translatable text blocks
3. **Evaluate**: Call `xcomet:xcomet_evaluate` or `xcomet:xcomet_batch_evaluate`
4. **Terminology check**: Verify specialized English terms remain preserved (Context Rot, Lost in the Middle, etc.)
5. **Report**: Generate quality report with scores and recommendations
6. **Fix (optional)**: Re-translate low-scoring segments with `deepl:translate-text`

## Examples

### Check a single Part

```
/check-translation docs/ja/01-llm-structural-problems/
```

### Check the README pair

```
/check-translation README.md
```

### Check the entire documentation tree

```
/check-translation docs/
```

### Check with custom threshold and auto-fix

```
/check-translation docs/ --threshold 0.90 --fix
```

### Check a specific page

```
/check-translation docs/ja/05-on-demand-context/skills.md
```

## Output Format

```
## Translation Quality Report

### Summary
- Files checked: 52
- Average score: 0.964
- Status: ✅ Excellent
- Terminology issues: 0

### Per-Part Results

| Part | Score | Status |
|------|-------|--------|
| Part 1: Structural Problems | 0.978 | ✅ Excellent |
| Part 2: Context Window | 0.971 | ✅ Excellent |
| ...  | ...   | ...   |

### Recommendations
- Part 5 / skills.md: Consider revising 2 segments below 0.90
```

## Quality Thresholds

Refer to the `translation-quality` skill for detailed criteria:

| Score | Action |
|-------|--------|
| ≥ 0.95 | ✅ Excellent - Publish |
| 0.85-0.94 | ✅ Good - Minor review |
| 0.70-0.84 | ⚠️ Review required |
| < 0.70 | ❌ Re-translate |

## Terminology Preservation

This command also checks that specialized English terms remain in English on both sides:

- LLM structural problems: Context Rot, Lost in the Middle, Priority Saturation, Hallucination, Sycophancy, Knowledge Boundary, Prompt Sensitivity, Instruction Decay
- Claude Code concepts: CLAUDE.md, MCP, Skill, Sub-agent
- Slash commands: /compact, /clear

Any translation that converts these to Japanese katakana is reported as a terminology issue, regardless of xCOMET score.

## Related

- Skill: `.claude/skills/translation-quality/SKILL.md`
- MCP: `xcomet:xcomet_evaluate`, `xcomet:xcomet_batch_evaluate`, `deepl:translate-text`
- Conventions: `CLAUDE.md` (i18n rules, language conventions)
- Sister project: [ai-agent-architecture / check-translation](https://github.com/shuji-bonji/ai-agent-architecture/blob/main/.claude/commands/check-translation.md)
