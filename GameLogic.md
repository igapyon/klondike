# Klondike Detailed Logic Specification

## 1. Data Model Definition

### 1.1 Card Object
* `suit`: integer (0: Spade, 1: Heart, 2: Club, 3: Diamond)
* `rank`: integer (1: A, 2: 2, ..., 11: J, 12: Q, 13: K)
* `color`: even suits (0,2) are Black(0), odd suits (1,3) are Red(1)
* `isOpen`: boolean (face up or face down)

### 1.2 Board State (State)
* `Stock`: stack of `Card` (initially 24 cards)
* `Waste`: stack of `Card` (initially 0 cards)
* `Foundations`: array [4] of `Card` stacks (goal for each suit)
* `Tableau`: array [7] of `Card` arrays (seven tableau columns)

---

## 2. Setup

1. **Create deck**: generate 52 cards and shuffle randomly.
2. **Deal tableau**:
    * For column `i` (0-6), deal `i + 1` cards.
    * Only the last card in each column is `isOpen = true`; others are `false`.
3. **Fill stock**: move the remaining cards to `Stock` (`isOpen = false`).
4. **Search solvability**: use the simple solver to find a solvable initial state, and use it as the initial layout (with a retry limit).

---

## 3. Movement Rules

### 3.1 Move to Tableau (between tableau, or from Waste/Foundation)
* **Target**: move source card(s) `Src` to the end of `Tableau[i]`.
* **Conditions**:
    1. If `Tableau[i]` is empty: `Src[0].rank == 13` (K).
    2. If `Tableau[i]` is not empty:
        * `Src[0].rank == Tableau[i].last.rank - 1`
        * `Src[0].color != Tableau[i].last.color`
* **Moving a stack**: between tableau columns, a contiguous stack of cards with `isOpen == true` can be moved together.

### 3.2 Move to Foundations
* **Target**: place a single card `C` onto `Foundations[suit]`.
* **Conditions**:
    1. If the stack is empty: `C.rank == 1` (A).
    2. If the stack is not empty:
        * `C.suit == Foundations[suit].last.suit`
        * `C.rank == Foundations[suit].last.rank + 1`

---

## 4. Action Handlers

### 4.1 Stock Click (Draw)
* If `Stock` is not empty: pop one card from `Stock`, set `isOpen = true`, and push to `Waste`.
* If `Stock` is empty and recycling is allowed: reverse all `Waste` cards back into `Stock` (`isOpen = false`).

### 4.2 Auto-Refresh After Move
* If the last card of `Tableau[i]` becomes `isOpen == false`, flip it to `isOpen = true`.
    * In the animated UI, flip after the animation completes (state update is the same).

### 4.3 Auto-Finish (Shubaba)
* When all `Tableau` cards are `isOpen == true` and both `Stock` and `Waste` are empty, allow the following loop:
    * Move eligible cards from the ends of `Tableau` to `Foundations` in sequence.

### 4.4 Delayed Auto Move (Smart Auto)
* After a move, search for cards that can be moved to `Foundations`, then auto-move them with a delay.
* Auto-move is performed only when the safety check passes (A is always allowed).
    * Safety check: the rank immediately below the target card must already be built in both opposite-color foundations.

### 4.5 Hint
* Search the next move using the same priority as the simple solver, and execute it once.
* Priority: Tableau→Foundation, Waste→Foundation, Tableau→Tableau, Waste→Tableau, Draw/Recycle.

---

## 5. End Conditions

* **Win**: when all `Foundations` stacks reach `length` 13.
* **Stuck**: when the simple solver cannot determine a solvable state (warning-level check).

---

# クロンダイク（Klondike）詳細ロジック仕様書

## 1. データモデル定義

