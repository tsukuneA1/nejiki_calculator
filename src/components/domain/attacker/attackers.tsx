import { CardTypeStyles } from "@/constants/cardTypeStyles";
import { MainCardLayout } from "@/layouts/main-card/main-card-layout";
import { addAttacker, deleteAttacker } from "@/store/slices/attackerSlice";
import type { RootState } from "@/store/store";
import { Swords } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AttackerReserve } from "./attacker-reserve";
import { PokemonCard } from "@/components/general/pokemon-card";
import { Button } from "@/components/ui/button";

export const Attackers = () => {
	const attackers = useSelector((state: RootState) => state.attacker);
	const dispatch = useDispatch();

	const handleDelete = (pos: number) => {
		if (attackers.length > 1) {
			dispatch(deleteAttacker(pos));
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<MainCardLayout
				cardStyle={CardTypeStyles[0]}
				header={
					<>
						<Swords className="w-7 h-7 mx-2" />
						<h1 className="text-2xl font-bold ml-3 my-4">Attacker</h1>
					</>
				}
				content={
					<>
						<AttackerReserve />
						<PokemonCard pos={0} handleDelete={() => handleDelete(0)} />
					</>
				}
			/>
			<div className="flex flex-col gap-2">
				{attackers.slice(1).map((_, index) => (
					<div key={index + 1}>
						<PokemonCard
							pos={index + 1}
							handleDelete={() => handleDelete(index)}
						/>
					</div>
				))}
				<div className="flex justify-center">
					<Button
						onClick={() =>
							dispatch(
								addAttacker({
									pokemon: attackers[attackers.length - 1].factoryPokemon!,
									iv: attackers[attackers.length - 1].iv,
								}),
							)
						}
					>
						追加
					</Button>
				</div>
			</div>
		</div>
	);
};
