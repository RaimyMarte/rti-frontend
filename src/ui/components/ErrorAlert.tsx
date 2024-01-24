import { useTranslation } from "react-i18next"

export const ErrorAlert = ({ error }: { error: string }) => {
    const { t } = useTranslation()

    return (
        error
            ? <div className="alert alert-danger alert-solid" role="alert" >
                <strong>{t('SomethingWentWrong')}</strong> - {error}
            </div>
            : null
    )
}