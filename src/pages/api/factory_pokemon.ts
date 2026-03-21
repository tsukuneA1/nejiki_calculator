// pages/api/factory-pokemon.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getFactoryPokemons } from "@/lib/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const factoryPokemons = await getFactoryPokemons();
  res.status(200).json(factoryPokemons);
}
