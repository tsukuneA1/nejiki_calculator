import { MainLayout } from '@/layouts/main/main-layout';
import { DefenderCard } from '@/components/defender-card';
import { Checkbox } from '@/components/ui/checkbox';
import { setIsNejiki, setLevel, setTimes } from '@/store/slices/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import { SystemUiconsReverse } from '@/components/icons/reverse';
import { SystemUiconsSort } from '@/components/icons/sort-icon';
import { Button } from '@/components/ui/button';
import { clearAttacker, setAttacker } from '@/store/slices/attackerSlice';
import { setDefender } from '@/store/slices/defenderSlice';
import { EnvCard } from '@/components/env-card';
import { Attackers } from '@/components/attackers';
import { DefenderReserve } from '@/components/defender-reserve';
import { findItems, timesItems } from '@/constants/ivs';
import Head from 'next/head';
import { CloudSunRain, ShieldPlus } from 'lucide-react';

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
      })
    );
    dispatch(clearAttacker());
    dispatch(
      setDefender({
        pokemon: attackers[0].factoryPokemon!,
        iv: attackers[0].iv,
      })
    );
  };

  const handleTimesChange = (pos: number) => {
    if (pos == 3) {
      dispatch(setIsNejiki(true));
    } else {
      dispatch(setIsNejiki(false));
    }

    dispatch(setTimes(findItems(pos)));
  };

  return (
    <>
      <Head>
        <title>金ネジキダメージ計算機 - ポケモンプラチナ/HGSS対応</title>
        <meta
          name="description"
          content="ポケモンバトルファクトリー（金ネジキ）用のダメージ計算ツール。HGSS/プラチナ対応、技や特性、持ち物を設定して詳細なダメージをチェック！"
        />
        <meta property="og:title" content="金ネジキダメージ計算機" />
        <meta
          property="og:description"
          content="ポケモンバトルファクトリーのダメージ計算ができるツールです。"
        />
        <meta
          property="og:image"
          content="https://nejiki-calculator.com/ogp.png"
        />
        <meta property="og:url" content="https://nejiki-calculator.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://nejiki-calculator.com/" />
      </Head>
      <MainLayout>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={settings.level == 50}
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
            checked={settings.level == 100}
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
        <div className="mt-2">
          <Select
            onValueChange={(value) => handleTimesChange(Number(value))}
            defaultValue={'0'}
          >
            <SelectTrigger className="w-[180px] bg-white">
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

        <div className="xl:flex flex flex-col items-center xl:flex-row xl:items-start xl:justify-center">
          <div>
            <Attackers />
          </div>
          <Button
            onClick={handleReverse}
            className="w-10 h-10 my-10 xl:mt-6 xl:mx-8"
          >
            <SystemUiconsSort className="xl:hidden w-8 h-8" />
            <SystemUiconsReverse className="xl:block hidden w-8 h-8" />
          </Button>

          <div className="xl:mt-0">
            <div>
              <div className="flex items-center bg-white rounded-lg my-2 border">
                <ShieldPlus className="w-10 h-10 mx-2 " />
                <h1 className="text-3xl font-bold ml-3 my-4 ">Defender</h1>
              </div>
              <DefenderReserve />
              <DefenderCard />
            </div>
            <div>
              <div className="flex items-center bg-white rounded-lg my-2 border">
                <CloudSunRain className="w-10 h-10 mx-2 " />
                <h1 className="text-3xl font-bold ml-3 my-4 ">Environment</h1>
              </div>
              <EnvCard />
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
