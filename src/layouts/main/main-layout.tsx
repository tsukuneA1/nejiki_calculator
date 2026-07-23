import { AppSidebar } from "@/components/domain/sidebar/app-sidebar";
import { MainFooter } from "@/components/layout/main/main-footer";
import { MainHeader } from "@/components/layout/main/main-header";
import { SidebarProvider } from "@/components/ui/sidebar";

type Props = {
  isTopPage?: boolean;
  children: React.ReactNode;
};

export const MainLayout = ({ isTopPage = false, children }: Props) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <div className="sm:hidden">
          <AppSidebar />
        </div>
        <div className="flex flex-col flex-grow">
          <MainHeader />
          <main
            className={`flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-50 to-blue-100 px-2 pt-4 dark:from-slate-950 dark:to-slate-900 sm:gap-4 sm:px-5 ${
              isTopPage ? "pb-28" : "pb-4"
            }`}
          >
            {children}
          </main>
          {isTopPage && <MainFooter />}
        </div>
      </div>
    </SidebarProvider>
  );
};
