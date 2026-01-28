import { FACTORY_POKEMONS } from "@/constants/factoryPokemon";
import type { FactoryPokemon } from "@/types/factoryPokemon";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useState } from "react";
import { Popover, PopoverContent } from "../ui/popover";

import { toggleKana } from "@/functions/convert_hiragana_katakana";
import { useMediaQuery } from "@mui/material";
import { HoverCard, HoverCardContent } from "@radix-ui/react-hover-card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { HoverCardTrigger } from "../ui/hover-card";

export const AutoComplete = ({
  trigger,
  setPokemon,
  level,
  times,
  isNejiki,
}: {
  trigger: React.ReactNode;
  setPokemon: (pokemon: FactoryPokemon) => void;
  level: number;
  times: number;
  isNejiki: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const factoryPokemons = FACTORY_POKEMONS;

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const stat = { level, times, isNejiki };

  const handleSelect = (pokemon: FactoryPokemon) => {
    setPokemon(pokemon);
    setOpen(false);
  };

  const filteredFactoryPokemons = factoryPokemons.filter((pokemon) => {
    return filterFactoryPokemons(pokemon, stat);
  });

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="h-15 w-36">
          {trigger}
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList
            setOpen={setOpen}
            setSelectedStatus={handleSelect}
            factoryPokemons={filteredFactoryPokemons}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="h-10 w-36">
        {trigger}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList
            setOpen={setOpen}
            setSelectedStatus={handleSelect}
            factoryPokemons={filteredFactoryPokemons}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

function StatusList({
  setOpen,
  setSelectedStatus,
  factoryPokemons,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: FactoryPokemon) => void;
  factoryPokemons: FactoryPokemon[];
}) {
  return (
    <Command>
      <CommandInput placeholder="Search pokemon..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pokemons">
          {factoryPokemons.map((factoryPokemon) => (
            <CommandItem
              key={factoryPokemon.id}
              onSelect={() => {
                setSelectedStatus(factoryPokemon);
                setOpen(false);
              }}
            >
              <SuggestionCard factoryPokemon={factoryPokemon} />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

const SuggestionCard = ({
  factoryPokemon,
}: {
  factoryPokemon: FactoryPokemon;
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="text-black h-10 flex items-center w-full">
          {factoryPokemon.pokemon.name}@{factoryPokemon.item}
          <div className="hidden">
            {toggleKana(factoryPokemon.pokemon.name)}
            {toggleKana(factoryPokemon.item)}
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-60 bg-white z-50 border-1 rounded-lg ml-2 p-2">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">技</h4>

            <div className="grid grid-cols-2 gap-2">
              {factoryPokemon.moves.map((move, index) => (
                <span key={move.id}>
                  {index !== 0 ? `${move.name}` : `${move.name}`}
                </span>
              ))}
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export const filterFactoryPokemons = (
  pokemon: FactoryPokemon,
  stat: { level: number; times: number; isNejiki: boolean },
) => {
  if (stat.isNejiki) {
    return (
      pokemon.group === 4 ||
      pokemon.group === 5 ||
      pokemon.group === 6 ||
      pokemon.group === 7 ||
      pokemon.group === 8
    );
  }

  if (stat.level === 100) {
    if (stat.times < 5) {
      return pokemon.group >= 4 && pokemon.group <= stat.times + 3;
    }
    return (
      pokemon.group === 4 ||
      pokemon.group === 5 ||
      pokemon.group === 6 ||
      pokemon.group === 7 ||
      pokemon.group === 8
    );
  }
  if (stat.times === 7) {
    return [7, 8].includes(pokemon.group);
  }
  return pokemon.group === stat.times;
};
