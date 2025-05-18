import { filterFactoryPokemons } from "@/components/auto-complete";
import { TypeBadge } from "@/components/type-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Popover } from "@/components/ui/popover";
import { SelectItem } from "@/components/ui/select";
import { SelectLabel } from "@/components/ui/select";
import { SelectGroup } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { Select, SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { abilities } from "@/constants/abilities";
import { items } from "@/constants/items";
import { findItems, timesItems } from "@/constants/ivs";
import { calculateStatus } from "@/functions/calculate_status";
import { toggleKana } from "@/functions/convert_hiragana_katakana";
import { SubLayout } from "@/layouts/sub/sub-layout";
import type { FactoryPokemon } from "@/types/factoryPokemon";
import type { Move } from "@/types/move";
import { Filter, LoaderCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function PokeSearch() {
	const [factoryPokemons, setFactoryPokemons] = useState<FactoryPokemon[]>([]);
	const [level, setLevel] = useState<number>(100);
	const [times, setTimes] = useState<number>(1);
	const [item, setItem] = useState<string>("なし");
	const [ability, setAbility] = useState<string>("なし");
	const [sortItem, setSortItem] = useState<string>("なし");
	const [selectedPokemon, setSelectedPokemon] = useState<string>("なし");
	const [isNejiki, setIsNejiki] = useState(false);

	useEffect(() => {
		fetch("/api/factory_pokemon")
			.then((res) => res.json())
			.then((data) => setFactoryPokemons(data))
			.catch((error) =>
				console.error("Error fetching factory pokemons:", error),
			);
	}, []);

	const filteredSortedFactoryPokemons = factoryPokemons
		.filter((pokemon) => {
			const isItem = item === "なし" || pokemon.item === item;
			const isLevel = filterFactoryPokemons(pokemon, {
				level,
				times,
				isNejiki,
			});
			const isAbility =
				ability === "なし" ||
				pokemon.pokemon.ability1 === ability ||
				pokemon.pokemon.ability2 === ability;
			const isPokemon =
				selectedPokemon === "なし" ||
				toggleKana(pokemon.pokemon.name).includes(selectedPokemon) ||
				pokemon.pokemon.name.includes(selectedPokemon);
			return isItem && isLevel && isAbility && isPokemon;
		})
		.sort((a, b) => {
			const aStatus = calculateStatus(a, level, 4 * (times - 1));
			const bStatus = calculateStatus(b, level, 4 * (times - 1));
			if (sortItem === "HP") {
				return bStatus.hp - aStatus.hp;
			}
			if (sortItem === "攻撃") {
				return bStatus.attack - aStatus.attack;
			}
			if (sortItem === "防御") {
				return bStatus.defense - aStatus.defense;
			}
			if (sortItem === "特攻") {
				return bStatus.spAttack - aStatus.spAttack;
			}
			if (sortItem === "特防") {
				return bStatus.spDefense - aStatus.spDefense;
			}
			if (sortItem === "素早さ") {
				return bStatus.speed - aStatus.speed;
			}
			return 0;
		});

	const handleLevelChange = (level: number) => {
		setLevel(level);
	};

	const handleTimesChange = (pos: number) => {
		if (pos === 3) {
			setIsNejiki(true);
		} else {
			setIsNejiki(false);
		}

		setTimes(findItems(pos));
	};

	const sortItems = ["なし", "HP", "攻撃", "防御", "特攻", "特防", "素早さ"];

	return (
		<SubLayout>
			<div className="min-h-screen bg-slate-50 dark:bg-slate-900 max-w-6xl flex flex-col gap-4">
				<Card className="border-blue-200 dark:border-blue-900/50 shadow-sm py-0">
					<CardHeader className="bg-indigo-600 gap-0 text-white rounded-t-lg py-4">
						<CardTitle className="flex items-center gap-2">
							<Search className="h-5 w-5" />
							検索したいポケモンの情報を入力してください
						</CardTitle>
					</CardHeader>
					<CardContent className="p-4">
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							<div className="space-y-2">
								<Label className="bg-slate-800 text-white px-3 py-1 rounded-md inline-block">
									ポケモン名
								</Label>
								<div className="relative">
									<Input
										placeholder="ポケモン名を入力"
										className="pl-10"
										value={selectedPokemon}
										onChange={(e) => setSelectedPokemon(e.target.value)}
									/>
									<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
								</div>
							</div>

							<div className="space-y-2">
								<Label className="bg-slate-800 text-white px-3 py-1 rounded-md inline-block">
									周回数
								</Label>
								<Select
									onValueChange={(value) =>
										handleTimesChange(Number.parseInt(value))
									}
									defaultValue={"0"}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="周回数を選択" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>周回回数</SelectLabel>
											{timesItems.map((timesItem, i) => (
												<SelectItem key={i} value={i.toString()}>
													{timesItem}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label className="bg-slate-800 text-white px-3 py-1 rounded-md inline-block">
									特性
								</Label>
								<Select
									onValueChange={(value) => setAbility(value)}
									defaultValue={"なし"}
								>
									<SelectTrigger className="w-full">
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

							<div className="space-y-2">
								<Label className="bg-slate-800 text-white px-3 py-1 rounded-md inline-block">
									アイテム
								</Label>
								<Select
									onValueChange={(value) => setItem(value)}
									defaultValue={"なし"}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="アイテムを選択" />
									</SelectTrigger>

									<SelectContent>
										<SelectGroup>
											<SelectLabel>アイテム</SelectLabel>
											{items.map((item) => (
												<SelectItem key={item} value={item}>
													{item}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label className="bg-slate-800 text-white px-3 py-1 rounded-md inline-block">
									レベル
								</Label>
								<div className="flex items-center gap-4">
									<Checkbox
										id="terms"
										checked={level === 50}
										onClick={() => handleLevelChange(50)}
										className="w-5 h-5 border-2 bg-white"
									/>
									<label
										htmlFor="terms"
										className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										50レベル
									</label>
									<Checkbox
										id="terms"
										checked={level === 100}
										onClick={() => handleLevelChange(100)}
										className="w-5 h-5 border-2 bg-white"
									/>
									<label
										htmlFor="terms"
										className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										オープンレベル
									</label>
								</div>
							</div>

							<div className="space-y-2">
								<Label className="bg-slate-800 text-white px-3 py-1 rounded-md inline-block">
									項目
								</Label>
								<Select
									onValueChange={(value) => setSortItem(value)}
									defaultValue={"なし"}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="項目を選択" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>並べ替え項目</SelectLabel>
											{sortItems.map((item) => (
												<SelectItem key={item} value={item}>
													{item}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
						</div>
					</CardContent>
				</Card>
				{factoryPokemons.length === 0 ? (
					<div className="flex justify-center items-center h-full">
						<LoaderCircle className="w-10 h-10 animate-spin" />
					</div>
				) : (
					<Card className="border-indigo-200 dark:border-indigo-900/50 shadow-sm py-0">
						<CardHeader className="bg-indigo-600 text-white rounded-t-lg py-4 gap-0">
							<CardTitle className="flex items-center justify-between">
								<span className="flex items-center gap-2">
									<Filter className="h-5 w-5" />
									検索結果
								</span>
								<Badge className="bg-white text-indigo-700 hover:bg-white/90">
									{filteredSortedFactoryPokemons.length}件見つかりました
								</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent className="p-0">
							<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
								{filteredSortedFactoryPokemons.map((pokemon) => (
									<div className="border rounded-lg">
										<ListPokemonCard
											key={pokemon.id}
											pokemon={pokemon}
											level={level}
											times={times}
										/>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</SubLayout>
	);
}

const MoveItem = ({ move, index }: { move: Move; index: number }) => {
	return (
		<Popover>
			<PopoverTrigger>
				<span key={index} className="whitespace-nowrap">
					{move.name}
					{index < 3 && " / "}
				</span>
			</PopoverTrigger>
			<PopoverContent className="w-60">
				<div className="flex gap-2 items-center">
					<div className="w-16">技名</div>
					<div>: {move.name}</div>
				</div>
				<div className="flex gap-2 items-center">
					<div className="w-16">タイプ</div>
					<div>: {move.type}</div>
				</div>
				<div className="flex gap-2 items-center">
					<div className="w-16">威力</div>
					<div>: {move.power}</div>
				</div>
				<div className="flex gap-2 items-center">
					<div className="w-16">命中率</div>
					<div>: {move.accuracy}</div>
				</div>
				<div className="flex gap-2 items-center">
					<div className="w-16">PP</div>
					<div>: {move.pp}</div>
				</div>
				<div className="flex gap-2 items-center">
					<div className="w-16">分類</div>
					<div>: {move.classification}</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export const ListPokemonCard = ({
	pokemon,
	level,
	times,
}: {
	pokemon: FactoryPokemon;
	level: number;
	times: number;
}) => {
	const status = calculateStatus(pokemon, level, 4 * (times - 1));
	const statusSummary = [
		`${status.hp}(${pokemon.hp})`,
		`${status.attack}(${pokemon.attack})`,
		`${status.defense}(${pokemon.defense})`,
		`${status.spAttack}(${pokemon.spAttack})`,
		`${status.spDefense}(${pokemon.spDefense})`,
		`${status.speed}(${pokemon.speed})`,
	].join("-");

	return (
		<div
			key={pokemon.id}
			className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/10 transition-colors"
		>
			<div className="flex items-center gap-3 mb-2">
				<div className="w-14 h-14 bg-slate-100 dark:bg-slate-800/30 rounded-lg flex items-center justify-center">
					<img
						src={pokemon.pokemon.imageSrc}
						alt={pokemon.pokemon.name}
						className="w-12 h-12"
					/>
				</div>
				<div>
					<h3 className="text-lg font-semibold flex items-center gap-2">
						{pokemon.pokemon.name}
						<span className="text-sm font-normal text-slate-500">
							@{pokemon.item}
						</span>
					</h3>
					<div className="flex gap-1 mt-1">
						{pokemon.pokemon.type1 && (
							<TypeBadge type={pokemon.pokemon.type1} />
						)}
						{pokemon.pokemon.type2 && (
							<TypeBadge type={pokemon.pokemon.type2} />
						)}
					</div>
				</div>
			</div>

			<div className="grid gap-2 mt-3">
				<div>
					<div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
						ステータス
					</div>
					<div className="text-sm bg-slate-100 dark:bg-slate-800 p-2 rounded">
						{statusSummary}
					</div>
				</div>
				<div>
					<div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
						特性
					</div>
					<div className="text-sm bg-slate-100 dark:bg-slate-800 p-2 rounded">
						{pokemon.pokemon.ability1}
						{pokemon.pokemon.ability2 && `/${pokemon.pokemon.ability2}`}
					</div>
				</div>
				<div>
					<div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
						技
					</div>
					<div className="text-sm bg-slate-100 dark:bg-slate-800 p-2 rounded flex flex-wrap gap-1">
						{pokemon.moves.map((move, index) => (
							<MoveItem key={index} move={move} index={index} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

