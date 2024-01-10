import { Link } from 'react-router-dom'
import { MainLayout } from '../../layout'
import { useForm } from 'react-hook-form'
import { CreateAccountModal } from '../components/'
import { useGetAccountsQuery } from '../../store/api'
import { AccountInterface } from '../../interfaces'
import { Loading } from '../../ui/components'
import dayjs from 'dayjs'

interface FormInputs {
    checkAll: boolean
    check0: boolean
}

export const AccountFacilitiesPage = () => {
    const { data: accounts, isLoading: accountsLoading, } = useGetAccountsQuery()
    const {
        register,
        watch,
    } = useForm<FormInputs>()

    const watch0 = watch('check0')

    return (
        <MainLayout>
            {accountsLoading ? <Loading /> : null}
            {/* start page title */}
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0">Accounts</h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><a href="javascript: void(0);">Accounts</a></li>
                                <li className="breadcrumb-item active">Facilities</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            {/* end page title */}
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex align-items-center flex-wrap gap-2">
                                <div className="col-md-4">
                                    <div className="search-box">
                                        <input type="text" className="form-control search" placeholder="Search for account..." />
                                        <i className="ri-search-line search-icon" />
                                    </div>
                                </div>

                                <div className="flex-grow-1">
                                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addmembers"><i className="ri-filter-2-line me-1 align-bottom" /> Search</button>
                                </div>

                                <div className="flex-shrink-0">
                                    <div className="hstack text-nowrap gap-2">
                                        <button className="btn btn-danger" id="remove-actions" ><i className="ri-delete-bin-2-line" /></button>
                                        <button className="btn btn-info add-btn" data-bs-toggle="modal" data-bs-target="#createAccountModal"><i className="ri-add-fill me-1 align-bottom" />New Account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*end col*/}
                <div className={watch0 ? "col-xxl-9" : "col-xxl-12"}   >
                    <div className="card" id="contactList">
                        <div className="card-header">
                            <div className="row g-3">
                                <div className="col-md-auto ms-auto">
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="text-muted">Sort by: </span>
                                        <select className="form-control mb-0" data-choices data-choices-search-false id="choices-single-default">
                                            <option value="Name">Name</option>
                                            <option value="Company">Company</option>
                                            <option value="Lead">Lead</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div>
                                <div className="table-responsive table-card mb-3">
                                    <table className="table align-middle table-nowrap mb-0" id="customerTable">
                                        <thead className="table-light">
                                            <tr>
                                                <th scope="col" style={{ width: 50 }}>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" defaultChecked={false} {...register("checkAll")} />
                                                    </div>
                                                </th>
                                                <th className="sort" scope="col">Name</th>
                                                <th className="sort" scope="col">Account Type</th>
                                                <th className="sort" scope="col">Phone</th>
                                                <th className="sort" scope="col">Address</th>
                                                <th className="sort" scope="col">Created Date</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="list form-check-all">

                                            {
                                                accounts?.data.filter((account: AccountInterface) => account?.TypeId === 1).map((account: AccountInterface, index: number) => {
                                                    const { Id, Facility, AccountType, CreatedDate } = account
                                                   
                                                    return (
                                                        <tr key={Id}>
                                                            <th scope="row">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" defaultChecked={false} {...register("check0")} />
                                                                </div>
                                                            </th>
                                                            <td >
                                                                <div className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0"><img src={`/assets/images/users/avatar-${index + 1}.jpg`} className="avatar-xs rounded-circle" /></div>
                                                                    <div className="flex-grow-1 ms-2 name"><Link to={`/accounts/details/${Id}`} >{Facility?.Name}</Link></div>
                                                                </div>
                                                            </td>
                                                            <td >{AccountType?.Name}</td>
                                                            <td >{Facility?.Phone}</td>
                                                            <td >
                                                                {Facility?.AddressLine1}
                                                                <br />
                                                                {Facility?.AddressLine2}
                                                            </td>
                                                            {/* 
                                                            <td>
                                                                <span className="badge badge-soft-primary">Lead</span>
                                                                <span className="badge badge-soft-primary">Partner</span>
                                                            </td> */}
                                                            <td>{dayjs(CreatedDate).format('MM/DD/YYYY HH:mm:ss')}</td>
                                                            <td>
                                                                <ul className="list-inline hstack gap-2 mb-0">
                                                                    <li className="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Edit">
                                                                        <Link to={`/accounts/details/${Id}`} className="text-primary d-inline-block edit-item-btn">
                                                                            <i className="ri-pencil-fill fs-16" />
                                                                        </Link>
                                                                    </li>
                                                                    <li className="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Call">
                                                                        <a href="javascript:void(0);" className="text-muted d-inline-block">
                                                                            <i className="ri-phone-line fs-16" />
                                                                        </a>
                                                                    </li>
                                                                    <li className="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Message">
                                                                        <a href="javascript:void(0);" className="text-muted d-inline-block">
                                                                            <i className="ri-question-answer-line fs-16" />
                                                                        </a>
                                                                    </li>

                                                                </ul>
                                                            </td>
                                                        </tr>)
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <div className="noresult" style={{ display: 'none' }}>
                                        <div className="text-center">
                                            {/* <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style={{ width: 75, height: 75 }}>
                                            </lord-icon> */}
                                            <h5 className="mt-2">Sorry! No Result Found</h5>
                                            <p className="text-muted mb-0">We've searched more than 150+ contacts We did not find any
                                                contacts for you search.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end mt-3">
                                    <div className="pagination-wrap hstack gap-2">
                                        <a className="page-item pagination-prev disabled" href="#">
                                            Previous
                                        </a>
                                        <ul className="pagination listjs-pagination mb-0" />
                                        <a className="page-item pagination-next" href="#">
                                            Next
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/*end add modal*/}
                            <div className="modal fade zoomIn" id="deleteRecordModal" tabIndex={-1} aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="btn-close" id="deleteRecord-close" data-bs-dismiss="modal" aria-label="Close" />
                                        </div>
                                        <div className="modal-body p-5 text-center">
                                            {/* <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#405189,secondary:#f06548" style={{ width: 90, height: 90 }} /> */}
                                            <div className="mt-4 text-center">
                                                <h4 className="fs-semibold">You are about to delete a contact ?</h4>
                                                <p className="text-muted fs-14 mb-4 pt-1">Deleting your contact will remove all of your information from our database.</p>
                                                <div className="hstack gap-2 justify-content-center remove">
                                                    <button className="btn btn-link link-success fw-medium text-decoration-none" id="deleteRecord-close" data-bs-dismiss="modal"><i className="ri-close-line me-1 align-middle" /> Close</button>
                                                    <button className="btn btn-danger" id="delete-record">Yes, Delete It!!</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*end delete modal */}
                        </div>
                    </div>
                    {/*end card*/}
                </div>
                {/*end col*/}
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
                                            <a href="javascript:void(0);" className="avatar-title bg-soft-success text-success fs-15 rounded">
                                                <i className="ri-phone-line" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item avatar-xs">
                                            <a href="javascript:void(0);" className="avatar-title bg-soft-danger text-danger fs-15 rounded">
                                                <i className="ri-mail-line" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item avatar-xs">
                                            <a href="javascript:void(0);" className="avatar-title bg-soft-warning text-warning fs-15 rounded">
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
                        </div>
                        : null
                }

                {/*end col*/}
            </div>
            {/*end row*/}

            <CreateAccountModal />
        </    MainLayout>

    )
}
