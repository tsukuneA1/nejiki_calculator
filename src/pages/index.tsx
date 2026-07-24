import { Attackers } from "@/components/domain/attacker/attackers";
import { DefenderCard } from "@/components/domain/defender/defender-card";
import { DefenderReserve } from "@/components/domain/defender/defender-reserve";
import { EnvCard } from "@/components/domain/env/env-card";
import { Button } from "@/components/ui/button";
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
import { getFactoryPokemons } from "@/lib/queries";
import { clearAttacker, setAttacker } from "@/store/slices/attackerSlice";
import { setDefender } from "@/store/slices/defenderSlice";
import { setIsNejiki, setLevel, setTimes } from "@/store/slices/settingsSlice";
import type { RootState } from "@/store/store";
import type { FactoryPokemon } from "@/types/factoryPokemon";
import { ArrowLeftRight, ArrowUpDown } from "lucide-react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";

interface HomeProps {
  factoryPokemons: FactoryPokemon[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const factoryPokemons = await getFactoryPokemons();

  return {
    props: {
      factoryPokemons,
    },
  };
};

export default function Home({ factoryPokemons }: HomeProps) {
  const settings = useSelector((state: RootState) => state.settings);
  const attackers = useSelector((state: RootState) => state.attacker);
  const defender = useSelector((state: RootState) => state.defender);
  const dispatch = useDispatch();

  const handleLevelChange = (level: number) => {
    dispatch(setLevel(level));
  };

  const handleReverse = () => {
    const attackerPokemon = attackers[0]?.factoryPokemon;
    const defenderPokemon = defender.factoryPokemon;
    if (!attackerPokemon || !defenderPokemon) {
      return;
    }

    dispatch(
      setAttacker({
        attackerState: { pokemon: defenderPokemon, pos: 0 },
        iv: defender.iv,
      }),
    );
    dispatch(clearAttacker());
    dispatch(
      setDefender({
        pokemon: attackerPokemon,
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
        <meta property="og:locale" content="ja_JP" />
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
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Static JSON-LD contains no user input.
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
        <div className="flex w-auto max-w-xl items-end gap-3 rounded-lg border bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-1.5">
            <label
              htmlFor="level-select"
              className="block text-xs font-medium text-zinc-600 dark:text-zinc-300"
            >
              レベル
            </label>
            <Select
              value={`${settings.level}`}
              onValueChange={(value) => handleLevelChange(Number(value))}
            >
              <SelectTrigger
                id="level-select"
                className="w-40 bg-white text-black"
              >
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
          <div className="space-y-1.5">
            <label
              htmlFor="times-select"
              className="block text-xs font-medium text-zinc-600 dark:text-zinc-300"
            >
              周回
            </label>
            <Select
              onValueChange={(value) => handleTimesChange(Number(value))}
              defaultValue={"0"}
            >
              <SelectTrigger
                id="times-select"
                className="w-40 bg-white text-black"
              >
                <SelectValue placeholder="周回回数を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>周回回数</SelectLabel>
                  {timesItems.map((timesItem, i) => (
                    <SelectItem key={timesItem} value={`${i}`}>
                      {timesItem}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex w-full flex-col items-center xl:flex-row xl:items-start xl:justify-center">
          <Attackers factoryPokemons={factoryPokemons} />

          <div className="my-10 flex h-10 w-10 items-center justify-center xl:mx-8 xl:mb-0 xl:mt-18">
            <Button
              size="icon"
              variant="outline"
              className="h-12 w-12 rounded-full"
              aria-label="攻撃側と防御側を入れ替え"
              title="攻撃側と防御側を入れ替え"
              onClick={handleReverse}
            >
              <ArrowUpDown className="h-6 w-6 xl:hidden" />
              <ArrowLeftRight className="h-6 w-6 hidden xl:block" />
            </Button>
          </div>

          <div className="flex w-full max-w-lg flex-col gap-2 xl:mt-0">
            <DefenderReserve factoryPokemons={factoryPokemons} />
            <DefenderCard factoryPokemons={factoryPokemons} />
            <EnvCard />
          </div>
        </div>
      </MainLayout>
    </>
  );
}
