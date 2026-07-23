import { AutoComplete } from "@/components/general/auto-complete";
import { setDefender } from "@/store/slices/defenderSlice";
import type { RootState } from "@/store/store";
import type { FactoryPokemon } from "@/types/factoryPokemon";
import { sendGAEvent } from "@next/third-parties/google";
import { Avatar } from "@radix-ui/react-avatar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";

export const DefenderReserve = ({
  factoryPokemons,
}: { factoryPokemons: FactoryPokemon[] }) => {
  const settings = useSelector((state: RootState) => state.settings);
  const [spares, setSpares] = useState<FactoryPokemon[]>([]);
  const defender = useSelector((state: RootState) => state.defender);
  const dispatch = useDispatch();

  const handleAddSpare = (pokemon: FactoryPokemon) => {
    if (
      !spares.includes(pokemon) &&
      spares.length < 6 &&
      pokemon !== defender.factoryPokemon
    ) {
      setSpares([...spares, pokemon]);
      sendGAEvent("event", "spare_add", { role: "defender" });
    }
  };

  const handleDeleteSpare = (pokemonId: number) => {
    setSpares(spares.filter((spare) => spare.id !== pokemonId));
  };

  const handleClickSelectedPoke = (pokemon: FactoryPokemon) => {
    const updatedSpares = spares.filter((spare) => spare.id !== pokemon.id);

    if (defender.factoryPokemon) {
      updatedSpares.push(defender.factoryPokemon);
    }
    setSpares(updatedSpares);

    dispatch(setDefender({ pokemon: pokemon, iv: 4 * (settings.times - 1) }));

    sendGAEvent("event", "spare_swap", { role: "defender" });
  };

  return (
    <div className="flex w-full items-center gap-1.5 px-1 md:w-lg">
      <span className="shrink-0 text-xs font-bold text-zinc-500 dark:text-zinc-400">
        スペア
      </span>
      <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
        {spares.map((spare) => (
          <div className="relative" key={spare.id}>
            <button
              type="button"
              aria-label={`${spare.pokemon.name}と入れ替え`}
              title={`${spare.pokemon.name}と入れ替え`}
              onClick={() => handleClickSelectedPoke(spare)}
              className="flex h-10 w-10 items-center justify-center rounded-md border bg-background transition hover:bg-muted"
            >
              <Avatar>
                <AvatarImage src={spare.pokemon.imageSrc} className="h-9 w-9" />
                <AvatarFallback>
                  {spare.pokemon.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </button>
            <button
              type="button"
              aria-label={`${spare.pokemon.name}をスペアから削除`}
              onClick={() => handleDeleteSpare(spare.id)}
              className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-300 text-[10px] leading-none text-zinc-600 transition hover:bg-red-400 hover:text-white dark:bg-zinc-600 dark:text-zinc-200"
            >
              ×
            </button>
          </div>
        ))}
        {spares.length < 6 && (
          <AutoComplete
            trigger={
              <Button
                size="icon"
                variant="outline"
                className="h-10 w-10 border-dashed text-muted-foreground"
                aria-label="防御側のスペアを追加"
              >
                +
              </Button>
            }
            level={settings.level}
            times={settings.times}
            isNejiki={settings.isNejiki}
            setPokemon={handleAddSpare}
            factoryPokemons={factoryPokemons}
          />
        )}
      </div>
    </div>
  );
};
