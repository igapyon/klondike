# Architecture

## Overview
- A static web app that runs from a single HTML file.
- Rules follow `GameLogic.md` as the primary source.
- Card rendering uses CardMeister.

## File Structure
- `index.html`: self-contained distribution (libraries bundled).
- `index-online.html`: animated version (Motion One / Test button).
- `index-noanime.html`: non-animated version.
- `GameLogic.md`: game logic specification.
- `README.md`: goals, policies, decisions.
- `AGENTS.md`: development agreements.

## Execution Model
- Initialization: search for a solvable deck with the solver, then deal tableau and build stock.
- Rendering: rebuild the DOM from the state object (full redraw).
- Input: click/right-click/double-click triggers moves (single card or stack).
- Validation: logic checks move validity, win, and stuck.
- Automation: delayed auto-move plus endgame auto-finish.
- Check: always-on stuck detection (simple solver) shows warnings.

## State Management
- Managed by a single `state` object.
- Changes are made only through action handlers.
- Keep a history stack for Undo.
- Keep the initial state for Restart.

## Terms
- Tableau: 7 columns of cards, the main play area.
- Foundations: suit stacks for completion.
- Stock: face-down draw pile.
- Waste: face-up cards drawn from stock.

## UI Layer
- Cards: use CardMeister `<playing-card>`.
- Layout: CSS positions Tableau / Foundations / Stock / Waste.
- Input: left click for normal move, long press to prefer foundation move (tableau top / waste top). Right click is only for stock move (Stock only).
- Victory: show an overlay.
- Assist UI: show Undo/Restart/New Game/Solvability Check controls.
- Header: show version and GitHub link.

## Behavior Notes
- Draw is fixed to one card (Draw 1).
- Auto-move has a delay (with safety checks).
- Undo/Restart is available (Ctrl/Cmd+Z, button).
- New Game generates a less-stuck initial layout.
- Solvability Check toggles stuck warnings.
- Hint runs the next move from the simple solver once.
- Keep debug logs for now.

## Open Questions
- Rule details (recycle conditions, strictness of stuck detection)
- Save/load (deferred)

---

# アーキテクチャ

## 概要
- 単一 HTML（1ファイル）で動作する静的 Web アプリ。
- ルールは `GameLogic.md` を一次ソースとする。
- カード描画は CardMeister を利用する。

## ファイル構成
- `index.html`: 自己完結版（ライブラリ同梱で単一HTMLファイルで動作）。
- `index-online.html`: ネットワーク必要版（ライブラリはCDNから都度読み込み）。
- `index-noanime.html`: アニメーションなし版（カード移動などが非表示）。
- `GameLogic.md`: ゲームロジック仕様。
- `README.md`: 目的・方針・決定事項。
- `AGENTS.md`: 開発合意事項。

## 実行モデル
- 初期化: ソルバを用いて解けるデッキを探索し、場札配布→山札構築を行う。
- 描画: 状態オブジェクトを元に DOM を再構築（フル描画）。
- 操作: クリック/右クリック/ダブルクリックで移動を発火（カード単体/束）。
- 判定: 移動の正当性・勝利・詰みをロジックで判定。
- 自動: 遅延付きのオート移動と、終盤のオート完了を行う。
- 検査: 常時チェックで詰まり判定（簡易ソルバ）を行い警告する。

## 状態管理
- 単一の `state` オブジェクトで管理。
- 変更は操作ハンドラ経由でのみ行う。
- Undo 用に履歴スタックを保持する。
- Restart 用に初期状態を保持する。

## 用語
- Tableau: 場札。7列のカード配置で、プレイの主な操作対象。
- Foundations: 組札。各スートごとの完成先。
- Stock: 山札。ドロー元の未公開カードスタック。
- Waste: 捨て札。Stock から引いたカードの置き場。

## UI 層
- カード: CardMeister の `<playing-card>` を使用。
- レイアウト: CSS で Tableau / Foundations / Stock / Waste を配置。
- 入力: 左クリックで通常移動、長押しで組札移動を優先（場札トップ/捨て札トップ）。右クリックは山札の移動操作のみ（Stock のみ）。
- 勝利演出: オーバーレイを表示。
- 補助UI: Undo/Restart/New Game/Solvability Check のコントロールを表示。
- ヘッダー: バージョン表記と GitHub リンクを表示。

## 挙動メモ
- ドローは 1 枚固定（Draw 1）。
- オート移動は遅延付き（安全判定あり）。
- Undo/Restart を利用可能（Ctrl/Cmd+Z、ボタンあり）。
- New Game は詰まりにくい初期配置を生成する。
- 「Solvability Check」トグルで詰まり判定を行い、警告を表示する。
- Hint ボタンで簡易ソルバの次の一手を 1 回だけ自動実行する。
- デバッグログは当面残す。

## 未確定事項
- ルール詳細（リサイクル条件、詰み判定）
- セーブ/ロード（後回し）
