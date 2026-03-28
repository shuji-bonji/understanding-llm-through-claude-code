# 構造的問題 × Claude Code 対策マップ（詳細版）

> 8つの構造的問題と Claude Code の各機能の対応関係を詳細に示す。

## 対策マップ

### Context Rot（トークン増で品質劣化）

| 対策                | 分類                 | 効果                                             |
| :------------------ | :------------------- | :----------------------------------------------- |
| `/compact`          | セッション管理       | 会話履歴を圧縮してトークン数を削減               |
| `/clear`            | セッション管理       | セッションをリセットして新鮮なコンテキストで再開 |
| CLAUDE.md 200行制限 | 常駐コンテキスト     | 固定費を最小化                                   |
| `.claude/rules/`    | 条件付きコンテキスト | 不要なルールの注入を防ぐ                         |
| Skills              | オンデマンド         | 必要時のみ展開                                   |
| Agents              | オンデマンド         | 独立コンテキストで根本回避                       |
| MCP Tool Search     | ツール定義           | ツール定義を遅延ロード                           |

### Lost in the Middle（中間部の情報喪失）

| 対策                  | 分類                 | 効果                                 |
| :-------------------- | :------------------- | :----------------------------------- |
| `/compact`（50%閾値） | セッション管理       | U字カーブ崩壊前に圧縮                |
| `.claude/rules/`      | 条件付きコンテキスト | 必要なルールだけを高注意位置に注入   |
| Agents                | オンデマンド         | 新鮮なコンテキストで中間部問題を回避 |
| Skills                | オンデマンド         | 末尾近くに注入し高注意位置に配置     |

### Priority Saturation（指示過多で遵守率低下）

| 対策                | 分類                 | 効果                                   |
| :------------------ | :------------------- | :------------------------------------- |
| CLAUDE.md 200行制限 | 常駐コンテキスト     | 同時有効指示数を劣化閾値以下に         |
| `.claude/rules/`    | 条件付きコンテキスト | 指示を条件付きで分散                   |
| Skills              | オンデマンド         | タスク固有の指示を必要時のみロード     |
| Hooks               | ランタイム           | 機械的ルールをコンテキスト予算から除外 |

### Hallucination（構造的に不可避な幻覚）

| 対策                     | 分類             | 効果                                               |
| :----------------------- | :--------------- | :------------------------------------------------- |
| Hooks（テスト実行）      | ランタイム       | コンパイラ・テストランナーはハルシネーションしない |
| Cross-Model QA（Agents） | オンデマンド     | 異なるモデルでの検証                               |
| MCP                      | ツール定義       | 外部の信頼できるソースを参照                       |
| CLAUDE.md                | 常駐コンテキスト | 制約・バージョン情報を明示                         |

### Sycophancy（正確性より同意を優先）

| 対策                     | 分類             | 効果                         |
| :----------------------- | :--------------- | :--------------------------- |
| Agents（Cross-Model QA） | オンデマンド     | 同じ追従バイアスを共有しない |
| Hooks                    | ランタイム       | 追従しない機械的検証         |
| CLAUDE.md（反論指示）    | 常駐コンテキスト | 「問題を見つけろ」と明示指示 |
| テストコード             | 外部検証         | 客観的事実による防波堤       |

### Knowledge Boundary（「知らない」と言えない）

| 対策                        | 分類             | 効果                               |
| :-------------------------- | :--------------- | :--------------------------------- |
| MCP（外部知識参照）         | ツール定義       | 知識境界を外部に拡張               |
| CLAUDE.md（バージョン明示） | 常駐コンテキスト | 「どの時点の知識を使うか」を指定   |
| Agents（知識の分離）        | オンデマンド     | 知識領域を狭めて境界超過確率を低減 |
| テストコード                | 外部検証         | 知識境界を超えた出力の結果を検出   |

### Prompt Sensitivity（表現で結果が変動）

| 対策               | 分類                 | 効果                                   |
| :----------------- | :------------------- | :------------------------------------- |
| CLAUDE.md の書き方 | 常駐コンテキスト     | 具体的・命令的記述で曖昧さを排除       |
| Skills description | オンデマンド         | 多様な表現をカバーして呼び出し精度向上 |
| `.claude/rules/`   | 条件付きコンテキスト | 同時指示数削減で感受性悪化を防止       |
| Hooks・テスト      | ランタイム           | プロンプト表現に依存しない検証         |

### Instruction Decay（長会話でルール忘却）

| 対策         | 分類           | 効果                           |
| :----------- | :------------- | :----------------------------- |
| `/compact`   | セッション管理 | 50%使用率前に予防的圧縮        |
| `/clear`     | セッション管理 | セッション分割で劣化をリセット |
| Hooks        | ランタイム     | コンテキスト依存しない強制実行 |
| Agents       | オンデマンド   | 新鮮なコンテキストでタスク実行 |
| Git コミット | 外部永続化     | 劣化出力のロールバックを容易に |

