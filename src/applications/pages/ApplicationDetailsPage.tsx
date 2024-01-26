import { useParams } from "react-router-dom";
import { ApplicationUpdateForm } from "../components";
import { AplicationsFormLayout } from "../layout/AplicationsFormLayout";
import { useGetApplicationByIdQuery } from "../../store/api";
import { Loading } from "../../ui/components";
import { useTranslation } from "react-i18next";

export const ApplicationDetailsPage = () => {
  const { id } = useParams()
  const { t } = useTranslation();
  const { data: applicationData, isLoading: applicationDataLoading } = useGetApplicationByIdQuery(id || '')
  console.log(applicationData)
  return (
    <AplicationsFormLayout breadcrumb={(t('Details'))} >
      {
        applicationDataLoading
          ? <Loading />
          : <ApplicationUpdateForm applicationData={applicationData?.data} />
      }
    </AplicationsFormLayout>
  )
}
