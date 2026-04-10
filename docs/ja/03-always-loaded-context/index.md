🌐 [English](../../03-always-loaded-context/index.md)

# Part 3: 常駐コンテキスト — CLAUDE.md

> [!NOTE]
> セッション開始時に常に読み込まれる情報。
> コンテキスト予算における「固定費」であり、最も慎重な管理が必要。

## なぜ重要なのか

CLAUDE.md はLLMが**毎ターン読む**情報。つまり、ここに書いたことは常にコンテキスト予算を消費し続ける。書きすぎれば Priority Saturation を引き起こし、書かなすぎれば LLM が重要な制約を知らずにコードを生成する。

## → Why: どの構造的問題に対応しているか

> [!IMPORTANT]
> - **Priority Saturation**: 200行制限は、同時有効指示数を劣化閾値以下に保つための設計
> - **Prompt Sensitivity**: 具体的・命令的な記述は、表現の曖昧さによる結果変動を抑える
> - **Context Rot**: 階層マージとスコープ分離は、不要な情報の蓄積を防ぐ

## このパートのドキュメント

| ドキュメント | 内容 |
|:--|:--|
| [CLAUDE.md の設計原理](claude-md.md) | 何を書くべきか、なぜ200行なのか |
| [階層マージの仕組み](hierarchy.md) | グローバル → プロジェクト → ローカル → サブディレクトリ |
| [CLAUDE.local.md の運用](local-md.md) | Git管理外の個人設定 |

---

> **前へ**: [Part 2: コンテキストウィンドウを理解する](../02-context-window/index.md)
> **次へ**: [Part 4: 条件付きコンテキスト](../04-conditional-context/index.md)
