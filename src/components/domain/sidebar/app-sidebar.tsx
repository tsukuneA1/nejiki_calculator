import { Book, Home, Search, Twitter } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export const menuItems = [
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
	{
		title: "Twitter(X)",
		url: "https://x.com/tsukune_dev",
		icon: Twitter,
	},
	{
		title: "問い合わせフォーム",
		url: "https://docs.google.com/forms/d/e/1FAIpQLSc2CCe5aTpxMj_tg1Yk5N0l7K9p2bKot0l0-j21N1Q5akNL8A/viewform?usp=dialog",
		icon: null,
	},
];

export function AppSidebar() {
	return (
		<Sidebar className="shrink-0 bg-gray-100 h-screen">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Menu</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											{item.icon && <item.icon />}
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
