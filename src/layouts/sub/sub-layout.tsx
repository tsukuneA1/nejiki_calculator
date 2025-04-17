import { SidebarProvider } from '@/components/ui/sidebar';
import { MainHeader } from '@/components/layout/main/main-header';
import { AppSidebar } from '@/components/app-sidebar';

export const SubLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <AppSidebar />
        <div className="flex flex-col flex-grow">
          <MainHeader />
          <main className="flex flex-col flex-grow py-4 px-2 sm:px-5 mb-20 items-center">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
