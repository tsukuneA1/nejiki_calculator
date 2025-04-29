import { calculateStatus } from '@/functions/calculate_status';
import { RootState } from '@/store/store';
import { FactoryPokemon } from '@/types/factoryPokemon';
import { useSelector } from 'react-redux';
import { SelectLabel } from './ui/select';
import { SelectTrigger, SelectValue } from './ui/select';
import { SelectItem } from './ui/select';
import { SelectGroup } from './ui/select';
import { Select } from './ui/select';
import { SelectContent } from './ui/select';
import { Badge } from './ui/badge';

type PokemonDescriptionProps = {
  factroyPokemon: FactoryPokemon;
  currentAbility: string;
  currentItem: string;
  setAbility: (ability: string) => void;
  setItem: (item: string) => void;
};

export const PokemonDescription = ({
  factroyPokemon,
  currentAbility,
  currentItem,
  setAbility,
  setItem,
}: PokemonDescriptionProps) => {
  const settings = useSelector((state: RootState) => state.settings);
  const status = calculateStatus(factroyPokemon, settings);

  const abilities = ['なし', factroyPokemon.pokemon.ability1];

  if (factroyPokemon.pokemon.ability2) {
    abilities.push(factroyPokemon.pokemon.ability2);
  }

  const items = ['なし', factroyPokemon.item];
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Badge className="w-18 h-9">タイプ</Badge>
        <div>
          {factroyPokemon.pokemon.type1}
          {factroyPokemon.pokemon.type2 && ` / ${factroyPokemon.pokemon.type2}`}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge className="w-18 h-9">ステータス</Badge>
        <div>
          {status.hp}-{status.attack}-{status.defense}-{status.spAttack}-
          {status.spDefense}-{status.speed}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge className="w-18 h-9">特性</Badge>
        <Select
          onValueChange={(value) => setAbility(value)}
          defaultValue={factroyPokemon.pokemon.ability1}
          value={currentAbility}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="特性を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>特性</SelectLabel>
              {abilities.map((ability, i) => (
                <SelectItem key={i} value={ability!}>
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
          defaultValue={factroyPokemon.item}
          value={currentItem}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="アイテムを選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>アイテム</SelectLabel>
              {items.map((item, i) => (
                <SelectItem key={i} value={item!}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
