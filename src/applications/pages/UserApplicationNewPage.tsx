import { useTranslation } from "react-i18next";
import { ApplicationNewForm } from "../components";
import { AplicationsFormLayout } from "../layout/AplicationsFormLayout";
import { useUserCreateApplicationMutation } from "../../store/api";
import { Loading } from "../../ui/components";

export const UserApplicationNewPage = () => {
  const { t } = useTranslation();
  const [userCreateApplication, { isLoading: userCreateApplicationLoading }] = useUserCreateApplicationMutation()

  return (
    <AplicationsFormLayout breadcrumb={(t('New'))}>
      <div className="row">
        <div className="col-xxl-12">
          <div className="card">
            <div className="card-body">
              {userCreateApplicationLoading ? <Loading /> : null}
              <ApplicationNewForm createApplication={userCreateApplication} />
            </div>
          </div>
        </div>
      </div>
    </AplicationsFormLayout>
  )
}
