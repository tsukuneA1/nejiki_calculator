import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  setLifeOrb,
  setLightScreen,
  setReflect,
  setStealthRock,
  setWeather,
} from '@/store/slices/envSlice';
import { Checkbox } from './ui/checkbox';

export const EnvCard = () => {
  const weather = useSelector((state: RootState) => state.env.weather);
  const reflect = useSelector((state: RootState) => state.env.reflect);
  const lightScreen = useSelector((state: RootState) => state.env.lightScreen);
  const stealthRock = useSelector((state: RootState) => state.env.stealthRock);
  const lifeOrb = useSelector((state: RootState) => state.env.lifeOrb);
  const dispatch = useDispatch();

  const weathers = ['なし', 'にほんばれ', 'あめ', 'すなあらし', 'あられ'];
  return (
    <Card className="my-2 w-xs max-w-xl sm:w-xl">
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge className="w-18 h-9">天候</Badge>
          <Select
            onValueChange={(value) => {
              dispatch(setWeather(value));
            }}
            value={weather}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="天候を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>天候</SelectLabel>
                {weathers.map((weather) => (
                  <SelectItem key={weather} value={weather}>
                    {weather}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="w-18 h-9">壁</Badge>
          <Checkbox
            checked={reflect}
            onCheckedChange={(checked) => {
              dispatch(setReflect(checked));
            }}
          />
          <label
            htmlFor="terms"
            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            リフレクター
          </label>
          <Checkbox
            checked={lightScreen}
            onCheckedChange={(checked) => {
              dispatch(setLightScreen(checked));
            }}
          />
          <label
            htmlFor="terms"
            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            ひかりのかべ
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="w-18 h-9">定数ダメ</Badge>
          <Checkbox
            checked={stealthRock}
            onCheckedChange={(checked) => {
              dispatch(setStealthRock(checked));
            }}
          />
          <label
            htmlFor="terms"
            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            ステルスロック
          </label>
          <Checkbox
            checked={lifeOrb}
            onCheckedChange={(checked) => {
              dispatch(setLifeOrb(checked));
            }}
          />
          <label
            htmlFor="terms"
            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            いのちのたま
          </label>
        </div>
      </CardContent>
    </Card>
  );
};
