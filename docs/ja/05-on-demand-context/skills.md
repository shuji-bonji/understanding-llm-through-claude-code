🌐 [English](../../05-on-demand-context/skills.md)

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

```sh
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

## 実例: e-shiwake の Skills（会計ドメイン知識の注入）

[e-shiwake](https://github.com/shuji-bonji/e-shiwake/tree/main/.claude/skills/e-shiwake-accounting) は個人事業主向けの PWA 会計アプリで、会計という専門ドメインの知識を Skills で LLM に注入している。

```sh
.claude/skills/e-shiwake-accounting/
├── SKILL.md              # エントリポイント: ドメイン概要と動作モード
├── ACCOUNT-CODES.md      # 勘定科目体系（4桁コード・30科目・税区分）
├── BROWSER-OPERATIONS.md # ブラウザ操作手順（WebMCP なし環境用）
└── WEBMCP-TOOLS.md       # WebMCP ツールリファレンス（Chrome 146+）
```

### 4層構造の設計意図

| ファイル | 役割 | 対応する構造的問題 |
|:--|:--|:--|
| SKILL.md | ドメイン全体の概要・用語定義 | Knowledge Boundary |
| ACCOUNT-CODES.md | 勘定科目という参照データ | Knowledge Boundary |
| BROWSER-OPERATIONS.md | UI 操作手順（LLM が自力では知り得ない） | Knowledge Boundary |
| WEBMCP-TOOLS.md | 利用可能ツールの仕様 | Hallucination（存在しないツールの捏造防止） |

<details>
<summary>SKILL.md — エントリポイント（ドメイン概要と動作モード）</summary>

```markdown
# e-shiwake 会計スキル

e-shiwake（電子仕訳）は個人事業主・フリーランス向けの PWA 会計アプリ。

## できること
- 仕訳入力・管理
- 帳簿・決算書の確認（試算表、損益計算書、貸借対照表）
- 消費税集計
- データ管理（バックアップ・リストア・エクスポート）

## 動作モード
- **WebMCP あり**（Chrome 146+）: ツールで直接操作
- **WebMCP なし**: ブラウザ操作ガイドに従って案内

## 基本原則
必ず 借方合計 = 貸方合計（複式簿記の鉄則）
```

</details>

<details>
<summary>WEBMCP-TOOLS.md — ツールリファレンス（抜粋）</summary>

```markdown
# WebMCP ツールリファレンス（Chrome 146+）

## 仕訳管理
- search_journals: テキスト・日付・科目コードで検索（スペース区切りAND検索）
- create_journal: 仕訳作成（借方合計=貸方合計が必須）
- delete_journal: 仕訳削除

## 財務レポート
- generate_ledger: 総勘定元帳（科目別）
- generate_trial_balance: 試算表
- generate_profit_loss: 損益計算書
- generate_balance_sheet: 貸借対照表
- calculate_consumption_tax: 消費税集計

## 利用開始時の推奨手順
最初に get_available_years で利用可能な年度を確認すること。
```

</details>

### llms.txt との連携

この Skills は単体で全仕様を抱え込まず、アプリが提供する `llms.txt` や各ヘルプページの `content.md` を**Single Source of Truth** として参照する設計になっている。Skills 内に仕様を重複記載しないことで、アプリの更新時にドキュメントが乖離するリスクを減らしている。

> [!IMPORTANT]
> Skills は「LLM に専門知識を与える」だけでなく、**「どこを参照すべきかを教える」**ポインタとしても機能する。仕様そのものを Skills に書くのではなく、**信頼できる情報源への参照パス**を示すことで、Context Rot と情報の陳腐化を同時に防げる。
>
> → 実プロジェクト: [e-shiwake/.claude/skills/](https://github.com/shuji-bonji/e-shiwake/tree/main/.claude/skills/e-shiwake-accounting)

## シェルコマンドによる動的コンテキスト注入

`!` バッククォート構文で、Skill 起動時にシェルコマンドを実行し、その出力を LLM のコンテキストに注入できる。

```markdown
## PRコンテキスト
- PR差分: !`gh pr diff`
- 変更ファイル一覧: !`gh pr diff --name-only`
```

---

> **前へ**: [Part 4: 条件付きコンテキスト](../04-conditional-context/index.md)

> **次へ**: [Agents の設計原理](agents.md)
