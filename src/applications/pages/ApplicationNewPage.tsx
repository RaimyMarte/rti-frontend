// import { useTranslation } from "react-i18next";
import { ApplicationNewForm } from "../components";
// import { AplicationsFormLayout } from "../layout/AplicationsFormLayout";
import { useCreateApplicationMutation } from "../../store/api";
import { Footer, Loading } from "../../ui/components";

export const ApplicationNewPage = () => {
    //   const { t } = useTranslation();
    const [createApplication, { isLoading: createApplicationLoading }] = useCreateApplicationMutation()

    return (
        <div className="auth-page-wrapper pt-5">
            {/* auth page bg */}
            <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
                <div className="bg-overlay" />
                <div className="shape">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
                        <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z" />
                    </svg>
                </div>
            </div>
            {/* auth page content */}
            <div className="auth-page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center mt-sm-5 mb-4 text-white-50">
                                <p className="mt-3 fs-20 fw-medium">The Renaissance Technical Institute - RTI</p>
                            </div>
                        </div>
                    </div>
                    {/* end row */}
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="card mt-4">
                                <div className="card-body p-4">
                                    {createApplicationLoading ? <Loading /> : null}
                                    <ApplicationNewForm createApplication={createApplication} />
                                </div>
                                {/* end card body */}
                            </div>
                        </div>
                    </div>
                    {/* end row */}
                </div>
                {/* end container */}
            </div>
            {/* end auth page content */}

            <Footer />
        </div>
    )
}
