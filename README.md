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

## サードパーティ
- 本プロジェクトはサードパーティ製品を同梱または利用しています。
- ライセンス本文とクレジットは `THIRD_PARTY_NOTICES.md` を参照してください。
