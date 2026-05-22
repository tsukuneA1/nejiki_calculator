# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ポケモンバトルファクトリー（プラチナ/HGSS）専用のダメージ計算機。Next.js 15 (Pages Router)、TypeScript、Tailwind CSS v4、Redux Toolkit、Prisma + PostgreSQL で構築。

## Development Commands

```bash
npm run dev        # 開発サーバー起動
npm run build      # 本番ビルド（postbuild でサイトマップ自動生成）
npm run lint:fix   # Biome でリント＆フォーマット（推奨）
npm run prettier   # Prettier フォーマット
npm run db:seed    # DBシード（prisma/seed/index.js）
```

## Architecture

### Data Flow

全ポケモンデータは **ビルド時** に取得される。`getStaticProps` で `getFactoryPokemons()` を呼び出し、ページ props として渡す（ランタイムに DB アクセスしない）。

### State Management

Redux Toolkit で4つのスライスを管理：

- `attackerSlice` — `Attacker[]`（配列）。複数の攻撃側を積み重ねてダメージ合算できる。ポジション `pos` で各スライスアクションを区別。
- `defenderSlice` — 単体の `Defender`
- `settingsSlice` — `{ level: 50 | 100, times: number, isNejiki: boolean }`。`isNejiki` は周回選択が銀ネジキ（pos=3）以降のとき `true` になる。
- `envSlice` — `{ weather, reflect, lightScreen }` などの場の状態

### Damage Calculation Pipeline

`calculateDamage` → 以下を組み合わせて最終ダメージを算出：

```
damage = floor(floor((floor((level*2/5+2) * movePower * atk) / def) / 50 * MA + 2) * MB * STAB * compatibility * MC)
```

- `calculateMA` — 天候・やけど・リフレクター・ひかりのかべ・特性（もらいび等）
- `calculateMB` — 急所・いのちのたま・メトロノーム・たいねつ
- `calculateMC` — タイプ一致相性・たつじんのおび・ハードロック・フィルター・いろめがね・半減の実・タイプ半減の実（`item_effects.ts`）
- `calculateCompatibility` — タイプ相性倍率（0, 0.5, 1, 2, 4）
- `calculateAtActual` / `calculateDfActual` — ランク補正適用後の実数値
- `calculateActual(base, ev, iv, level, nature)` — 通常ステータス実数値計算式
- `calculateHActual(base, ev, iv, level)` — HP 実数値（式が異なる）

### IV と周回システム

個体値はステータスごとに異なる値を持たず、全ステータス共通の単一 `iv` で管理。`ivItems = [0, 4, 8, 12, 16, 20, 24, 31]` の配列インデックスで選択。周回数に応じて自動選択される。

`FactoryPokemon.group` フィールドがポケモンの出現周回を制御する。

### Component Structure

```
components/
  ui/          # shadcn/ui 基本コンポーネント
  general/     # 汎用コンポーネント（pokemon-card, type-badge, auto-complete 等）
  domain/      # ビジネスロジック
    attacker/  # attackers.tsx（複数攻撃側）, attacker-reserve.tsx
    defender/  # defender-card.tsx, defender-reserve.tsx
    damage/    # damage.tsx
    env/       # env-card.tsx
    sidebar/   # app-sidebar.tsx
```

### Database Schema（Prisma）

```
Pokemon            — ベースステータス・タイプ・画像・特性
Ability            — 特性マスタ
Item               — 持ち物マスタ
BattleFactoryPokemon — ファクトリー固有インスタンス（EV・性格・group・持ち物）
Move               — わざデータ（classification: "物理" | "特殊"、type はすべて日本語）
BattleFactoryPokemonMove — 中間テーブル（slot 順でわざを管理）
```

### Pages

- `/` (index.tsx) — メインのダメージ計算画面
- `/poke-search` — ポケモン検索・絞り込み画面
- `/instruction-manual` — 使い方説明

## Code Conventions

- **Biome** でリント＆フォーマット（ESLint/Prettier は非推奨）
- **2スペースインデント**、**ダブルクォート**
- TypeScript strict モード無効
- パスエイリアス `@/` → `src/`
- UI テキスト（タイプ名・わざ分類・性格名等）はすべて**日本語**

## Environment Variables

```
DATABASE_URL  # Prisma 接続用（プールあり）
DIRECT_URL    # Prisma マイグレーション用（直接接続）
```
