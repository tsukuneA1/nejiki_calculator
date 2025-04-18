import { SidebarTrigger } from '@/components/ui/sidebar';
import { SolarHamburgerMenuLinear } from '@/components/icons/hamburger';
import { Kanit } from 'next/font/google';

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['400', '700'],
});
export const MainHeader = () => {
  return (
    <header className="font-bold text-4xl my-2 flex items-center border-b-2 border-gray-200 py-2">
      <SidebarTrigger className="mx-4 cursor-pointer">
        <SolarHamburgerMenuLinear />
      </SidebarTrigger>
      <h1 className={`${kanit.className} text-xl sm:text-2xl md:text-3xl`}>
        BattleFactory Calculator
      </h1>
    </header>
  );
};
