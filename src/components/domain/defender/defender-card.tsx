import { AutoComplete } from "@/components/general/auto-complete";
import { PokemonDescription } from "@/components/general/pokemon-description";
import { Rank } from "@/components/general/rank";
import { TypeBadge } from "@/components/general/type-badge";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
import { setLifeOrb, setStealthRock } from "@/store/slices/envSlice";
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
  const stealthRock = useSelector((state: RootState) => state.env.stealthRock);
  const lifeOrb = useSelector((state: RootState) => state.env.lifeOrb);
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
          <h2>防御側</h2>
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
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              定数ダメージ
            </Label>
            <div className="flex min-h-9 flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="stealth-rock"
                  checked={stealthRock}
                  onCheckedChange={(checked) => {
                    dispatch(setStealthRock(checked));
                  }}
                />
                <label
                  htmlFor="stealth-rock"
                  className="text-sm font-medium leading-none"
                >
                  ステルスロック
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="life-orb"
                  checked={lifeOrb}
                  onCheckedChange={(checked) => {
                    dispatch(setLifeOrb(checked));
                  }}
                />
                <label
                  htmlFor="life-orb"
                  className="text-sm font-medium leading-none"
                >
                  いのちのたま
                </label>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
};
