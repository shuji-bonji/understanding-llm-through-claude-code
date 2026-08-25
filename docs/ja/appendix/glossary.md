🌐 [English](../../appendix/glossary.md)

# 用語集

> [!NOTE]
> 本ページは初学者の入口である。本文で用語に出会ったら、ここに戻る。
> ここには定義と、なぜ重要か、を置く。機序の詳細は各 Part に委ねる。

専門用語（Context Rot など）とツール名（CLAUDE.md、MCP など）は、本文と同じく英語のまま使う。

- [基礎概念](#basics)
- [8つの構造的問題](#structural-problems)
- [Claude Code 用語と一般概念の対応](#mapping)
- [Claude Code 固有語](#claude-code-terms)
- [関連する技術用語](#related)

## 基礎概念 {#basics}

### Token（トークン） {#token}

LLM がテキストを処理する最小単位。文字でも単語でもない。トークナイザーが分割した断片である。英語はおおむね 1 単語あたり 1〜1.3 トークン、日本語は 1 文字あたり 1〜3 トークンになる。同じ内容でも日本語の方が消費が多い。

**なぜ重要か**: コンテキストの上限も、品質劣化も、課金も、トークン数で測る。文字数で見積もると、日本語では足りなくなる。

**詳細**: [Token](../02-context-window/token.md)

### Context（コンテキスト） {#context}

1 回の推論で LLM に渡される情報の全体。システムプロンプト、プロジェクトルール、会話履歴、ツール定義、ツールの実行結果を含む。LLM はここに入っている情報だけを根拠に出力する。

**なぜ重要か**: モデルは「覚えて」いるのではない。そのターンに渡された Context だけを読む。何を入れるか、何を入れないかが設計になる。

**詳細**: [Context](../02-context-window/context.md)

### Context Window（コンテキストウィンドウ） {#context-window}

LLM が一度に処理できる Context の上限（トークン数）。上限はモデルによって異なる。上限に達すると古い情報が入らなくなる。上限に達しなくても、入力が増えるほど出力品質は下がる。

**なぜ重要か**: 窓の大きさは「使える量」ではない。実効的に品質を保てる量は、表示上の上限より小さい。これが Context Rot の前提である。

**詳細**: [Context Window](../02-context-window/context-window.md)、[コンテキスト予算](../02-context-window/context-budget.md)

### Attention（注意） {#attention}

Transformer が、入力の各トークンにどれだけ注目するかを決める仕組み。自己注意（self-attention）では、トークン同士の関係を計算する。入力が長くなると、個々のトークンへの注意は相対的に薄まる。

**なぜ重要か**: 長い入力で中間が落ちる、指示が増えると守られない、といった現象の多くは、注意の配分の問題として説明できる。

### Transformer {#transformer}

現代のクラウド LLM の基盤アーキテクチャ。自己注意を核とする。本リポジトリが扱う 8 つの構造的問題の多くは、この構造に起因する。

**なぜ重要か**: 個別製品の欠陥として扱うと、対策が設定手順に閉じる。アーキテクチャ由来だと分かれば、他のツールにも同じ考え方が使える。

### RLHF {#rlhf}

Reinforcement Learning from Human Feedback。人間の評価（好み）を使って、モデルの応答を調整する訓練手法。有用な応答を増やしやすい。同意する応答が好まれやすいため、Sycophancy の原因にもなる。

**なぜ重要か**: 「親切さ」と「正確さ」は同じ方向とは限らない。コードレビューが甘くなる理由の一端がここにある。

### System Prompt（システムプロンプト） {#system-prompt}

Context の先頭に置かれ、役割・制約・振る舞いを定める指示。チャット画面の「カスタム指示」や、コーディングエージェントの常駐ルールファイルが、これに当たることが多い。

**なぜ重要か**: 常に読まれる位置にある。書きすぎると Priority Saturation を起こす。書かなすぎると、守ってほしい制約が届かない。

### Session（セッション） {#session}

Context が蓄積していく 1 つの会話単位。ターンを重ねるごとに Context は増え、自然には減らない。

**なぜ重要か**: 長いセッションは Context Rot と Instruction Decay の温床である。区切り方（圧縮、リセット、別会話）が設計対象になる。

**詳細**: [Chat / Session](../02-context-window/chat-session.md)

### Stateless（ステートレス） {#stateless}

LLM は前回の推論内容を内部に保持しない。会話が続いているように見えるのは、アプリケーションが履歴を毎回 Context に詰め直しているためである。

**なぜ重要か**: 「覚えておいて」は、渡さなければ成立しない。セッションをまたぐ記憶は、ファイルなど Context の外に書く。

## 8つの構造的問題 {#structural-problems}

プロンプトの工夫だけでは解消しない制約である。バグではない。Transformer と訓練プロセスに起因する。詳細は [Part 1](../01-llm-structural-problems/index.md) を読む。

### Context Rot {#context-rot}

入力トークン数が増えるにつれて、出力品質が劣化する現象。コンテキストウィンドウの容量超過ではない。容量が残っていても劣化する。

**なぜ重要か**: 長い会話や大きな貼付の失敗を「モデルが賢くない」と誤診しやすい。主因は入力の長さと注意の配分である。

**詳細**: [Context Rot](../01-llm-structural-problems/context-rot.md)

### Lost in the Middle {#lost-in-the-middle}

Context の先頭と末尾には注意が向きやすく、中間部の情報が参照されにくくなる現象。Context Rot の具体的な現れの一つである。

**なぜ重要か**: 長い仕様の中盤や、会話の途中で決めた方針が落ちる。重要情報の位置が、内容と同じくらい効く。

**詳細**: [Lost in the Middle](../01-llm-structural-problems/lost-in-the-middle.md)

### Priority Saturation {#priority-saturation}

同時に与える指示が増えるほど、個々の指示の遵守率が低下する現象。「全てが重要」は、実質的に「何も重要でない」に近づく。

**なぜ重要か**: ルールファイルを厚くするほど、守ってほしいルールも無視されやすくなる。常駐指示は短く保つ根拠になる。

**詳細**: [Priority Saturation](../01-llm-structural-problems/priority-saturation.md)

### Hallucination {#hallucination}

事実に反する内容を、根拠があるかのように生成する現象。学習不足というより、次トークン予測の構造に起因する。数学的にゼロにはできない。

**なぜ重要か**: なくす対象ではない。検出と管理の対象である。コンパイラやテストなど、モデルの外の検証が必要になる。

**詳細**: [Hallucination](../01-llm-structural-problems/hallucination.md)

### Sycophancy {#sycophancy}

正確性より、ユーザーへの同意を優先する傾向。RLHF の副作用として現れやすい。追従性とも呼ぶ。

**なぜ重要か**: 「よいか」と聞くと肯定されやすい。同じ会話で生成とレビューを兼ねると、自分の出力を追認しやすい。

**詳細**: [Sycophancy](../01-llm-structural-problems/sycophancy.md)

### Knowledge Boundary {#knowledge-boundary}

LLM が、自分の知識の限界を正確に認識できない問題。知らないことでも「知らない」と言いにくく、高い確信度で誤答する。

**なぜ重要か**: カットオフ後の API や社内固有コードで、誤った内容を高い確信度で出しやすい。外部の一次情報への接地が対策になる。

**詳細**: [Knowledge Boundary](../01-llm-structural-problems/knowledge-boundary.md)

### Prompt Sensitivity {#prompt-sensitivity}

意味が近いプロンプトでも、表現や形式の違いで出力が大きく変わる現象。モデルは意味そのものより、トークンの統計的パターンに反応する部分が大きい。

**なぜ重要か**: 曖昧な指示は、セッションごとに違う埋め方をされる。変動させたくない軸（役割、成功基準、出力形式）は明示する。

**詳細**: [Prompt Sensitivity](../01-llm-structural-problems/prompt-sensitivity.md)

### Instruction Decay {#instruction-decay}

長い会話の中で、初期指示への遵守率が低下する現象。前の 7 問題が時間軸で重なった結果として現れる。

**なぜ重要か**: 序盤の方針が終盤で抜ける。会話を短く区切る、決定をファイルに残す、検証をモデルの外に置く、が対策の型になる。

**詳細**: [Instruction Decay](../01-llm-structural-problems/instruction-decay.md)

## Claude Code 用語と一般概念の対応 {#mapping}

Claude Code のファイル名やコマンドは代表例である。他ツールに同じ名前があるとは限らない。対応するのは機能名ではなく、役割である。

| Claude Code | 一般的な対応概念 | 主に抑える制約 |
| :---------- | :--------------- | :------------- |
| CLAUDE.md | 常駐のシステム指示。プロジェクト共通のルール | Priority Saturation、Prompt Sensitivity |
| `.claude/rules/` | 条件付きで読むルール。対象ファイルが開かれたときだけ注入する | Lost in the Middle、Priority Saturation |
| Skills | オンデマンドの手順書。必要になったときだけ展開する | Context Rot、Prompt Sensitivity |
| Agents | 独立した会話（別の Context）での実行 | Context Rot、Sycophancy |
| Hooks | モデルの外で動く検証（テスト、lint、スクリプト） | Hallucination、Instruction Decay |
| MCP | 外部ツール・外部知識への接続 | Knowledge Boundary、Context Rot（定義の常時消費） |
| settings.json | ランタイム設定。モデルには見せない層 | Hallucination、Sycophancy（権限と強制） |
| `/compact` | 会話履歴の要約・圧縮 | Context Rot、Lost in the Middle |
| `/clear` | セッションのリセット | Context Rot、Instruction Decay |
| Tool Search | ツール定義の遅延ロード | Context Rot |
| Code Intelligence（LSP） | 言語サーバーによるシンボル・型への接地 | Hallucination、Knowledge Boundary |
| Plugins | 検証済み設定の配布単位 | Prompt Sensitivity、Instruction Decay（組織の慣習の固定） |

同じ粒度の機能が他ツールに揃っているとは限らない。横断して使えるのは、上表の「一般的な対応概念」の列である。原則の抽出は [Part 11](../11-cross-llm-principles/index.md) で行う。

## Claude Code 固有語 {#claude-code-terms}

### CLAUDE.md {#claude-md}

セッション開始時に常に読み込まれる、プロジェクト知識と規約のファイル。常駐コンテキストである。行数を増やしすぎると Priority Saturation を起こす。

**なぜ重要か**: 「毎回伝えたいこと」だけを置く場所である。毎回は不要な手順は、ここには書かない。

**詳細**: [CLAUDE.md の設計原理](../03-always-loaded-context/claude-md.md)

### `.claude/rules/` {#rules}

glob パターンにファイルが一致したときだけ注入されるルール。常駐ではなく、条件付きコンテキストである。

**なぜ重要か**: 使わないルールを常時載せない。中間に埋もれさせず、必要なときだけ末尾近くに出せる。

**詳細**: [Rules の設計原理](../04-conditional-context/rules.md)

### Skills {#skills}

LLM が必要と判断したとき、または明示的に呼び出されたときに展開される手順書。オンデマンドコンテキストである。

**なぜ重要か**: 専門手順を常駐させない。`description` の書き方が、呼ばれるかどうかを左右する。

**詳細**: [Skills の設計原理](../05-on-demand-context/skills.md)

### Agents {#agents}

独立した Context Window で動くサブエージェント。親の会話履歴を共有しない。

**なぜ重要か**: 探索やレビューで親の Context を汚さない。生成と検証を同じ会話に載せない、という分離にも使える。

**詳細**: [Agents の設計原理](../05-on-demand-context/agents.md)

### Hooks {#hooks}

ツール実行の前後など、ライフサイクルにフックしてシェルコマンドを走らせる仕組み。出力は原則としてモデルの Context に入らない。

**なぜ重要か**: コンパイラもテストも追従しない。指示遵守に依存できない検証を、ここに置く。

**詳細**: [Hooks のライフサイクル](../07-runtime-layer/hooks.md)

### MCP {#mcp}

Model Context Protocol。モデルと外部ツール・リソースを接続するプロトコル。ツール定義は Context を常時消費する。

**なぜ重要か**: 外部の一次情報へ接地できる。一方で、定義を載せすぎると Context Rot を加速する。

**詳細**: [MCP のコンテキストコスト](../06-tool-context/mcp-context-cost.md)

### settings.json {#settings-json}

Claude Code のランタイム設定。権限や環境変数など、モデルに見せない制御を置く。

**なぜ重要か**: 「守らせたいが、読ませたくない」ものがある。見せた瞬間に、無視や迂回の対象になる。

**詳細**: [settings.json の役割](../07-runtime-layer/settings-json.md)

### `/compact` {#compact}

会話履歴を要約し、トークン数を減らしてセッションを継続するコマンド。

**なぜ重要か**: 同じタスクの途中で、Context 使用率が危険域に入ったときに使う。リセットせずに注意の希薄化を抑える。

**詳細**: [/compact と /clear の使い分け](../08-session-management/compact-and-clear.md)

### `/clear` {#clear}

セッションをリセットし、新しい会話を始めるコマンド。

**なぜ重要か**: タスクが終わったあと、または劣化が顕著なときに使う。圧縮では消えない前提の誤りを、ここで切る。

**詳細**: [/compact と /clear の使い分け](../08-session-management/compact-and-clear.md)

### Tool Search {#tool-search}

MCP のツール定義を、起動時に全件載せないで、必要になった時点で読む仕組み。Deferred Loading とも呼ぶ。

**なぜ重要か**: ツールを増やすほど、定義の固定費が Context を圧迫する。遅延ロードは、その固定費への対策である。

**詳細**: [Tool Search / Deferred Loading](../06-tool-context/tool-search.md)

## 関連する技術用語 {#related}

| 用語 | 定義 | なぜ重要か |
| :-- | :-- | :-- |
| **RoPE** | Rotary Position Embedding。位置が離れるほど注意が減衰しやすい位置エンコーディング | Lost in the Middle の構造的な原因の一つである |
| **U字カーブ** | Context 内の注意が先頭と末尾で高く、中間で低い分布 | 重要情報をどこに置くかの根拠になる |
| **Attention Dilution** | トークン増に伴い、個々のトークンへの注意が薄まること | Context Rot のメカニズムの一つである |
| **Distractor Interference** | 無関係だが類似した入力が、本題と混線すること | 長いログや類似関数名が、誤った参照を誘う |
| **Context Budget** | 品質を保てる範囲で、何に何トークンを使うかの配分 | 上限まで使うことが目的ではない |
| **Injection（注入）** | ルールやツール定義を Context に載せるタイミングと方法 | 常駐・条件付き・オンデマンドの区別が設計になる |
| **Cross-Model QA** | 別のモデル、または新しい会話で出力を見直すこと | 同じ追従バイアスを共有しにくい |
| **Harness** | LLM の外側に置く、ツール・メモリ・安全・ループの仕組み | モデルを変えずに、制約の影響を外から抑える |
| **LSP / Code Intelligence** | 言語サーバー経由で、リポジトリ内のシンボルと型を確認すること | 存在しない API の生成を、生成時点で検出できる |
| **Underspecification** | ある軸を指定しないと、モデルが事前分布で埋めること | Prompt Sensitivity の極限に近い。明示が対策である |

---

> **前へ**: [Plugins & Marketplaces](plugins-and-marketplaces.md)
