🌐 [English](../../04-conditional-context/rules.md)

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

YAML フロントマターの `globs` フィールドで、**Claude Code が操作（読み取り・編集）するファイル** に対する条件を指定する。

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

## 実例: e-shiwake の Rules（SvelteKit + PWA）

[e-shiwake](https://github.com/shuji-bonji/e-shiwake/tree/main/.claude/rules) では、3つの異なるパターンの Rules を運用している。

```sh
.claude/rules/
├── help-sync.md          # ドキュメント同期ルール
├── indexeddb-proxy.md    # フレームワーク固有のワークアラウンド
└── route-change.md       # ルート変更時のチェックリスト
```

### パターン 1: 同期ルール（help-sync.md）

ページや UI コンポーネントを変更したら、対応するヘルプドキュメント（`content.md` + `+page.svelte`）も同時に更新することを強制する。LLM は「機能を直す」ことには注力するが、「ドキュメントも直す」ことを忘れやすい。このルールがないと、コードとドキュメントが乖離する。

<details>
<summary>help-sync.md の実際の内容</summary>

```markdown
# ヘルプドキュメント同期ルール

以下のファイルを変更した場合、対応するヘルプページも更新すること。

| 変更対象 | 更新すべきヘルプ |
|---|---|
| src/routes/{slug}/+page.svelte | src/routes/help/{slug}/content.md + +page.svelte |
| src/lib/components/** | 関連するヘルプページ |

- content.md と +page.svelte は必ず同時に更新する（片方だけの更新は禁止）
- content.md がその機能の仕様における Single Source of Truth
- 機能一覧に影響がある場合は llms.txt/+server.ts も更新する
```

</details>

### パターン 2: 技術的ワークアラウンド（indexeddb-proxy.md）

Svelte 5 の `$state` が生成する Proxy オブジェクトは IndexedDB に直接保存できない。`$state.snapshot()` だけでは不十分で、`JSON.parse(JSON.stringify($state.snapshot(value)))` が必要。LLM の学習データにはこの知識が十分含まれていない可能性が高く、Rules で明示する価値が大きい。

<details>
<summary>indexeddb-proxy.md の実際の内容</summary>

```markdown
# Svelte 5 + IndexedDB: Proxy 問題

Svelte 5 の $state が生成する Proxy オブジェクトは
IndexedDB に直接保存できない。

## 安全な変換パターン
JSON.parse(JSON.stringify($state.snapshot(value)))

## NG パターン
- structuredClone() → DataCloneError が発生
- $state.snapshot() のみ → ネストした配列・オブジェクトが Proxy のまま残る

対象パス: src/lib/db/**/*.ts, src/lib/components/**/*.svelte
```

</details>

### パターン 3: チェックリスト（route-change.md）

SvelteKit でルートを追加・削除する際に更新すべきファイル一覧（`svelte.config.js`、`sitemap.xml`、`CLAUDE.md`、`README.md`、`llms.txt`）を列挙。Instruction Decay によって長いセッション中に手順を忘れることを防ぐ。

<details>
<summary>route-change.md の実際の内容</summary>

```markdown
# ルート変更時の必須チェックリスト

ルートの追加・削除・変更時は以下を全て更新すること。

1. svelte.config.js — prerender.entries を更新
2. static/sitemap.xml — URL を追加・削除
3. CLAUDE.md — サイトマップセクションを更新
4. README.md — ページ構成セクションを更新

ヘルプページの場合はさらに:
5. content.md の作成・削除
6. llms.txt/+server.ts のヘルプリンク一覧を更新
```

</details>

> [!TIP]
> 3つの Rules がそれぞれ異なる構造的問題に対応している点に注目:
> - **help-sync.md** → 変更の波及先を忘れる問題（Instruction Decay）
> - **indexeddb-proxy.md** → LLM が知らない知識の補完（Knowledge Boundary）
> - **route-change.md** → 手順の抜け漏れ防止（Instruction Decay, Priority Saturation）

## CLAUDE.md から Rules への移動基準

以下の条件を満たすルールは CLAUDE.md から Rules に移動すべき。

1. **特定のファイル種別にしか適用されない**: `.component.ts` 専用のルールなど
2. **CLAUDE.md が 200 行を超えそう**: 優先度の低いルールから移動
3. **他のルールと注意を奪い合う**: 無関係なドメインのルール同士

---

> **前へ**: [Part 3: 常駐コンテキストを設計する](../03-always-loaded-context/index.md)

> **次へ**: [globパターン設計の実践](glob-patterns.md)
