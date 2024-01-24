import { ConfirmModal } from '../../../ui/components';
import { CreateUserModal } from '../components';
import { isMutationSuccessResponse } from '../../../utils';
import { Link, useSearchParams } from 'react-router-dom';
import { MainLayout } from '../../../layout';
import { TableLayout } from '../../../ui/layout';
import { useDebouncedSearch } from '../../../hooks';
import { useDeleteUserMutation, useGetUsersQuery } from '../../../store/api';
import { useForm, useWatch } from 'react-hook-form';
import { useRef, useState } from 'react';
import { UserInterface } from '../../../interfaces';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

const usersPublicUrl: string = `${import.meta.env.VITE_API_PUBLIC_URL}/users`

interface SearchForm {
    search: string
}

export const UsersListPage = () => {
    const { t } = useTranslation();
    const [activeUser, setActiveUser] = useState<UserInterface | null>(null)
    const [deleteUser, { isLoading: deleteUserLoading }] = useDeleteUserMutation()

    const tableColumns = [{
        name: 'DisplayName',
        label: t('User'),
    },
    {
        name: 'Email',
        label: t('Email'),
    },
    {
        name: 'Phone',
        label: t('Phone'),
    },
    {
        name: 'Authorized',
        label: t('Authorized'),
    },
    {
        name: 'UserRole',
        label: t('Role'),
    },
    {
        name: 'CreatedDate',
        label: t('CreatedDate'),
    },
    {
        name: 'actions',
        label: t('Actions'),
    },]

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const { register, control } = useForm<SearchForm>()

    const [searchParams] = useSearchParams();
    const activePage = Number(searchParams.get("page")) || 1
    const pageSize = Number(searchParams.get("pageSize")) || 10

    const search = useWatch({ control, name: "search" })
    const debouncedSearch = useDebouncedSearch(search)

    const { data: users, isLoading: usersLoading } = useGetUsersQuery({ page: activePage, pageSize, search: debouncedSearch || '' })


    const onDeleteUser = async (id: string | undefined) => {
        if (!id) {
            toast.error('Error')
            return
        }
        try {
            const response = await deleteUser(id);
            if (isMutationSuccessResponse(response)) {
                const { data: respData } = response

                if (!respData?.isSuccess) {
                    toast.error(respData?.message)
                    return;
                }

                toast.success(respData?.message)
                setActiveUser(null)
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
                        <h4 className="mb-sm-0">{t('Users')}</h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><a href="javascript: void(0);">{t('Users')}</a></li>
                                <li className="breadcrumb-item active">{t('List')}</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <TableLayout
                register={register}
                searchPlaceholder={t('UsersSearchPlaceholder')}
                loading={usersLoading}
                columns={tableColumns}
                rows={
                    users?.data.map((user: UserInterface,) => {
                        const { Id, DisplayName, Email, Phone, CreatedDate, Authorized, UserRole, Picture, UserRoleId } = user

                        return (
                            <tr key={Id}>
                                <th scope="row">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="chk_child" defaultValue="option1" />
                                    </div>
                                </th>
                                <td>
                                    <div className="d-flex gap-2 align-items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={Picture ? `${usersPublicUrl}/${Picture}` : '/assets/images/users/user-dummy-img.jpg'}
                                                alt="user-img"
                                                className="avatar-sm rounded-circle"
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <Link to={`/user/details/${Id}`}>{DisplayName} </Link>
                                        </div>
                                    </div>
                                </td>

                                <td>{Email}</td>
                                <td>{Phone}</td>
                                <td>{Authorized ? <span className="badge badge-soft-success fs-11"><i className="ri-checkbox-circle-line align-bottom"></i> {t('Authorized')}</span> : <span className="badge badge-soft-danger fs-11"><i className="ri-checkbox-circle-line align-bottom"></i> {t('Unauthorized')} </span>}</td>
                                <td>{UserRole?.Name}</td>
                                <td>{dayjs(CreatedDate).format('MM/DD/YYYY HH:mm:ss')}</td>
                                <td>
                                    <ul className="list-inline hstack gap-2 mb-0" style={{ display: UserRoleId === 1 ? 'none' : '' }}>
                                        <li className="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title={t("Edit")}>
                                            <Link to={`/user/details/${Id}`} className="text-primary d-inline-block edit-item-btn">
                                                <i className="ri-pencil-fill fs-16" />
                                            </Link>
                                        </li>

                                        <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title={t("Remove")}>
                                            <a className="text-danger d-inline-block remove-item-btn" data-bs-toggle="modal" href="#deleteUserModal" onClick={() => setActiveUser(user)}>
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
                    label:t('AddUser'),
                    color: 'success',
                    modalTarget: 'createUserModal',
                }}
                totalItemsCount={users?.total || 0}
            />

            <CreateUserModal />

            <ConfirmModal
                mutationFn={() => onDeleteUser(activeUser?.Id)}
                text={`${t('sureWantToDelete')} ${activeUser?.DisplayName} ?`}
                confirmButtonText= {t('deleteIt')}
                modalName='deleteUserModal'
                mutationLoading={deleteUserLoading}
                closeButtonRef={closeButtonRef}
            />

        </MainLayout>
    )
}