## 全体マップ（視覚版）

上記の対策マップを、対策カテゴリの視点から可視化する。各図は「この対策がどの問題に効くか」を示す。

### セッション管理 — `/compact` `/clear`

```mermaid
graph LR
    COMPACT(["/compact 会話履歴を圧縮"])
    CLEAR(["/clear セッションをリセット"])

    CR["Context Rot"]
    LM["Lost in the Middle"]
    ID["Instruction Decay"]

    COMPACT -->|"トークン数を削減"| CR
    COMPACT -->|"50%閾値で<br/>U字カーブ崩壊前に圧縮"| LM
    COMPACT -->|"予防的圧縮"| ID
    CLEAR -->|"新鮮なコンテキスト<br/>で再開"| CR
    CLEAR -->|"劣化をリセット"| ID

    classDef countermeasure fill:#eff6ff,stroke:#1d4ed8,color:#1e40af,font-weight:bold
    classDef cr fill:#fee2e2,stroke:#b91c1c,color:#000,font-weight:bold
    classDef lm fill:#ffedd5,stroke:#c2410c,color:#000,font-weight:bold
    classDef id fill:#f3f4f6,stroke:#374151,color:#000,font-weight:bold
    class COMPACT,CLEAR countermeasure
    class CR cr
    class LM lm
    class ID id
```

### 常駐コンテキスト — CLAUDE.md（200行制限）

```mermaid
graph LR
    CMD(["CLAUDE.md 200行制限"])

    CR["Context Rot"]
    PS["Priority Saturation"]
    HL["Hallucination"]
    SY["Sycophancy"]
    KB["Knowledge Boundary"]
    PM["Prompt Sensitivity"]

    CMD -->|"固定費を最小化"| CR
    CMD -->|"同時有効指示数を<br/>劣化閾値以下に"| PS
    CMD -->|"制約・バージョン<br/>情報を明示"| HL
    CMD -->|"「問題を見つけろ」<br/>と明示指示"| SY
    CMD -->|"どの時点の知識を<br/>使うか指定"| KB
    CMD -->|"具体的・命令的記述で<br/>曖昧さを排除"| PM

    classDef countermeasure fill:#eff6ff,stroke:#1d4ed8,color:#1e40af,font-weight:bold
    classDef cr fill:#fee2e2,stroke:#b91c1c,color:#000,font-weight:bold
    classDef ps fill:#fef9c3,stroke:#a16207,color:#000,font-weight:bold
    classDef hl fill:#dbeafe,stroke:#1d4ed8,color:#000,font-weight:bold
    classDef sy fill:#f3e8ff,stroke:#7c3aed,color:#000,font-weight:bold
    classDef kb fill:#e8d5b7,stroke:#78350f,color:#000,font-weight:bold
    classDef pm fill:#dcfce7,stroke:#15803d,color:#000,font-weight:bold
    class CMD countermeasure
    class CR cr
    class PS ps
    class HL hl
    class SY sy
    class KB kb
    class PM pm
```

### 条件付きコンテキスト — `.claude/rules/`

```mermaid
graph LR
    RULES([".claude/rules/ 条件付き注入"])

    CR["Context Rot"]
    LM["Lost in the Middle"]
    PS["Priority Saturation"]
    PM["Prompt Sensitivity"]

    RULES -->|"不要なルールの<br/>注入を防ぐ"| CR
    RULES -->|"必要なルールだけを<br/>高注意位置に注入"| LM
    RULES -->|"指示を条件付きで分散"| PS
    RULES -->|"同時指示数削減で<br/>感受性悪化を防止"| PM

    classDef countermeasure fill:#eff6ff,stroke:#1d4ed8,color:#1e40af,font-weight:bold
    classDef cr fill:#fee2e2,stroke:#b91c1c,color:#000,font-weight:bold
    classDef lm fill:#ffedd5,stroke:#c2410c,color:#000,font-weight:bold
    classDef ps fill:#fef9c3,stroke:#a16207,color:#000,font-weight:bold
    classDef pm fill:#dcfce7,stroke:#15803d,color:#000,font-weight:bold
    class RULES countermeasure
    class CR cr
    class LM lm
    class PS ps
    class PM pm
```

### オンデマンドコンテキスト — Skills & Agents

