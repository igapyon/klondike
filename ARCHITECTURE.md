# Architecture

## Overview
- A static web app that runs from a single HTML file.
- Rules follow `GameLogic.md` as the primary source.
- Card rendering uses CardMeister.

## File Structure
- `index.html`: landing page (launcher for offline/online builds).
- `klondike-src.html`: build source template.
- `klondike.html`: offline self-contained build output.
- `klondike-online.html`: online build output (CDN loading).
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
- Post-victory replay/board-reproduction behavior

## TODO (Spec)
- Add automatic save/restore of in-progress play data using `localStorage`.
- Save payload includes `current`, `initial`, `history` (Undo stack), and UI setting toggles.
- Trigger save on completion of `handleSlotClick()`, `startNewGame()`, `restartGame()`, and `popHistory()` (Undo).
- Restore automatically on app startup.
- Use an `APP_VERSION`-tagged schema.
- If stored data is corrupted or schema is incompatible, reset safely.
- Use separate storage keys for offline/online variants; define one-time migration from legacy `index*.html` keys.
- Add deterministic initial-board reproduction code using `seed + attemptIndex` (e.g. `SEED-000137`).
- Record/lock the generation contract used for reproduction (`schemaVersion`, PRNG/shuffle behavior, solver thresholds).
- [DONE] Document the minimum build specification before implementation (inputs/outputs, 2 build targets, offline boundary rules).
- [DONE] Define file naming migration for build pipeline:
- [DONE] source: `klondike-src.html`
- [DONE] outputs: `klondike.html` (offline), `klondike-online.html` (online)
- [DONE] no-animation variant removed from active targets.
- Define build input/output paths (editable sources under `src/`, generated artifacts under project root or `dist/`).
- [DONE] Define target matrix and differences (2 targets):
- [DONE] `klondike.html`: offline self-contained (no CDN at runtime).
- [DONE] `klondike-online.html`: online target that may keep CDN loading.
- Define external dependency boundary rules:
- offline targets must fail build if any external runtime URL remains.
- online target must explicitly whitelist allowed CDN URLs.
- Define deterministic build behavior (same input => same output bytes except timestamp/version fields).
- [DONE] Define build command contract (`npm run build`, optional per-target build commands).
- Define validation gate command (`npm run check:all`) including at least smoke tests + build.
- Define migration rule: generated HTML is not edited directly; changes are made in source files and rebuilt.
- Introduce a mobile-first hamburger menu (`☰`) at top-right for low-frequency actions.
- Keep high-frequency actions visible (`Undo`, `Hint`), move low-frequency actions into menu (`Restart`, `New Game`, `Solvability Check`, `Test`).
- Place `Test` at the bottom of the menu and consider showing it only in developer mode.
- Add board reproduction key system with two key types:
- `StartKey` (short): reproduce initial board from `seed + attemptIndex`.
- `StateKey` (long): reproduce current in-progress state (serialized snapshot).
- Show/copy keys during play and after game completion.
- Add key import flow available at startup and during play (with confirmation before replacing current board).
- Support URL-based reproduction for `StartKey` via query/hash parameter (single-file compatible).
- Keep full `StateKey` primarily as clipboard text (avoid URL length/privacy issues).
- Add a stronger clear-completion presentation to improve sense of achievement and session closure.
- Show a clear-result modal with next actions (`New Game`, `Share StartKey`, `Copy StateKey`).
- Include celebratory visual effects on clear (mobile-safe and skippable/lightweight mode).
- Add chain-hype effect during auto-move streaks (Puyo-style): show `Chain xN` with escalating visuals.
- Use existing `autoChainCount` as base signal; show final/max chain in clear-result summary.
- Add settings toggle(s) for clear effects / chain effects.
- Add move counter UI with compact label `Moves: N`.
- Count only player actions (exclude auto-move chains from this counter).
- Define `Hint` handling explicitly (count as player-assisted move or separate metric).
- Undo must roll back move counter consistently with board/history.
- Reset move counter on `New Game` and `Restart`.
- Show final `Moves` value in clear-result modal.
- Prevent reveal/auto-chain race: do not start auto-chain while reveal is in progress.
- Define strict post-move order: `manual move` -> `animation wait` -> `reveal` -> `auto-chain`.
- Add explicit `isRevealing` state and disallow overlap with `isAutoMoving`.
- Unify input guard to block interactions during `isAnimating || isRevealing || isAutoMoving`.
- Add regression checks to ensure no simultaneous reveal+chain progression.
- Add audio feedback design:
- Play a short flip sound on reveal.
- Play positive escalating chain sounds during auto-chain progression.
- Play a clear fanfare sound on game completion.
- Add audio controls (mute toggle and volume level), defaulting to safe mobile-friendly volume.

---

# アーキテクチャ

## 概要
- 単一 HTML（1ファイル）で動作する静的 Web アプリ。
- ルールは `GameLogic.md` を一次ソースとする。
- カード描画は CardMeister を利用する。

## ファイル構成
- `index.html`: ランディングページ（オフライン版/オンライン版への起動導線）。
- `klondike-src.html`: ビルド元テンプレート。
- `klondike.html`: 自己完結版のビルド生成物。
- `klondike-online.html`: CDN利用のオンライン版ビルド生成物。
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
- 勝利後の再現（リプレイ/盤面再現）仕様

