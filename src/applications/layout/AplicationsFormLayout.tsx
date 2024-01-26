import { useTranslation } from "react-i18next";
import { MainLayout } from "../../layout"
import { ReactNode } from "react";

export const AplicationsFormLayout = ({ children }: { children: ReactNode }) => {
    const { t } = useTranslation();

    return (
        <MainLayout>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0">{t('Applications')}</h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><a href="javascript: void(0);">{t('Applications')}</a></li>
                                <li className="breadcrumb-item active">{t('New')}</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xxl-12">
                    <div className="card">
                        <div className="card-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout >
    )
}