```mermaid
graph LR
    SKILLS(["Skills メインコンテキスト内展開"])
    AGENTS(["Agents 独立コンテキスト"])

    CR["Context Rot"]
    LM["Lost in the Middle"]
    PS["Priority Saturation"]
    HL["Hallucination"]
    SY["Sycophancy"]
    KB["Knowledge Boundary"]
    PM["Prompt Sensitivity"]
    ID["Instruction Decay"]

    SKILLS -->|"必要時のみ展開"| CR
    SKILLS -->|"末尾近くに注入"| LM
    SKILLS -->|"タスク固有の指示を<br/>必要時のみロード"| PS
    SKILLS -->|"多様な表現をカバー"| PM

    AGENTS -->|"根本回避<br/>（別コンテキスト）"| CR
    AGENTS -->|"中間部問題を回避"| LM
    AGENTS -->|"Cross-Model QA"| HL
    AGENTS -->|"異なる追従バイアス"| SY
    AGENTS -->|"知識領域を狭める"| KB
    AGENTS -->|"新鮮なコンテキスト<br/>でタスク実行"| ID

    classDef countermeasure fill:#eff6ff,stroke:#1d4ed8,color:#1e40af,font-weight:bold
    classDef cr fill:#fee2e2,stroke:#b91c1c,color:#000,font-weight:bold
    classDef lm fill:#ffedd5,stroke:#c2410c,color:#000,font-weight:bold
    classDef ps fill:#fef9c3,stroke:#a16207,color:#000,font-weight:bold
    classDef hl fill:#dbeafe,stroke:#1d4ed8,color:#000,font-weight:bold
    classDef sy fill:#f3e8ff,stroke:#7c3aed,color:#000,font-weight:bold
    classDef kb fill:#e8d5b7,stroke:#78350f,color:#000,font-weight:bold
    classDef pm fill:#dcfce7,stroke:#15803d,color:#000,font-weight:bold
    classDef id fill:#f3f4f6,stroke:#374151,color:#000,font-weight:bold
    class SKILLS,AGENTS countermeasure
    class CR cr
    class LM lm
    class PS ps
    class HL hl
    class SY sy
    class KB kb
    class PM pm
    class ID id
```

### ランタイム — Hooks

```mermaid
graph LR
    HOOKS(["Hooks コンテキスト外で実行"])

    PS["Priority Saturation"]
    HL["Hallucination"]
    SY["Sycophancy"]
    PM["Prompt Sensitivity"]
    ID["Instruction Decay"]

    HOOKS -->|"機械的ルールを<br/>予算から除外"| PS
    HOOKS -->|"コンパイラ・テストは<br/>ハルシネーションしない"| HL
    HOOKS -->|"追従しない<br/>機械的検証"| SY
    HOOKS -->|"プロンプト表現に<br/>依存しない検証"| PM
    HOOKS -->|"コンテキスト依存しない<br/>強制実行"| ID

    classDef countermeasure fill:#eff6ff,stroke:#1d4ed8,color:#1e40af,font-weight:bold
    classDef ps fill:#fef9c3,stroke:#a16207,color:#000,font-weight:bold
    classDef hl fill:#dbeafe,stroke:#1d4ed8,color:#000,font-weight:bold
    classDef sy fill:#f3e8ff,stroke:#7c3aed,color:#000,font-weight:bold
    classDef pm fill:#dcfce7,stroke:#15803d,color:#000,font-weight:bold
    classDef id fill:#f3f4f6,stroke:#374151,color:#000,font-weight:bold
    class HOOKS countermeasure
    class PS ps
    class HL hl
    class SY sy
    class PM pm
    class ID id
```

### ツール定義 — MCP & Tool Search

```mermaid
graph LR
    MCP(["MCP 外部知識参照"])
    TS(["Tool Search 遅延ロード"])

    CR["Context Rot"]
    HL["Hallucination"]
    KB["Knowledge Boundary"]

    MCP -->|"外部の信頼できる<br/>ソースを参照"| HL
    MCP -->|"知識境界を<br/>外部に拡張"| KB
    TS -->|"ツール定義を<br/>遅延ロード"| CR

    classDef countermeasure fill:#eff6ff,stroke:#1d4ed8,color:#1e40af,font-weight:bold
    classDef cr fill:#fee2e2,stroke:#b91c1c,color:#000,font-weight:bold
    classDef hl fill:#dbeafe,stroke:#1d4ed8,color:#000,font-weight:bold
    classDef kb fill:#e8d5b7,stroke:#78350f,color:#000,font-weight:bold
    class MCP,TS countermeasure
    class CR cr
    class HL hl
    class KB kb
```

## 統合全体マップ — 問題の連鎖 × 対策の配置

8つの構造的問題がどう連鎖し、Claude Code の各機能がどこに介入するかの全体像。

