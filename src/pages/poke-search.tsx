import { SelectItem } from '@/components/ui/select';
import { SelectLabel } from '@/components/ui/select';
import { SelectGroup } from '@/components/ui/select';
import { SelectContent } from '@/components/ui/select';
import { Select, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { SelectTrigger } from '@/components/ui/select';
import { SubLayout } from '@/layouts/sub/sub-layout';
import { FactoryPokemon } from '@/types/factoryPokemon';
import { useEffect, useState } from 'react';
import { filterFactoryPokemons } from '@/components/auto-complete';
import { items } from '@/constants/items';
import { abilities } from '@/constants/abilities';
import { calculateStatus } from '@/functions/calculate_status';
import { Input } from '@/components/ui/input';
import { toggleKana } from '@/functions/convert_hiragana_katakana';
import { LoaderCircle } from 'lucide-react';
import { Move } from '@/types/move';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Popover } from '@/components/ui/popover';
export default function PokeSearch() {
  const [factoryPokemons, setFactoryPokemons] = useState<FactoryPokemon[]>([]);
  const [level, setLevel] = useState<number>(100);
  const [times, setTimes] = useState<number>(1);
  const [item, setItem] = useState<string>('なし');
  const [ability, setAbility] = useState<string>('なし');
  const [selectedPokemon, setSelectedPokemon] = useState<string>('なし');

  useEffect(() => {
    fetch('/api/factory_pokemon')
      .then((res) => res.json())
      .then((data) => setFactoryPokemons(data))
      .catch((error) =>
        console.error('Error fetching factory pokemons:', error)
      );
  }, []);

  const filteredFactoryPokemons = factoryPokemons.filter((pokemon) => {
    const isItem = item == 'なし' || pokemon.item === item;
    const isLevel = filterFactoryPokemons(pokemon, { level, times });
    const isAbility =
      ability == 'なし' ||
      pokemon.pokemon.ability1 === ability ||
      pokemon.pokemon.ability2 === ability;
    const isPokemon =
      selectedPokemon === 'なし' ||
      toggleKana(pokemon.pokemon.name).includes(selectedPokemon) ||
      pokemon.pokemon.name.includes(selectedPokemon);
    return isItem && isLevel && isAbility && isPokemon;
  });

  const handleLevelChange = (level: number) => {
    setLevel(level);
  };
  return (
    <SubLayout>
      <div>
        <h1>検索したいポケモンの情報を入力してください</h1>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge className="w-18 h-9">ポケモン名</Badge>
            <Input
              value={selectedPokemon}
              onChange={(e) => setSelectedPokemon(e.target.value)}
              className="w-[180px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge className="w-18 h-9">周回回数</Badge>
            <Select
              onValueChange={(value) => setTimes(parseInt(value))}
              defaultValue={'1'}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="周回回数を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>周回回数</SelectLabel>
                  {[...Array(7)].map((_, i) => (
                    <SelectItem key={i} value={`${i + 1}`}>
                      {`${i + 1}周目`}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="w-18 h-9">特性</Badge>
            <Select
              onValueChange={(value) => setAbility(value)}
              defaultValue={'なし'}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="特性を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>特性</SelectLabel>
                  {abilities.map((ability) => (
                    <SelectItem key={ability} value={ability}>
                      {ability}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="w-18 h-9">アイテム</Badge>
            <Select
              onValueChange={(value) => setItem(value)}
              defaultValue={'なし'}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="アイテムを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>アイテム</SelectLabel>
                  {items.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="w-18 h-9">レベル</Badge>
            <Checkbox
              id="terms"
              checked={level == 50}
              onClick={() => handleLevelChange(50)}
              className="w-5 h-5 border-2"
            />
            <label
              htmlFor="terms"
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              50レベル
            </label>
            <Checkbox
              id="terms"
              checked={level == 100}
              onClick={() => handleLevelChange(100)}
              className="w-5 h-5 border-2"
            />
            <label
              htmlFor="terms"
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              オープンレベル
            </label>
          </div>
        </div>
        <div>検索結果</div>
        {factoryPokemons.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <LoaderCircle className="w-10 h-10 animate-spin" />
          </div>
        ) : (
          filteredFactoryPokemons.map((pokemon) => (
            <ListItem key={pokemon.id} pokemon={pokemon} level={level} />
          ))
        )}
      </div>
    </SubLayout>
  );
}

const ListItem = ({
  pokemon,
  level,
}: {
  pokemon: FactoryPokemon;
  level: number;
}) => {
  const status = calculateStatus(pokemon, level);
  return (
    <div className="border-2 border-gray-300 rounded-md p-2 my-1">
      <div key={pokemon.id} className="flex gap-2 ">
        <div>
          {pokemon.pokemon.name}@{pokemon.item}
        </div>
        <div>
          {pokemon.pokemon.type1}
          {pokemon.pokemon.type2 && `/${pokemon.pokemon.type2}`}
        </div>
        <div>
          {pokemon.pokemon.ability1}
          {pokemon.pokemon.ability2 && `/${pokemon.pokemon.ability2}`}
        </div>
      </div>
      <div>
        H:{status.hp}({pokemon.hp}) A:{status.attack}({pokemon.attack}) B:
        {status.defense}({pokemon.defense}) C:{status.spAttack}(
        {pokemon.spAttack}) D:{status.spDefense}({pokemon.spDefense}) S:
        {status.speed}({pokemon.speed})
      </div>
      <div>
        {pokemon.moves.map((move, index) => (
          <>
            {index == 0 ? (
              <>
                <MoveItem key={move.id} move={move} />
              </>
            ) : (
              <>
                /
                <MoveItem key={move.id} move={move} />
              </>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

const MoveItem = ({ move }: { move: Move }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div>{move.name}</div>
      </PopoverTrigger>
      <PopoverContent className='w-60'>
        <div className="flex gap-2 items-center">
          <div className="w-16">技名</div>
          <div>: {move.name}</div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-16">タイプ</div>
          <div>: {move.type}</div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-16">威力</div>
          <div>: {move.power}</div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-16">命中率</div>
          <div>: {move.accuracy}</div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-16">PP</div>
          <div>: {move.pp}</div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-16">分類</div>
          <div>: {move.classification}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
