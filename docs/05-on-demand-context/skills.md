# Skills の設計原理

> [!IMPORTANT]
> → Why: **Context Rot** 対策（必要時のみコンテキストに展開）
> → Why: **Prompt Sensitivity** 対策（description 設計で自動呼び出し精度を向上）

## Skills とは

Skills はユーザーの `/` 呼び出し、または LLM の自動判断でコンテキストに読み込まれるオンデマンドの専門知識。

| 属性 | 値 |
|:--|:--|
| 注入タイミング | ユーザーが `/` で呼出 or LLM が自動判断 |
| コンテキスト消費 | 呼び出し時のみ |
| LLM からの見え方 | タスク固有の詳細な手順書 |
| 配置場所 | `.claude/skills/<skill-name>/SKILL.md` |

## CLAUDE.md / Rules との本質的な違い

CLAUDE.md と Rules は**受動的**に注入される。Skills は**能動的**に注入される。

```
CLAUDE.md  = グローバル変数（常にスコープ内）     ← 最小限に保つ
Rules      = 条件付きグローバル（特定条件で有効） ← ファイル種別ごと
Skills     = import/require（必要時に読込）        ← タスク固有の詳細
```

## Skill の構造

```
.claude/skills/
└── component-generator/
    ├── SKILL.md              # 必須：LLMへの指示書
    ├── scripts/              # 任意：実行スクリプト
    ├── references/           # 任意：参照ドキュメント
    └── assets/               # 任意：テンプレートファイル
```

## description の重要性

> [!TIP]
> **Prompt Sensitivity** 対策の核心。
>
> LLM が Skill を自動で呼び出すかどうかは `description` フィールドに依存する。LLM は推論処理の中でユーザーの要求と description の意味的類似度を評価して呼び出しを判断する。

```yaml
# ❌ 曖昧（自動呼び出し失敗しやすい）
description: コンポーネント関連のタスク

# ✅ 具体的（多様な表現をカバー）
description: >
  Angularコンポーネントの新規作成。OnPush変更検知、
  NgRx Store接続、Jasmineテストを含むスキャフォールドを生成する。
  「コンポーネントを作って」「新しい画面を追加」等の要求で使用。
```

description は **LLM のための検索クエリ**。SEO の原理と同様に、ユーザーが使いそうな多様な表現を含めると呼び出し精度が上がる。

## シェルコマンドによる動的コンテキスト注入

`!` バッククォート構文で、Skill 起動時にシェルコマンドを実行し、その出力を LLM のコンテキストに注入できる。

```markdown
## PRコンテキスト
- PR差分: !`gh pr diff`
- 変更ファイル一覧: !`gh pr diff --name-only`
```

---

> **次へ**: [Agents の設計原理](agents.md)
