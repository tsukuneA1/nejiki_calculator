import { SolarHamburgerMenuLinear } from "@/components/icons/hamburger";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Kanit } from "next/font/google";

import { Book, Home, Search } from "lucide-react";
import Link from "next/link";

type MenuItem = {
	title: string;
	url: string;
	icon: React.ComponentType;
};

const MENU_ITEMS: MenuItem[] = [
	{
		title: "ダメージ計算",
		url: "/",
		icon: Home,
	},
	{
		title: "ポケモン検索",
		url: "/poke-search",
		icon: Search,
	},
	{
		title: "説明書",
		url: "/instruction-manual",
		icon: Book,
	},
] as const;

const kanit = Kanit({
	subsets: ["latin"],
	weight: ["400", "700"],
});
export const MainHeader = () => {
	return (
		<header className="font-bold text-4xl flex items-center border-b-2 border-gray-200 py-4 px-4 gap-4 justify-between px-6">
			<Link href="/" className="flex items-center">
				<h1 className={`${kanit.className} text-xl sm:text-2xl`}>
					BattleFactory Calculator
				</h1>
				<span className="text-zinc-400 ml-2 text-lg">β</span>
			</Link>
			<ul className="items-center gap-4 hidden sm:flex">
				{MENU_ITEMS.map((item) => (
					<li key={item.title} className="inline-block ml-4">
						<Link
							href={item.url}
							className="flex items-center text-sm text-gray-600 hover:text-gray-900 gap-2"
						>
							<item.icon />
							<span>{item.title}</span>
						</Link>
					</li>
				))}
				<li className="inline-block ml-4">
					<a
						href="https://docs.google.com/forms/d/e/1FAIpQLSc2CCe5aTpxMj_tg1Yk5N0l7K9p2bKot0l0-j21N1Q5akNL8A/viewform?usp=dialog"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center text-sm text-gray-600 hover:text-gray-900 gap-2"
					>
						問い合わせフォーム
					</a>
				</li>
			</ul>
			<SidebarTrigger className="cursor-pointer sm:hidden">
				<SolarHamburgerMenuLinear />
			</SidebarTrigger>
		</header>
	);
};
