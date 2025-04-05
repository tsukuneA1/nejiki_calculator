import { FactoryPokemon } from "@/types/factoryPokemon"
import { useEffect, useState } from "react";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { useMediaQuery } from '@mui/material';
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

export const AutoComplete = ({ setPokemon, initialPokemon }: { setPokemon: (pokemon: FactoryPokemon) => void, initialPokemon: FactoryPokemon }) => {
    const [open, setOpen] = useState(false);
    const [factoryPokemons, setFactoryPokemons] = useState<FactoryPokemon[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<FactoryPokemon | null>(initialPokemon)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    useEffect(() => {
        fetch("/api/factory_pokemon")
          .then((res) => res.json())
          .then((data) => setFactoryPokemons(data))
          .catch((error) => console.error('Error fetching factory pokemons:', error));
    }, []);

    const handleSelect = (pokemon: FactoryPokemon) => {
        setPokemon(pokemon);
        setSelectedStatus(pokemon);
        setOpen(false);
    }

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
              <Button variant="outline" className="w-[150px] justify-start">
                {selectedStatus ? <>{selectedStatus.pokemon.name}</> : <>Set Pokemon</>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <StatusList setOpen={setOpen} setSelectedStatus={handleSelect} factoryPokemons={factoryPokemons} />
            </PopoverContent>
          </Popover>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? <>{selectedStatus.pokemon.name}</> : <>Set Pokemon</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedStatus={handleSelect} factoryPokemons={factoryPokemons} />
        </div>
      </DrawerContent>
    </Drawer>

    )

    
}

function StatusList({
    setOpen,
    setSelectedStatus,
    factoryPokemons,
}: {
    setOpen: (open: boolean) => void
    setSelectedStatus: (status: FactoryPokemon) => void
    factoryPokemons: FactoryPokemon[]
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
                                setSelectedStatus(factoryPokemon)
                                setOpen(false)
                            }}
                        >
                            {factoryPokemon.pokemon.name}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}

const SuggestionCard = ({ factoryPokemon }: { factoryPokemon: FactoryPokemon }) => {
    return (
        <>
        </>
    )
}
