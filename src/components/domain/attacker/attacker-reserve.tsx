import { AutoComplete } from "@/components/general/auto-complete";
import { MaterialSymbolsDeleteOutline } from "@/components/icons/delete";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { setAttacker } from "@/store/slices/attackerSlice";
import type { RootState } from "@/store/store";
import type { FactoryPokemon } from "@/types/factoryPokemon";
import { Avatar } from "@radix-ui/react-avatar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const AttackerReserve = ({
  factoryPokemons,
}: { factoryPokemons: FactoryPokemon[] }) => {
  const settings = useSelector((state: RootState) => state.settings);
  const [selectedId, setSelectedId] = useState("");
  const [spares, setSpares] = useState<FactoryPokemon[]>([]);
  const attacker = useSelector((state: RootState) => state.attacker[0]);
  const dispatch = useDispatch();

  const handleAddSpare = (pokemon: FactoryPokemon) => {
    if (
      !spares.includes(pokemon) &&
      spares.length <= 6 &&
      pokemon !== attacker.factoryPokemon
    ) {
      setSpares([...spares, pokemon]);
    }
  };

  const handleDeleteSpare = () => {
    if (selectedId !== "") {
      const updated = spares.filter(
        (spare) => spare.id.toString() !== selectedId,
      );
      setSpares(updated);
      setSelectedId("");
    }
  };

  const handleClickSelectedPoke = (pokemon: FactoryPokemon) => {
    if (pokemon.id.toString() === selectedId) {
      const updatedSpares = spares.filter((spare) => spare.id !== pokemon.id);

      if (attacker.factoryPokemon) {
        updatedSpares.push(attacker.factoryPokemon);
      }
      setSpares(updatedSpares);

      dispatch(
        setAttacker({
          attackerState: { pokemon, pos: 0 },
          iv: 4 * (settings.times - 1),
        }),
      );

      setSelectedId("");
    }
  };

  return (
    <div className="flex items-center justify-between border-1 rounded-lg p-2 bg-white">
      <ToggleGroup
        type="single"
        variant="outline"
        onValueChange={(value) => setSelectedId(value)}
      >
        {spares.length === 0 ? (
          <div className="text-black">スペアのポケモンを入力</div>
        ) : (
          spares.map((spare) => {
            return (
              <ToggleGroupItem
                value={spare.id.toString()}
                aria-label={spare.id.toString()}
                onClick={() => handleClickSelectedPoke(spare)}
                key={spare.id}
              >
                <Avatar>
                  <AvatarImage
                    src={spare.pokemon.imageSrc}
                    className="w-9 h-9"
                  />
                  <AvatarFallback>
                    {spare.pokemon.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </ToggleGroupItem>
            );
          })
        )}
      </ToggleGroup>
      <div className="flex items-center gap-2">
        <AutoComplete
          trigger={
            <Button size="icon" className="w-9 h-9">
              +
            </Button>
          }
          level={settings.level}
          times={settings.times}
          isNejiki={settings.isNejiki}
          setPokemon={handleAddSpare}
          factoryPokemons={factoryPokemons}
        />

        <Button size="icon" onClick={handleDeleteSpare}>
          <MaterialSymbolsDeleteOutline />
        </Button>
      </div>
    </div>
  );
};
