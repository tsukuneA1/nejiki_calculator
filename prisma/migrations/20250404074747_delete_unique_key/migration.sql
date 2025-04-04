/*
  Warnings:

  - Added the required column `group` to the `Factory_Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Factory_Pokemon_pokeId_key";

-- AlterTable
ALTER TABLE "Factory_Pokemon" ADD COLUMN     "group" INTEGER NOT NULL;
