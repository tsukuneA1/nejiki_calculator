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
import { Badge } from "../../ui/badge";
import { Checkbox } from "../../ui/checkbox";
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
				<>
					<BadgeDescription
						badgeName="天候"
						content={
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
						}
					/>

					<BadgeDescription
						badgeName="壁"
						content={
							<div className="flex flex-col sm:flex-row items-center gap-2">
								<div className="flex items-center gap-2">
									<Checkbox
										checked={reflect}
										onCheckedChange={(checked) => {
											dispatch(setReflect(checked));
										}}
									/>
									<label
										htmlFor="terms"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-base"
									>
										リフレクター
									</label>
								</div>

								<div className="flex items-center gap-2">
									<Checkbox
										checked={lightScreen}
										onCheckedChange={(checked) => {
											dispatch(setLightScreen(checked));
										}}
									/>
									<label
										htmlFor="terms"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-base"
									>
										ひかりのかべ
									</label>
								</div>
							</div>
						}
					/>

					<BadgeDescription
						badgeName="定数ダメ"
						content={
							<div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
								<div className="flex items-center gap-2">
									<Checkbox
										checked={stealthRock}
										onCheckedChange={(checked) => {
											dispatch(setStealthRock(checked));
										}}
									/>
									<label
										htmlFor="terms"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-base"
									>
										ステルスロック
									</label>
								</div>

								<div className="flex items-center gap-2">
									<Checkbox
										checked={lifeOrb}
										onCheckedChange={(checked) => {
											dispatch(setLifeOrb(checked));
										}}
									/>
									<label
										htmlFor="terms"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-base"
									>
										いのちのたま
									</label>
								</div>
							</div>
						}
					/>
				</>
			}
		/>
	);
};

const BadgeDescription = ({
	badgeName,
	content,
}: {
	badgeName: string;
	content: React.ReactNode;
}) => {
	return (
		<div className="flex items-center gap-2">
			<Badge className="w-18 h-9">{badgeName}</Badge>
			{content}
		</div>
	);
};
