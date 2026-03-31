# Part 8: セッション管理と記憶の永続化

> [!NOTE]
> 会話の寿命と記憶の運用。
> `/compact` と `/clear` はPart 2（理論）ではなくここ（運用）に配置。
> 理論的根拠は Part 1・2 にあり、ここでは実践的な運用を扱う。

## なぜ重要なのか

LLM のセッションは有限である。会話が長くなるほど Context Rot が進行し、Instruction Decay が発生する。セッションの適切な管理は、LLM の品質を維持するための最も実践的な対策である。

## → Why: どの構造的問題に対応しているか

> [!IMPORTANT]
> - **Context Rot**: `/compact` による予防的圧縮でトークン蓄積を抑制
> - **Lost in the Middle**: 50%使用率前に圧縮することでU字カーブ崩壊を防ぐ
> - **Instruction Decay**: `/clear` によるセッション分割で劣化をリセット

## このパートのドキュメント

| ドキュメント | 内容 |
|:--|:--|
| [/compact と /clear の使い分け](compact-and-clear.md) | いつ圧縮し、いつリセットするか |
| [なぜメモリが問題になるのか](memory-problem.md) | セッション間の情報喪失問題 |
| [何を覚えるか](what-to-remember.md) | 永続化すべき情報の選別 |
| [いつ・どう思い出すか](when-to-recall.md) | 記憶の呼び出し戦略 |
| [ツール比較と選定基準](tools-comparison.md) | 記憶ツールの比較 |

---

> **前へ**: [Part 7: LLMが見ないレイヤー](../07-runtime-layer/index.md)

> **次へ**: [Part 9: 他LLMへの応用](../09-cross-llm-principles/index.md)
