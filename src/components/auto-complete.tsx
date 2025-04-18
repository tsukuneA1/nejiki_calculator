import { FactoryPokemon } from '@/types/factoryPokemon';
import { useEffect, useState } from 'react';
import { Popover, PopoverContent } from './ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { useMediaQuery } from '@mui/material';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { toggleKana } from '@/functions/convert_hiragana_katakana';

export const AutoComplete = ({
  setPokemon,
  initialPokemon,
  level,
  times,
}: {
  setPokemon: (pokemon: FactoryPokemon) => void;
  initialPokemon: FactoryPokemon | null;
  level: number;
  times: number;
}) => {
  const [open, setOpen] = useState(false);
  const [factoryPokemons, setFactoryPokemons] = useState<FactoryPokemon[]>([]);

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const stat = { level, times };

  useEffect(() => {
    fetch('/api/factory_pokemon')
      .then((res) => res.json())
      .then((data) => setFactoryPokemons(data))
      .catch((error) =>
        console.error('Error fetching factory pokemons:', error)
      );
  }, []);

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
          <Button
            variant="ghost"
            className="w-[150px] justify-start text-lg border-1 border-gray-300"
          >
            {initialPokemon ? (
              <>{initialPokemon.pokemon.name}</>
            ) : (
              <>Set Pokemon</>
            )}
          </Button>
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
        <Button
          variant="ghost"
          className="w-[150px] justify-start text-lg border-1 border-gray-300"
        >
          {initialPokemon ? (
            <>{initialPokemon.pokemon.name}</>
          ) : (
            <>Set Pokemon</>
          )}
        </Button>
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
    <div className="text-black h-10 flex items-center">
      {factoryPokemon.pokemon.name}@{factoryPokemon.item}
      <div className="hidden">
        {toggleKana(factoryPokemon.pokemon.name)}
        {toggleKana(factoryPokemon.item)}
      </div>
    </div>
  );
};

export const filterFactoryPokemons = (
  pokemon: FactoryPokemon,
  stat: { level: number; times: number }
) => {
  if (stat.level === 100) {
    if (stat.times < 5) {
      if (stat.times == 7) {
        return pokemon.group == 7 || pokemon.group == 8;
      }
      return pokemon.group == stat.times + 3;
    }
    return (
      pokemon.group == 4 ||
      pokemon.group == 5 ||
      pokemon.group == 6 ||
      pokemon.group == 7 ||
      pokemon.group == 8
    );
  } else {
    if (stat.times == 7) {
      return pokemon.group in [7, 8];
    }
    return pokemon.group == stat.times;
  }
};
