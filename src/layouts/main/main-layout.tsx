import { MainFooter } from '@/components/layout/main/main-footer';
import { SidebarProvider } from '@/components/ui/sidebar';
import { MainHeader } from '@/components/layout/main/main-header';
import { AppSidebar } from '@/components/app-sidebar';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <AppSidebar />
        <div className="flex flex-col flex-grow">
          <MainHeader />
          <main className="flex flex-col flex-grow py-4 px-2 mb-20 sm:px-5 ">
            {children}
          </main>
          <MainFooter />
        </div>
      </div>
    </SidebarProvider>
  );
};
