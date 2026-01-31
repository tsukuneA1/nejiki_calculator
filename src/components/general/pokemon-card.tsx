import { CardTypeStyles } from "@/constants/cardTypeStyles";
import {
  setAbility,
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
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
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
  const pokemon = attacker.factoryPokemon!;
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

  const handleItemChange = (item: string) => {
    dispatch(setItem({ item: item, pos: pos }));
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const data = pokemon.pokemon;

  return (
    <div
      className={`${pos !== 0 && clsx(CardTypeStyles[0].cardStyle, "bg-white rounded-lg p-4")}`}
    >
      <div className="flex items-center justify-between w-full mb-2">
        <div className="flex items-center justify-between gap-2 p-2 border rounded-lg w-full">
          <div className="flex items-center gap-2">
            <div className="rounded-lg flex items-center justify-center">
              <Avatar>
                <AvatarImage
                  src={data.imageSrc}
                  className="w-10 h-10 md:w-15 md:h-15 border border-gray-300 rounded-lg"
                />
                <AvatarFallback>{data.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
            <AutoComplete
              setPokemon={handlePokemonChange}
              level={settings.level}
              times={settings.times}
              isNejiki={settings.isNejiki}
              factoryPokemons={factoryPokemons}
              trigger={
                <Button
                  variant="ghost"
                  className="w-[150px] justify-start text-lg border-1 border-gray-300 w-"
                >
                  {pokemon ? <>{pokemon.pokemon.name}</> : <>Set Pokemon</>}
                </Button>
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" onClick={handleDelete}>
              <MaterialSymbolsDeleteOutline />
            </Button>
            {isExpanded ? (
              <Button size="icon" onClick={handleExpand}>
                <FamiconsChevronCollapseOutline />
              </Button>
            ) : (
              <Button size="icon" onClick={handleExpand}>
                <IonChevronExpandOutline />
              </Button>
            )}
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="flex flex-col gap-2">
          <PokemonDescription
            factroyPokemon={pokemon}
            setAbility={handleAbilityChange}
            setItem={handleItemChange}
            setIv={(iv) => dispatch(setIv({ iv: iv, pos: pos }))}
            currentAbility={attacker.ability || "なし"}
            currentItem={attacker.item || "なし"}
            currentIv={attacker.iv}
          />
          <Rank
            rank={attacker.rank}
            badgeName="ランク補正"
            setRank={handleRankChange}
          />
          <Badge className="w-full h-9">技</Badge>
          <div className="sm:grid sm:grid-cols-2 gap-2 ">
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
          <div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="terms"
                  checked={isCriticalHit}
                  onClick={() =>
                    dispatch(
                      setCriticalHit({ isCritical: !isCriticalHit, pos }),
                    )
                  }
                  className="w-5 h-5 border-2"
                />
                <label
                  htmlFor="terms"
                  className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  急所
                </label>
                <Checkbox
                  id="terms"
                  checked={isBurned}
                  onClick={() =>
                    dispatch(setBurned({ isBurned: !isBurned, pos }))
                  }
                  className="w-5 h-5 border-2"
                />
                <label
                  htmlFor="terms"
                  className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  やけど
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
