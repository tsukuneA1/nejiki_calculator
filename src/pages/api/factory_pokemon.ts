// pages/api/factory-pokemon.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = await prisma.factory_Pokemon.findMany({
    select: {
      id: true,
      hp: true,
      attack: true,
      defense: true,
      spAttack: true,
      spDefense: true,
      speed: true,
      item: true,
      nature: true,
      group: true,
      pokemon: true,
      moves: {
        select: {
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
      },
    },
  });

  const cleanedData = data.map((fp) => ({
    ...fp,
    moves: fp.moves.map((m) => m.move),
  }));

  res.status(200).json(cleanedData);
}
