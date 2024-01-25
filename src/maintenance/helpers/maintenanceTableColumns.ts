import { TFunction } from "i18next"

export const maintenanceTableColumns = (t: TFunction<"translation", undefined>) => [
    {
        name: 'Code',
        label: t('Code'),
    },
    {
        name: 'Name',
        label: t('Name'),
    },
    {
        name: 'Enabled',
        label: t('Enabled'),
    },
    {
        name: 'CreatedDate',
        label: t('CreatedDate'),
    },
    {
        name: 'actions',
        label: t('Actions'),
    },
]