import { AutoComplete } from "@/components/general/auto-complete";
import { PokemonDescription } from "@/components/general/pokemon-description";
import { Rank } from "@/components/general/rank";
import { TypeBadge } from "@/components/general/type-badge";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MainCardLayout } from "@/layouts/main-card/main-card-layout";
import {
  setBRank,
  setDRank,
  setDefender,
  setDfAbility,
  setDfAbilityEnabled,
  setDfItem,
  setDfIv,
} from "@/store/slices/defenderSlice";
import type { RootState } from "@/store/store";
import type { FactoryPokemon } from "@/types/factoryPokemon";
import { Avatar } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";

export const DefenderCard = ({
  factoryPokemons,
}: { factoryPokemons: FactoryPokemon[] }) => {
  const defender = useSelector((state: RootState) => state.defender);
  const pokemon = defender.factoryPokemon;
  const settings = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  const handlePokemonChange = (pokemon: FactoryPokemon) => {
    dispatch(setDefender({ pokemon: pokemon, iv: 4 * (settings.times - 1) }));
  };

  if (!pokemon) {
    return null;
  }

  const data = pokemon.pokemon;
  return (
    <MainCardLayout
      header={
        <>
          <h2>Defender</h2>
          <div className="flex gap-1">
            <TypeBadge type={data.type1} />
            {data.type2 && <TypeBadge type={data.type2} />}
          </div>
        </>
      }
      content={
        <>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={data.imageSrc}
                  className="h-10 w-10 rounded-lg md:h-15 md:w-15"
                />
                <AvatarFallback>{data.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <AutoComplete
                setPokemon={handlePokemonChange}
                level={settings.level}
                times={settings.times}
                isNejiki={settings.isNejiki}
                factoryPokemons={factoryPokemons}
                trigger={
                  <Button
                    id="defender-pokemon"
                    variant="outline"
                    className="h-10 min-w-0 flex-1 justify-start px-3 text-base font-normal"
                  >
                    {pokemon ? pokemon.pokemon.name : "ポケモンを選択"}
                  </Button>
                }
              />
            </div>
          </div>

          <PokemonDescription
            factroyPokemon={pokemon}
            setAbility={(value: string) => {
              dispatch(setDfAbility({ ability: value }));
            }}
            setAbilityEnabled={(enabled: boolean) => {
              dispatch(setDfAbilityEnabled({ enabled: enabled }));
            }}
            setItem={(value: string) => {
              dispatch(setDfItem({ item: value }));
            }}
            setIv={(iv) => dispatch(setDfIv(iv))}
            currentAbility={defender.ability || pokemon.pokemon.ability1}
            currentAbilityEnabled={defender.abilityEnabled}
            currentItem={defender.item || "なし"}
            currentIv={defender.iv}
          />
          <Rank
            rank={defender.bRank}
            label="防御ランク"
            setRank={(rank: number) => {
              dispatch(setBRank({ rank: rank }));
            }}
          />
          <Rank
            rank={defender.dRank}
            label="特防ランク"
            setRank={(rank: number) => {
              dispatch(setDRank({ rank: rank }));
            }}
          />
        </>
      }
    />
  );
};
