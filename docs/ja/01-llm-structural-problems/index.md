🌐 [English](../../01-llm-structural-problems/index.md)

# Part 1: LLMの構造的制約を知る

> [!NOTE]
> LLM は万能ではない。Transformer 系モデルには、入力の長さや注意の配分に起因する構造的な制約がある。
> 本 Part はその制約を定義する。対象は製品の設定手順ではなく、制約そのものである。

## なぜ構造的問題を知る必要があるのか

想定読者は、クラウド LLM を使う開発者である。目的は、制約の機序を理解し、自分の環境へ適用することである。

Claude Code の設定（CLAUDE.md、rules/、skills/、hooks など）は、LLM が抱える構造的問題への**設計的な回答**である。Claude Code を題材にするのは、現時点で詳細かつ正確に記述できる代表例だからである。

ここで学ぶ原則は、Cursor や Cline、あるいは素のプロンプト設計にも直接使える。同じ制約が現れる。同じ考え方で対処できる。

最終的な到達点は [Part 11: 他LLMへの応用](../11-cross-llm-principles/index.md) である。本 Part で制約を定義し、Part 2 以降で代表例の対策を見る。Part 11 で製品に依存しない原則を抽出する。

Claude Code における具体策の例は次のとおりである。

- CLAUDE.md の200行制限 → **Priority Saturation** への対策
- `.claude/rules/` の条件付き注入 → **Lost in the Middle** への対策
- Hooks の機械的検証 → **Hallucination** への対策

「なぜそう設定するのか（Why）」を理解するには、まず「LLM がどんな問題を抱えているか」を知る必要がある。

## 8つの構造的問題

LLM には以下の8つの構造的問題がある。これらは「バグ」ではなく、Transformer アーキテクチャと訓練プロセスに起因する**不可避な制約**である。

### コンテキスト関連（入力が増えるほど悪化する問題）

| 問題 | 一言で言うと | 詳細 |
|:--|:--|:--|
| [Context Rot](context-rot.md) | トークンが増えると出力品質が低下する | 200Kの容量があっても、50Kで既に劣化が始まる |
| [Lost in the Middle](lost-in-the-middle.md) | コンテキスト中間部の情報を無視する | 先頭と末尾に注意が集中し、中間部は30%以上の精度低下 |
| [Priority Saturation](priority-saturation.md) | 指示が多いと全体の遵守率が低下する | 10個の同時指示でGPT-4oは15%、Claude Sonnetは44%の遵守率 |

### 出力関連（生成内容の信頼性の問題）

| 問題 | 一言で言うと | 詳細 |
|:--|:--|:--|
| [Hallucination](hallucination.md) | 事実に反する内容を生成する | 数学的に「ゼロにできない」ことが証明されている |
| [Sycophancy](sycophancy.md) | ユーザーに同意し正確性を犠牲にする | RLHFの副作用。全モデル平均58%の追従率 |
| [Knowledge Boundary](knowledge-boundary.md) | 知識外の質問で「知らない」と言えない | 訓練目的関数に「知らない」への報酬がない |

### 入力感受性（プロンプトの書き方に依存する問題）

| 問題 | 一言で言うと | 詳細 |
|:--|:--|:--|
| [Prompt Sensitivity](prompt-sensitivity.md) | 表現の違いで結果が大きく変動する | 同じ意味でも最大76精度ポイントの差 |

### 時間軸（会話が長くなるほど悪化する問題）

| 問題 | 一言で言うと | 詳細 |
|:--|:--|:--|
| [Instruction Decay](instruction-decay.md) | 長い会話でルールを忘れる | 上記7問題の複合結果。マルチターンで平均39%性能低下 |

## 問題間の関係

これらの問題は独立して存在するのではなく、相互に増幅し合う。以下の図は、8つの構造的問題がどのように連鎖・増幅するかを視覚化したものである。

