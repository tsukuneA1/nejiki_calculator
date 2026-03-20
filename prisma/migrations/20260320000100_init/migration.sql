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
    "ability1Id" INTEGER NOT NULL,
    "ability2Id" INTEGER,
    "imageSrc" TEXT NOT NULL,
    "type1" TEXT NOT NULL,
    "type2" TEXT,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ability" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BattleFactoryPokemon" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "itemId" INTEGER,
    "hpEv" INTEGER NOT NULL,
    "attackEv" INTEGER NOT NULL,
    "defenseEv" INTEGER NOT NULL,
    "spAttackEv" INTEGER NOT NULL,
    "spDefenseEv" INTEGER NOT NULL,
    "speedEv" INTEGER NOT NULL,
    "nature" TEXT NOT NULL,
    "group" INTEGER NOT NULL,

    CONSTRAINT "BattleFactoryPokemon_pkey" PRIMARY KEY ("id")
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
    "super" INTEGER NOT NULL,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BattleFactoryPokemonMove" (
    "id" SERIAL NOT NULL,
    "battleFactoryPokemonId" INTEGER NOT NULL,
    "moveId" INTEGER NOT NULL,
    "slot" INTEGER NOT NULL,

    CONSTRAINT "BattleFactoryPokemonMove_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ability_name_key" ON "Ability"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BattleFactoryPokemonMove_battleFactoryPokemonId_slot_key" ON "BattleFactoryPokemonMove"("battleFactoryPokemonId", "slot");

-- CreateIndex
CREATE UNIQUE INDEX "BattleFactoryPokemonMove_battleFactoryPokemonId_moveId_key" ON "BattleFactoryPokemonMove"("battleFactoryPokemonId", "moveId");

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_ability1Id_fkey" FOREIGN KEY ("ability1Id") REFERENCES "Ability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_ability2Id_fkey" FOREIGN KEY ("ability2Id") REFERENCES "Ability"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattleFactoryPokemon" ADD CONSTRAINT "BattleFactoryPokemon_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattleFactoryPokemon" ADD CONSTRAINT "BattleFactoryPokemon_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattleFactoryPokemonMove" ADD CONSTRAINT "BattleFactoryPokemonMove_battleFactoryPokemonId_fkey" FOREIGN KEY ("battleFactoryPokemonId") REFERENCES "BattleFactoryPokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattleFactoryPokemonMove" ADD CONSTRAINT "BattleFactoryPokemonMove_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
