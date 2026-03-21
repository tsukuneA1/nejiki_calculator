import prisma from "@/lib/prisma";
import type { FactoryPokemon } from "@/types/factoryPokemon";

/**
 * Fetch all factory Pokemon from database with related data
 */
export async function getFactoryPokemons(): Promise<FactoryPokemon[]> {
  const data = await prisma.battleFactoryPokemon.findMany({
    select: {
      id: true,
      hpEv: true,
      attackEv: true,
      defenseEv: true,
      spAttackEv: true,
      spDefenseEv: true,
      speedEv: true,
      nature: true,
      group: true,
      pokemon: {
        select: {
          id: true,
          name: true,
          hp: true,
          attack: true,
          defense: true,
          spAttack: true,
          spDefense: true,
          speed: true,
          type1: true,
          type2: true,
          weight: true,
          imageSrc: true,
          ability1: { select: { name: true } },
          ability2: { select: { name: true } },
        },
      },
      item: { select: { name: true } },
      battleFactoryMoves: {
        select: {
          slot: true,
          move: {
            select: {
              id: true,
              name: true,
              type: true,
              power: true,
              accuracy: true,
              pp: true,
              classification: true,
              super: true,
            },
          },
        },
        orderBy: { slot: "asc" },
      },
    },
  });

  // Transform to match FactoryPokemon type
  return data.map((fp) => ({
    id: fp.id,
    hp: fp.hpEv,
    attack: fp.attackEv,
    defense: fp.defenseEv,
    spAttack: fp.spAttackEv,
    spDefense: fp.spDefenseEv,
    speed: fp.speedEv,
    nature: fp.nature,
    group: fp.group,
    item: fp.item?.name || "なし",
    pokemon: {
      id: fp.pokemon.id,
      name: fp.pokemon.name,
      hp: fp.pokemon.hp,
      attack: fp.pokemon.attack,
      defense: fp.pokemon.defense,
      spAttack: fp.pokemon.spAttack,
      spDefense: fp.pokemon.spDefense,
      speed: fp.pokemon.speed,
      type1: fp.pokemon.type1,
      type2: fp.pokemon.type2,
      weight: fp.pokemon.weight,
      imageSrc: fp.pokemon.imageSrc,
      ability1: fp.pokemon.ability1.name,
      ability2: fp.pokemon.ability2?.name || null,
    },
    moves: fp.battleFactoryMoves.map((m) => m.move),
  }));
}

/**
 * Fetch all abilities from database
 */
export async function getAbilities(): Promise<string[]> {
  const data = await prisma.ability.findMany({
    select: { name: true },
    orderBy: { name: "asc" },
  });
  return ["なし", ...data.map((a) => a.name)];
}

/**
 * Fetch all items from database
 */
export async function getItems(): Promise<string[]> {
  const data = await prisma.item.findMany({
    select: { name: true },
    orderBy: { name: "asc" },
  });
  return ["なし", ...data.map((i) => i.name)];
}
