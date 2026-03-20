# ER Diagram

今後採用する想定のER図です。`ability` と `item` はマスタ化し、ファクトリー個体の技構成は関連テーブルで管理します。

```mermaid
erDiagram
    Ability ||--o{ Pokemon : ability1
    Ability ||--o{ Pokemon : ability2
    Pokemon ||--o{ BattleFactoryPokemon : has
    Item ||--o{ BattleFactoryPokemon : held_by
    BattleFactoryPokemon ||--o{ BattleFactoryPokemonMove : has
    Move ||--o{ BattleFactoryPokemonMove : used_by

    Ability {
        int id PK
        string name UK
    }

    Item {
        int id PK
        string name UK
    }

    Pokemon {
        int id PK
        string name
        int hp
        int attack
        int defense
        int spAttack
        int spDefense
        int speed
        int ability1Id FK
        int ability2Id FK
        string imageSrc
        string type1
        string type2
        float weight
    }

    Move {
        int id PK
        string name
        string type
        int power
        int accuracy
        int pp
        string classification
        int super
    }

    BattleFactoryPokemon {
        int id PK
        int pokemonId FK
        int itemId FK
        int hpEv
        int attackEv
        int defenseEv
        int spAttackEv
        int spDefenseEv
        int speedEv
        string nature
        int group
    }

    BattleFactoryPokemonMove {
        int id PK
        int battleFactoryPokemonId FK
        int moveId FK
        int slot
    }
```

## Table Roles

- `Ability`: 特性マスタ。`Pokemon` から参照する。
- `Item`: 持ち物マスタ。`BattleFactoryPokemon` から参照する。
- `Pokemon`: 種族データ。種族値、タイプ、特性などの基本情報を持つ。
- `Move`: 技マスタ。
- `BattleFactoryPokemon`: バトルファクトリー用の個体データ。努力値、性格、持ち物、グループを持つ。
- `BattleFactoryPokemonMove`: `BattleFactoryPokemon` と `Move` の関連テーブル。技の並び順を `slot` で保持する。

## Design Notes

- `BattleFactoryPokemon` には `name` を持たせない。表示名は `Pokemon.name` を参照する。
- `Pokemon.ability1Id` は必須、`Pokemon.ability2Id` は任意。
- `BattleFactoryPokemon.itemId` は任意。持ち物なしを許容する。
- 努力値カラムは種族値と混同しないように `hpEv` 形式で持つ。
- `BattleFactoryPokemonMove.slot` は 1-4 を想定し、技の並び順を表す。
- `BattleFactoryPokemonMove` には `@@unique([battleFactoryPokemonId, slot])` を付ける。
- 同一技の重複を防ぐため `@@unique([battleFactoryPokemonId, moveId])` も追加する。

## Migration Intent

- 既存の `Pokemon.ability1` / `ability2` の文字列保持は、`Ability` 参照へ置き換える。
- 既存の `Factory_Pokemon.item` の文字列保持は、`Item` 参照へ置き換える。
- 既存の `Factory_Pokemon.name` は削除する。
- 既存の `PokemonMove` は `BattleFactoryPokemonMove` に整理し、`slot` を追加する。
