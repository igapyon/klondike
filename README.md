# Klondike (Static Web App)

Play Klondike (Solitaire) in the browser — a single-file, easy-to-share web app with smooth, tactile controls and friendly recovery tools.

![Screenshot](screenshot-20260121.png)


## Purpose
- Publish as a static web app that is complete in a single HTML file.
- Rules follow `GameLogic.md`.

## Notes
- Draw is fixed to one card (Draw 1).
- Controls: left click moves tableau (fallback to foundation only when no tableau move). Long press (350ms) forces move to foundation (tableau top / waste top). Right click is only for stock-to-waste.
- Auto-move has a delay (with safety checks).
- Show an overlay on victory.
- Undo/Restart implemented (Ctrl/Cmd+Z, button).
- New Game generates a less-stuck initial layout.
- `index-online.html` is the animated version with a Test button for chain animation test decks.
- `index-noanime.html` is the non-animated version.
- `index.html` is the self-contained distribution (libraries bundled).
- “Solvability Check” toggle warns when stuck.
- Hint button runs the next move from the simple solver once.
- Header shows the version and GitHub link.
- Third-party licenses: see `THIRD_PARTY_NOTICES.md`.
- Keep debug logs for now.

## Highlights
- Single-file static web app that is easy to share, archive, and run anywhere.
- Fast, tactile controls (click / long press / right click) tuned for smooth play.
- Friendly recovery tools: Undo/Restart, Hint, and delayed auto-move with safety checks.
- New Game avoids overly stuck starts for better flow.
- Multiple builds (animated / non-animated / self-contained) for different use cases.
- Solvability warnings help you understand when the game is stuck.

## Directory
- `index.html`: self-contained distribution (libraries bundled)
- `index-online.html`: animated version (Motion One / Test button)
- `index-noanime.html`: non-animated version
- `GameLogic.md`: game logic specification
- `AGENTS.md`: development agreements and policies
- `THIRD_PARTY_NOTICES.md`: third-party license texts

## Next Decisions
- Recycle conditions and strictness of stuck detection

---

# クロンダイク（静的 Web アプリ）

ブラウザで遊べるクロンダイク（ソリティア）。単一 HTML で完結し、触って気持ち良い操作性とリカバリ手段が揃った静的 Web アプリ。

## 魅力ポイント
- 単一 HTML の静的 Web アプリで、配布・保存・起動がとても簡単。
- クリック/長押し/右クリックの操作が速く、触っていて気持ち良い。
- Undo/Restart、Hint、遅延付きオート移動など詰まり時のケアが充実。
- New Game は詰まりにくい初期配置を作り、テンポが良い。
- アニメ版/非アニメ版/自己完結版の3種類を用途で選べる。
- 詰み警告で状況が分かりやすい。

![Screenshot](screenshot-20260121.png)


## 目的
- 1ファイル（単一 HTML）完結の静的 Web アプリとして公開できる形にする。
- ルールは `GameLogic.md` に準拠する。

## 仕様メモ
- ドローは 1 枚固定（Draw 1）。
- 操作: 左クリックで場札移動（移動先が無い場合のみ組札へフォールバック）。長押し(350ms)で組札へ強制移動（場札トップ/捨て札トップ）。右クリックは山札の移動操作のみ。
- オート移動は遅延付き（安全判定あり）。
- 勝利時はオーバーレイで表示する。
- Undo/Restart を実装済み（Ctrl/Cmd+Z、ボタンあり）。
- New Game ボタンで詰まりにくい初期配置を生成する。
- `index-online.html` はアニメ版で Test ボタンがあり、連鎖アニメ用のテストデッキを生成する。
- `index-noanime.html` はアニメーションなし版（カード移動などが非表示）。
- `index.html` は自己完結版（ライブラリ同梱で単一HTMLファイルで動作）。
- 「Solvability Check」トグルで詰まり判定を行い、警告を表示する。
- Hint ボタンで簡易ソルバの次の一手を 1 回だけ自動実行する。
- ヘッダーにバージョン表記と GitHub リンクを表示する。
- OSS ライセンス: `THIRD_PARTY_NOTICES.md` を参照。
- デバッグログは当面残す。

## ディレクトリ
- `index.html`: 自己完結版（ライブラリ同梱で単一HTMLファイルで動作）
- `index-online.html`: ネットワーク必要版（ライブラリはCDNから都度読み込み）
- `index-noanime.html`: アニメーションなし版（カード移動などが非表示）
- `GameLogic.md`: ゲームロジック仕様
- `AGENTS.md`: 開発時の合意事項・方針
- `THIRD_PARTY_NOTICES.md`: OSS ライセンス本文

## 次に決めたいこと
- リサイクル条件、詰み判定の厳密さ
