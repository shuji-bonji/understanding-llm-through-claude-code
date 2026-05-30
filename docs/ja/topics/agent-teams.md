# Agent Teams — マルチセッション協調

🌐 [English](/topics/agent-teams)

> [!NOTE]
> 1 つのセッションでは — たとえ `/compact` や `/clear` を使っても — 数週間のタスクを品質劣化なしに保持できなくなったとき、答えは「より良いセッション」ではなく、**互いに対話する複数の永続セッション**である。Part 5 の Subagent が*委譲された子*であるのに対し、Agent Teams は独自のライフスパンを持つ*ピア*である。

## 仕組み

- 境界づけられた役割（backend / frontend / QA / docs、あるいは工程・レイヤ・機能別）を持つ複数の**永続**セッション。
- セッション同士は **ダイレクトメッセージ**、**共有タスクキュー**、**成果物ストア** のいずれかでメッセージを交換する。同期度合いによって使い分ける。
- 任意で **オーケストレータ**役が作業のルーティングとコンフリクト裁定を担う。これは特定の責任を持つピアであり、構造的な親ではない。
- 永続的な状態は **成果物ストア** に住む。どのセッションの履歴にも住ませない。そのため任意のセッションを `/clear` しても成果物から再水和できる。

## 関連する章

- [Part 10 — マルチセッション協調（概要）](/ja/10-multi-session/)
- [Subagent vs Agent Team](/ja/10-multi-session/subagent-vs-team)
- [セッション境界の設計](/ja/10-multi-session/session-boundary-design)
- [ピアメッセージング](/ja/10-multi-session/peer-messaging)
- [長期実行タスク](/ja/10-multi-session/long-running-tasks)

## 関連する構造的問題

Agent Teams は 3 つの問題に同時に効く — 底にある対策（*各セッションを小さく保つ*）こそが、それら 3 つがそれぞれ個別に要求しているものだから。

- [Context Rot](/ja/01-llm-structural-problems/context-rot) — 根本対策。どのセッションもプロジェクト全体を保持しない。
- [Lost in the Middle](/ja/01-llm-structural-problems/lost-in-the-middle) — 各セッションの履歴は短く保たれるので、U字型の想起カーブが形成されない。
- [Priority Saturation](/ja/01-llm-structural-problems/priority-saturation) — 責務がセッション間で分割され、各セッションは 1 つの役割の指示しか運ばない。

## 関連トピック

- [Topic: Skills & Agents](/ja/topics/skills-and-agents) — 単発の Subagent で十分ならそちらから。Agent Teams は単発で済まなくなったときに手を伸ばす。
- [Topic: Plugins](/ja/topics/plugins) — チーム共有の CLAUDE.md / Skills / Hooks を Plugin にまとめれば、チーム内の全セッションに一斉に適用できる。
- [機能別早見表](/ja/appendix/feature-index)
