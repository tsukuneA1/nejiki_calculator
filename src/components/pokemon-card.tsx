import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { FactoryPokemon } from '@/types/factoryPokemon';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from './ui/avatar';
import { MoveCard } from './move-card';
import { AutoComplete } from './auto-complete';
import { Move } from '@/types/move';
import {
  setAbility,
  setAttacker,
  setBurned,
  setCriticalHit,
  setItem,
  setMove,
  setRank,
} from '@/store/slices/attackerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { PokemonDescription } from './pokemon-description';
import { RootState } from '@/store/store';
import { Rank } from './rank';
import { Button } from './ui/button';
import { MaterialSymbolsDeleteOutline } from './icons/delete';
import { IonChevronExpandOutline } from './icons/expand';
import { FamiconsChevronCollapseOutline } from './icons/collapse';
import { useState } from 'react';
import { Checkbox } from './ui/checkbox';

export const PokemonCard = ({
  pos,
  handleDelete,
}: {
  pos: number;
  handleDelete: () => void;
}) => {
  const attacker = useSelector((state: RootState) => state.attacker[pos]);
  const pokemon = attacker.factoryPokemon!;
  const move = useSelector((state: RootState) => state.attacker[pos].move);
  const isCriticalHit = useSelector(
    (state: RootState) => state.attacker[pos].criticalHit
  );
  const isBurned = useSelector(
    (state: RootState) => state.attacker[pos].burned
  );
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(true);
  const level = useSelector((state: RootState) => state.level);
  const handlePokemonChange = (pokemon: FactoryPokemon) => {
    dispatch(setAttacker({ pokemon: pokemon, pos: pos }));
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
    <Card className="my-2 w-xs max-w-xl sm:w-xl">
      <CardHeader className="flex items-center px-4 md:px-6">
        <Avatar>
          <AvatarImage
            src={data.imageSrc}
            className="w-10 h-10 md:w-15 md:h-15 border-1 border-gray-300 rounded-lg"
          />
          <AvatarFallback>{data.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <CardTitle>
          <AutoComplete
            setPokemon={handlePokemonChange}
            initialPokemon={pokemon}
            level={level.level}
            times={level.times}
          />
        </CardTitle>
        <div className="flex justify-end gap-2">
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
      </CardHeader>
      <CardContent className="space-y-2 px-4 md:px-6">
        {isExpanded && (
          <>
            <PokemonDescription
              factroyPokemon={pokemon}
              setAbility={handleAbilityChange}
              setItem={handleItemChange}
            />
            <Rank
              rank={attacker.rank}
              badgeName="ランク補正"
              setRank={handleRankChange}
            />
            <Badge className="w-18">技</Badge>
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
                        setCriticalHit({ isCritical: !isCriticalHit, pos })
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
          </>
        )}
      </CardContent>
    </Card>
  );
};
