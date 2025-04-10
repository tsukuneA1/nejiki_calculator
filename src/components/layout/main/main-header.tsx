import { SidebarTrigger } from '@/components/ui/sidebar';
import { SolarHamburgerMenuLinear } from '@/components/icons/hamburger';
export const MainHeader = () => {
  return (
    <header className="font-bold text-4xl my-2 flex items-center border-b-2 border-gray-200 py-2">
      <SidebarTrigger className="mx-4 cursor-pointer">
        <SolarHamburgerMenuLinear />
      </SidebarTrigger>
      <h1 className="text-lg sm:text-2xl font-bold">金ネジキダメージ計算機</h1>
    </header>
  );
};
