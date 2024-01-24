import { ReactNode } from "react"
import { Loading, PaginationComponent } from "../components"
import { UseFormRegister } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { useTranslation } from "react-i18next"

interface ServerTableLayoutProps {
    register: UseFormRegister<any>
    searchPlaceholder: string
    loading: boolean
    columns: {
        label: string
        name: string
    }[]
    rows: ReactNode
    addButtonProps: {
        label: string
        color: string
        modalTarget: string
    }
    totalItemsCount: number
}

export const TableLayout = ({ register, searchPlaceholder, loading, columns, rows, addButtonProps, totalItemsCount }: ServerTableLayoutProps) => {
    const { t } = useTranslation();

    const [searchParams,] = useSearchParams();
    const activePage = Number(searchParams.get("page")) || 1
    const pageSize = Number(searchParams.get("pageSize")) || 10

    const startItemIndex = (activePage - 1) * pageSize + 1;
    const endItemIndex = Math.min(activePage * pageSize, totalItemsCount);

    return (
        <div className="row">
            {loading ? <Loading /> : null}

            <div className="col-lg-12">
                <div className="card">
                    <div className="card-header border-0">
                        <div className="row g-4 align-items-center">
                            <div className="col-sm-3">
                                <div className="search-box">
                                    <input type="text" className="form-control search"  {...register('search')} placeholder={searchPlaceholder} />
                                    <i className="ri-search-line search-icon" />
                                </div>
                            </div>
                            <div className="col-sm-auto ms-auto">
                                <div className="hstack gap-2">
                                    <button className="btn btn-danger" id="remove-actions" ><i className="ri-delete-bin-2-line" /></button>
                                    <button type="button" className={`btn btn-${addButtonProps?.color} add-btn`} data-bs-toggle="modal" data-bs-target={`#${addButtonProps.modalTarget}`}><i className="ri-add-line align-bottom me-1" />{addButtonProps?.label}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div>
                            <div className="table-responsive table-card">
                                <table className="table align-middle">
                                    <thead className="table-light text-muted">
                                        <tr>
                                            <th scope="col" style={{ width: 50 }}>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="checkAll" defaultValue="option" />
                                                </div>
                                            </th>
                                            {
                                                columns.map(({ label, name }) =>
                                                    <th key={name} className="sort" data-sort={name}>{label}</th>
                                                )
                                            }

                                        </tr>
                                    </thead>
                                    <tbody className="list form-check-all">
                                        {rows}
                                    </tbody>
                                </table>
                                <div className="noresult" style={{ display: totalItemsCount > 0 || loading ? 'none' : '' }}>
                                    <div className="text-center">
                                        {/* <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style={{width: 75, height: 75}}>
    </lord-icon> */}
                                        <h5 className="mt-2"> {t('noResults')}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mt-3">
                                <p style={{ display: totalItemsCount > 0 || loading ? '' : 'none' }}>
                                    {t('Showing')}  {totalItemsCount <= 0 ? 0 : startItemIndex} {t('to')} {endItemIndex} {t('of')} {totalItemsCount} {t('results')}
                                </p>

                                <div className="pagination-wrap hstack gap-2 ms-auto">
                                    <PaginationComponent totalItemsCount={totalItemsCount} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

{/* <div className="row">
     
<div className={watch0 ? "col-xxl-9" : "col-xxl-12"}   >
 
</div>

{
    watch0
        ?
        <div className="col-xxl-3">
            <div className="card" id="contact-view-detail">
                <div className="card-body text-center">
                    <div className="position-relative d-inline-block">
                        <img src="/assets/images/users/avatar-10.jpg" className="avatar-lg rounded-circle img-thumbnail" />
                        <span className="contact-active position-absolute rounded-circle bg-success"><span className="visually-hidden" />
                        </span></div>
                    <h5 className="mt-4 mb-1">Tonya Noble</h5>
                    <p className="text-muted">Nesta Technologies</p>
                    <ul className="list-inline mb-0">
                        <li className="list-inline-item avatar-xs">
                            <a href="" className="avatar-title bg-soft-success text-success fs-15 rounded">
                                <i className="ri-phone-line" />
                            </a>
                        </li>
                        <li className="list-inline-item avatar-xs">
                            <a href="" className="avatar-title bg-soft-danger text-danger fs-15 rounded">
                                <i className="ri-mail-line" />
                            </a>
                        </li>
                        <li className="list-inline-item avatar-xs">
                            <a href="" className="avatar-title bg-soft-warning text-warning fs-15 rounded">
                                <i className="ri-question-answer-line" />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    <h6 className="text-muted text-uppercase fw-semibold mb-3">Personal Information</h6>
                    <p className="text-muted mb-4">Hello, I'm Tonya Noble, The most effective objective is one that is tailored to the job you are applying for. It states what kind of career you are seeking, and what skills and experiences.</p>
                    <div className="table-responsive table-card">
                        <table className="table table-borderless mb-0">
                            <tbody>
                                <tr>
                                    <td className="fw-medium" scope="row">Designation</td>
                                    <td>Lead Designer / Developer</td>
                                </tr>
                                <tr>
                                    <td className="fw-medium" scope="row">Email ID</td>
                                    <td>tonyanoble@velzon.com</td>
                                </tr>
                                <tr>
                                    <td className="fw-medium" scope="row">Phone No</td>
                                    <td>414-453-5725</td>
                                </tr>
                                <tr>
                                    <td className="fw-medium" scope="row">Lead Score</td>
                                    <td>154</td>
                                </tr>
                                <tr>
                                    <td className="fw-medium" scope="row">Tags</td>
                                    <td>
                                        <span className="badge badge-soft-primary">Lead</span>
                                        <span className="badge badge-soft-primary">Partner</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="fw-medium" scope="row">Last Contacted</td>
                                    <td>15 Dec, 2021 <small className="text-muted">08:58AM</small></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/*end card*/}
//   </div>
//    : null
//}
//</div> 