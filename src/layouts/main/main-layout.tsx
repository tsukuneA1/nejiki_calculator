import { AppSidebar } from "@/components/app-sidebar";
import { MainFooter } from "@/components/layout/main/main-footer";
import { MainHeader } from "@/components/layout/main/main-header";
import { SidebarProvider } from "@/components/ui/sidebar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<div className="flex min-h-screen w-full overflow-x-hidden">
				<AppSidebar />
				<div className="flex flex-col flex-grow">
					<MainHeader />
					<main className="flex flex-col flex-grow py-4 px-2 mb-18 sm:px-5 min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-950 dark:to-slate-900">
						{children}
					</main>
					<MainFooter />
				</div>
			</div>
		</SidebarProvider>
	);
};
