import { Attackers } from "@/components/domain/attacker/attackers";
import { DefenderCard } from "@/components/domain/defender/defender-card";
import { EnvCard } from "@/components/domain/env/env-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { findItems, timesItems } from "@/constants/ivs";
import { MainLayout } from "@/layouts/main/main-layout";
import { clearAttacker, setAttacker } from "@/store/slices/attackerSlice";
import { setDefender } from "@/store/slices/defenderSlice";
import { setIsNejiki, setLevel, setTimes } from "@/store/slices/settingsSlice";
import type { RootState } from "@/store/store";
import { ArrowLeftRight, ArrowUpDown } from "lucide-react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
	const settings = useSelector((state: RootState) => state.settings);
	const attackers = useSelector((state: RootState) => state.attacker);
	const defender = useSelector((state: RootState) => state.defender);
	const dispatch = useDispatch();

	const handleLevelChange = (level: number) => {
		dispatch(setLevel(level));
	};

	const handleReverse = () => {
		dispatch(
			setAttacker({
				attackerState: { pokemon: defender.factoryPokemon!, pos: 0 },
				iv: defender.iv,
			}),
		);
		dispatch(clearAttacker());
		dispatch(
			setDefender({
				pokemon: attackers[0].factoryPokemon!,
				iv: attackers[0].iv,
			}),
		);
	};

	const handleTimesChange = (pos: number) => {
		if (pos === 3) {
			dispatch(setIsNejiki(true));
		} else {
			dispatch(setIsNejiki(false));
		}

		dispatch(setTimes(findItems(pos)));
	};

	return (
		<>
			<Head>
				<title>
					金ネジキ攻略 | ポケモンバトルファクトリー
					ダメージ計算機【プラチナ/HGSS対応】
				</title>
				<meta
					name="description"
					content="金ネジキ攻略の決定版！ポケモンバトルファクトリー専用ダメージ計算機。プラチナ/HGSS完全対応。技・特性・持ち物の詳細設定で正確なダメージ計算。周回別ポケモン自動フィルタリング搭載。"
				/>
				<meta
					name="keywords"
					content="金ネジキ,ポケモン,バトルファクトリー,ダメージ計算,プラチナ,HGSS,ハートゴールド,ソウルシルバー,攻略,計算機,ツール"
				/>
				<meta
					property="og:title"
					content="金ネジキ攻略 | ポケモンバトルファクトリー ダメージ計算機"
				/>
				<meta
					property="og:description"
					content="金ネジキ攻略専用のダメージ計算機。ポケモンバトルファクトリーで使用可能なポケモンを完全網羅。正確なダメージ計算で戦略的に攻略しよう！"
				/>
				<meta property="og:type" content="website" />
				<meta
					property="og:image"
					content="https://nejiki-calculator.com/images/nejiki_image.png"
				/>
				<meta property="og:url" content="https://nejiki-calculator.com/" />
				<meta property="og:site_name" content="金ネジキ攻略ツール" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content="金ネジキ攻略 | ポケモンバトルファクトリー ダメージ計算機"
				/>
				<meta
					name="twitter:description"
					content="金ネジキ攻略専用のダメージ計算機。プラチナ/HGSS対応、周回別自動フィルタリング搭載。"
				/>
				<meta
					name="twitter:image"
					content="https://nejiki-calculator.com/images/nejiki_image.png"
				/>
				<link rel="canonical" href="https://nejiki-calculator.com/" />
				<meta name="author" content="金ネジキ攻略ツール" />
				<meta
					name="robots"
					content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
				/>
			</Head>
			<MainLayout isTopPage={true}>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "WebApplication",
							name: "金ネジキ攻略 ダメージ計算機",
							description:
								"ポケモンバトルファクトリー（金ネジキ）専用のダメージ計算ツール。プラチナ/HGSS対応。",
							url: "https://nejiki-calculator.com",
							applicationCategory: "GameApplication",
							operatingSystem: "Web Browser",
							offers: {
								"@type": "Offer",
								price: "0",
								priceCurrency: "JPY",
							},
							keywords:
								"金ネジキ,ポケモン,バトルファクトリー,ダメージ計算,プラチナ,HGSS",
						}),
					}}
				/>
				<h1 className="sr-only">
					金ネジキ攻略 ポケモンバトルファクトリー ダメージ計算機
				</h1>
				<div className="w-auto max-w-xl flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm border dark:border-slate-800">
					<div className="flex items-center gap-2">
						<Checkbox
							id="terms"
							checked={settings.level === 50}
							onClick={() => handleLevelChange(50)}
							className="w-5 h-5 border-2 bg-white"
						/>
						<label
							htmlFor="terms"
							className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black"
						>
							50レベル
						</label>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox
							id="terms"
							checked={settings.level === 100}
							onClick={() => handleLevelChange(100)}
							className="w-5 h-5 border-2 bg-white"
						/>
						<label
							htmlFor="terms"
							className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black"
						>
							オープンレベル
						</label>
					</div>
					<Select
						onValueChange={(value) => handleTimesChange(Number(value))}
						defaultValue={"0"}
					>
						<SelectTrigger className="w-[180px] bg-white text-black">
							<SelectValue placeholder="周回回数を選択" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>周回回数</SelectLabel>
								{timesItems.map((timesItem, i) => (
									<SelectItem key={i} value={`${i}`}>
										{timesItem}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className="xl:flex flex flex-col items-center xl:flex-row xl:items-start xl:justify-center mt-4">
					<Attackers />

					<div className="flex items-center justify-center w-10 h-10 my-10 xl:mt-6 xl:mx-8">
						<Button
							size="icon"
							variant="outline"
							className="h-12 w-12 rounded-full"
							onClick={handleReverse}
						>
							<ArrowUpDown className="h-6 w-6 xl:hidden" />
							<ArrowLeftRight className="h-6 w-6 hidden xl:block" />
						</Button>
					</div>

					<div className="flex flex-col gap-2 xl:mt-0">
						<DefenderCard />
						<EnvCard />
					</div>
				</div>
			</MainLayout>
		</>
	);
}
