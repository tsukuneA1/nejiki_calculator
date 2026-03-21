import prisma from "@/lib/prisma";
// pages/api/factory-pokemon.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
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
  const factoryPokemons = data.map((fp) => ({
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

  res.status(200).json(factoryPokemons);
}
