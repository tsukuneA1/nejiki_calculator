import { AutoComplete } from "@/components/general/auto-complete";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { setDefender } from "@/store/slices/defenderSlice";
import type { RootState } from "@/store/store";
import type { FactoryPokemon } from "@/types/factoryPokemon";
import { Avatar } from "@radix-ui/react-avatar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaterialSymbolsDeleteOutline } from "../../icons/delete";
import { AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";

export const DefenderReserve = () => {
	const settings = useSelector((state: RootState) => state.settings);
	const [selectedId, setSelectedId] = useState("");
	const [spares, setSpares] = useState<FactoryPokemon[]>([]);
	const defender = useSelector((state: RootState) => state.defender);
	const dispatch = useDispatch();

	const handleAddSpare = (pokemon: FactoryPokemon) => {
		if (
			!spares.includes(pokemon) &&
			spares.length <= 6 &&
			pokemon !== defender.factoryPokemon
		) {
			setSpares([...spares, pokemon]);
		}
	};

	const handleDeleteSpare = () => {
		if (selectedId !== "") {
			const updated = spares.filter(
				(spare) => spare.id.toString() !== selectedId,
			);
			setSpares(updated);
			setSelectedId("");
		}
	};

	const handleClickSelectedPoke = (pokemon: FactoryPokemon) => {
		if (pokemon.id.toString() === selectedId) {
			const updatedSpares = spares.filter((spare) => spare.id !== pokemon.id);

			if (defender.factoryPokemon) {
				updatedSpares.push(defender.factoryPokemon);
			}
			setSpares(updatedSpares);

			dispatch(setDefender({ pokemon: pokemon, iv: 4 * (settings.times - 1) }));

			setSelectedId("");
		}
	};

	return (
		<div className="flex items-center justify-between border-1 rounded-lg p-2 bg-white">
			<ToggleGroup
				type="single"
				variant="outline"
				onValueChange={(value) => setSelectedId(value)}
			>
				{spares.length === 0 ? (
					<div className="text-black">スペアのポケモンを入力</div>
				) : (
					spares.map((spare) => {
						return (
							<ToggleGroupItem
								value={spare.id.toString()}
								aria-label={spare.id.toString()}
								onClick={() => handleClickSelectedPoke(spare)}
								key={spare.id}
							>
								<Avatar>
									<AvatarImage
										src={spare.pokemon.imageSrc}
										className="w-9 h-9"
									/>
									<AvatarFallback>
										{spare.pokemon.name.slice(0, 2)}
									</AvatarFallback>
								</Avatar>
							</ToggleGroupItem>
						);
					})
				)}
			</ToggleGroup>
			<div className="flex items-center gap-2">
				<AutoComplete
					trigger={
						<Button size="icon" className="w-9 h-9">
							+
						</Button>
					}
					level={settings.level}
					times={settings.times}
					isNejiki={settings.isNejiki}
					setPokemon={handleAddSpare}
				/>

				<Button size="icon" onClick={handleDeleteSpare}>
					<MaterialSymbolsDeleteOutline />
				</Button>
			</div>
		</div>
	);
};
