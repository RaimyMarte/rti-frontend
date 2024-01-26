import { useParams } from "react-router-dom";
import { ApplicationUpdateForm } from "../components";
import { AplicationsFormLayout } from "../layout/AplicationsFormLayout";
import { useGetApplicationByIdQuery } from "../../store/api";
import { Loading } from "../../ui/components";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

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
          :
          <>
            <div className="row">
              <div className="col-xxl-12">
                <div className="card">
                  <div className="card-body">
                    <ApplicationUpdateForm applicationData={applicationData?.data} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xxl-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title mb-3">{t('Audit')}</h5>
                    <div className="table-responsive">
                      <table className="table table-borderless mb-0">
                        <tbody>
                          <tr>
                            <th className="ps-0" scope="row">{t('Created Date')}:</th>
                            <td className="text-muted">{applicationData?.data?.CreatedDate ? dayjs(applicationData?.data?.CreatedDate).format('MM/DD/YYYY (hh:mm:ss A)') : ''}</td>
                          </tr>
                          <tr>
                            <th className="ps-0" scope="row">{t('Created By')}:</th>
                            <td className="text-muted">{applicationData?.data?.ApplicationCreatedBy?.DisplayName || 'None'}</td>
                          </tr>
                          <tr>
                            <th className="ps-0" scope="row">{t('Last Updated By')}:</th>
                            <td className="text-muted">{applicationData?.data?.ApplicationLastUpdatedBy?.DisplayName || 'None'}</td>
                          </tr>
                          <tr>
                            <th className="ps-0" scope="row">{t('Last Updated Date')}:</th>
                            <td className="text-muted">{applicationData?.data?.LastUpdatedDate ? dayjs(applicationData?.data?.LastUpdatedDate).format('MM/DD/YYYY (hh:mm:ss A)') : ''}</td>
                          </tr>
                          <tr>
                            <th className="ps-0" scope="row">{t('Verified')}:</th>
                            <td className="text-muted">
                              {
                                applicationData?.data?.Verified
                                  ? <i className="ri-checkbox-circle-line align-middle text-success"></i>
                                  : <i className="ri-close-circle-line align-middle text-danger"></i>
                              }
                            </td>
                          </tr>
                          <tr>
                            <th className="ps-0" scope="row">{t('Verified Date')}:</th>
                            <td className="text-muted">{applicationData?.data?.VerifiedDate ? dayjs(applicationData?.data?.VerifiedDate).format('MM/DD/YYYY (hh:mm:ss A)') : ''}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title mb-0">{t('History')}</h4>
                  </div>{/* end card header */}
                  <div className="card-body">
                    <div className="mx-n3">
                      <div data-simplebar data-simplebar-auto-hide="false" data-simplebar-track="info" style={{ maxHeight: 238 }}>
                        <ol className="list-group list-group-flush list-group-numbered">
                          <li className="list-group-item d-flex align-items-center">
                            A list item
                            <span className="badge ms-auto bg-success">Paid</span>
                          </li>
                          <li className="list-group-item d-flex align-items-center">
                            A second list item
                            <span className="badge ms-auto bg-danger">Refund</span>
                          </li>
                          <li className="list-group-item d-flex align-items-center">
                            A third list item
                            <span className="badge ms-auto bg-success">Paid</span>
                          </li>
                          <li className="list-group-item d-flex align-items-center">
                            A third list item
                            <span className="badge ms-auto bg-success">Paid</span>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>{/* end card-body */}
                </div>{/* end card */}
              </div>

            </div>
          </>


      }
    </AplicationsFormLayout>
  )
}
