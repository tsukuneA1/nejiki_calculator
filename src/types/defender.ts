import { FactoryPokemon } from "./factoryPokemon";

export type Defender = {
    factoryPokemon: FactoryPokemon;
    act: {
        hp: number;
        attack: number;
        defense: number;
        specialAttack: number;
        specialDefense: number;
        speed: number;
    }
    ability: string;
    item: string;
    defenseRank: number;
}
