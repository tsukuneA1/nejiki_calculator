import { MainFooter } from '@/components/layout/main/main-footer';
import { MainHeader } from '@/components/layout/main/main-header';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <MainHeader />
      <main className='flex flex-col flex-grow justify-center py-4'>{children}</main>
      <MainFooter />
    </div>
  );
};
