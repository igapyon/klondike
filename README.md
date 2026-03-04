# Klondike (Static Web App)

Play Klondike (Solitaire) in the browser — a single-file, easy-to-share web app with smooth, tactile controls and friendly recovery tools.

![Screenshot](screenshot-20260126.png)


## Highlights
- Single-file static web app that is easy to share, archive, and run anywhere.
- Fast, tactile controls (click / long press / right click) tuned for smooth play.
- Friendly recovery tools: Undo/Restart, Hint, and delayed auto-move with safety checks.
- New Game avoids overly stuck starts for better flow.
- Build pipeline outputs offline and online single-file variants from one source template.
- Solvability warnings help you understand when the game is stuck.

## Directory
- `klondike-src.html`: source template for build output
- `src/main.ts`: app main script source
- `klondike.html`: offline self-contained output (libraries bundled)
- `klondike-online.html`: online output (CDN library loading)
- `scripts/build.mjs`: build script
- `vendor/`: local vendor scripts used for offline output
- `GameLogic.md`: game logic specification
- `AGENTS.md`: development agreements and policies
- `THIRD_PARTY_NOTICES.md`: third-party license texts
- `ARCHITECTURE.md`: behavior notes and execution model

## Build
- Run `npm run build`.
- This generates `klondike.html` and `klondike-online.html` from `klondike-src.html`.

## Manual Checklist (Storage)
- Start `klondike.html`, make a manual move, reload, and confirm the board is restored.
- Confirm save triggers work after: manual move, `New Game`, `Restart`, `Undo`.
- Confirm no new save is created by actions outside the current scope (for example: auto-chain only progression).
- Corrupt the saved JSON in DevTools (`localStorage`) and reload; confirm safe reset (no crash, starts new game).
- Verify offline/online key split:
  - Save in `klondike.html`, then open `klondike-online.html` and confirm it does not overwrite/share unexpectedly.
  - Save in `klondike-online.html`, then return to `klondike.html` and confirm each variant restores its own data.
- (Optional) If legacy keys exist from `index*.html`, confirm one-time migration into new variant keys.

## Third-Party
- This project bundles and/or uses third-party products.
- See `THIRD_PARTY_NOTICES.md` for license texts and attributions.

---

# クロンダイク（静的 Web アプリ）

ブラウザで遊べるクロンダイク（ソリティア）。単一 HTML で完結し、触って気持ち良い操作性とリカバリ手段が揃った静的 Web アプリ。

## 魅力ポイント
- 単一 HTML の静的 Web アプリで、配布・保存・起動がとても簡単。
- クリック/長押し/右クリックの操作が速く、触っていて気持ち良い。
- Undo/Restart、Hint、遅延付きオート移動など詰まり時のケアが充実。
- New Game は詰まりにくい初期配置を作り、テンポが良い。
- 1つのソーステンプレートから、オフライン版/オンライン版をビルド生成できる。
- 詰み警告で状況が分かりやすい。

![Screenshot](screenshot-20260126.png)


## ディレクトリ
- `klondike-src.html`: ビルド入力のソーステンプレート
- `src/main.ts`: アプリ本体スクリプトのソース
- `klondike.html`: 自己完結版の生成物（ライブラリ同梱）
- `klondike-online.html`: ネットワーク必要版の生成物（CDN読み込み）
- `scripts/build.mjs`: ビルドスクリプト
- `vendor/`: オフライン生成で使うローカル vendor スクリプト
- `GameLogic.md`: ゲームロジック仕様
- `AGENTS.md`: 開発時の合意事項・方針
- `THIRD_PARTY_NOTICES.md`: OSS ライセンス本文
- `ARCHITECTURE.md`: 挙動メモと実行モデル

## ビルド
- `npm run build` を実行します。
- `klondike-src.html` から `klondike.html` と `klondike-online.html` を生成します。

## 手動チェックリスト（ストレージ）
- `klondike.html` を開いて手動操作を1回行い、リロード後に盤面が復元されることを確認する。
- 保存トリガーが次の操作完了時に動くことを確認する: 手動移動 / `New Game` / `Restart` / `Undo`。
- 現在スコープ外の操作（例: 自動連鎖のみ進行）で不要な保存が増えないことを確認する。
- DevTools の `localStorage` で保存JSONを破損させてリロードし、安全リセット（クラッシュせず新規開始）されることを確認する。
- offline/online のキー分離を確認する:
  - `klondike.html` 側で保存後、`klondike-online.html` を開いて意図せず上書き/共有されないこと。
  - `klondike-online.html` 側で保存後、`klondike.html` に戻って各バリアントが自分のデータを復元すること。
- （任意）旧 `index*.html` キーが残っている場合、新キーへ1回移行されることを確認する。

## サードパーティ
- 本プロジェクトはサードパーティ製品を同梱または利用しています。
- ライセンス本文とクレジットは `THIRD_PARTY_NOTICES.md` を参照してください。
