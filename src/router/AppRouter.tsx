import { Navigate, Route, Routes, } from "react-router-dom"
import { ChangePasswordNextLoginPage, ForgotPasswordPage, LoginPage, ResetPasswordPage } from "../auth/pages"
import { HomePage } from "../dashboard/pages"
import { AccountDetailsPage, AccountFacilitiesPage, AccountsPhysicianPage } from "../accounts/pages"
import { PrivateRoutes, PublicRoutes } from "."
import { NotFoundPage, } from "../ui/pages"
import { useAuthStore, useCheckAuth } from "../hooks"
import { Loading } from "../ui/components"
import { UsersListPage } from "../admin/users/pages"
import { AdminUserDetailsPage, CurrentUserProfilePage, } from "../user/pages"
import { AccountTypesListPage, UserRolesListPage } from "../maintenance/pages"

export const AppRouter = () => {
    const { status, user } = useAuthStore()

    useCheckAuth()

    if (status === 'checking') return <Loading />
    if (user?.ChangePwdNextLogin) return <ChangePasswordNextLoginPage />

    return (
        <Routes>
            <Route element={<PrivateRoutes status={status} />} >
                <Route path="/" element={<Navigate to='/home' />} />
                <Route path="/home" element={<HomePage />} />

                <Route path="/accounts/facilities" element={<AccountFacilitiesPage />} />
                <Route path="/accounts/physicians" element={<AccountsPhysicianPage />} />
                <Route path="/accounts/details/:id" element={<AccountDetailsPage />} />


                <Route path="/users/list" element={<UsersListPage />} />
                <Route path="/user/profile" element={<CurrentUserProfilePage />} />
                <Route path="/user/details/:id" element={<AdminUserDetailsPage />} />

                <Route path="/AccountType/list" element={<AccountTypesListPage />} />
                <Route path="/UserRole/list" element={<UserRolesListPage />} />

                <Route path="/*" element={<NotFoundPage />} />
            </Route>

            <Route element={<PublicRoutes status={status} />} >
                <Route path="/" element={<Navigate to='/auth/login' />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/recover_password" element={<ForgotPasswordPage />} />
                <Route path="/auth/reset_password/confirm" element={<ResetPasswordPage />} />

                <Route path="/*" element={<NotFoundPage />} />
            </Route>


        </Routes>
    )
}
