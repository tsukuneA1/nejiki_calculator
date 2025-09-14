import { AppSidebar, menuItems } from "@/components/domain/sidebar/app-sidebar";
import { MainFooter } from "@/components/layout/main/main-footer";
import { MainHeader } from "@/components/layout/main/main-header";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

type Props = {
  isTopPage?: boolean;
  children: React.ReactNode;
};

export const MainLayout = ({ isTopPage = false, children }: Props) => {
  const router = useRouter();
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <div className="sm:hidden">
          <AppSidebar />
        </div>
        <div className="flex flex-col flex-grow">
          <MainHeader />
          <main
            className={`flex flex-col items-center py-4 px-2 ${isTopPage && "mb-18"} sm:px-5 min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-950 dark:to-slate-900 sm:gap-4`}
          >
            {children}
          </main>
          {isTopPage && <MainFooter />}
        </div>
      </div>
    </SidebarProvider>
  );
};
