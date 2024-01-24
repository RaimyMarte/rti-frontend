import { useTranslation } from 'react-i18next'
import { CreateFollowUpModal } from '.'

export const AccountProfileFollowUpTab = () => {
    const { t } = useTranslation()

    return (
        <div className="tab-pane fade" id="followUp" role="tabpanel">
            <div className="card">
                <div className="card-body">

                    <div className="d-flex align-items-center mb-4">
                        <h5 className="card-title flex-grow-1 mb-0">{t("FollowUps")} - (01) {t("items")}</h5>
                        <div className="flex-shrink-0">
                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#createFollowUpModal">
                                <i className="ri-add-fill me-1 align-bottom" /> {t("Add")}
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="table-responsive">
                                <table className="table table-borderless align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col">{t("FollowUp")}</th>
                                            <th scope="col">{t("Description")}</th>
                                            <th scope="col">{t("InterfaceComment")}</th>
                                            <th scope="col">{t("Notes")}</th>
                                            <th scope="col">{t("Actions")} </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>12 Dec 2021</td>
                                            <td>Zip File</td>
                                            <td>4.57 MB</td>
                                            <td>12 Dec 2021</td>
                                            <td>
                                                <div className="dropdown">
                                                    <a href="" className="btn btn-light btn-icon" id="dropdownMenuLink15" data-bs-toggle="dropdown" aria-expanded="true">
                                                        <i className="ri-equalizer-fill" />
                                                    </a>
                                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink15">
                                                        <li><a className="dropdown-item" href=""><i className="ri-eye-fill me-2 align-middle text-muted" />{t("View")}</a>
                                                        </li>
                                                        <li><a className="dropdown-item" href=""><i className="ri-edit-fill me-2 align-middle text-muted" />{t("Edit")}</a>
                                                        </li>
                                                        <li><a className="dropdown-item" href=""><i className="ri-download-2-fill me-2 align-middle text-muted" />{t("Download")}</a>
                                                        </li>
                                                        <li className="dropdown-divider" />
                                                        <li><a className="dropdown-item" href=""><i className="ri-delete-bin-5-line me-2 align-middle text-muted" />{t("Delete")}</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CreateFollowUpModal />
        </div>
    )
}
