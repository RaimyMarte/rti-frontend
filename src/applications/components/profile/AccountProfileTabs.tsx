import { AccountProfileDetailsTab } from "./details"
import { AccountProfileSummaryTab } from "./summary"
import { AccountProfileFollowUpTab } from "./follow"
import { AccountProfileAuditTab } from "./audit"
import { AccountProfileDocumentTab } from "./documents"
import { useTranslation } from "react-i18next"

export const AccountProfileTabs = () => {
    const { t } = useTranslation()

    return (
        <div>
            <div className="d-flex">
                {/* Nav tabs */}
                <ul className="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link fs-14 active" data-bs-toggle="tab" href="#overview-tab" role="tab">
                            <i className="ri-airplay-fill d-inline-block d-md-none" /> <span className="d-none d-md-inline-block">{t("Details")}</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link fs-14" data-bs-toggle="tab" href="#summary" role="tab">
                            <i className="ri-list-unordered d-inline-block d-md-none" /> <span className="d-none d-md-inline-block">{t("Summary")}</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link fs-14" data-bs-toggle="tab" href="#audit" role="tab">
                            <i className="ri-price-tag-line d-inline-block d-md-none" /> <span className="d-none d-md-inline-block">{t("Audit")}</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link fs-14" data-bs-toggle="tab" href="#followUp" role="tab">
                            <i className="ri-folder-4-line d-inline-block d-md-none" /> <span className="d-none d-md-inline-block">{t("FollowUp")}</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link fs-14" data-bs-toggle="tab" href="#documents" role="tab">
                            <i className="ri-folder-4-line d-inline-block d-md-none" /> <span className="d-none d-md-inline-block">{t("Documents")}</span>
                        </a>
                    </li>
                </ul>
                <div className="flex-shrink-0">
                    <a className="btn btn-success"><i className="ri-edit-box-line align-bottom" /> {t("EditAccount")}</a>
                </div>
            </div>

            {/* Tab panes */}
            <div className="tab-content pt-4 text-muted">
                <AccountProfileDetailsTab />
                <AccountProfileSummaryTab />
                <AccountProfileFollowUpTab />
                <AccountProfileAuditTab />
                <AccountProfileDocumentTab />
            </div>
            {/*end tab-content*/}
        </div>
    )
}
