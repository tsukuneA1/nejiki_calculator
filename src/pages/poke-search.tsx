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
import { CardTitle } from '@/components/ui/card';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Avatar } from '@radix-ui/react-avatar';
import { CardLayout } from '@/layouts/card/card-layout';

export default function PokeSearch() {
  const [factoryPokemons, setFactoryPokemons] = useState<FactoryPokemon[]>([]);
  const [level, setLevel] = useState<number>(100);
  const [times, setTimes] = useState<number>(1);
  const [item, setItem] = useState<string>('なし');
  const [ability, setAbility] = useState<string>('なし');
  const [sortItem, setSortItem] = useState<string>('なし');
  const [selectedPokemon, setSelectedPokemon] = useState<string>('なし');

  useEffect(() => {
    fetch('/api/factory_pokemon')
      .then((res) => res.json())
      .then((data) => setFactoryPokemons(data))
      .catch((error) =>
        console.error('Error fetching factory pokemons:', error)
      );
  }, []);

  const filteredSortedFactoryPokemons = factoryPokemons
    .filter((pokemon) => {
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
    })
    .sort((a, b) => {
      const aStatus = calculateStatus(a, level);
      const bStatus = calculateStatus(b, level);
      if (sortItem === 'HP') {
        return bStatus.hp - aStatus.hp;
      }
      if (sortItem === '攻撃') {
        return bStatus.attack - aStatus.attack;
      }
      if (sortItem === '防御') {
        return bStatus.defense - aStatus.defense;
      }
      if (sortItem === '特攻') {
        return bStatus.spAttack - aStatus.spAttack;
      }
      if (sortItem === '特防') {
        return bStatus.spDefense - aStatus.spDefense;
      }
      if (sortItem === '素早さ') {
        return bStatus.speed - aStatus.speed;
      } else {
        return 0;
      }
    });

  const handleLevelChange = (level: number) => {
    setLevel(level);
  };

  const sortItems = ['なし', 'HP', '攻撃', '防御', '特攻', '特防', '素早さ'];

  return (
    <SubLayout>
      <div className="flex flex-col items-start">
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
        <h1>並べ替え</h1>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge className="w-18 h-9">項目</Badge>
            <Select
              onValueChange={(value) => setSortItem(value)}
              defaultValue={'なし'}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="項目を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>並べ替え項目</SelectLabel>
                  {sortItems.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col items-center my-5">
          <h2 className="text-bold text-xl">検索結果</h2>
          {factoryPokemons.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <LoaderCircle className="w-10 h-10 animate-spin" />
            </div>
          ) : (
            <div>
              <div className="text-center">
                {factoryPokemons.length}件中
                {filteredSortedFactoryPokemons.length}
                件見つかりました
              </div>
              {filteredSortedFactoryPokemons.map((pokemon) => (
                <ListItem key={pokemon.id} pokemon={pokemon} level={level} />
              ))}
            </div>
          )}
        </div>
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
  const types = `${pokemon.pokemon.type1}${pokemon.pokemon.type2 ? `/${pokemon.pokemon.type2}` : ''}`;
  const statusSummary = [
    `H:${status.hp}(${pokemon.hp})`,
    `A:${status.attack}(${pokemon.attack})`,
    `B:${status.defense}(${pokemon.defense})`,
    `C:${status.spAttack}(${pokemon.spAttack})`,
    `D:${status.spDefense}(${pokemon.spDefense})`,
    `S:${status.speed}(${pokemon.speed})`,
  ].join(' ');
  const breafStatus = [
    `H:${status.hp}`,
    `A:${status.attack}`,
    `B:${status.defense}`,
    `C:${status.spAttack}`,
    `D:${status.spDefense}`,
    `S:${status.speed}`,
  ].join(' ');
  const statusComponent = () => {
    return (
      <>
        <div className="hidden md:block">{statusSummary}</div>
        <div className="md:hidden">{breafStatus}</div>
      </>
    );
  };
  const abilities = `${pokemon.pokemon.ability1}${pokemon.pokemon.ability2 ? `/${pokemon.pokemon.ability2}` : ''}`;

  return (
    <CardLayout
      header={
        <>
          <Avatar>
            <AvatarImage
              src={pokemon.pokemon.imageSrc}
              className="border-1 border-gray-300 w-12 h-12 border-1 rounded-lg"
            />
            <AvatarFallback>{pokemon.pokemon.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <CardTitle className="flex items-center gap-1">
            <h2 className="text-bold text-lg md:text-xl">
              {pokemon.pokemon.name}
            </h2>
            <span>@{pokemon.item}</span>
          </CardTitle>
        </>
      }
      content={
        <div className="space-y-2">
          <DescriptionBadge badge="タイプ" description={types} />
          <DescriptionBadge
            badge="ステータス"
            description={statusComponent()}
          />
          <DescriptionBadge badge="特性" description={abilities} />
          <div className="flex items-center gap-2">
            <Badge className="w-18 h-9">技</Badge>
            <div className="grid grid-cols-2 gap-2 md:flex">
              {pokemon.moves.map((move, index) => (
                <>
                  {index == 0 ? (
                    <>
                      <MoveItem key={move.id} move={move} />
                    </>
                  ) : (
                    <div className="flex">
                      <span className="hidden md:block">/</span>
                      <MoveItem key={move.id} move={move} />
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
};

const MoveItem = ({ move }: { move: Move }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="text-sm md:text-base">{move.name}</div>
      </PopoverTrigger>
      <PopoverContent className="w-60">
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

const DescriptionBadge = ({
  badge,
  description,
}: {
  badge: string;
  description: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-2">
      <Badge className="w-18 h-9">{badge}</Badge>
      <div className="text-sm md:text-base">{description}</div>
    </div>
  );
};