### 1.1 Card オブジェクト
* `suit`: 整数 (0: Spade, 1: Heart, 2: Club, 3: Diamond)
* `rank`: 整数 (1: A, 2: 2, ..., 11: J, 12: Q, 13: K)
* `color`: 偶数スート(0,2)は Black(0)、奇数スート(1,3)は Red(1)
* `isOpen`: 真偽値 (表向きか裏向きか)

### 1.2 ボードの状態 (State)
* `Stock`: `Card`のスタック (初期24枚)
* `Waste`: `Card`のスタック (初期0枚)
* `Foundations`: `Card`スタックの配列 [4] (各マークのゴール)
* `Tableau`: `Card`配列の配列 [7] (場札の7列)

---

## 2. 初期化処理 (Setup)

1.  **Deck作成**: 52枚のカードを生成し、ランダムにシャッフルする。
2.  **Tableau配分**:
    * 列 `i` (0〜6) に対して、`i + 1` 枚のカードを配る。
    * 各列の最後のカードのみ `isOpen = true` とし、他は `false`。
3.  **Stock配分**: 残りのカードをすべて `Stock` に格納する (`isOpen = false`)。
4.  **可解性の探索**: 簡易ソルバで「解ける」初期状態を探索し、見つかった状態を初期盤面とする（試行上限あり）。

---

## 3. 移動ルール (Movement Rules)

### 3.1 Tableau への移動 (場札間、または Waste/Foundation から)
* **対象**: 移動元カード(群) `Src` を、移動先列 `Tableau[i]` の末尾に置く。
* **条件**:
    1.  `Tableau[i]` が空の場合: `Src[0].rank == 13` (K) であること。
    2.  `Tableau[i]` が空でない場合:
        * `Src[0].rank == Tableau[i].last.rank - 1`
        * `Src[0].color != Tableau[i].last.color`
* **束の移動**: `Tableau` 間では、`isOpen == true` な連続したカードの束をまとめて移動できる。

### 3.2 Foundations への移動 (ゴール)
* **対象**: 1枚のカード `C` を `Foundations[suit]` に置く。
* **条件**:
    1.  スタックが空の場合: `C.rank == 1` (A) であること。
    2.  スタックが空でない場合:
        * `C.suit == Foundations[suit].last.suit`
        * `C.rank == Foundations[suit].last.rank + 1`

---

## 4. アクション・ハンドラ (Action Handlers)

### 4.1 山札クリック (Draw)
* `Stock` が空でない: `Stock` から1枚取り出し、`isOpen = true` にして `Waste` へプッシュ。
* `Stock` が空かつリサイクル可能: `Waste` の全カードを逆順にして `Stock` へ戻す (`isOpen = false`)。

### 4.2 カード移動後の自動処理 (Auto-Refresh)
* 移動によって `Tableau[i]` の最後尾が `isOpen == false` になった場合、`isOpen = true` に変更する。
    * アニメ版 UI では演出完了後にめくる（内部状態の更新は同一）。

### 4.3 自動完了 (Auto-Finish / シュババ)
* 全 `Tableau` カードが `isOpen == true` であり、かつ `Stock` と `Waste` が空の場合、以下のループを許容する:
    * `Tableau` の末尾から `Foundations` へ移動可能なカードを順次転送する。

### 4.4 遅延オート移動 (Smart Auto)
* 操作後に `Foundations` へ移動可能なカードを探索し、遅延して自動移動する。
* 自動移動は安全判定を満たす場合のみ実施する（A は即許可）。
    * 安全判定: 対象カードの一つ下のランクが、反対色の基礎山で両方とも成立済みであること。

### 4.5 ヒント (Hint)
* 簡易ソルバと同じ優先順位で次の一手を探索し、1回だけ自動実行する。
* 優先順: Tableau→Foundation, Waste→Foundation, Tableau→Tableau, Waste→Tableau, Draw/Recycle。

---

## 5. 終了判定

* **勝利**: すべての `Foundations` スタックの `length` が 13 に到達した時。
* **詰み**: 簡易ソルバで可解と判定できない時（目安の警告）。
