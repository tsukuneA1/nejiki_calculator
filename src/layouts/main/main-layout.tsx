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
            className={`flex py-4 px-2 ${isTopPage && "mb-18"} sm:px-5 min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-950 dark:to-slate-900 sm:gap-4`}
          >
            <aside className="hidden sm:block">
              <nav className="grid gap-1 p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm border dark:border-slate-800">
                {menuItems.map((item) => (
                  <Button
                    variant="ghost"
                    className="flex justify-start gap-2 text-slate-700 dark:text-slate-200 font-medium"
                    onClick={() => {
                      router.push(item.url);
                    }}
                    key={item.title}
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                    <span>{item.title}</span>
                  </Button>
                ))}
              </nav>
            </aside>
            <div>{children}</div>
          </main>
          {isTopPage && <MainFooter />}
        </div>
      </div>
    </SidebarProvider>
  );
};