```mermaid
graph TD
    %% ── ノード定義 ──
    CR["Context Rot<br/>トークン増で品質劣化"]
    LM["Lost in the Middle<br/>中間部の情報喪失"]
    PS["Priority Saturation<br/>指示過多で遵守率低下"]
    HL["Hallucination<br/>構造的に不可避な幻覚"]
    SY["Sycophancy<br/>正確性より同意を優先"]
    KB["Knowledge Boundary<br/>「知らない」と言えない"]
    PM["Prompt Sensitivity<br/>表現で結果が変動"]
    ID["Instruction Decay<br/>長会話でルール忘却"]

    %% ── Context Rot 起点の連鎖 ──
    CR -->|"注意希薄化で<br/>中間部が死角に"| LM
    CR -->|"コンテキスト増で<br/>指示の有効性低下"| PS
    CR -->|"ハルシネーション率<br/>が上昇"| HL
    CR -->|"劣化に気づかず<br/>追従しやすく"| SY

    %% ── Lost in the Middle からの波及 ──
    LM -->|"中間の指示が<br/>無視される"| PS
    LM -->|"制約見落としで<br/>そのまま従う"| SY
    LM -->|"初期指示の忘却<br/>が加速"| ID

    %% ── Priority Saturation からの波及 ──
    PS -->|"注意が薄まり<br/>表現に左右される"| PM
    PS -->|"制約見落としで<br/>不正確な出力"| HL

    %% ── Knowledge Boundary → Hallucination 連鎖 ──
    KB -->|"知識の限界を超え<br/>誤答を生成"| HL
    KB -->|"限界を認めず<br/>期待に合わせる"| SY

    %% ── Sycophancy ↔ Hallucination フィードバック ──
    SY -->|"誤った内容を<br/>追認・増幅"| HL
    HL -->|"誤答をユーザーの<br/>同意で確定"| SY

    %% ── 全問題 → Instruction Decay（時間軸の複合） ──
    CR -->|"時間軸で蓄積"| ID
    PS -->|"新指示で初期指示の<br/>優先度が低下"| ID
    HL -->|"誤出力が推論基盤<br/>を劣化"| ID
    SY -->|"軌道修正が<br/>困難に"| ID
    PM -->|"表現が累積的に<br/>変化しズレる"| ID

    %% ── スタイル ──
    classDef cr fill:#fee2e2,stroke:#b91c1c,color:#000
    classDef lm fill:#ffedd5,stroke:#c2410c,color:#000
    classDef ps fill:#fef9c3,stroke:#a16207,color:#000
    classDef hl fill:#dbeafe,stroke:#1d4ed8,color:#000
    classDef sy fill:#f3e8ff,stroke:#7c3aed,color:#000
    classDef kb fill:#e8d5b7,stroke:#78350f,color:#000
    classDef pm fill:#dcfce7,stroke:#15803d,color:#000
    classDef id fill:#f3f4f6,stroke:#374151,color:#000

    class CR cr
    class LM lm
    class PS ps
    class HL hl
    class SY sy
    class KB kb
    class PM pm
    class ID id
```

**3つの主要カスケード**:

1. **空間的劣化**: Context Rot → Lost in the Middle → Priority Saturation（コンテキストが長くなるほど加速）
2. **信頼性の崩壊**: Knowledge Boundary → Hallucination ↔ Sycophancy（フィードバックループ）
3. **時間的複合**: 全7問題 → Instruction Decay（マルチターンで全てが合流）

## 構造的問題 × Claude Code 対策マップ

LLM には 8 つの構造的問題がある。下表の対策は Claude Code における代表例である。Part 2 以降で、各機能がこれらの問題にどう対応しているかを詳しく見る。製品に依存しない原則の抽出は [Part 11](../11-cross-llm-principles/index.md) で行う。

| 構造的問題 | 概要 | 主な対策（Claude Code） | 対応ドキュメント |
|:--|:--|:--|:--|
| [**Context Rot**](context-rot.md) | トークン増で出力品質が劣化 | `/compact`, `/clear`, コンテキスト予算管理 | Part 2, 3, 5, 6, 8 |
| [**Lost in the Middle**](lost-in-the-middle.md) | コンテキスト中間部の情報を無視 | `/compact`（50%閾値）, 条件付きルール, Agents | Part 2, 4, 5, 8 |
| [**Priority Saturation**](priority-saturation.md) | 指示過多で全体の遵守率低下 | CLAUDE.md 200行制限, `.claude/rules/`, Skills | Part 3, 4, 5 |
| [**Hallucination**](hallucination.md) | 事実に反する内容を生成（構造的に不可避） | Hooks（機械的検証）, テストコード, MCP | Part 6, 7 |
| [**Sycophancy**](sycophancy.md) | ユーザーに同意し正確性を犠牲に | Cross-model QA（Agents）, Hooks, 問い方設計 | Part 5, 7 |
| [**Knowledge Boundary**](knowledge-boundary.md) | 知識外で「知らない」と言えない | MCP外部参照, バージョン明示, 専門Agents | Part 3, 5, 6 |
| [**Prompt Sensitivity**](prompt-sensitivity.md) | 表現の違いで結果が大きく変動 | CLAUDE.md の書き方, Skills description設計 | Part 3, 5 |
| [**Instruction Decay**](instruction-decay.md) | 長会話でルール忘却（7問題の複合結果） | `/compact`, `/clear`, Hooks, セッション分割 | Part 7, 8 |

> 詳細版は [構造的問題 × Claude Code 対策マップ（付録）](../appendix/problem-countermeasure-map.md) を参照。

## この制約は Claude に限らない

8つの問題は、特定の製品の欠陥ではない。Transformer 系モデルと、その訓練プロセスに起因する。クラウド LLM を使う環境であれば、程度の差はあれ同じ制約が現れる。

Claude Code の対策表は、その制約に対する具体策の代表例である。同じ粒度の機能が他ツールに揃っているとは限らない。横断して使えるのは、次の考え方である。入力を短く保つ。重要な指示を埋もれさせない。検証をモデルの外に置く。詳細は [Part 11: 他LLMへの応用](../11-cross-llm-principles/index.md) にまとめる。

---

> **次へ**: [Part 2: コンテキストウィンドウを理解する](../02-context-window/index.md)
