import { SolarHamburgerMenuLinear } from "@/components/icons/hamburger";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Kanit } from "next/font/google";

const kanit = Kanit({
	subsets: ["latin"],
	weight: ["400", "700"],
});
export const MainHeader = () => {
	return (
		<header className="font-bold text-4xl flex items-center border-b-2 border-gray-200 py-4">
			<SidebarTrigger className="mx-4 cursor-pointer">
				<SolarHamburgerMenuLinear />
			</SidebarTrigger>
			<div className="flex items-center">
				<h1 className={`${kanit.className} text-xl sm:text-2xl `}>
					BattleFactory Calculator
				</h1>
				<span className="text-zinc-400 ml-2 text-lg">β</span>
			</div>
		</header>
	);
};
