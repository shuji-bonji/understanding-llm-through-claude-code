# .claude/rules/ の設計原理

> [!IMPORTANT]
> → Why: **Priority Saturation** 対策（条件付き分散で同時有効指示数を削減）
> → Why: **Lost in the Middle** 対策（必要なルールだけを高注意位置に注入）

## Rules とは

`.claude/rules/` は glob パターンに一致するファイルを操作する時だけ、コンテキストに注入されるルールファイル。

| 属性             | 値                                        |
| :--------------- | :---------------------------------------- |
| 注入タイミング   | glob パターンに一致するファイル操作時のみ |
| コンテキスト消費 | 条件一致時のみ                            |
| LLM からの見え方 | CLAUDE.md と同じ優先度のプロジェクト指示  |
| 推奨サイズ       | 1ファイル1ドメイン、焦点を絞る            |

## なぜ存在するのか

CLAUDE.md の **Priority Saturation 問題**を解決する仕組み。

全てのルールを CLAUDE.md に書くと、API のバリデーションルールが React のコンポーネント規約と同時に読み込まれ、互いに注意を奪い合う。Rules は「今触っているファイルに関連するルールだけ」を LLM に見せることで、限られたコンテキスト内での指示の効果密度を最大化する。Part 2 で学んだ Context Budget の観点では、条件一致時のみ注入することで常駐コンテキストの消費を抑え、変動枠に余裕を持たせることができる。

## ルールの書き方

YAML フロントマターの `globs` フィールドで条件を指定する。

```markdown
---
globs: 'src/app/**/*.component.ts'
---

# Angular Component Rules

- OnPush変更検知を必須とする
- templateUrlではなくinline templateを使用
- @Input()には必ずset/getでイミュータブルな扱いをする
```

この場合、`src/app/` 配下の `.component.ts` ファイルを編集する時だけ注入される。

## Angular プロジェクトでの設計例

```sh
.claude/rules/
├── ngrx-patterns.md        # globs: "**/*.actions.ts,**/*.effects.ts,**/*.reducer.ts"
├── rxjs-practices.md       # globs: "**/*.ts"
├── component-rules.md      # globs: "**/*.component.ts"
├── testing.md              # globs: "**/*.spec.ts"
└── e2e-testing.md          # globs: "e2e/**/*.ts"
```

## CLAUDE.md から Rules への移動基準

以下の条件を満たすルールは CLAUDE.md から Rules に移動すべき。

1. **特定のファイル種別にしか適用されない**: `.component.ts` 専用のルールなど
2. **CLAUDE.md が 200 行を超えそう**: 優先度の低いルールから移動
3. **他のルールと注意を奪い合う**: 無関係なドメインのルール同士

---

> **前へ**: [Part 3: 常駐コンテキストを設計する](../03-always-loaded-context/index.md)

> **次へ**: [globパターン設計の実践](glob-patterns.md)
