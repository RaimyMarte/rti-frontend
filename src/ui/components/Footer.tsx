import { useTranslation } from "react-i18next";

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        © {new Date().getFullYear()} {t('copyright')} The Renaissance Technical Institute - RTI
                    </div>
                    <div className="col-sm-6">
                        <div className="text-sm-end d-none d-sm-block">
                            {t('LastUpdated')}: 01/16/2024 10:08:30 AM
                            <br />
                            <small >Version 1.0.10</small>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
