import { TFunction } from "i18next"

export const getMaintenancesModules = (t: TFunction<"translation", undefined>) => [
    {
        maintenanceName: "ApplicationStatus",
        maintenanceTitle: t('ApplicationStatus'),
        maintenanceButtonText: t('applicationStatusButton'),
        link: '/application_status',
        breadcrumb: t('Maintenance'),
    },
    {
        maintenanceName: "PreferredLanguage",
        maintenanceTitle: t('PreferredLanguage'),
        maintenanceButtonText: t('preferredLanguageButton'),
        link: '/preferred_language',
        breadcrumb: t('Users'),
    },
    {
        maintenanceName: "PreviousEducation",
        maintenanceTitle: t('PreviousEducation'),
        maintenanceButtonText: t('previousEducationButton'),
        link: '/previous_education',
        breadcrumb: t('Users'),
    },
    {
        maintenanceName: "ProgramInterested",
        maintenanceTitle: t('ProgramInterested'),
        maintenanceButtonText: t('programInterestedButton'),
        link: '/program_interested',
        breadcrumb: t('Users'),
    },
    {
        maintenanceName: "Race",
        maintenanceTitle: t('Race'),
        maintenanceButtonText: t('raceButton'),
        link: '/race',
        breadcrumb: t('Users'),
    },
    {
        maintenanceName: "UserRole",
        maintenanceTitle: t('UserRole'),
        maintenanceButtonText: t('userRoleButton'),
        link: '/user_role',
        breadcrumb: t('Users'),
    },
]