## TODO（仕様）
- `localStorage` を使ったプレイ中データの自動保存/自動復元を追加する。
- 保存対象は `current`、`initial`、`history`（Undo 履歴）、設定トグルを含める。
- 保存タイミングは `handleSlotClick()` / `startNewGame()` / `restartGame()` / `popHistory()`（Undo）完了時とする。
- 起動時に自動復元する。
- `APP_VERSION` 付きスキーマを使う。
- 保存データ破損やスキーマ非互換時は安全リセットする。
- オフライン版/オンライン版で保存キーを分離し、旧 `index*.html` キーからの1回移行方針を定義する。
- `seed + attemptIndex`（例: `SEED-000137`）で初期盤面を決定的に再現できるコード方式を追加する。
- 再現性の前提となる生成契約（`schemaVersion`、PRNG/シャッフル挙動、ソルバ閾値）を記録・固定する。
- [DONE] 実装前に最小ビルド仕様（入出力、2ターゲット、オフライン境界ルール）を文書化する。
- [DONE] ビルド命名の移行方針を定義する。
- [DONE] ソース: `klondike-src.html`
- [DONE] 出力: `klondike.html`（オフライン）/ `klondike-online.html`（オンライン）
- [DONE] noanime 系は現行ターゲットから除外済み（削除済み）。
- ビルドの入出力パスを定義する（編集対象は `src/`、生成物はプロジェクトルートまたは `dist/`）。
- [DONE] 2ターゲットの差分方針を定義する。
- [DONE] `klondike.html`: オフライン完結（実行時 CDN 禁止）。
- [DONE] `klondike-online.html`: オンライン版として CDN 読み込みを許可。
- 外部依存の境界ルールを定義する。
- オフライン版は外部 URL が残っていたらビルド失敗にする。
- オンライン版は許可 CDN を明示したホワイトリスト運用にする。
- 決定的ビルド要件を定義する（同一入力から同一出力を生成。時刻/バージョン埋込を除く）。
- [DONE] ビルドコマンド仕様を定義する（`npm run build`、必要ならターゲット別コマンド）。
- 品質ゲートを定義する（`npm run check:all` に最低限 smoke test + build を含める）。
- 運用ルールを定義する（生成 HTML を直接編集しない。変更はソースを編集して再ビルドする）。
- スマホ向けに右上ハンバーガーメニュー（`☰`）を導入し、低頻度操作の退避先にする。
- 高頻度操作（`Undo`, `Hint`）は常時表示し、低頻度操作（`Restart`, `New Game`, `Solvability Check`, `Test`）はメニュー内に移す。
- `Test` はメニュー最下段に配置し、開発者モード時のみ表示する案を検討する。
- 盤面再現キーの仕組みを追加する（2種類）。
- `StartKey`（短い）: `seed + attemptIndex` で初期盤面を再現。
- `StateKey`（長い）: 途中状態を含むスナップショットを直列化して再現。
- ゲーム途中とゲーム終了時にキーを閲覧・コピーできるようにする。
- 起動時/プレイ中の両方でキー入力による復元を可能にする（現局面上書き前に確認）。
- `StartKey` は URL クエリ/ハッシュ経由の復元に対応する（single-file 互換）。
- `StateKey` は URL 長とプライバシーの観点から、主にクリップボード運用とする。
- クリア時の達成感と区切りを強める演出を追加する。
- クリア結果モーダルを表示し、次アクション（`New Game` / `Share StartKey` / `Copy StateKey`）を明示する。
- クリア演出（祝賀系ビジュアル）を追加する（モバイル配慮、スキップ/軽量化対応）。
- 連鎖中に「ぷよぷよ風」の盛り上げ演出を追加する（`Chain xN` 表示、連鎖数に応じた段階強化）。
- 既存の `autoChainCount` を活用し、クリア結果に最終/最大連鎖を表示する。
- クリア演出/連鎖演出の ON/OFF 設定トグルを追加する。
- 手数カウンタ UI を追加し、短いラベル `Moves: N` で表示する。
- カウント対象は人間操作のみとし、オート連鎖は除外する。
- `Hint` を手数に含めるかは仕様として明示する（別メトリクス化も検討）。
- `Undo` で盤面履歴と同じように手数も巻き戻す。
- `New Game` と `Restart` で手数をリセットする。
- クリア結果モーダルに最終 `Moves` を表示する。
- めくり（reveal）と自動連鎖（auto-chain）の競合を防止する（めくり中は連鎖開始しない）。
- 操作後の処理順を固定する（`manual move` -> `animation wait` -> `reveal` -> `auto-chain`）。
- `isRevealing` 状態を追加し、`isAutoMoving` と同時に成立しないようにする。
- 入力ガードを統一し、`isAnimating || isRevealing || isAutoMoving` 中は操作を受け付けない。
- 回帰確認項目として「めくりと連鎖の同時進行が起きないこと」を追加する。
- 音演出の仕様を追加する。
- カードめくり時に短いフリップ音を鳴らす。
- 自動連鎖中にポジティブな連鎖音を段階的に鳴らす。
- クリア時にファンファーレ音を鳴らす。
- 音量設定（ミュートトグル + 音量レベル）を追加し、モバイル配慮の初期音量を定義する。