```mermaid
graph TD
    %% ════════════════════════════════
    %% 構造的問題 ■ 四角・問題ごとに固有色
    %% ════════════════════════════════
    CR["Context Rot<br/>トークン増で品質劣化"]
    LM["Lost in the Middle<br/>中間部の情報喪失"]
    PS["Priority Saturation<br/>指示過多で遵守率低下"]
    HL["Hallucination<br/>構造的に不可避な幻覚"]
    SY["Sycophancy<br/>正確性より同意を優先"]
    KB["Knowledge Boundary<br/>「知らない」と言えない"]
    PM["Prompt Sensitivity<br/>表現で結果が変動"]
    ID["Instruction Decay<br/>長会話でルール忘却"]

    %% ── 問題間の連鎖（実線） ──
    CR -->|"注意希薄化"| LM
    CR -->|"有効性低下"| PS
    CR -->|"率が上昇"| HL
    CR -->|"気づかず追従"| SY
    LM -->|"指示が無視"| PS
    LM -->|"制約見落とし"| SY
    PS -->|"表現に左右"| PM
    PS -->|"制約見落とし"| HL
    KB -->|"誤答を生成"| HL
    KB -->|"期待に合わせる"| SY
    SY -->|"追認・増幅"| HL
    HL -->|"同意で確定"| SY

    %% ── 全問題 → Instruction Decay ──
    CR -->|"蓄積"| ID
    LM -->|"忘却加速"| ID
    PS -->|"優先度低下"| ID
    HL -->|"基盤劣化"| ID
    SY -->|"修正困難"| ID
    PM -->|"意図からズレ"| ID

    %% ════════════════════════════════
    %% 対策 ⬮ 角丸・青系統一
    %% ════════════════════════════════
    COMPACT(["/compact 履歴圧縮"])
    CLEAR(["/clear リセット"])
    CMD(["CLAUDE.md 200行制限"])
    RULES([".claude/rules/ 条件付き注入"])
    SKILLS(["Skills オンデマンド"])
    AGENTS(["Agents 独立コンテキスト"])
    HOOKS(["Hooks コンテキスト外"])
    MCP(["MCP 外部知識参照"])

    %% ── 対策 → 問題（点線で介入） ──
    COMPACT -.-> CR
    COMPACT -.-> LM
    COMPACT -.-> ID
    CLEAR -.-> CR
    CLEAR -.-> ID

    CMD -.-> CR
    CMD -.-> PS
    CMD -.-> HL
    CMD -.-> SY
    CMD -.-> KB
    CMD -.-> PM

    RULES -.-> CR
    RULES -.-> LM
    RULES -.-> PS

    SKILLS -.-> CR
    SKILLS -.-> LM
    SKILLS -.-> PS

    AGENTS -.-> CR
    AGENTS -.-> HL
    AGENTS -.-> SY
    AGENTS -.-> KB
    AGENTS -.-> ID

    HOOKS -.-> PS
    HOOKS -.-> HL
    HOOKS -.-> SY
    HOOKS -.-> PM
    HOOKS -.-> ID

    MCP -.-> HL
    MCP -.-> KB

    %% ════════════════════════════════
    %% スタイル — 問題は固有色、対策は青統一
    %% ════════════════════════════════
    classDef cr fill:#fee2e2,stroke:#b91c1c,color:#000,font-weight:bold
    classDef lm fill:#ffedd5,stroke:#c2410c,color:#000,font-weight:bold
    classDef ps fill:#fef9c3,stroke:#a16207,color:#000,font-weight:bold
    classDef hl fill:#dbeafe,stroke:#1d4ed8,color:#000,font-weight:bold
    classDef sy fill:#f3e8ff,stroke:#7c3aed,color:#000,font-weight:bold
    classDef kb fill:#e8d5b7,stroke:#78350f,color:#000,font-weight:bold
    classDef pm fill:#dcfce7,stroke:#15803d,color:#000,font-weight:bold
    classDef id fill:#f3f4f6,stroke:#374151,color:#000,font-weight:bold
    classDef countermeasure fill:#eff6ff,stroke:#1d4ed8,color:#1e40af,font-weight:bold

    class CR cr
    class LM lm
    class PS ps
    class HL hl
    class SY sy
    class KB kb
    class PM pm
    class ID id
    class COMPACT,CLEAR,CMD,RULES,SKILLS,AGENTS,HOOKS,MCP countermeasure
```

**読み方**:

| 要素 | 形 | 意味 |
|:--|:--|:--|
| ■ 四角ノード（各色） | 構造的問題（色で種類を区別） |
| ⬮ 角丸ノード（青） | Claude Code の対策 |
| **実線 →** | 問題が別の問題を引き起こす・増幅する |
| **点線 -.->** | 対策が問題に介入するポイント |

---

> [README の対策マップ表（概要版）](../../README.md) も参照
