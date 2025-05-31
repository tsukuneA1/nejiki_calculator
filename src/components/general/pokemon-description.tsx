import { ivItems } from "@/constants/ivs";
import { calculateStatus } from "@/functions/calculate_status";
import type { RootState } from "@/store/store";
import type { FactoryPokemon } from "@/types/factoryPokemon";
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { TypeBadge } from "./type-badge";

type PokemonDescriptionProps = {
	factroyPokemon: FactoryPokemon;
	currentAbility: string;
	currentItem: string;
	currentIv: number;
	setAbility: (ability: string) => void;
	setItem: (item: string) => void;
	setIv: (iv: number) => void;
};

export const PokemonDescription = ({
	factroyPokemon,
	currentAbility,
	currentItem,
	currentIv,
	setAbility,
	setItem,
	setIv,
}: PokemonDescriptionProps) => {
	const settings = useSelector((state: RootState) => state.settings);
	const status = calculateStatus(factroyPokemon, settings.level, currentIv);

	const abilities = ["なし", factroyPokemon.pokemon.ability1];

	if (factroyPokemon.pokemon.ability2) {
		abilities.push(factroyPokemon.pokemon.ability2);
	}

	const items = ["なし", factroyPokemon.item];
	return (
		<div className="space-y-2">
			<div className="grid grid-cols-2 gap-2">
				<div>
					<Badge className="w-18 py-1 mb-1">タイプ</Badge>
					<div className="flex gap-1">
						<TypeBadge type={factroyPokemon.pokemon.type1} />

						{factroyPokemon.pokemon.type2 && (
							<TypeBadge type={factroyPokemon.pokemon.type2} />
						)}
					</div>
				</div>
				<div>
					<Badge className="w-18 py-1 mb-1">個体値</Badge>
					<Select
						onValueChange={(value) => setIv(Number.parseInt(value))}
						defaultValue={"0"}
						value={currentIv.toString()}
					>
						<SelectTrigger className="w-full">
							<SelectValue>{currentIv.toString()}</SelectValue>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>個体値</SelectLabel>
								{ivItems.map((iv, i) => (
									<SelectItem key={i} value={iv.toString()}>
										{iv}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-2">
				<div>
					<Badge className="w-18 py-1 mb-1">特性</Badge>
					<Select
						onValueChange={(value) => setAbility(value)}
						defaultValue={factroyPokemon.pokemon.ability1}
						value={currentAbility}
					>
						<SelectTrigger className="w-full">
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
				<div>
					<Badge className="w-18 py-1 mb-1">アイテム</Badge>
					<Select
						onValueChange={(value) => setItem(value)}
						defaultValue={factroyPokemon.item}
						value={currentItem}
					>
						<SelectTrigger className="w-full">
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

			<div className="flex items-center gap-2 w-full">
				<Badge className="w-18 h-9">ステータス</Badge>
				<div className="border box-shadow p-2 rounded-md w-full">
					{status.hp}-{status.attack}-{status.defense}-{status.spAttack}-
					{status.spDefense}-{status.speed}
				</div>
			</div>
		</div>
	);
};
