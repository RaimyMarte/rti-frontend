import { AccountProfilePage, } from "../accounts/pages"
import { AdminUserDetailsPage, CurrentUserProfilePage, } from "../user/pages"
import { ChangePasswordNextLoginPage, ForgotPasswordPage, LoginPage, ResetPasswordPage, TwoFactorAuthPage } from "../auth/pages"
import { getMaintenancesModules } from "../maintenance/helpers"
import { HomePage } from "../dashboard/pages"
import { Loading } from "../ui/components"
import { MaintenancePageLayout } from "../maintenance/pages"
import { Navigate, Route, Routes, } from "react-router-dom"
import { NotFoundPage, } from "../ui/pages"
import { PrivateRoutes, PublicRoutes, } from "."
import { useAuthStore, useCheckAuth } from "../hooks"
import { UsersListPage } from "../admin/users/pages"
import { TFunction } from "i18next"

export const AppRouter = ({ t }: { t: TFunction<"translation", undefined> }) => {
    const { status, user } = useAuthStore()

    useCheckAuth()

    if (status === 'tfa') return <TwoFactorAuthPage />
    if (status === 'checking') return <Loading />
    if (user?.ChangePwdNextLogin) return <ChangePasswordNextLoginPage />


    const maintenanceRoutes = getMaintenancesModules(t)

    return (
        <Routes>
            <Route element={<PrivateRoutes status={status} />} >
                <Route path="/" element={<Navigate to='/home' />} />
                <Route path="/home" element={<HomePage />} />

                <Route path="/accounts/details/:id" element={<AccountProfilePage />} />


                <Route path="/users/list" element={<UsersListPage />} />
                <Route path="/user/profile" element={<CurrentUserProfilePage />} />
                <Route path="/user/details/:id" element={<AdminUserDetailsPage />} />

                {
                    maintenanceRoutes.map(({ maintenanceName, maintenanceTitle, maintenanceButtonText, link, breadcrumb, }) => (
                        <Route key={maintenanceTitle}>
                            <Route
                                path={link}
                                element={
                                    <MaintenancePageLayout
                                        maintenanceTitle={maintenanceTitle}
                                        maintenanceName={maintenanceName}
                                        maintenanceButtonText={maintenanceButtonText}
                                        breadcrumb={breadcrumb}
                                    />}
                            />
                        </Route>
                    ))
                }

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
