const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function loadPokemons() {
  const filePath = path.join(__dirname, "..", "src", "constants", "pokemon.ts");
  const source = fs.readFileSync(filePath, "utf8");
  const js = source
    .replace(/^import type[^\n]*\n/m, "")
    .replace(/export const POKEMONS\s*:\s*Pokemon\[\]\s*=\s*/, "module.exports = ");
  const sandbox = { module: { exports: null } };
  vm.createContext(sandbox);
  vm.runInContext(js, sandbox, { filename: "pokemon.ts" });
  return sandbox.module.exports;
}

function loadFactoryPokemons() {
  const filePath = path.join(
    __dirname,
    "..",
    "public",
    "data",
    "factory-pokemons.json",
  );
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

async function resetSequences() {
  await prisma.$executeRawUnsafe(`
    SELECT setval(pg_get_serial_sequence('"Pokemon"', 'id'), COALESCE((SELECT MAX("id") FROM "Pokemon"), 1), true);
    SELECT setval(pg_get_serial_sequence('"Move"', 'id'), COALESCE((SELECT MAX("id") FROM "Move"), 1), true);
    SELECT setval(pg_get_serial_sequence('"BattleFactoryPokemon"', 'id'), COALESCE((SELECT MAX("id") FROM "BattleFactoryPokemon"), 1), true);
    SELECT setval(pg_get_serial_sequence('"Ability"', 'id'), COALESCE((SELECT MAX("id") FROM "Ability"), 1), true);
    SELECT setval(pg_get_serial_sequence('"Item"', 'id'), COALESCE((SELECT MAX("id") FROM "Item"), 1), true);
    SELECT setval(pg_get_serial_sequence('"BattleFactoryPokemonMove"', 'id'), COALESCE((SELECT MAX("id") FROM "BattleFactoryPokemonMove"), 1), true);
  `);
}

async function main() {
  const pokemons = loadPokemons();
  const factoryPokemons = loadFactoryPokemons();

  const abilities = new Set();
  const items = new Set();
  const movesById = new Map();

  for (const pokemon of pokemons) {
    abilities.add(pokemon.ability1);
    if (pokemon.ability2) {
      abilities.add(pokemon.ability2);
    }
  }

  for (const factoryPokemon of factoryPokemons) {
    if (factoryPokemon.item) {
      items.add(factoryPokemon.item);
    }
    for (const move of factoryPokemon.moves) {
      movesById.set(move.id, move);
    }
  }

  await prisma.$transaction([
    prisma.battleFactoryPokemonMove.deleteMany(),
    prisma.battleFactoryPokemon.deleteMany(),
    prisma.move.deleteMany(),
    prisma.pokemon.deleteMany(),
    prisma.item.deleteMany(),
    prisma.ability.deleteMany(),
  ]);

  await prisma.ability.createMany({
    data: [...abilities].sort((a, b) => a.localeCompare(b, "ja")).map((name) => ({
      name,
    })),
  });

  await prisma.item.createMany({
    data: [...items].sort((a, b) => a.localeCompare(b, "ja")).map((name) => ({
      name,
    })),
  });

  await prisma.move.createMany({
    data: [...movesById.values()]
      .sort((a, b) => a.id - b.id)
      .map((move) => ({
        id: move.id,
        name: move.name,
        type: move.type,
        power: move.power,
        accuracy: move.accuracy,
        pp: move.pp,
        classification: move.classification,
        super: move.super,
      })),
  });

  const abilityMap = new Map(
    (await prisma.ability.findMany()).map((ability) => [ability.name, ability.id]),
  );
  const itemMap = new Map((await prisma.item.findMany()).map((item) => [item.name, item.id]));

  await prisma.pokemon.createMany({
    data: pokemons
      .sort((a, b) => a.id - b.id)
      .map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        spAttack: pokemon.spAttack,
        spDefense: pokemon.spDefense,
        speed: pokemon.speed,
        ability1Id: abilityMap.get(pokemon.ability1),
        ability2Id: pokemon.ability2 ? abilityMap.get(pokemon.ability2) : null,
        imageSrc: pokemon.imageSrc,
        type1: pokemon.type1,
        type2: pokemon.type2,
        weight: pokemon.weight,
      })),
  });

  await prisma.battleFactoryPokemon.createMany({
    data: factoryPokemons
      .sort((a, b) => a.id - b.id)
      .map((factoryPokemon) => ({
        id: factoryPokemon.id,
        pokemonId: factoryPokemon.pokemon.id,
        itemId: factoryPokemon.item ? itemMap.get(factoryPokemon.item) : null,
        hpEv: factoryPokemon.hp,
        attackEv: factoryPokemon.attack,
        defenseEv: factoryPokemon.defense,
        spAttackEv: factoryPokemon.spAttack,
        spDefenseEv: factoryPokemon.spDefense,
        speedEv: factoryPokemon.speed,
        nature: factoryPokemon.nature,
        group: factoryPokemon.group,
      })),
  });

  await prisma.battleFactoryPokemonMove.createMany({
    data: factoryPokemons.flatMap((factoryPokemon) =>
      factoryPokemon.moves.map((move, index) => ({
        battleFactoryPokemonId: factoryPokemon.id,
        moveId: move.id,
        slot: index + 1,
      })),
    ),
  });

  await resetSequences();

  console.log(
    JSON.stringify(
      {
        abilities: abilities.size,
        items: items.size,
        pokemons: pokemons.length,
        moves: movesById.size,
        battleFactoryPokemons: factoryPokemons.length,
        battleFactoryPokemonMoves: factoryPokemons.reduce(
          (sum, factoryPokemon) => sum + factoryPokemon.moves.length,
          0,
        ),
      },
      null,
      2,
    ),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
