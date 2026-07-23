import { TypeBadge } from "@/components/general/type-badge";
import { Button } from "@/components/ui/button";
import { findItems, timesItems } from "@/constants/ivs";
import { calculateStatus } from "@/functions/calculate_status";
import { MainLayout } from "@/layouts/main/main-layout";
import { setAttacker } from "@/store/slices/attackerSlice";
import { setDefender } from "@/store/slices/defenderSlice";
import type { FactoryPokemon } from "@/types/factoryPokemon";
import { sendGAEvent } from "@next/third-parties/google";
import { ArrowLeft, Shield, Sword } from "lucide-react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

type PokemonDetailProps = {
  factoryPokemons: FactoryPokemon[];
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { getStaticFactoryPokemonSpeciesIds } = await import(
    "@/lib/static-factory-pokemon-data"
  );
  const pokemonIds = getStaticFactoryPokemonSpeciesIds();

  return {
    paths: pokemonIds.map((pokemonId) => ({
      params: { pokemonId: pokemonId.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PokemonDetailProps> = async ({
  params,
}) => {
  const pokemonId = Number(params?.pokemonId);
  if (!Number.isInteger(pokemonId)) {
    return { notFound: true };
  }

  const { getStaticFactoryPokemonsByPokemonId } = await import(
    "@/lib/static-factory-pokemon-data"
  );
  const factoryPokemons = getStaticFactoryPokemonsByPokemonId(pokemonId);
  if (factoryPokemons.length === 0) {
    return { notFound: true };
  }

  return { props: { factoryPokemons } };
};

const STAT_LABELS = ["HP", "攻撃", "防御", "特攻", "特防", "素早さ"] as const;

export default function PokemonDetail({ factoryPokemons }: PokemonDetailProps) {
  const pokemon = factoryPokemons[0].pokemon;
  const [roundIndex, setRoundIndex] = useState(0);
  const level = 100;
  const times = findItems(roundIndex);
  const iv = 4 * (times - 1);
  const description = `${pokemon.name}のバトルファクトリー型を一覧掲載。持ち物、性格、努力値、実数値、特性、技構成を周回数に応じて確認できます。`;

  return (
    <>
      <Head>
        <title>{pokemon.name}のバトルファクトリー型一覧 | 金ネジキ攻略</title>
        <meta name="description" content={description} />
        <link
          rel="canonical"
          href={`https://nejiki-calculator.com/pokemon/${pokemon.id}`}
        />
        <meta
          property="og:title"
          content={`${pokemon.name}のバトルファクトリー型一覧`}
        />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://nejiki-calculator.com/pokemon/${pokemon.id}`}
        />
        <meta property="og:image" content={pokemon.imageSrc} />
      </Head>
      <MainLayout>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Values come from the trusted application database and are serialized as JSON-LD.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: `${pokemon.name}のバトルファクトリー型一覧`,
              description,
              url: `https://nejiki-calculator.com/pokemon/${pokemon.id}`,
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: factoryPokemons.length,
                itemListElement: factoryPokemons.map(
                  (factoryPokemon, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: `${pokemon.name} ${factoryPokemon.item}型`,
                    url: `https://nejiki-calculator.com/pokemon/${pokemon.id}#set-${factoryPokemon.id}`,
                  }),
                ),
              },
            }),
          }}
        />

        <div className="w-full max-w-6xl space-y-4">
          <nav aria-label="パンくずリスト">
            <Link
              href="/poke-search"
              className="inline-flex items-center gap-1 text-sm text-slate-600 hover:underline dark:text-slate-300"
            >
              <ArrowLeft className="size-4" />
              ポケモン検索へ戻る
            </Link>
          </nav>

          <header className="rounded-xl border bg-white p-4 shadow-sm dark:bg-slate-900 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex size-24 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={pokemon.imageSrc}
                    alt={pokemon.name}
                    width={88}
                    height={88}
                    className="size-20 object-contain"
                    priority
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-sm text-slate-500">
                    バトルファクトリー型 {factoryPokemons.length}件
                  </p>
                  <h1 className="text-2xl font-bold sm:text-3xl">
                    {pokemon.name}
                  </h1>
                  <div className="mt-2 flex gap-1">
                    <TypeBadge type={pokemon.type1} />
                    {pokemon.type2 && <TypeBadge type={pokemon.type2} />}
                  </div>
                </div>
              </div>

              <dl className="grid flex-1 grid-cols-6 overflow-hidden rounded-lg border text-center">
                {[
                  pokemon.hp,
                  pokemon.attack,
                  pokemon.defense,
                  pokemon.spAttack,
                  pokemon.spDefense,
                  pokemon.speed,
                ].map((value, index) => (
                  <div
                    key={STAT_LABELS[index]}
                    className="border-r px-1 py-2 last:border-r-0"
                  >
                    <dt className="text-xs font-semibold text-slate-500">
                      {STAT_LABELS[index]}
                    </dt>
                    <dd className="font-mono font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <dl className="mt-5 grid gap-3 border-t pt-4 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-slate-500">特性</dt>
                <dd className="font-medium">
                  {pokemon.ability1}
                  {pokemon.ability2 && ` / ${pokemon.ability2}`}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">重さ</dt>
                <dd className="font-medium">{pokemon.weight}kg</dd>
              </div>
              <div>
                <dt className="text-slate-500">種族値合計</dt>
                <dd className="font-medium">
                  {pokemon.hp +
                    pokemon.attack +
                    pokemon.defense +
                    pokemon.spAttack +
                    pokemon.spDefense +
                    pokemon.speed}
                </dd>
              </div>
            </dl>
          </header>

          <section className="flex flex-col gap-3 rounded-xl border bg-white p-4 shadow-sm dark:bg-slate-900 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-semibold">実数値の計算条件</h2>
              <p className="text-sm text-slate-500">
                Lv.100で計算し、周回数に応じた個体値を使用します。
              </p>
            </div>
            <div>
              <label
                htmlFor="detail-round"
                className="mb-1 block text-xs text-slate-500"
              >
                周回数
              </label>
              <select
                id="detail-round"
                value={roundIndex}
                onChange={(event) => setRoundIndex(Number(event.target.value))}
                className="h-9 rounded-md border bg-background px-3 text-sm"
              >
                {timesItems.map((label, index) => (
                  <option key={label} value={index}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section aria-labelledby="factory-sets-heading" className="space-y-4">
            <div>
              <h2 id="factory-sets-heading" className="text-xl font-bold">
                {pokemon.name}の型一覧
              </h2>
              <p className="text-sm text-slate-500">
                各型から攻撃側・防御側へ直接セットできます。
              </p>
            </div>
            {factoryPokemons.map((factoryPokemon, index) => (
              <FactorySet
                key={factoryPokemon.id}
                factoryPokemon={factoryPokemon}
                index={index}
                level={level}
                iv={iv}
              />
            ))}
          </section>
        </div>
      </MainLayout>
    </>
  );
}

const FactorySet = ({
  factoryPokemon,
  index,
  level,
  iv,
}: {
  factoryPokemon: FactoryPokemon;
  index: number;
  level: number;
  iv: number;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const status = calculateStatus(factoryPokemon, level, iv);
  const actualStats = [
    status.hp,
    status.attack,
    status.defense,
    status.spAttack,
    status.spDefense,
    status.speed,
  ];
  const effortValues = [
    factoryPokemon.hp,
    factoryPokemon.attack,
    factoryPokemon.defense,
    factoryPokemon.spAttack,
    factoryPokemon.spDefense,
    factoryPokemon.speed,
  ];

  const setForDamageCalculation = (role: "attacker" | "defender") => {
    if (role === "attacker") {
      dispatch(
        setAttacker({
          attackerState: { pokemon: factoryPokemon, pos: 0 },
          iv,
        }),
      );
    } else {
      dispatch(setDefender({ pokemon: factoryPokemon, iv }));
    }
    sendGAEvent("event", "set_pokemon_from_detail_page", { role });
    router.push("/");
  };

  return (
    <article
      id={`set-${factoryPokemon.id}`}
      className="scroll-mt-4 rounded-xl border bg-white shadow-sm dark:bg-slate-900"
    >
      <header className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500">
            型{index + 1}・グループ{factoryPokemon.group}
          </p>
          <h3 className="text-lg font-bold">@{factoryPokemon.item}</h3>
          <p className="text-sm text-slate-500">
            性格：{factoryPokemon.nature}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            onClick={() => setForDamageCalculation("attacker")}
          >
            <Sword />
            攻撃側にセット
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setForDamageCalculation("defender")}
          >
            <Shield />
            防御側にセット
          </Button>
        </div>
      </header>

      <div className="grid gap-5 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 text-sm font-semibold">実数値（努力値）</h4>
            <dl className="grid grid-cols-6 overflow-hidden rounded-lg border text-center">
              {actualStats.map((value, statIndex) => (
                <div
                  key={STAT_LABELS[statIndex]}
                  className="border-r px-1 py-2 last:border-r-0"
                >
                  <dt className="text-xs font-semibold text-slate-500">
                    {STAT_LABELS[statIndex]}
                  </dt>
                  <dd className="font-mono font-semibold">{value}</dd>
                  <dd className="text-[10px] text-slate-500">
                    ({effortValues[statIndex]})
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold">使用可能な特性</h4>
            <p className="rounded-lg bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800">
              {factoryPokemon.pokemon.ability1}
              {factoryPokemon.pokemon.ability2 &&
                ` / ${factoryPokemon.pokemon.ability2}`}
            </p>
          </div>
        </div>

        <div>
          <h4 className="mb-2 text-sm font-semibold">技構成</h4>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="bg-slate-100 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <tr>
                  <th className="px-3 py-2 text-left">技名</th>
                  <th className="px-3 py-2 text-left">タイプ</th>
                  <th className="px-3 py-2 text-right">威力</th>
                  <th className="px-3 py-2 text-right">命中</th>
                  <th className="px-3 py-2 text-right">PP</th>
                  <th className="px-3 py-2 text-left">分類</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {factoryPokemon.moves.map((move) => (
                  <tr key={move.id}>
                    <td className="whitespace-nowrap px-3 py-2 font-medium">
                      {move.name}
                    </td>
                    <td className="px-3 py-2">{move.type}</td>
                    <td className="px-3 py-2 text-right">
                      {move.power ?? "—"}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {move.accuracy ?? "—"}
                    </td>
                    <td className="px-3 py-2 text-right">{move.pp ?? "—"}</td>
                    <td className="whitespace-nowrap px-3 py-2">
                      {move.classification}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </article>
  );
};
