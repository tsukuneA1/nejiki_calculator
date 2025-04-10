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

export default function PokeSearch() {
  const [factoryPokemons, setFactoryPokemons] = useState<FactoryPokemon[]>([]);
  const [level, setLevel] = useState<number>(100);
  const [times, setTimes] = useState<number>(1);
  const [item, setItem] = useState<string>('なし');
  
  useEffect(() => {
    fetch('/api/factory_pokemon')
      .then((res) => res.json())
      .then((data) => setFactoryPokemons(data))
      .catch((error) =>
        console.error('Error fetching factory pokemons:', error)
      );
  }, []);

  const items = ['なし'];
  factoryPokemons.forEach((pokemon) => {
    if (!items.includes(pokemon.item)) {
      items.push(pokemon.item);
    }
  });

  const filteredFactoryPokemons = factoryPokemons.filter((pokemon) => {
    const isItem = pokemon.item == 'なし' || pokemon.item === item;
    const isLevel = filterFactoryPokemons(pokemon, { level, times });
    return isItem && isLevel;
  })

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
                    <SelectItem key={item} value={item}>{item}</SelectItem>
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
        {filteredFactoryPokemons.map((pokemon) => (
          <div key={pokemon.id}>{pokemon.pokemon.name}</div>
        ))}
      </div>
    </SubLayout>
  );
}

