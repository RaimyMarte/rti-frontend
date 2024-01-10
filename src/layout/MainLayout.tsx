import { ReactNode,  } from "react"
import { Navbar, Sidebar } from "../navigation/components";
import { Footer } from "../ui/components";

interface DashboardLayoutProps {
    children: ReactNode;
}
export const MainLayout = ({ children }: DashboardLayoutProps) => {

    return (
        <div id="layout-wrapper">
            <Navbar />
            <Sidebar />

            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        {
                            children
                        }
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
