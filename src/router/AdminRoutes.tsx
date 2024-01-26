import { Outlet } from "react-router-dom"
import { DontHaveAccessPage } from "../ui/pages"

export const AdminRoutes = ({ isUserAdmin }: { isUserAdmin: boolean }) => {
    return (
        isUserAdmin ? <Outlet /> : <DontHaveAccessPage />
    )
}
