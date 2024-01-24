import { TFunction } from "i18next"

export const maintenanceTableColumns = (t: TFunction<"translation", undefined>) => [
    {
        name: 'Name',
        label: t('Name'),
    },
    {
        name: 'Code',
        label: t('Code'),
    },
    {
        name: 'Enabled',
        label: t('Enabled'),
    },
    {
        name: 'Description',
        label: t('Description'),
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