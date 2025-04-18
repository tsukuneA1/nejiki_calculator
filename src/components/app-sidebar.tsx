import { Book, Home, Search, Twitter } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';

// Menu items.
const items = [
  {
    title: 'ダメージ計算',
    url: '/',
    icon: Home,
  },
  {
    title: 'ポケモン検索',
    url: '/poke-search',
    icon: Search,
  },
  {
    title: '説明書',
    url: '/instruction-manual',
    icon: Book,
  },
  {
    title: 'Twitter(X)',
    url: 'https://x.com/kinezikidame',
    icon: Twitter,
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
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
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
