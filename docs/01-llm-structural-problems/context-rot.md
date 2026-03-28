# Context Rot（文脈腐敗）— トークンが増えると出力品質が低下する

> **一言で言うと**: LLM の入力トークン数が増えるにつれて、出力品質が劣化する現象。
> 200K トークンの容量があっても、50K トークンで既に劣化が始まる。
> エラーにならないため気づきにくい、LLM 最大の構造的制約。

## Context Rot とは何か

Context Rot とは、**入力長が増えるごとにパフォーマンスが低下する**現象である。

Chroma の 2025 年研究で、GPT-4.1 や Claude Opus 4 など 18 のモデル全てで確認された。重要なのは、これがコンテキストウィンドウの**オーバーフロー（容量超過）ではない**ということ。200K 容量のモデルが 50K トークンで既に劣化する。エラーにならないため気づきにくいのが特徴である。

## 3つのメカニズム

Context Rot は単一の現象ではなく、3つの異なるメカニズムの複合である。

### 1. Lost in the Middle（中間部の情報喪失）

LLM は先頭と末尾のトークンに強い注意を向ける一方、中間部への注意は著しく低下する（U字カーブ）。50% を超えるとU字カーブが変化し、直近トークン優先になる。

→ 詳細は [Lost in the Middle](lost-in-the-middle.md) を参照

### 2. Attention Dilution（注意の希薄化）

Transformer の自己注意機構は O(N²) のペアワイズ計算を行う。トークン数が 10 倍になると処理ペアは 100 倍に増加し、個々のトークンへの注意が相対的に低下する。

### 3. Distractor Interference（妨害情報の干渉）

無関係だが類似した情報がモデルを誤導する。構造化されたテキストほど誤った結果を生成しやすい。コーディングでは特に深刻で、類似した関数名やインポート文が干渉を引き起こす。

## セマンティック理解への影響

Context Rot はコーディングタスクで最も深刻になる。コードの理解には広い文脈のセマンティック理解が必要であり、変数の追跡、依存関係の把握、設計パターンの認識が全てコンテキスト長に依存するためである。

## 定量的な根拠

| モデル | 短コンテキスト精度 | 長コンテキスト精度 | 低下幅 |
|:--|:--|:--|:--|
| GPT-4.1 | 高 | 中 | 有意な低下 |
| Claude Opus 4 | 高 | 中 | 有意な低下 |
| 全18モデル | - | - | **全モデルで確認** |

> **重要**: 「LLMが賢くない」のではなく「入力設計が悪い」という視点が重要。

## Claude Code での対策

| 対策 | 仕組み | 対応するメカニズム |
|:--|:--|:--|
| **`/compact`** | 会話履歴を要約・圧縮し、トークン数を削減 | Attention Dilution, Distractor Interference |
| **`/clear`** | セッションをリセットし、新鮮なコンテキストで再開 | 全メカニズム |
| **CLAUDE.md 200行制限** | 常駐コンテキストの消費量を最小化 | Attention Dilution |
| **`.claude/rules/`** | 条件に一致する時だけルールを注入 | Distractor Interference |
| **Skills** | 必要な時だけ専門知識を展開 | Attention Dilution, Distractor Interference |
| **Agents** | 独立したコンテキストウィンドウで実行 | 全メカニズム（根本的回避） |
| **Hooks** | コンテキスト外で機械的に検証 | Context Rot の影響を受けない |
| **MCP Tool Search** | ツール定義を遅延ロード | Attention Dilution |

## 関連する構造的問題

- [Lost in the Middle](lost-in-the-middle.md) — Context Rot の最も具体的な発現
- [Priority Saturation](priority-saturation.md) — 指示密度の観点からの劣化
- [Instruction Decay](instruction-decay.md) — 時間軸での Context Rot の蓄積

## 参考文献

- Chroma (2025) - 18モデルでの Context Rot 定量測定

---

> **次へ**: [Lost in the Middle](lost-in-the-middle.md)

> **Discussion**: [#6 Context Rot](https://github.com/shuji-bonji/understanding-llm-through-claude-code/discussions/6)
