import { ivItems } from "@/constants/ivs";
import { calculateStatus } from "@/functions/calculate_status";
import type { RootState } from "@/store/store";
import type { FactoryPokemon } from "@/types/factoryPokemon";
import { useId } from "react";
import { useSelector } from "react-redux";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { TypeBadge } from "./type-badge";

type PokemonDescriptionProps = {
  factroyPokemon: FactoryPokemon;
  currentAbility: string;
  currentAbilityEnabled: boolean;
  currentItem: string;
  currentIv: number;
  setAbility: (ability: string) => void;
  setAbilityEnabled: (enabled: boolean) => void;
  setItem: (item: string) => void;
  setIv: (iv: number) => void;
};

export const PokemonDescription = ({
  factroyPokemon,
  currentAbility,
  currentAbilityEnabled,
  currentItem,
  currentIv,
  setAbility,
  setAbilityEnabled,
  setItem,
  setIv,
}: PokemonDescriptionProps) => {
  const fieldId = useId();
  const settings = useSelector((state: RootState) => state.settings);
  const status = calculateStatus(factroyPokemon, settings.level, currentIv);

  const abilities = [factroyPokemon.pokemon.ability1];

  if (factroyPokemon.pokemon.ability2) {
    abilities.push(factroyPokemon.pokemon.ability2);
  }

  const items = ["なし", factroyPokemon.item];
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-4">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">タイプ</Label>
        <div className="flex h-9 items-center gap-1">
          <TypeBadge type={factroyPokemon.pokemon.type1} />

          {factroyPokemon.pokemon.type2 && (
            <TypeBadge type={factroyPokemon.pokemon.type2} />
          )}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label
          htmlFor={`${fieldId}-iv`}
          className="text-xs text-muted-foreground"
        >
          個体値
        </Label>
        <Select
          onValueChange={(value) => setIv(Number.parseInt(value))}
          value={currentIv.toString()}
        >
          <SelectTrigger id={`${fieldId}-iv`} className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>個体値</SelectLabel>
              {ivItems.map((iv) => (
                <SelectItem key={iv} value={iv.toString()}>
                  {iv}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <Label
            htmlFor={`${fieldId}-ability`}
            className="text-xs text-muted-foreground"
          >
            特性
          </Label>
          <div className="flex items-center gap-1">
            <Switch
              id={`${fieldId}-ability-enabled`}
              checked={currentAbilityEnabled}
              onCheckedChange={setAbilityEnabled}
            />
            <Label
              htmlFor={`${fieldId}-ability-enabled`}
              className="text-xs font-normal text-muted-foreground"
            >
              発動
            </Label>
          </div>
        </div>
        <Select onValueChange={setAbility} value={currentAbility}>
          <SelectTrigger id={`${fieldId}-ability`} className="w-full">
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

      <div className="space-y-1.5">
        <Label
          htmlFor={`${fieldId}-item`}
          className="text-xs text-muted-foreground"
        >
          持ち物
        </Label>
        <Select onValueChange={setItem} value={currentItem}>
          <SelectTrigger id={`${fieldId}-item`} className="w-full">
            <SelectValue placeholder="持ち物を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>持ち物</SelectLabel>
              {items.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-2 space-y-1.5">
        <Label className="text-xs text-muted-foreground">実数値</Label>
        <output className="block w-full rounded-md border bg-muted/30 px-3 py-2 text-sm tabular-nums">
          {status.hp}-{status.attack}-{status.defense}-{status.spAttack}-
          {status.spDefense}-{status.speed}
        </output>
      </div>
    </div>
  );
};
