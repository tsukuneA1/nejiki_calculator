-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hp" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "spAttack" INTEGER NOT NULL,
    "spDefense" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "ability1" TEXT NOT NULL,
    "ability2" TEXT,
    "imageSrc" TEXT NOT NULL,
    "type1" TEXT NOT NULL,
    "type2" TEXT,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Factory_Pokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pokeId" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "spAttack" INTEGER NOT NULL,
    "spDefense" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "item" TEXT,
    "nature" TEXT NOT NULL,

    CONSTRAINT "Factory_Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Move" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "power" INTEGER,
    "accuracy" INTEGER,
    "pp" INTEGER,
    "classification" TEXT NOT NULL,
    "effectiveness" INTEGER NOT NULL,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonMove" (
    "id" SERIAL NOT NULL,
    "factoryPokemonId" INTEGER NOT NULL,
    "moveId" INTEGER NOT NULL,

    CONSTRAINT "PokemonMove_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Factory_Pokemon_pokeId_key" ON "Factory_Pokemon"("pokeId");

-- CreateIndex
CREATE UNIQUE INDEX "PokemonMove_factoryPokemonId_moveId_key" ON "PokemonMove"("factoryPokemonId", "moveId");

-- AddForeignKey
ALTER TABLE "Factory_Pokemon" ADD CONSTRAINT "Factory_Pokemon_pokeId_fkey" FOREIGN KEY ("pokeId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonMove" ADD CONSTRAINT "PokemonMove_factoryPokemonId_fkey" FOREIGN KEY ("factoryPokemonId") REFERENCES "Factory_Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonMove" ADD CONSTRAINT "PokemonMove_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Move" RENAME COLUMN "effectiveness" TO "super";

