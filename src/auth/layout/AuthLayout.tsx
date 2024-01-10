import { ReactNode } from "react";
import { Footer } from "../../ui/components"

interface AuthLayoutProps {
    children: ReactNode;
}
export const AuthLayout = ({ children }:AuthLayoutProps) => {
    return (
        <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">

            <div className="bg-overlay" />
            {/* auth-page content */}
            <div className="auth-page-content overflow-hidden pt-lg-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card overflow-hidden">
                                <div className="row  g-0">
                                    <div className="col-lg-6">
                                        <div className="p-lg-5 p-4 auth-one-bg h-100">
                                            <div className="bg-overlay" />
                                            <div className="position-relative h-100 d-flex flex-column">
                                                <div className="mb-4">
                                                    <div className="d-block">
                                                        {/* <img src="/assets/images/logolight.png" height={108} /> */}
                                                    </div>
                                                </div>
                                                <div className="mt-auto">
                                                    <div className="mb-3">
                                                        <i className="ri-double-quotes-l display-4 text-success" />
                                                    </div>
                                                    <div id="qoutescarouselIndicators" className="carousel slide" data-bs-ride="carousel">
                                                        <div className="carousel-indicators">
                                                            <button type="button" data-bs-target="#qoutescarouselIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                                                            <button type="button" data-bs-target="#qoutescarouselIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
                                                            <button type="button" data-bs-target="#qoutescarouselIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
                                                        </div>
                                                        <div className="carousel-inner text-center text-white pb-5">
                                                            <div className="carousel-item active">
                                                                <p className="fs-15 fst-italic">" Your Revenue Cycle Management Solution! "</p>
                                                            </div>
                                                            <div className="carousel-item">
                                                                <p className="fs-15 fst-italic">" Streamline your revenue cycle management and increase cash flow."</p>
                                                            </div>
                                                            <div className="carousel-item">
                                                                <p className="fs-15 fst-italic">" Medical Revenue Cycle Management / Appeals &amp; Denial Auditing / Insurance Follow-Up. "</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* end carousel */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* end col */}

                                    {children}

                                </div>
                                {/* end row */}
                            </div>
                            {/* end card */}
                        </div>
                        {/* end col */}
                    </div>
                    {/* end row */}
                </div>
                {/* end container */}
            </div>

            <Footer />
        </div>
    )
}