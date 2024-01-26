import { ApplicationInterface } from '../../interfaces';
import { ConfirmModal } from '../../ui/components';
import { isMutationSuccessResponse } from '../../utils';
import { Link, useSearchParams } from 'react-router-dom';
import { MainLayout } from '../../layout';
import { TableLayout } from '../../ui/layout';
import { useDebouncedSearch } from '../../hooks';
import { useDeleteApplicationMutation, useGetApplicationsQuery } from '../../store/api';
import { useForm, useWatch } from 'react-hook-form';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

interface SearchForm {
    search: string
}

export const ApplicationListPage = () => {
    const { t } = useTranslation();
    const [activeApplication, setActiveApplication] = useState<ApplicationInterface | null>(null)
    const [deleteApplication, { isLoading: deleteApplicationLoading }] = useDeleteApplicationMutation()

    const tableColumns = [{
        name: 'Name',
        label: t('Name'),
    },
    {
        name: 'Age',
        label: t('Age'),
    },
    {
        name: 'EmailAddress',
        label: t('Email'),
    },
    {
        name: 'PhoneNumber',
        label: t('Phone'),
    },
    {
        name: 'CreatedDate',
        label: t('CreatedDate'),
    },
    {
        name: 'actions',
        label: t('Actions'),
    },]

    const { register, control } = useForm<SearchForm>()

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const [searchParams] = useSearchParams();
    const activePage = Number(searchParams.get("page")) || 1
    const pageSize = Number(searchParams.get("pageSize")) || 10

    const search = useWatch({ control, name: "search" })
    const debouncedSearch = useDebouncedSearch(search)

    const { data: applicationsData, isLoading: applicationsDataLoading } = useGetApplicationsQuery({ page: activePage, pageSize, search: debouncedSearch || '' })

    const onDeleteApplication = async (id: string | undefined) => {
        if (!id) {
            toast.error('Error')
            return
        }
        try {
            const response = await deleteApplication(id);
            if (isMutationSuccessResponse(response)) {
                const { data: respData } = response

                if (!respData?.isSuccess) {
                    toast.error(respData?.message)
                    return;
                }

                toast.success(respData?.message)
                setActiveApplication(null)
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
                        <h4 className="mb-sm-0">{t('Applications')}</h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><a href="javascript: void(0);">{t('Applications')}</a></li>
                                <li className="breadcrumb-item active">{t('List')}</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <TableLayout
                register={register}
                searchPlaceholder={t('UsersSearchPlaceholder')}
                loading={applicationsDataLoading}
                columns={tableColumns}
                rows={
                    applicationsData?.data.map((application: ApplicationInterface,) => {
                        const { Id, FullName,Age, EmailAddress, PhoneNumber, CreatedDate, } = application

                        return (
                            <tr key={Id}>
                                <th scope="row">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="chk_child" defaultValue="option1" />
                                    </div>
                                </th>
                                <td><Link to={`/application/details/${Id}`}>{FullName} </Link></td>
                                <td>{Age}</td>
                                <td>{EmailAddress}</td>
                                <td>{PhoneNumber}</td>
                                <td>{dayjs(CreatedDate).format('MM/DD/YYYY HH:mm:ss')}</td>
                                <td>
                                    <ul className="list-inline hstack gap-2 mb-0">
                                        <li className="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title={t("Edit")}>
                                            <Link to={`/application/details/${Id}`} className="text-primary d-inline-block edit-item-btn">
                                                <i className="ri-pencil-fill fs-16" />
                                            </Link>
                                        </li>

                                        <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title={t("Remove")}>
                                            <a className="text-danger d-inline-block remove-item-btn" data-bs-toggle="modal" href="#deleteApplicationModal" onClick={() => setActiveApplication(application)}>
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
                    label: t('AddApplication'),
                    color: 'info',
                    link: '/application/new',
                }}
                totalItemsCount={applicationsData?.total || 0}
            />

            <ConfirmModal
                mutationFn={() => onDeleteApplication(activeApplication?.Id)}
                text={`${t('sureWantToDelete')} ${activeApplication?.FullName} ?`}
                confirmButtonText={t('deleteIt')}
                modalName='deleteApplicationModal'
                mutationLoading={deleteApplicationLoading}
                closeButtonRef={closeButtonRef}
            />

        </MainLayout>
    )
}
