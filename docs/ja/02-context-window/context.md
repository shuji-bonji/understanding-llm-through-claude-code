🌐 [English](../../02-context-window/context.md)

# Context — 1回の推論に渡す全情報

> [!NOTE]
> **一言で言うと**: Context とは、1回の推論で LLM に渡される情報の全体である。
> LLM は前回の内容を内部に保持しない。渡された Context だけを読んで応答する。

## Context とは何か

Context（コンテキスト）とは、**LLM が1回の応答を生成するために参照するすべてのテキスト**である。システム指示、プロジェクトルール、会話履歴、ツール定義、ツールの実行結果を含む。

開発者の日常で例えると、次のように対応する。

| 比喩 | Context に相当するもの |
| :-- | :-- |
| 関数呼び出し | 引数として渡される全データ |
| HTTP リクエスト | リクエストボディ全体 |
| コンパイル | コンパイラに渡されるソースファイル群 |

## なぜ重要か

LLM はステートレスである。過去の会話を「覚えている」のではない。アプリケーションが、会話履歴を含むすべてのテキストを毎回 Context として渡し、それを読んで応答を生成する。

何を載せるか、何を載せないかが設計になる。履歴が増えるほど Context は膨らむ。これが Part 1 で学んだ [Context Rot](../01-llm-structural-problems/context-rot.md) と [Instruction Decay](../01-llm-structural-problems/instruction-decay.md) の物理的な原因である。

## Context に入りうるもの

代表例として Claude Code を用いると、1回の推論の Context には次のようなものが載りうる。

```mermaid
graph TD
    subgraph CONTEXT["Context（LLM に渡される全テキスト）"]
        direction TB
        SP["System Prompt<br/>（振る舞いの定義）"]
        CLAUDE["CLAUDE.md<br/>（プロジェクト知識）"]
        RULES["Rules<br/>（条件付きルール）"]
        HISTORY["会話履歴<br/>（ユーザー入力 + 過去の応答）"]
        TOOLS["MCP ツール定義"]
    end

    USER["ユーザーの新しい入力"]
    LLM_PROC(["LLM が Context 全体を読んで応答を生成"])
    RESPONSE["応答"]

    USER --> CONTEXT
    CONTEXT --> LLM_PROC
    LLM_PROC --> RESPONSE

    classDef ctx fill:#fef9c3,stroke:#a16207,color:#000
    classDef process fill:#eff6ff,stroke:#1d4ed8,color:#1e40af,font-weight:bold
    classDef io fill:#f3f4f6,stroke:#374151,color:#000
    class SP,CLAUDE,RULES,HISTORY,TOOLS ctx
    class LLM_PROC process
    class USER,RESPONSE io
```

同じ粒度のファイル名が他ツールにあるとは限らない。共通しているのは、「毎回渡す情報」「条件付きで渡す情報」「履歴として積み上がる情報」という区分である。

## ステートレスであることの意味

REST API に馴染みのある開発者なら直感しやすい。LLM の応答生成は HTTP リクエストと同じく、**リクエストごとに独立**している。

```mermaid
block-beta
  columns 4

  block:all:5
    columns 8

    t1["ターン 1"]:8
    sp1["System Prompt"] cm1["CLAUDE.md"] u1["ユーザー入力1"] r1<["→ 応答1"]>(right) space:4

    space:8

    t2["ターン 2"]:8
    sp2["System Prompt"] cm2["CLAUDE.md"] u2a["ユーザー入力1"] a1["応答1"] u2b["ユーザー入力2"] r2<["→ 応答2"]>(right) space:2

    space:8

    t3["ターン 3"]:8
    sp3["System Prompt"] cm3["CLAUDE.md"] u3a["ユーザー入力1"] a2["応答1"] u3b["ユーザー入力2"] a3["応答2"] u3c["ユーザー入力3"] r3<["→ 応答3"]>(right)
  end

  style t1 fill:#e5e7eb,stroke:none,color:#000
  style t2 fill:#e5e7eb,stroke:none,color:#000
  style t3 fill:#e5e7eb,stroke:none,color:#000

  style r1 fill:#e5e7eb,stroke:none,color:#000
  style r2 fill:#e5e7eb,stroke:none,color:#000
  style r3 fill:#e5e7eb,stroke:none,color:#000

  style sp1 fill:#eff6ff,stroke:#1d4ed8,color:#000
  style sp2 fill:#eff6ff,stroke:#1d4ed8,color:#000
  style sp3 fill:#eff6ff,stroke:#1d4ed8,color:#000

  style cm1 fill:#dcfce7,stroke:#15803d,color:#000
  style cm2 fill:#dcfce7,stroke:#15803d,color:#000
  style cm3 fill:#dcfce7,stroke:#15803d,color:#000

  style u1 fill:#fef9c3,stroke:#a16207,color:#000
  style u2a fill:#fef9c3,stroke:#a16207,color:#000
  style u2b fill:#fef9c3,stroke:#a16207,color:#000
  style u3a fill:#fef9c3,stroke:#a16207,color:#000
  style u3b fill:#fef9c3,stroke:#a16207,color:#000
  style u3c fill:#fef9c3,stroke:#a16207,color:#000

  style a1 fill:#f3e8ff,stroke:#7c3aed,color:#000
  style a2 fill:#f3e8ff,stroke:#7c3aed,color:#000
  style a3 fill:#f3e8ff,stroke:#7c3aed,color:#000
```

LLM は過去の会話を覚えているのではなく、毎ターン、全履歴を読んでいる。ターンが進むほど Context が膨らむ。

セッションをまたぐ「記憶」が必要なら、ファイルなど Context の外に書く。渡さなければ、次の推論には存在しない。

## Part 1 の問題との接続

- **Context Rot**: 入力トークンが増えるほど品質が劣化する。Context が長いほど起きやすい。
- **Instruction Decay**: 長い会話で初期指示への遵守が落ちる。履歴の膨張が時間軸で効く。

対策の型は共通する。載せる情報を選ぶ。長くなったら区切る、または圧縮する。重要な決定はファイルに残す。

## 次に進む前に

Context は「中身」である。次に見る Context Window は、その中身の上限である。上限まで使ってよいわけではない。

---

> **前へ**: [Token — LLM の処理単位](token.md)

> **次へ**: [Context Window — 上限と安全に使える範囲](context-window.md)
