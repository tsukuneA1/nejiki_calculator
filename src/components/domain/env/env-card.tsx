import { MainCardLayout } from "@/layouts/main-card/main-card-layout";
import {
  setLifeOrb,
  setLightScreen,
  setReflect,
  setStealthRock,
  setWeather,
} from "@/store/slices/envSlice";
import type { RootState } from "@/store/store";
import { CloudSunRain } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

export const EnvCard = () => {
  const weather = useSelector((state: RootState) => state.env.weather);
  const reflect = useSelector((state: RootState) => state.env.reflect);
  const lightScreen = useSelector((state: RootState) => state.env.lightScreen);
  const stealthRock = useSelector((state: RootState) => state.env.stealthRock);
  const lifeOrb = useSelector((state: RootState) => state.env.lifeOrb);
  const dispatch = useDispatch();

  const weathers = ["なし", "にほんばれ", "あめ", "すなあらし", "あられ"];
  return (
    <MainCardLayout
      header={
        <>
          <CloudSunRain className="w-7 h-7 mx-2" />
          <h1 className="text-2xl font-bold ml-3 my-4">Environment</h1>
        </>
      }
      content={
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="天候"
            content={
              <Select
                onValueChange={(value) => {
                  dispatch(setWeather(value));
                }}
                value={weather}
              >
                <SelectTrigger className="w-full">
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
            }
          />

          <Field
            label="壁"
            content={
              <div className="flex min-h-9 flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="reflect"
                    checked={reflect}
                    onCheckedChange={(checked) => {
                      dispatch(setReflect(checked));
                    }}
                  />
                  <label
                    htmlFor="reflect"
                    className="text-sm font-medium leading-none"
                  >
                    リフレクター
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="light-screen"
                    checked={lightScreen}
                    onCheckedChange={(checked) => {
                      dispatch(setLightScreen(checked));
                    }}
                  />
                  <label
                    htmlFor="light-screen"
                    className="text-sm font-medium leading-none"
                  >
                    ひかりのかべ
                  </label>
                </div>
              </div>
            }
          />

          <Field
            label="定数ダメージ"
            className="sm:col-span-2"
            content={
              <div className="flex min-h-9 flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="stealth-rock"
                    checked={stealthRock}
                    onCheckedChange={(checked) => {
                      dispatch(setStealthRock(checked));
                    }}
                  />
                  <label
                    htmlFor="stealth-rock"
                    className="text-sm font-medium leading-none"
                  >
                    ステルスロック
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="life-orb"
                    checked={lifeOrb}
                    onCheckedChange={(checked) => {
                      dispatch(setLifeOrb(checked));
                    }}
                  />
                  <label
                    htmlFor="life-orb"
                    className="text-sm font-medium leading-none"
                  >
                    いのちのたま
                  </label>
                </div>
              </div>
            }
          />
        </div>
      }
    />
  );
};

const Field = ({
  label,
  content,
  className,
}: {
  label: string;
  content: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {content}
    </div>
  );
};
