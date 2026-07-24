import { PokemonCard } from "@/components/general/pokemon-card";
import { TypeBadge } from "@/components/general/type-badge";
import { Button } from "@/components/ui/button";
import { MainCardLayout } from "@/layouts/main-card/main-card-layout";
import { addAttacker, deleteAttacker } from "@/store/slices/attackerSlice";
import type { RootState } from "@/store/store";
import type { FactoryPokemon } from "@/types/factoryPokemon";
import { useDispatch, useSelector } from "react-redux";
import { AttackerReserve } from "./attacker-reserve";

export const Attackers = ({
  factoryPokemons,
}: { factoryPokemons: FactoryPokemon[] }) => {
  const attackers = useSelector((state: RootState) => state.attacker);
  const pokemon = attackers[0]?.factoryPokemon?.pokemon;
  const lastAttacker = attackers.at(-1);
  const dispatch = useDispatch();

  const handleDelete = (pos: number) => {
    if (attackers.length > 1) {
      dispatch(deleteAttacker(pos));
    }
  };

  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <AttackerReserve factoryPokemons={factoryPokemons} />
      <MainCardLayout
        header={
          <>
            <h2>攻撃側</h2>
            {pokemon && (
              <div className="flex gap-1">
                <TypeBadge type={pokemon.type1} />
                {pokemon.type2 && <TypeBadge type={pokemon.type2} />}
              </div>
            )}
          </>
        }
        content={
          <PokemonCard
            pos={0}
            handleDelete={() => handleDelete(0)}
            factoryPokemons={factoryPokemons}
          />
        }
      />
      <div className="flex flex-col gap-2">
        {attackers.slice(1).map((_, index) => (
          // Cards are intentionally addressed by their position in Redux state.
          // biome-ignore lint/suspicious/noArrayIndexKey: Position is the card identity here.
          <div key={index + 1}>
            <PokemonCard
              pos={index + 1}
              handleDelete={() => handleDelete(index + 1)}
              factoryPokemons={factoryPokemons}
            />
          </div>
        ))}
        <div className="flex justify-center">
          <Button
            disabled={!lastAttacker?.factoryPokemon}
            onClick={() => {
              if (!lastAttacker?.factoryPokemon) {
                return;
              }
              dispatch(
                addAttacker({
                  pokemon: lastAttacker.factoryPokemon,
                  iv: lastAttacker.iv,
                }),
              );
            }}
          >
            追加
          </Button>
        </div>
      </div>
    </div>
  );
};
