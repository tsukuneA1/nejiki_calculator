import { filterFactoryPokemons } from "@/components/general/auto-complete";
import { TypeBadge } from "@/components/general/type-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectItem } from "@/components/ui/select";
import { SelectLabel } from "@/components/ui/select";
import { SelectGroup } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { Select, SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { findItems, timesItems } from "@/constants/ivs";
import { calculateStatus } from "@/functions/calculate_status";
import { toggleKana } from "@/functions/convert_hiragana_katakana";
import { MainLayout } from "@/layouts/main/main-layout";
import { getAbilities, getFactoryPokemons, getItems } from "@/lib/queries";
import type { FactoryPokemon } from "@/types/factoryPokemon";
import { ChevronRight, Filter, Search } from "lucide-react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

interface PokeSearchProps {
  factoryPokemons: FactoryPokemon[];
  abilities: string[];
  items: string[];
}

const STAT_LABELS = ["HP", "攻撃", "防御", "特攻", "特防", "素早さ"] as const;
const SORT_ITEMS = ["なし", ...STAT_LABELS];

type SearchFilters = {
  level: number;
  roundIndex: number;
  item: string;
  ability: string;
  sortItem: string;
  selectedPokemon: string;
};

export const getStaticProps: GetStaticProps<PokeSearchProps> = async () => {
  const factoryPokemons = await getFactoryPokemons();
  const abilities = await getAbilities();
  const items = await getItems();

  return {
    props: {
      factoryPokemons,
      abilities,
      items,
    },
  };
};

export default function PokeSearch({
  factoryPokemons,
  abilities,
  items,
}: PokeSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    level: 100,
    roundIndex: 0,
    item: "なし",
    ability: "なし",
    sortItem: "なし",
    selectedPokemon: "",
  });
  const { level, roundIndex, item, ability, sortItem, selectedPokemon } =
    filters;
  const times = findItems(roundIndex);
  const isNejiki = roundIndex === 3;

  const updateFilter = <K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K],
  ) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  };

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
    return pokemonWithStatus
      .sort((a, b) => {
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
      })
      .map(({ pokemon }) => pokemon);
  }, [
    factoryPokemons,
    level,
    times,
    item,
    ability,
    sortItem,
    selectedPokemon,
    isNejiki,
  ]);

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
        <meta property="og:locale" content="ja_JP" />
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
          // biome-ignore lint/security/noDangerouslySetInnerHtml: This is static JSON-LD metadata.
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
        <div className="flex min-h-screen w-full max-w-[1600px] flex-col gap-4 bg-inherit">
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
              <form
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="space-y-2">
                  <Label
                    htmlFor="pokemon-name"
                    className="text-xs text-muted-foreground"
                  >
                    ポケモン名
                  </Label>
                  <div className="relative">
                    <Input
                      id="pokemon-name"
                      type="search"
                      placeholder="ポケモン名を入力"
                      className="pl-10"
                      value={selectedPokemon}
                      onChange={(event) =>
                        updateFilter("selectedPokemon", event.target.value)
                      }
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="search-round"
                    className="text-xs text-muted-foreground"
                  >
                    周回数
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      updateFilter("roundIndex", Number.parseInt(value))
                    }
                    value={`${roundIndex}`}
                  >
                    <SelectTrigger id="search-round" className="w-full">
                      <SelectValue placeholder="周回数を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>周回回数</SelectLabel>
                        {timesItems.map((timesItem, i) => (
                          <SelectItem key={timesItem} value={i.toString()}>
                            {timesItem}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="search-ability"
                    className="text-xs text-muted-foreground"
                  >
                    特性
                  </Label>
                  <Select
                    onValueChange={(value) => updateFilter("ability", value)}
                    value={ability}
                  >
                    <SelectTrigger id="search-ability" className="w-full">
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
                  <Label
                    htmlFor="search-item"
                    className="text-xs text-muted-foreground"
                  >
                    アイテム
                  </Label>
                  <Select
                    onValueChange={(value) => updateFilter("item", value)}
                    value={item}
                  >
                    <SelectTrigger id="search-item" className="w-full">
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
                  <Label
                    htmlFor="search-level"
                    className="text-xs text-muted-foreground"
                  >
                    レベル
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      updateFilter("level", Number(value))
                    }
                    value={`${level}`}
                  >
                    <SelectTrigger id="search-level" className="w-full">
                      <SelectValue placeholder="レベルを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>レベル</SelectLabel>
                        <SelectItem value="50">50レベル</SelectItem>
                        <SelectItem value="100">オープンレベル</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="search-sort"
                    className="text-xs text-muted-foreground"
                  >
                    項目
                  </Label>
                  <Select
                    onValueChange={(value) => updateFilter("sortItem", value)}
                    value={sortItem}
                  >
                    <SelectTrigger id="search-sort" className="w-full">
                      <SelectValue placeholder="項目を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>並べ替え項目</SelectLabel>
                        {SORT_ITEMS.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </form>
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
              <div className="divide-y lg:hidden">
                {filteredSortedFactoryPokemons.map((pokemon) => (
                  <PokemonListRow
                    key={pokemon.id}
                    pokemon={pokemon}
                    level={level}
                    times={times}
                  />
                ))}
              </div>
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[1500px] border-collapse text-sm">
                  <thead className="sticky top-0 z-10 bg-slate-100 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <tr className="border-b">
                      <th className="sticky left-0 z-20 min-w-44 bg-slate-100 px-3 py-3 text-left dark:bg-slate-800">
                        ポケモン
                      </th>
                      <th className="min-w-32 px-3 py-3 text-left">持ち物</th>
                      <th className="min-w-28 px-3 py-3 text-left">タイプ</th>
                      {STAT_LABELS.map((label) => (
                        <th key={label} className="w-16 px-2 py-3 text-right">
                          {label}
                        </th>
                      ))}
                      <th className="min-w-32 px-3 py-3 text-left">特性</th>
                      {[1, 2, 3, 4].map((slot) => (
                        <th key={slot} className="min-w-32 px-3 py-3 text-left">
                          技{slot}
                        </th>
                      ))}
                      <th className="w-20 px-3 py-3 text-right">詳細</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredSortedFactoryPokemons.map((pokemon) => (
                      <PokemonTableRow
                        key={pokemon.id}
                        pokemon={pokemon}
                        level={level}
                        times={times}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </>
  );
}

const PokemonTableRow = ({
  pokemon,
  level,
  times,
}: {
  pokemon: FactoryPokemon;
  level: number;
  times: number;
}) => {
  const ivBonus = 4 * (times - 1);
  const status = calculateStatus(pokemon, level, ivBonus);
  const statusValues = [
    { label: "HP", actual: status.hp, effort: pokemon.hp },
    { label: "攻撃", actual: status.attack, effort: pokemon.attack },
    { label: "防御", actual: status.defense, effort: pokemon.defense },
    { label: "特攻", actual: status.spAttack, effort: pokemon.spAttack },
    { label: "特防", actual: status.spDefense, effort: pokemon.spDefense },
    { label: "素早さ", actual: status.speed, effort: pokemon.speed },
  ];
  const detailHref = `/pokemon/${pokemon.pokemon.id}#set-${pokemon.id}`;

  return (
    <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
      <th className="sticky left-0 z-[1] bg-white px-3 py-2 text-left dark:bg-slate-900">
        <Link
          href={detailHref}
          className="flex items-center gap-2 hover:underline"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800">
            <Image
              src={pokemon.pokemon.imageSrc}
              alt={pokemon.pokemon.name}
              width={36}
              height={36}
              className="size-9 object-contain"
              loading="lazy"
              unoptimized
            />
          </span>
          <span>
            <span className="block font-semibold">{pokemon.pokemon.name}</span>
          </span>
        </Link>
      </th>
      <td className="whitespace-nowrap px-3 py-2">{pokemon.item}</td>
      <td className="px-3 py-2">
        <div className="flex flex-col items-start gap-1">
          <TypeBadge type={pokemon.pokemon.type1} />
          {pokemon.pokemon.type2 && <TypeBadge type={pokemon.pokemon.type2} />}
        </div>
      </td>
      {statusValues.map(({ label, actual, effort }) => (
        <td key={label} className="px-2 py-2 text-right font-mono tabular-nums">
          <span className="block font-semibold">{actual}</span>
          <span className="block text-[10px] text-slate-500">({effort})</span>
        </td>
      ))}
      <td className="px-3 py-2 text-xs">
        <span className="block">{pokemon.pokemon.ability1}</span>
        {pokemon.pokemon.ability2 && (
          <span className="block text-slate-500">
            {pokemon.pokemon.ability2}
          </span>
        )}
      </td>
      {[0, 1, 2, 3].map((slot) => (
        <td key={slot} className="px-3 py-2 text-xs">
          {pokemon.moves[slot]?.name ?? "—"}
        </td>
      ))}
      <td className="px-3 py-2 text-right">
        <Link
          href={detailHref}
          aria-label={`${pokemon.pokemon.name}の${pokemon.item}型を詳しく見る`}
          className="inline-flex items-center gap-1 whitespace-nowrap font-medium text-blue-700 hover:underline dark:text-blue-300"
        >
          詳細
          <ChevronRight className="size-3" />
        </Link>
      </td>
    </tr>
  );
};

const PokemonListRow = ({
  pokemon,
  level,
  times,
}: {
  pokemon: FactoryPokemon;
  level: number;
  times: number;
}) => {
  const status = calculateStatus(pokemon, level, 4 * (times - 1));
  const statusValues = [
    { label: "HP", value: status.hp },
    { label: "攻撃", value: status.attack },
    { label: "防御", value: status.defense },
    { label: "特攻", value: status.spAttack },
    { label: "特防", value: status.spDefense },
    { label: "素早さ", value: status.speed },
  ];

  return (
    <Link
      href={`/pokemon/${pokemon.pokemon.id}#set-${pokemon.id}`}
      className="block p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
          <Image
            src={pokemon.pokemon.imageSrc}
            alt={pokemon.pokemon.name}
            width={48}
            height={48}
            className="size-12 object-contain"
            loading="lazy"
            unoptimized
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-2">
            <span className="truncate font-semibold">
              {pokemon.pokemon.name}
            </span>
            <ChevronRight className="size-4 shrink-0 text-slate-400" />
          </span>
          <span className="block truncate text-sm text-slate-500">
            @{pokemon.item}
          </span>
          <span className="mt-1 flex gap-1">
            <TypeBadge type={pokemon.pokemon.type1} />
            {pokemon.pokemon.type2 && (
              <TypeBadge type={pokemon.pokemon.type2} />
            )}
          </span>
        </span>
      </div>
      <dl className="mt-3 grid grid-cols-6 overflow-hidden rounded-md border text-center">
        {statusValues.map(({ label, value }) => (
          <div key={label} className="border-r py-1 last:border-r-0">
            <dt className="text-[10px] font-semibold text-slate-500">
              {label}
            </dt>
            <dd className="font-mono text-xs font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 truncate text-xs text-slate-500">
        {pokemon.pokemon.ability1}
        {pokemon.pokemon.ability2 && ` / ${pokemon.pokemon.ability2}`}
      </p>
    </Link>
  );
};
