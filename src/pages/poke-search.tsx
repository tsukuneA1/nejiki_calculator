import { filterFactoryPokemons } from "@/components/general/auto-complete";
import { TypeBadge } from "@/components/general/type-badge";
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
import { FACTORY_POKEMONS } from "@/constants/factoryPokemon";
import { items } from "@/constants/items";
import { findItems, timesItems } from "@/constants/ivs";
import { calculateStatus } from "@/functions/calculate_status";
import { toggleKana } from "@/functions/convert_hiragana_katakana";
import { MainLayout } from "@/layouts/main/main-layout";
import type { FactoryPokemon } from "@/types/factoryPokemon";
import type { Move } from "@/types/move";
import { Filter, Search } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function PokeSearch() {
  const [factoryPokemons] = useState<FactoryPokemon[]>(FACTORY_POKEMONS);
  const [level, setLevel] = useState<number>(100);
  const [times, setTimes] = useState<number>(1);
  const [item, setItem] = useState<string>("なし");
  const [ability, setAbility] = useState<string>("なし");
  const [sortItem, setSortItem] = useState<string>("なし");
  const [selectedPokemon, setSelectedPokemon] = useState<string>("");
  const [isNejiki, setIsNejiki] = useState(false);

  const filteredSortedFactoryPokemons = useMemo(() => {
    const ivBonus = 4 * (times - 1);

    // フィルタリング
    const filtered = factoryPokemons.filter((pokemon) => {
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
        !selectedPokemon ||
        toggleKana(pokemon.pokemon.name).includes(selectedPokemon) ||
        pokemon.pokemon.name.includes(selectedPokemon);
      return isItem && isLevel && isAbility && isPokemon;
    });

    // ソート項目が"なし"の場合はソートせずに返す
    if (sortItem === "なし") {
      return filtered;
    }

    // ステータスを事前計算してキャッシュ
    const pokemonWithStatus = filtered.map((pokemon) => ({
      pokemon,
      status: calculateStatus(pokemon, level, ivBonus),
    }));

    // ソート
    return pokemonWithStatus.sort((a, b) => {
      const aStatus = a.status;
      const bStatus = b.status;

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
    }).map(({ pokemon }) => pokemon);
  }, [factoryPokemons, level, times, item, ability, sortItem, selectedPokemon, isNejiki]);

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
    <>
      <Head>
        <title>
          金ネジキ ポケモン一覧 | バトルファクトリー検索ツール【完全版】
        </title>
        <meta
          name="description"
          content="金ネジキポケモン一覧の決定版！バトルファクトリーで使用可能なポケモンを完全網羅。持ち物・特性・能力値で細かく検索可能。周回別フィルタリングで攻略的にポケモンを選択しよう！"
        />
        <meta
          name="keywords"
          content="金ネジキ,ポケモン一覧,バトルファクトリー,検索,フィルター,ポケモン,特性,持ち物,能力値,プラチナ,HGSS,攻略"
        />
        <meta
          property="og:title"
          content="金ネジキ ポケモン一覧 | バトルファクトリー検索ツール"
        />
        <meta
          property="og:description"
          content="金ネジキ攻略に必須！バトルファクトリーで使用可能なポケモンを完全網羅。持ち物・特性・能力値で細かく検索可能。"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://nejiki-calculator.com/images/nejiki_image.png"
        />
        <meta
          property="og:url"
          content="https://nejiki-calculator.com/poke-search"
        />
        <meta property="og:site_name" content="金ネジキ攻略ツール" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="金ネジキ ポケモン一覧 | バトルファクトリー検索ツール"
        />
        <meta
          name="twitter:description"
          content="金ネジキ攻略に必須！バトルファクトリーのポケモンを完全網羅。持ち物・特性で細かく検索可能。"
        />
        <meta
          name="twitter:image"
          content="https://nejiki-calculator.com/images/nejiki_image.png"
        />
        <link
          rel="canonical"
          href="https://nejiki-calculator.com/poke-search"
        />
        <meta name="author" content="金ネジキ攻略ツール" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
      </Head>
      <MainLayout>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "金ネジキ ポケモン一覧",
              description:
                "バトルファクトリーで使用可能なポケモンの詳細情報と検索機能。",
              url: "https://nejiki-calculator.com/poke-search",
              isPartOf: {
                "@type": "WebSite",
                name: "金ネジキ攻略ツール",
                url: "https://nejiki-calculator.com",
              },
              keywords: "金ネジキ,ポケモン一覧,バトルファクトリー,検索",
              mainEntity: {
                "@type": "ItemList",
                name: "バトルファクトリーポケモン一覧",
                numberOfItems: 495,
              },
            }),
          }}
        />
        <div className="min-h-screen bg-inherit max-w-6xl flex flex-col gap-4">
          <h1 className="sr-only">
            金ネジキ ポケモン一覧 バトルファクトリー検索ツール
          </h1>
          <Card className="shadow-sm py-0 w-full">
            <CardHeader className="bg-primary gap-0 text-white rounded-t-lg py-4">
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
          <Card className="shadow-sm py-0">
            <CardHeader className="bg-primary text-white rounded-t-lg py-4 gap-0">
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
                  <div className="border rounded-lg" key={pokemon.id}>
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
        </div>
      </MainLayout>
    </>
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
    <div key={pokemon.id} className="p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800/30 rounded-lg flex items-center justify-center relative">
          <Image
            src={pokemon.pokemon.imageSrc}
            alt={pokemon.pokemon.name}
            width={48}
            height={48}
            className="w-12 h-12"
            loading="lazy"
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
