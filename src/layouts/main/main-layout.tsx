import { AppSidebar } from '@/components/app-sidebar';
import { MainFooter } from '@/components/layout/main/main-footer';
import { MainHeader } from '@/components/layout/main/main-header';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex min-h-screen flex-col">
        <MainHeader />
        <main className="flex flex-col flex-grow justify-center py-4 mx-5">
          <SidebarTrigger />
          {children}
        </main>
        <MainFooter />
      </div>
    </SidebarProvider>
  );
};
