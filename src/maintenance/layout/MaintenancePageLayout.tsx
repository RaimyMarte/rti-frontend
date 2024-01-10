import { ConfirmModal, Loading } from '../../ui/components';
import { CreateMaintenanceModal, EditMaintenanceModal } from '../components';
import { isMutationSuccessResponse } from '../../helpers';
import { MainLayout } from '../../layout';
import { MaintenanceInterface } from '../../interfaces';
import { useDeleteMaintenanceMutation, useGetMaintenanceQuery } from '../../store/api';
import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

interface MaintenancePageLayoutProps {
    maintenanceName: string
    maintenanceTitle: string
    maintenanceButtonText: string
    breadcrumb: string
}

export const MaintenancePageLayout = ({ maintenanceTitle, maintenanceName, maintenanceButtonText, breadcrumb }: MaintenancePageLayoutProps) => {
    const { data: maintenanceData, isLoading: maintenanceDataLoading } = useGetMaintenanceQuery(maintenanceName)
    const [activeMaintenance, setActiveMaintenance] = useState<MaintenanceInterface | null>(null)

    const [deleteMaintenance, { isLoading: deleteMaintenanceLoading }] = useDeleteMaintenanceMutation()

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const onDeleteMaintenance = async (id: number | undefined) => {
        if (!id) return

        try {
            const response = await deleteMaintenance({ maintenanceName, maintenanceId: id });
            if (isMutationSuccessResponse(response)) {
                const { data: respData } = response

                if (!respData?.isSuccess) {
                    toast.error(respData?.message)
                    return;
                }

                toast.success(respData?.message)
                setActiveMaintenance(null)
                closeButtonRef.current?.click();
            }
        } catch (error) {
            toast.error('Error')
        }
    }

    return (
        <MainLayout>
            {/* start page title */}
            {
                maintenanceDataLoading
                    ? <Loading />
                    : <>
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0">{maintenanceTitle}</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">{breadcrumb}</a></li>
                                            <li className="breadcrumb-item active">{maintenanceTitle}</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card" id="userList">
                                    <div className="card-header border-bottom-dashed">
                                        <div className="row g-4 align-items-center">
                                            <div className="col-sm">
                                                <div>
                                                    <h5 className="card-title mb-0">{maintenanceTitle} List</h5>
                                                </div>
                                            </div>

                                            <div className="col-sm-auto">
                                                <div className="d-flex flex-wrap align-items-start gap-2">
                                                    <button className="btn btn-danger" id="remove-actions"><i className="ri-delete-bin-2-line" /></button>
                                                    <button type="button" className="btn btn-success add-btn" data-bs-toggle="modal" data-bs-target="#createMaintenanceModal"><i className="ri-add-line align-bottom me-1" /> Add {maintenanceButtonText}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body border-bottom-dashed border-bottom">
                                        <form>
                                            <div className="row g-3">
                                                <div className="col-xl-6">
                                                    <div className="search-box">
                                                        <input type="text" className="form-control search" placeholder="Search for user, email, phone, status or something..." />
                                                        <i className="ri-search-line search-icon" />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-xl-6">
                                                    <div className="row g-3">
                                                        <div className="col-sm-4">
                                                            <div>
                                                                <input type="text" className="form-control" id="datepicker-range" data-provider="flatpickr" data-date-format="d M, Y" data-range-date="true" placeholder="Select date" />
                                                            </div>
                                                        </div>
                                                        {/*end col*/}
                                                        <div className="col-sm-4">
                                                            <div>
                                                                <select className="form-control" data-plugin="choices" data-choices data-choices-search-false name="choices-single-default" id="idStatus">
                                                                    <option value="status">Status</option>
                                                                    <option value="all" selected>All</option>
                                                                    <option value="Active">Active</option>
                                                                    <option value="Block">Block</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        {/*end col*/}
                                                        <div className="col-sm-4">
                                                            <div>
                                                                <button type="button" className="btn btn-primary w-100"> <i className="ri-equalizer-fill me-2 align-bottom" />Filters</button>
                                                            </div>
                                                        </div>
                                                        {/*end col*/}
                                                    </div>
                                                </div>
                                            </div>
                                            {/*end row*/}
                                        </form>
                                    </div>
                                    <div className="card-body">
                                        <div>
                                            <div className="table-responsive table-card mb-1">
                                                <table className="table align-middle" id="userTable">
                                                    <thead className="table-light text-muted">
                                                        <tr>
                                                            <th scope="col" style={{ width: 50 }}>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" id="checkAll" defaultValue="option" />
                                                                </div>
                                                            </th>
                                                            <th className="sort" data-sort="Name">Name</th>
                                                            <th className="sort" data-sort="Code">Code</th>
                                                            <th className="sort" data-sort="Enabled">Enabled</th>
                                                            <th className="sort" data-sort="Description">Description</th>
                                                            <th className="sort" data-sort="CreatedDate">Created Date</th>
                                                            <th className="sort" data-sort="action">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="list form-check-all">
                                                        {
                                                            maintenanceData?.data.map((maintenance: MaintenanceInterface,) => {
                                                                const { Id, Name, Code, Description, CreatedDate, Enabled } = maintenance

                                                                return (
                                                                    <tr key={Id}>
                                                                        <th scope="row">
                                                                            <div className="form-check">
                                                                                <input className="form-check-input" type="checkbox" name="chk_child" defaultValue="option1" />
                                                                            </div>
                                                                        </th>
                                                                        <td>{Name}</td>
                                                                        <td>{Code}</td>
                                                                        <td>
                                                                            {
                                                                                Enabled
                                                                                    ? <i className="ri-checkbox-circle-line align-middle text-success"></i>
                                                                                    : <i className="ri-close-circle-line align-middle text-danger"></i>
                                                                            }
                                                                        </td>
                                                                        {/* <td>{Enabled}</td> */}
                                                                        <td>{Description}</td>
                                                                        <td>{dayjs(CreatedDate).format('MM/DD/YYYY HH:mm:ss')}</td>
                                                                        <td>
                                                                            <ul className="list-inline hstack gap-2 mb-0">
                                                                                <li className="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Edit" onClick={() => setActiveMaintenance(maintenance)}>
                                                                                    <span className="text-primary d-inline-block edit-item-btn" data-bs-toggle="modal" data-bs-target="#editMaintenanceModal" style={{ cursor: 'pointer' }}>
                                                                                        <i className="ri-pencil-fill fs-16" />
                                                                                    </span>
                                                                                </li>

                                                                                <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Remove">
                                                                                    <a className="text-danger d-inline-block remove-item-btn" data-bs-toggle="modal" href="#deleteMaintenanceModal" onClick={() => setActiveMaintenance(maintenance)}>
                                                                                        <i className="ri-delete-bin-5-fill fs-16" />
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                                <div className="noresult" style={{ display: 'none' }}>
                                                    <div className="text-center">
                                                        {/* <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style={{ width: 75, height: 75 }}>
                                            </lord-icon> */}
                                                        <h5 className="mt-2">Sorry! No Result Found</h5>
                                                        <p className="text-muted mb-0">We've searched more than 150+ users
                                                            We did not find any
                                                            users for you search.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end">
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

                                        <CreateMaintenanceModal
                                            maintenanceName={maintenanceName}
                                            maintenanceButtonText={maintenanceButtonText}
                                        />

                                        <EditMaintenanceModal
                                            maintenanceName={maintenanceName}
                                            activeMaintenance={activeMaintenance}
                                            maintenanceButtonText={maintenanceButtonText}
                                        />

                                        <ConfirmModal
                                            mutationFn={() => onDeleteMaintenance(activeMaintenance?.Id)}
                                            text={`Are you sure you want to delete this ${maintenanceButtonText} ?`}
                                            confirmButtonText='Yes, delete it'
                                            modalName='deleteMaintenanceModal'
                                            mutationLoading={deleteMaintenanceLoading}
                                            closeButtonRef={closeButtonRef}
                                        />

                                        {/*end modal */}
                                    </div>
                                </div>
                            </div>
                            {/*end col*/}
                        </div>
                        {/*end row*/}
                    </>
            }
        </MainLayout>
    )
}
