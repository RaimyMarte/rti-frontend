import { ConfirmModal, } from '../../ui/components';
import { CreateMaintenanceModal, EditMaintenanceModal } from '../components';
import { isMutationSuccessResponse } from '../../utils';
import { MainLayout } from '../../layout';
import { MaintenanceInterface } from '../../interfaces';
import { maintenanceTableColumns } from '../helpers';
import { TableLayout } from '../../ui/layout';
import { useDeleteMaintenanceMutation, useGetMaintenanceWithPaginationQuery } from '../../store/api';
import { useForm, useWatch } from 'react-hook-form';
import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

interface MaintenancePageLayoutProps {
    maintenanceName: string
    maintenanceTitle: string
    maintenanceButtonText: string
    breadcrumb: string
}

interface FormInputs {
    search: string
}

export const MaintenancePageLayout = ({ maintenanceTitle, maintenanceName, maintenanceButtonText, breadcrumb }: MaintenancePageLayoutProps) => {
    const { t } = useTranslation()
    const tableColumns = maintenanceTableColumns(t)

    const { register, control, } = useForm<FormInputs>()

    const search = useWatch({ control, name: "search" })
    const [searchParams] = useSearchParams();
    const activePage = Number(searchParams.get("page")) || 1
    const pageSize = Number(searchParams.get("pageSize")) || 10

    const { data: maintenanceData, isLoading: maintenanceDataLoading } = useGetMaintenanceWithPaginationQuery({ maintenanceName, page: activePage, pageSize, search: search || '' })


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

            <TableLayout
                register={register}
                searchPlaceholder={`${t("Search")} ${maintenanceButtonText}`}
                loading={maintenanceDataLoading}
                columns={tableColumns}
                rows={
                    maintenanceData?.data.map((maintenance: MaintenanceInterface,) => {
                        const { Id, Name, Code, CreatedDate, Enabled } = maintenance

                        return (
                            <tr key={Id}>
                                <th scope="row">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="chk_child" defaultValue="option1" />
                                    </div>
                                </th>
                                <td>{Code}</td>
                                <td>{Name} </td>
                                <td>
                                    {
                                        Enabled
                                            ? <i className="ri-checkbox-circle-line align-middle text-success"></i>
                                            : <i className="ri-close-circle-line align-middle text-danger"></i>
                                    }
                                </td>
                                <td>{dayjs(CreatedDate).format('MM/DD/YYYY HH:mm:ss')}</td>
                                <td>
                                    <ul className="list-inline hstack gap-2 mb-0">
                                        <li className="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title={t("Edit")} onClick={() => setActiveMaintenance(maintenance)}>
                                            <span className="text-primary d-inline-block edit-item-btn" data-bs-toggle="modal" data-bs-target="#editMaintenanceModal" style={{ cursor: 'pointer' }}>
                                                <i className="ri-pencil-fill fs-16" />
                                            </span>
                                        </li>

                                        <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title={t("Remove")}>
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
                addButtonProps={{
                    label: `${t("New")} ${maintenanceButtonText}`,
                    color: 'success',
                    modalTarget: 'createMaintenanceModal',
                }}
                totalItemsCount={maintenanceData?.total || 0}
            />

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
                text={`${t("sureWantToDelete")} ${activeMaintenance?.Name} ?`}
                confirmButtonText={t("deleteIt")}
                modalName='deleteMaintenanceModal'
                mutationLoading={deleteMaintenanceLoading}
                closeButtonRef={closeButtonRef}
            />
        </MainLayout>
    )
}
