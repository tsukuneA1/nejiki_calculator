import { CardTypeStyles } from "@/constants/cardTypeStyles";
import {
  setAbility,
  setAbilityEnabled,
  setAttacker,
  setBurned,
  setCriticalHit,
  setItem,
  setIv,
  setMove,
  setRank,
} from "@/store/slices/attackerSlice";
import type { RootState } from "@/store/store";
import type { FactoryPokemon } from "@/types/factoryPokemon";
import type { Move } from "@/types/move";
import { Avatar } from "@radix-ui/react-avatar";
import clsx from "clsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FamiconsChevronCollapseOutline } from "../icons/collapse";
import { MaterialSymbolsDeleteOutline } from "../icons/delete";
import { IonChevronExpandOutline } from "../icons/expand";
import { AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { AutoComplete } from "./auto-complete";
import { MoveCard } from "./move-card";
import { PokemonDescription } from "./pokemon-description";
import { Rank } from "./rank";

interface PokemonCardProps {
  pos: number;
  handleDelete: () => void;
  factoryPokemons: FactoryPokemon[];
}

export const PokemonCard = ({
  pos,
  handleDelete,
  factoryPokemons,
}: PokemonCardProps) => {
  const attacker = useSelector((state: RootState) => state.attacker[pos]);
  const pokemon = attacker.factoryPokemon;
  const move = useSelector((state: RootState) => state.attacker[pos].move);
  const isCriticalHit = useSelector(
    (state: RootState) => state.attacker[pos].criticalHit,
  );
  const isBurned = useSelector(
    (state: RootState) => state.attacker[pos].burned,
  );
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(true);
  const settings = useSelector((state: RootState) => state.settings);
  const handlePokemonChange = (pokemon: FactoryPokemon) => {
    dispatch(
      setAttacker({
        attackerState: { pokemon: pokemon, pos: pos },
        iv: 4 * (settings.times - 1),
      }),
    );
  };

  const handleMoveChange = (move: Move) => {
    dispatch(setMove({ move: move, pos: pos }));
  };

  const handleRankChange = (rank: number) => {
    dispatch(setRank({ rank: rank, pos: pos }));
  };

  const handleAbilityChange = (ability: string) => {
    dispatch(setAbility({ ability: ability, pos: pos }));
  };

  const handleAbilityEnabledChange = (enabled: boolean) => {
    dispatch(setAbilityEnabled({ enabled: enabled, pos: pos }));
  };

  const handleItemChange = (item: string) => {
    dispatch(setItem({ item: item, pos: pos }));
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!pokemon) {
    return null;
  }

  const data = pokemon.pokemon;

  return (
    <div
      className={`${pos !== 0 && clsx(CardTypeStyles[0].cardStyle, "bg-white rounded-lg p-4")}`}
    >
      <div className="mb-4 space-y-1.5">
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
                id={`attacker-pokemon-${pos}`}
                variant="outline"
                className="h-10 min-w-0 flex-1 justify-start px-3 text-base font-normal"
              >
                {pokemon ? pokemon.pokemon.name : "ポケモンを選択"}
              </Button>
            }
          />
          <div className="flex shrink-0 items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="攻撃ポケモンを削除"
              onClick={handleDelete}
            >
              <MaterialSymbolsDeleteOutline />
            </Button>
            {isExpanded ? (
              <Button
                variant="ghost"
                size="icon"
                aria-label="攻撃ポケモンの設定を閉じる"
                onClick={handleExpand}
              >
                <FamiconsChevronCollapseOutline />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                aria-label="攻撃ポケモンの設定を開く"
                onClick={handleExpand}
              >
                <IonChevronExpandOutline />
              </Button>
            )}
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="flex flex-col gap-4">
          <PokemonDescription
            factroyPokemon={pokemon}
            setAbility={handleAbilityChange}
            setAbilityEnabled={handleAbilityEnabledChange}
            setItem={handleItemChange}
            setIv={(iv) => dispatch(setIv({ iv: iv, pos: pos }))}
            currentAbility={attacker.ability || pokemon.pokemon.ability1}
            currentAbilityEnabled={attacker.abilityEnabled}
            currentItem={attacker.item || "なし"}
            currentIv={attacker.iv}
          />
          <Rank
            rank={attacker.rank}
            label="ランク補正"
            setRank={handleRankChange}
          />
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">技</Label>
            <div className="grid gap-2 sm:grid-cols-2">
              <MoveCard
                move={pokemon.moves[0]}
                handleMoveChange={handleMoveChange}
                isSelected={move === pokemon.moves[0]}
              />
              <MoveCard
                move={pokemon.moves[1]}
                handleMoveChange={handleMoveChange}
                isSelected={move === pokemon.moves[1]}
              />
              <MoveCard
                move={pokemon.moves[2]}
                handleMoveChange={handleMoveChange}
                isSelected={move === pokemon.moves[2]}
              />
              <MoveCard
                move={pokemon.moves[3]}
                handleMoveChange={handleMoveChange}
                isSelected={move === pokemon.moves[3]}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id={`critical-${pos}`}
                checked={isCriticalHit}
                onCheckedChange={() =>
                  dispatch(setCriticalHit({ isCritical: !isCriticalHit, pos }))
                }
                className="w-5 h-5 border-2"
              />
              <label
                htmlFor={`critical-${pos}`}
                className="text-sm font-medium leading-none"
              >
                急所
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id={`burned-${pos}`}
                checked={isBurned}
                onCheckedChange={() =>
                  dispatch(setBurned({ isBurned: !isBurned, pos }))
                }
                className="w-5 h-5 border-2"
              />
              <label
                htmlFor={`burned-${pos}`}
                className="text-sm font-medium leading-none"
              >
                やけど
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
