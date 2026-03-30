# globパターン設計の実践

> [!TIP]
> 効果的な glob パターンは、必要なルールを必要な時だけ注入する鍵。

## 基本構文

| パターン       | 意味                               |
| :------------- | :--------------------------------- |
| `*`            | 任意のファイル名                   |
| `**`           | 任意のディレクトリ深度             |
| `*.ts`         | 全ての .ts ファイル                |
| `src/**/*.ts`  | src/ 以下の全 .ts ファイル         |
| `**/*.spec.ts` | 全ディレクトリの .spec.ts ファイル |

## 複数パターンの指定

カンマ区切りで複数の glob パターンを指定できる。

```yaml
---
globs: '**/*.actions.ts,**/*.effects.ts,**/*.reducer.ts'
---
```

## 設計のポイント

### 広すぎるパターンを避ける

```yaml
# ❌ 広すぎる — ほぼ全てのファイルで発火し、Rules の意味がない
globs: "**/*.ts"

# ✅ 適切な範囲
globs: "src/app/**/*.component.ts"
```

### ドメインごとに分離する

```
# ❌ 1ファイルに複数ドメイン
rules/frontend-rules.md  # globs: "**/*.ts" — コンポーネント、サービス、テスト全部

# ✅ ドメインごとに分離
rules/component-rules.md  # globs: "**/*.component.ts"
rules/service-rules.md    # globs: "**/*.service.ts"
rules/testing-rules.md    # globs: "**/*.spec.ts"
```

### テストファイルのルールは分離する

テスト固有のルール（Jasmine の書き方、モックの方針）はテストファイルにだけ適用すべき。プロダクションコード編集時にテストルールが注入されると、Priority Saturation を引き起こす。

---

> **前へ**: [.claude/rules/ の設計原理](rules.md)
> **Part 4 完了**: [Part 5: オンデマンドコンテキスト](../05-on-demand-context/index.md) へ
