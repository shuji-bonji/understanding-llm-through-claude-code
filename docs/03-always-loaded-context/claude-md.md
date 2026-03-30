# CLAUDE.md の設計原理

> [!IMPORTANT]
> → Why: **Priority Saturation** 対策（200行制限の根拠）
> → Why: **Prompt Sensitivity** 対策（具体的・命令的記述）

## CLAUDE.md とは

CLAUDE.md はセッション開始時に自動で読み込まれ、**毎ターン**コンテキストウィンドウを消費し続ける「常駐メモリ」。LLM からはシステムリマインダーとして注入される。

| 属性 | 値 |
|:--|:--|
| 注入タイミング | セッション開始時に自動読み込み |
| コンテキスト消費 | 常時（毎ターン消費し続ける） |
| LLM からの見え方 | システムリマインダーとして注入 |
| 推奨サイズ | **200行以内** |

## なぜ 200 行以内なのか

→ **Priority Saturation** の研究知見に基づく。

- 200行 ≈ 約 2,000〜3,000 トークン
- ManyIFEval が示した劣化閾値（~3,000 トークン）とほぼ一致
- 200行内に収めることで約 30〜40 個のアクティブな指示を維持
- 個々の指示の遵守率を実用的なレベルに保つ

> [!IMPORTANT]
> 詳細: [Priority Saturation](../01-llm-structural-problems/priority-saturation.md)

## 何を書くべきか

CLAUDE.md には「LLM がコードを読んだだけでは推測できない情報」を書く。

### 書くべき内容

- プロジェクトの技術スタック（Angular 18 + NgRx + .NET 8）
- フレームワークレベルの設計判断
- ビルド・テストコマンド（`npm run test:ci`）
- コミット規約（Conventional Commits）
- 禁止事項（any型禁止、console.log禁止）

### 書くべきでない内容

- コードスタイル（.editorconfig / eslint が担当）
- LLM がコードベースから推測できるパターン
- 特定ファイル種別にしか適用されないルール → `.claude/rules/` へ
- 特定タスクのワークフロー → `.claude/skills/` へ

## 効果的な書き方

> [!TIP]
> **Prompt Sensitivity** 対策として、具体的・命令的な記述が重要。

```markdown
# ❌ 曖昧（Prompt Sensitivity が高い）
- テストをちゃんと書いてね
- コードはきれいにしてほしい

# ✅ 具体的（Prompt Sensitivity が低い）
- 全ての public メソッドに対して Jasmine テストを作成する
- テストファイルは *.spec.ts に配置する
- describe/it の構造で記述する
```

## Start Small 原則

CLAUDE.md は「最初から完璧に書く」のではなく、**失敗を観察してから追加する**のが正しい運用:

1. 最小限の内容で開始
2. LLM が期待と異なる出力をした時にルールを追加
3. 定期的に見直し、不要になったルールを削除
4. 200行を超えそうなら `.claude/rules/` や `.claude/skills/` に移動

---

> **次へ**: [階層マージの仕組み](hierarchy.md)
