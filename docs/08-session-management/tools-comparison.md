# ツール比較と選定基準

> [!NOTE]
> 記憶の永続化に使えるツールの比較。

## ツール比較表

| ツール               | 記憶の書き込み | 記憶の読み出し       | コンテキスト消費 | 適用場面                         |
| :------------------- | :------------- | :------------------- | :--------------- | :------------------------------- |
| **CLAUDE.md**        | 手動           | 自動（毎セッション） | 常時             | プロジェクト規約、技術スタック   |
| **Git コミット**     | 自動           | 手動（git log）      | なし             | コード変更履歴                   |
| **`.claude/rules/`** | 手動           | 条件付き自動         | 条件時のみ       | ファイル種別ルール               |
| **MCP メモリツール** | 自動/半自動    | 検索ベース           | 検索時のみ       | 長期的な設計判断、ユーザー情報   |
| **Auto Memory**      | 自動           | 自動                 | セッション開始時 | ユーザーの好み、プロジェクト知識 |

## 選定基準

```mermaid
flowchart LR
    Q1{"毎セッション必要？"}
    Q2{"特定のファイル操作時に<br>必要？"}
    Q3{"長期的に保持したい？"}
    CLAUDE(["CLAUDE.md<br>（200行以内に収まるか確認）"])
    RULES([".claude/rules/"])
    MEMORY(["メモリツール / Auto Memory"])
    GIT(["Git コミットメッセージに記録"])

    Q1 -->|"Yes"| CLAUDE
    Q1 -->|"No"| Q2
    Q2 -->|"Yes"| RULES
    Q2 -->|"No"| Q3
    Q3 -->|"Yes"| MEMORY
    Q3 -->|"No"| GIT

    style Q1 fill:#eff6ff,stroke:#1d4ed8,color:#000
    style Q2 fill:#eff6ff,stroke:#1d4ed8,color:#000
    style Q3 fill:#eff6ff,stroke:#1d4ed8,color:#000
    style CLAUDE fill:#fef9c3,stroke:#a16207,color:#000
    style RULES fill:#dcfce7,stroke:#15803d,color:#000
    style MEMORY fill:#f3e8ff,stroke:#7c3aed,color:#000
    style GIT fill:#f3f4f6,stroke:#374151,color:#000
```

---

> **前へ**: [いつ・どう思い出すか](when-to-recall.md)

> **Part 8 完了 → 次へ**: [Part 9: 他LLMへの応用](../09-cross-llm-principles/index.md)
