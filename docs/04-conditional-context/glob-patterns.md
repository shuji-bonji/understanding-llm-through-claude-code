🌐 [日本語](../ja/04-conditional-context/glob-patterns.md)

# Practical glob Pattern Design

> [!TIP]
> Effective glob patterns are the key to injecting necessary rules at the right time.

## Basic Syntax

| Pattern | Meaning |
| :--- | :--- |
| `*` | Any filename |
| `**` | Any directory depth |
| `*.ts` | All .ts files |
| `src/**/*.ts` | All .ts files under src/ |
| `**/*.spec.ts` | .spec.ts files in any directory |

## Specifying Multiple Patterns

You can specify multiple glob patterns separated by commas.

```yaml
---
globs: '**/*.actions.ts,**/*.effects.ts,**/*.reducer.ts'
---
```

## Design Points

### Avoid Overly Broad Patterns

```yaml
# ❌ Too broad — fires on almost all files, making Rules pointless
globs: "**/*.ts"

# ✅ Appropriate scope
globs: "src/app/**/*.component.ts"
```

### Separate by Domain

```
# ❌ Multiple domains in one file
rules/frontend-rules.md  # globs: "**/*.ts" — all components, services, tests

# ✅ Separate by domain
rules/component-rules.md  # globs: "**/*.component.ts"
rules/service-rules.md    # globs: "**/*.service.ts"
rules/testing-rules.md    # globs: "**/*.spec.ts"
```

### Separate Test File Rules

Rules specific to testing (Jasmine conventions, mocking policies) should only apply to test files. When test rules are injected during production code editing, it causes Priority Saturation.

---

> **Previous**: [Design Principles of .claude/rules/](rules.md)

> **Part 4 Complete → Next**: [Part 5: On-Demand Context](../05-on-demand-context/index.md)
