import { CardTypeStyles } from "@/constants/cardTypeStyles";
import { MainCardLayout } from "@/layouts/main-card/main-card-layout";
import {
	setBRank,
	setDRank,
	setDefender,
	setDfAbility,
	setDfItem,
	setDfIv,
} from "@/store/slices/defenderSlice";
import type { RootState } from "@/store/store";
import type { FactoryPokemon } from "@/types/factoryPokemon";
import { Avatar } from "@radix-ui/react-avatar";
import { ShieldPlus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AutoComplete } from "@/components/general/auto-complete";
import { DefenderReserve } from "./defender-reserve";
import { PokemonDescription } from "@/components/general/pokemon-description";
import { Rank } from "@/components/general/rank";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const DefenderCard = () => {
	const defender = useSelector((state: RootState) => state.defender);
	const pokemon = defender.factoryPokemon!;
	const settings = useSelector((state: RootState) => state.settings);
	const dispatch = useDispatch();

	const handlePokemonChange = (pokemon: FactoryPokemon) => {
		dispatch(setDefender({ pokemon: pokemon, iv: 4 * (settings.times - 1) }));
	};

	const data = pokemon.pokemon;
	return (
		<MainCardLayout
			cardStyle={CardTypeStyles[1]}
			header={
				<>
					<ShieldPlus className="w-7 h-7 mx-2" />
					<h1 className="text-2xl font-bold ml-3 my-4">Defender</h1>
				</>
			}
			content={
				<>
					<DefenderReserve />

					<div className="flex gap-2 items-center border rounded-lg px-2 py-2">
						<Avatar>
							<AvatarImage
								src={data.imageSrc}
								className="w-10 h-10 md:w-15 md:h-15 border-1 border-gray-300 rounded-lg"
							/>
							<AvatarFallback>{data.name.slice(0, 2)}</AvatarFallback>
						</Avatar>
						<div>
							<AutoComplete
								setPokemon={handlePokemonChange}
								level={settings.level}
								times={settings.times}
								isNejiki={settings.isNejiki}
								trigger={
									<Button
										variant="ghost"
										className="w-[150px] justify-start text-lg border-1 border-gray-300"
									>
										{pokemon ? <>{pokemon.pokemon.name}</> : <>Set Pokemon</>}
									</Button>
								}
							/>
						</div>
					</div>

					<PokemonDescription
						factroyPokemon={pokemon}
						setAbility={(value: string) => {
							dispatch(setDfAbility({ ability: value }));
						}}
						setItem={(value: string) => {
							dispatch(setDfItem({ item: value }));
						}}
						setIv={(iv) => dispatch(setDfIv(iv))}
						currentAbility={defender.ability || "なし"}
						currentItem={defender.item || "なし"}
						currentIv={defender.iv}
					/>
					<Rank
						rank={defender.bRank}
						badgeName="防御ランク"
						setRank={(rank: number) => {
							dispatch(setBRank({ rank: rank }));
						}}
					/>
					<Rank
						rank={defender.dRank}
						badgeName="特防ランク"
						setRank={(rank: number) => {
							dispatch(setDRank({ rank: rank }));
						}}
					/>
				</>
			}
		/>
	);
};
