import { TFunction } from "i18next"

export const getMaintenancesModules = (t: TFunction<"translation", undefined>) => [
    {
        maintenanceName: "UserRole",
        maintenanceTitle: t('UserRole'),
        maintenanceButtonText: t('userRoleButton'),
        link: '/user_role',
        breadcrumb: t('Users'),
    },
]