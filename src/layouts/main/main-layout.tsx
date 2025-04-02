import { MainFooter } from "@/components/layout/main/main-footer";
import { MainHeader } from "@/components/layout/main/main-header";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <MainHeader />
            {children}
            <MainFooter />
        </>
    )
}
