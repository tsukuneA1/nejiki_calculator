import { MainLayout } from '@/layouts/main/main-layout';
import { PokemonCard } from '@/components/pokemon-card';
import { DefenderCard } from '@/components/defender-card';
import { Checkbox } from '@/components/ui/checkbox';
import { setLevel, setTimes } from '@/store/slices/levelSlice';
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
import { setAttacker } from '@/store/slices/attackerSlice';
import { setDefender } from '@/store/slices/defenderSlice';
import { EnvCard } from '@/components/env-card';

export default function Home() {
  const level = useSelector((state: RootState) => state.level.level);
  const attacker = useSelector((state: RootState) => state.attacker[0]);
  const defender = useSelector((state: RootState) => state.defender);
  const dispatch = useDispatch();

  const handleLevelChange = (level: number) => {
    dispatch(setLevel(level));
  };

  const handleReverse = () => {
    dispatch(setAttacker({ pokemon: defender.factoryPokemon!, pos: 0 }));
    dispatch(setDefender({ pokemon: attacker.factoryPokemon! }));
  };

  return (
    <MainLayout>
      <div className="flex items-center space-x-2 ml-5">
        <Checkbox
          id="terms"
          checked={level == 50}
          onClick={() => handleLevelChange(50)}
          className="w-5 h-5 border-2"
        />
        <label
          htmlFor="terms"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          50レベル
        </label>
        <Checkbox
          id="terms"
          checked={level == 100}
          onClick={() => handleLevelChange(100)}
          className="w-5 h-5 border-2"
        />
        <label
          htmlFor="terms"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          オープンレベル
        </label>
      </div>
      <div className="ml-5 mt-2">
        <Select
          onValueChange={(value) => dispatch(setTimes(parseInt(value)))}
          defaultValue={'1'}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="周回回数を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>周回回数</SelectLabel>
              {[...Array(7)].map((_, i) => (
                <SelectItem key={i} value={`${i + 1}`}>
                  {`${i + 1}周目`}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="xl:flex flex flex-col items-center xl:flex-row xl:items-start">
        <div>
          <h1 className="text-3xl font-bold ml-3 my-4">Attacker</h1>
          <PokemonCard pos={0} />
        </div>
        <Button
          onClick={handleReverse}
          className="w-10 h-10 my-10 xl:mt-20 xl:mx-8"
        >
          <SystemUiconsSort className="xl:hidden w-8 h-8" />
          <SystemUiconsReverse className="xl:block hidden w-8 h-8" />
        </Button>

        <div className="xl:mt-0">
          <div>
            <h1 className="text-3xl font-bold ml-3 my-4">Defender</h1>
            <DefenderCard />
          </div>
          <div>
            <h1 className="text-3xl font-bold ml-3 my-4">Environment</h1>
            <EnvCard />
          </div>
        </div>
        
      </div>
    </MainLayout>
  );
}
