import { useTranslation } from "react-i18next";
import { ApplicationNewForm } from "../components";
import { AplicationsFormLayout } from "../layout/AplicationsFormLayout";

export const ApplicationNewPage = () => {
  const { t } = useTranslation();

  return (
    <AplicationsFormLayout breadcrumb={(t('New'))}>
      <ApplicationNewForm />
    </AplicationsFormLayout>
  )
}
