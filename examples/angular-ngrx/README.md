# Angular/NgRx プロジェクト設定例

> Angular 18 + NgRx + RxJS プロジェクトにおける Claude Code 設定の実践例。

## 概要

この例では、Angular/NgRx プロジェクトにおいて、LLM の構造的問題に対応した Claude Code の設定をどう構築するかを示す。

## 予定する内容

- [ ] CLAUDE.md の設計例（200行以内）
- [ ] `.claude/rules/` の設計例（NgRx, RxJS, Component, Testing）
- [ ] `.claude/skills/` の設計例（コンポーネント生成、PRレビュー）
- [ ] `.claude/agents/` の設計例（コードレビュー専門エージェント）
- [ ] Hooks の設計例（lint, テスト自動実行）
- [ ] settings.json の設計例

## 対応する構造的問題

| 設定 | 対応する問題 |
|:--|:--|
| CLAUDE.md 200行以内 | Priority Saturation |
| NgRx ルール（条件付き） | Priority Saturation, Lost in the Middle |
| テスト自動実行 Hook | Hallucination, Sycophancy |
| レビュー専門 Agent | Sycophancy, Knowledge Boundary |

---

> **TODO**: 具体的な設定ファイルを追加予定
