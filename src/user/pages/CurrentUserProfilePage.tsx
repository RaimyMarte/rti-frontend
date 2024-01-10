import { Navigate } from "react-router-dom"
import { useAuthStore } from "../../hooks"
import { UserProfilePageLayout } from "../layout/UserProfilePageLayout"
import { MainLayout } from "../../layout"

export const CurrentUserProfilePage = () => {
    const { user } = useAuthStore()

    return (
        <MainLayout>
            {
                user
                    ? <UserProfilePageLayout user={user} />
                    : <Navigate to="/home" />
            }
        </MainLayout>
    )
}