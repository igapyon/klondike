# Klondike (Static Web App)

Play Klondike (Solitaire) in the browser — a static web app contained in a single HTML file.

![Screenshot](screenshot-20260121.png)

Current Version: v20260124

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
- Libraries: CardMeister (Unlicense), Motion One (MIT, animated only).
- Keep debug logs for now.

## Directory
- `index.html`: self-contained distribution (libraries bundled)
- `index-online.html`: animated version (Motion One / Test button)
- `index-noanime.html`: non-animated version
- `GameLogic.md`: game logic specification
- `AGENTS.md`: development agreements and policies

## Next Decisions
- Recycle conditions and strictness of stuck detection

---

# クロンダイク（静的 Web アプリ）

ブラウザで遊べるクロンダイク（ソリティア）。単一 HTML で完結する静的 Web アプリ。

![Screenshot](screenshot-20260121.png)

現行バージョン: v20260124

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
- 採用ライブラリ: CardMeister（Unlicense）、Motion One（MIT, アニメ版のみ）。
- デバッグログは当面残す。

## ディレクトリ
- `index.html`: 自己完結版（ライブラリ同梱で単一HTMLファイルで動作）
- `index-online.html`: ネットワーク必要版（ライブラリはCDNから都度読み込み）
- `index-noanime.html`: アニメーションなし版（カード移動などが非表示）
- `GameLogic.md`: ゲームロジック仕様
- `AGENTS.md`: 開発時の合意事項・方針

## 次に決めたいこと
- リサイクル条件、詰み判定の厳密さ
