import { useForm, useWatch } from "react-hook-form";
import { useGetCitiesQuery, useGetCountriesQuery, useGetSelectedMaintenancesQuery, useGetStatesQuery, useGetUsersForDropdownQuery } from "../../../../store/api"
import { Loading } from "../../../../ui/components";
import { ControllerSelect, ControllerTextInput } from "../../../../ui/components/form";
import { GeoInterface, MaintenanceInterface, UserInterface } from "../../../../interfaces";
import { useTranslation } from "react-i18next";

const selectedMaintenances: string[] = [
    'AccountActiveCarrier',
    'AccountAdmissionType',
    'AccountExcelContractCarrier',
    'AccountFacilityStatus',
    'AccountPatientClass',
    'AccountPlanContract',
    'AccountStatus',
    'AccountWorkflow'
];

const usersPublicUrl: string = `${import.meta.env.VITE_API_PUBLIC_URL}/users`

export const AccountProfileDetailsTab = () => {
    const { t } = useTranslation()

    const { data: maintenancesData, isLoading: maintenancesDataLoading } = useGetSelectedMaintenancesQuery(selectedMaintenances)
    const { data: users, isLoading: usersLoading } = useGetUsersForDropdownQuery()


    const defaultValues = {
        // FirstName: UserProfile?.FirstName || '',
        // LastName: UserProfile?.LastName || '',
        // NickName: UserProfile?.NickName || '',
        // Gender: UserProfile?.Gender || '',
        // Phone: Phone || '',
        // Email: Email || '',
        // UserName: UserName || '',
        // Authorized,
        // Locked,
        // UserRoleId: UserRoleId || '',
    }

    const {
        handleSubmit,
        control,
    } = useForm<any>({ defaultValues });

    const { data: countries, isLoading: countriesLoading, } = useGetCountriesQuery()
    const watchCountryId = useWatch({ control, name: "CountryId" })
    const watchStateId = useWatch({ control, name: "StateId" })

    const { data: states, isLoading: statesLoading, } = useGetStatesQuery(watchCountryId)
    const { data: cities, isLoading: citiesLoading, } = useGetCitiesQuery({ countryId: watchCountryId, stateId: watchStateId })

    const onFormSubmit = async (data: any) => {
        console.log(data)
        // try {
        //     if (imagePreview) onSaveImage()

        //     const response = await updateUser({ ...data, UserId: Id || '' });
        //     if (isMutationSuccessResponse(response)) {
        //         const { data: respData } = response

        //         if (!respData?.isSuccess) {
        //             toast.error(respData?.message || "");
        //             return;
        //         }

        //         toast.success(respData?.message)
        //     }
        // } catch (error) {
        //     toast.error(`An error occurred: ${error}`);
        // }
    }

    const isDataLoading = maintenancesDataLoading || usersLoading || countriesLoading || statesLoading || citiesLoading
    return (
        isDataLoading
            ? <Loading />
            : <div className="tab-pane active" id="overview-tab" role="tabpanel">
                <div className="row">
                    <div className="col-xxl-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title mb-5">{t('AccountProfile')}</h5>
                                <div className="progress animated-progress custom-progress progress-label">
                                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: '45%' }} aria-valuenow={45} aria-valuemin={0} aria-valuemax={100}>
                                        <div className="label">45%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title mb-3">{t('AccountInformation')}</h5>
                                <div className="table-responsive">
                                    <table className="table table-borderless mb-0">
                                        <tbody>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('Facility')}:</th>
                                                <td className="text-muted">Anna Adame</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('ExcelID')}:</th>
                                                <td className="text-muted">+(1) 987 6543</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('AccountNumber')}:</th>
                                                <td className="text-muted">000000000</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('Status')}:</th>
                                                <td className="text-muted">Started</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('SocialSecurityNumber')}</th>
                                                <td className="text-muted">000-00-0000</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('PatientName')}:</th>
                                                <td className="text-muted">Anna Adame</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('DateofBirth')}:</th>
                                                <td className="text-muted">Nov 17, 1985 (37 years)</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('AdmissionType')}:</th>
                                                <td className="text-muted">Regular</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('ErrorCode')}:</th>
                                                <td className="text-muted">Anna Adame</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('WorkflowStatus')}:</th>
                                                <td className="text-muted">Normal</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('AssignedUser')}:</th>
                                                <td className="text-muted">Daisy Martinez</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('DateofService')}:</th>
                                                <td className="text-muted">Oct 30, 2020 | 3 years 1 month 16 days</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('PlacementDate')}:</th>
                                                <td className="text-muted">Oct 30, 2020 | 3 years 1 month 16 days</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('FacilityStatus')}:</th>
                                                <td className="text-muted">In Progress</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('ExcelContract')}:</th>
                                                <td className="text-muted">000-000-000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>{/* end card body */}
                        </div>{/* end card */}
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title mb-3">{t('ActiveCarrier')}</h5>
                                <div className="table-responsive">
                                    <table className="table table-borderless mb-0">
                                        <tbody>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('Carrier')}:</th>
                                                <td className="text-muted">Anna Adame</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('PlanName')}:</th>
                                                <td className="text-muted">Basic</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('PolicyNumber')}:</th>
                                                <td className="text-muted">000000000</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('GroupNumber')}:</th>
                                                <td className="text-muted">GN000-0000</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('ClaimNumber')}:</th>
                                                <td className="text-muted">CN000-0000</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('AutorizationCode')}:</th>
                                                <td className="text-muted">134679</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('PlanContract')}:</th>
                                                <td className="text-muted">987-654-321</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>{/* end card body */}
                        </div>{/* end card */}
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title mb-3">{t('FinancialSummary')}</h5>
                                <div className="table-responsive">
                                    <table className="table table-borderless mb-0">
                                        <tbody>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('TotalChanges')}:</th>
                                                <td className="text-muted">US$ 1,589.32</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('MedicalServices')}:</th>
                                                <td className="text-muted">US$ 5,475.99</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('TotalReceived')}:</th>
                                                <td className="text-muted">US$ 6,900.00</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('Adjustments')}:</th>
                                                <td className="text-muted">US$ 1,175.48</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('InsuranceBalance')}:</th>
                                                <td className="text-muted">US$ 2,300.00</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('PatientBalance')}:</th>
                                                <td className="text-muted">US$ 3,475.99</td>
                                            </tr>
                                            <tr>
                                                <th className="ps-0" scope="row">{t('AccountBalance')}:</th>
                                                <td className="text-muted">US$ 1,475.99</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>{/* end card body */}
                        </div>{/* end card */}
                    </div>
                    {/*end col*/}
                    <div className="col-xxl-8">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit(onFormSubmit)} className="tablelist-form">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <h5 className="card-title mb-3">{t('PatientInformation')}</h5>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="No."
                                                            control={control}
                                                            label={t('AccountNumber')}
                                                            placeholder={`${t('Enter')} ${t('AccountNumber')}`}
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-12">
                                                    <div className="mb-3">
                                                        <ControllerSelect
                                                            name="StatusId"
                                                            control={control}
                                                            label={t('AccountStatus')}
                                                            options={
                                                                maintenancesData?.data?.AccountStatus.map((maintenance: MaintenanceInterface) => {
                                                                    const { Name, Id } = maintenance

                                                                    return (
                                                                        <option key={Id} value={Id}>{Name}</option>
                                                                    )
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-12">
                                                    <div className="mb-3">
                                                        <ControllerSelect
                                                            name="PatientClassId"
                                                            control={control}
                                                            label={t('PatientClass')}
                                                            options={
                                                                maintenancesData?.data?.AccountPatientClass.map((maintenance: MaintenanceInterface) => {
                                                                    const { Name, Id } = maintenance

                                                                    return (
                                                                        <option key={Id} value={Id}>{Name}</option>
                                                                    )
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="SSN"
                                                            control={control}
                                                            rules={{
                                                                minLength: {
                                                                    value: 9,
                                                                    message: t('SSNmustBe'),
                                                                },
                                                                maxLength: {
                                                                    value: 9,
                                                                    message: t('SSNmustBe'),
                                                                }
                                                            }}
                                                            label={t('SocialSecurityNumber')}
                                                            placeholder={`${t('Ex.')} 000-11-1234`}
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="DOB"
                                                            control={control}
                                                            label={t('DateofBirth')}
                                                            placeholder={`${t('Enter')} ${t('DateofBirth')}`}
                                                            type='date'
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="FirstName"
                                                            control={control}
                                                            label={t('FirstName')}
                                                            placeholder={`${t('Enter')} ${t('FirstName')}`}
                                                        // rules={{
                                                        //     required: 'First name is required',
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="LastName"
                                                            control={control}
                                                            label={t('LastName')}
                                                            placeholder={`${t('Enter')} ${t('LastName')}`}
                                                        // rules={{
                                                        //     required: 'Last name is required',
                                                        // }}
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-12">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="AddressLine1"
                                                            control={control}
                                                            label={t('Address')}
                                                            placeholder={`${t('Enter')} ${t('Address')}`}
                                                        />
                                                        <ControllerTextInput
                                                            name="AddressLine2"
                                                            control={control}
                                                            placeholder={`${t('Enter')} ${t('Address')}`}
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}

                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerSelect
                                                            name="CountryId"
                                                            control={control}
                                                            label={t('Country')}
                                                            options={
                                                                countries?.data.map((country: GeoInterface) => {
                                                                    const { Name, Id } = country

                                                                    return (
                                                                        <option key={Id} value={Id}>{Name}</option>
                                                                    )
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                {
                                                    watchCountryId
                                                    && <div className="col-lg-6">
                                                        <ControllerSelect
                                                            name="StateId"
                                                            control={control}
                                                            label={t('State')}
                                                            options={
                                                                states?.data.map((state: GeoInterface) => {
                                                                    const { Name, Id } = state

                                                                    return (
                                                                        <option key={Id} value={Id}>{Name}</option>
                                                                    )
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                }
                                                {
                                                    watchCountryId && watchStateId
                                                    && <div className="col-lg-6">
                                                        <ControllerSelect
                                                            name="CityId"
                                                            control={control}
                                                            label={t('City')}
                                                            options={
                                                                cities?.data.map((city: GeoInterface) => {
                                                                    const { Name, Id } = city

                                                                    return (
                                                                        <option key={Id} value={Id}>{Name}</option>
                                                                    )
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                }
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="ZipCode"
                                                            control={control}
                                                            label={t('ZipCode')}
                                                            placeholder={`${t('Enter')} ${t('ZipCode')}`}
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="HomePhone"
                                                            control={control}
                                                            label={t('HomePhone')}
                                                            placeholder={`${t('Enter')} ${t('HomePhone')}`}
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="MobilePhone"
                                                            control={control}
                                                            label={t('MobilePhone')}
                                                            placeholder={`${t('Enter')} ${t('MobilePhone')}`}
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="WorkPhone"
                                                            control={control}
                                                            label={t('WorkPhone')}
                                                            placeholder={`${t('Enter')} ${t('WorkPhone')}`}
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="OtherPhone"
                                                            control={control}
                                                            label={t('OtherPhone')}
                                                            placeholder={`${t('Enter')} ${t('OtherPhone')}`}
                                                        />
                                                    </div>
                                                </div>

                                                <hr />
                                                <h5 className="card-title mb-3">{t('A/RType')}</h5>

                                                <div className="col-lg-12">
                                                    <div className="mb-3">
                                                        <ControllerSelect
                                                            name="AdmissionTypeId"
                                                            control={control}
                                                            label={t('AdmissionType')}
                                                            options={
                                                                maintenancesData?.data?.AccountAdmissionType.map((maintenance: MaintenanceInterface) => {
                                                                    const { Name, Id } = maintenance

                                                                    return (
                                                                        <option key={Id} value={Id}>{Name}</option>
                                                                    )
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="ICD"
                                                            control={control}
                                                            label={t('ICD')}
                                                        // placeholder={`${t('Enter')} ${t('ICD')}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-9">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="ICD"
                                                            control={control}
                                                            label={t('ICD')}
                                                        // placeholder={`${t('Enter')} ${t('ICD')}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="Procedure"
                                                            control={control}
                                                            label={t('Procedure')}
                                                        // placeholder={`${t('Enter')} ${t('Procedure')}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-9">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="Procedure"
                                                            control={control}
                                                            label={t('Procedure')}
                                                        // placeholder={`${t('Enter')} ${t('Procedure')}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="DRG"
                                                            control={control}
                                                            label={t('DRG')}
                                                        // placeholder={`${t('Enter')} ${t('DRG')}`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-9">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="DRG"
                                                            control={control}
                                                            label={t('DRG')}
                                                        // placeholder={`${t('Enter')} ${t('DRG')}`}
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-12">
                                                    <div className="mb-3">
                                                        <ControllerSelect
                                                            name="WorkflowId"
                                                            control={control}
                                                            label={t('Workflow')}
                                                            options={
                                                                maintenancesData?.data?.AccountWorkflow.map((maintenance: MaintenanceInterface) => {
                                                                    const { Name, Id } = maintenance

                                                                    return (
                                                                        <option key={Id} value={Id}>{Name}</option>
                                                                    )
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                {/*end col*/}
                                                <div className="col-lg-12">
                                                    <div className="mb-3">
                                                        <ControllerSelect
                                                            name="UserAssignedId"
                                                            control={control}
                                                            label={t('UserAssigned')}
                                                            options={
                                                                users?.data?.map((user: UserInterface) => {
                                                                    const { DisplayName, Id, Picture } = user

                                                                    return (
                                                                        <option key={Id} value={Id}><img src={`${usersPublicUrl}/${Picture}`} alt={DisplayName} />{DisplayName}</option>
                                                                    )
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-12">
                                                    <div className="hstack gap-2 justify-content-end">
                                                        <button type="submit" className="btn btn-primary">{t('Update')}</button>
                                                        <button type="button" className="btn btn-soft-success">{t('Cancel')}</button>
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                            </div>
                                            {/*end row*/}
                                        </div>
                                        <div className="col-lg-6">
                                            <h5 className="card-title mb-3">{t('Contract&CarrierInformation')}</h5>

                                            <div className="row">
                                                {/*end col*/}
                                                <div className="col-lg-12 mb-3">
                                                    <h6 className="card-subtitle mb-2">{t('Carriers')}</h6>
                                                    <div className="table-responsive">
                                                        <table className="table table-borderless align-middle mb-0">
                                                            <thead className="table-light">
                                                                <tr>
                                                                    <th scope="col">{t('COB')}</th>
                                                                    <th scope="col">{t('Carrier')}</th>
                                                                    <th scope="col">{t('Address')}</th>
                                                                    <th scope="col">{t('Actions')}</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <div className="avatar-sm">
                                                                                <div className="avatar-title bg-soft-primary text-primary rounded fs-20">
                                                                                    <i className="ri-file-zip-fill" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="ms-3 flex-grow-1">
                                                                                <h6 className="fs-15 mb-0"><a href="javascript:void(0)">Artboard-documents.zip</a>
                                                                                </h6>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>Zip File</td>
                                                                    <td>4.57 MB</td>
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
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="PlanName"
                                                            control={control}
                                                            label={t('PlanName')}
                                                            placeholder={`${t('Enter')} ${t('PlanName')}`}
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="PolicyNumber"
                                                            control={control}
                                                            label={t('PolicyNumber')}
                                                            placeholder={`${t('Enter')} ${t('PolicyNumber')}`}
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="GroupNumber"
                                                            control={control}
                                                            label={t('GroupNumber')}
                                                            placeholder={`${t('Enter')} ${t('GroupNumber')}`}
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="ClaimNumber"
                                                            control={control}
                                                            label={t('ClaimNumber')}
                                                            placeholder={`${t('Enter')} ${t('ClaimNumber')}`}
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="AutorizationCode"
                                                            control={control}
                                                            label={t('AutorizationCode')}
                                                            placeholder={`${t('Enter')} ${t('AutorizationCode')}`}
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <hr />
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerSelect
                                                            name="ActiveCarrierId"
                                                            control={control}
                                                            label={t('ActiveCarrier')}
                                                            options={
                                                                maintenancesData?.data?.AccountActiveCarrier.map((maintenance: MaintenanceInterface) => {
                                                                    const { Name, Id } = maintenance

                                                                    return (
                                                                        <option key={Id} value={Id}>{Name}</option>
                                                                    )
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerSelect
                                                            name="PlanContractId"
                                                            control={control}
                                                            label={t('PlanContract')}
                                                            options={
                                                                maintenancesData?.data?.AccountPlanContract.map((maintenance: MaintenanceInterface) => {
                                                                    const { Name, Id } = maintenance

                                                                    return (
                                                                        <option key={Id} value={Id}>{Name}</option>
                                                                    )
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-4">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="Thereshold"
                                                            control={control}
                                                            label={t('Thereshold')}
                                                            placeholder={`${t('Enter')} ${t('Thereshold')}`}
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-4">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="Percentage"
                                                            control={control}
                                                            label={t('Percentage')}
                                                            placeholder={`${t('Enter')} ${t('Percentage')}`}
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-4">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="MaxReimbursement"
                                                            control={control}
                                                            label={t('MaxReimbursement')}
                                                            placeholder={`${t('Enter')} ${t('MaxReimbursement')}`}
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="AdmissionDate"
                                                            control={control}
                                                            label={t('AdmissionDate')}
                                                            placeholder={`${t('Enter')} ${t('AdmissionDate')}`}
                                                            type='date'
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="Discharge"
                                                            control={control}
                                                            label={t('Discharge')}
                                                            placeholder={`${t('Enter')} ${t('Discharge')}`}
                                                            type='date'
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="TotalChanges"
                                                            control={control}
                                                            label={t('TotalChanges')}
                                                            placeholder={`${t('Enter')} ${t('TotalChanges')}`}
                                                        />
                                                    </div>
                                                </div>

                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="PlacementDate"
                                                            control={control}
                                                            label={t('PlacementDate')}
                                                            placeholder={`${t('Enter')} ${t('PlacementDate')}`}
                                                            type='date'
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerTextInput
                                                            name="A/RAgingfromDOS"
                                                            control={control}
                                                            label={t('A/RAgingfromDOS')}
                                                            placeholder={`${t('Enter')} ${t('A/RAgingfromDOS')}`}
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerSelect
                                                            name="FacilityStatusId"
                                                            control={control}
                                                            label={t('FacilityStatus')}
                                                            options={
                                                                maintenancesData?.data?.AccountFacilityStatus.map((maintenance: MaintenanceInterface) => {
                                                                    const { Name, Id } = maintenance

                                                                    return (
                                                                        <option key={Id} value={Id}>{Name}</option>
                                                                    )
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <ControllerSelect
                                                            name="ExcelContractCarrierId"
                                                            control={control}
                                                            label={t('ExcelContractCarrier')}
                                                            options={
                                                                maintenancesData?.data?.AccountExcelContractCarrier.map((maintenance: MaintenanceInterface) => {
                                                                    const { Name, Id } = maintenance

                                                                    return (
                                                                        <option key={Id} value={Id}>{Name}</option>
                                                                    )
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/*end row*/}
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {/*end card-body*/}
                        </div>{/* end card */}
                        <div className="row" style={{ display: 'none' }}>
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header align-items-center d-flex">
                                        <h4 className="card-title mb-0  me-2">Recent Activity</h4>
                                        <div className="flex-shrink-0 ms-auto">
                                            <ul className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active" data-bs-toggle="tab" href="#today" role="tab">
                                                        Today
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" data-bs-toggle="tab" href="#weekly" role="tab">
                                                        Weekly
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" data-bs-toggle="tab" href="#monthly" role="tab">
                                                        Monthly
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="tab-content text-muted">
                                            <div className="tab-pane active" id="today" role="tabpanel">
                                                <div className="profile-timeline">
                                                    <div className="accordion accordion-flush" id="todayExample">
                                                        <div className="accordion-item border-0">
                                                            <div className="accordion-header" id="headingOne">
                                                                <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapseOne" aria-expanded="true">
                                                                    <div className="d-flex">
                                                                        <div className="flex-shrink-0">
                                                                            <img src="/assets/images/users/avatar-2.jpg" className="avatar-xs rounded-circle" />
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-3">
                                                                            <h6 className="fs-14 mb-1">
                                                                                Jacqueline Steve
                                                                            </h6>
                                                                            <small className="text-muted">We
                                                                                has changed 2
                                                                                attributes on
                                                                                05:16PM</small>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body ms-2 ps-5">
                                                                    In an awareness campaign, it
                                                                    is vital for people to begin
                                                                    put 2 and 2 together and
                                                                    begin to recognize your
                                                                    cause. Too much or too
                                                                    little spacing, as in the
                                                                    example below, can make
                                                                    things unpleasant for the
                                                                    reader. The goal is to make
                                                                    your text as comfortable to
                                                                    read as possible. A
                                                                    wonderful serenity has taken
                                                                    possession of my entire
                                                                    soul, like these sweet
                                                                    mornings of spring which I
                                                                    enjoy with my whole heart.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item border-0">
                                                            <div className="accordion-header" id="headingTwo">
                                                                <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapseTwo" aria-expanded="false">
                                                                    <div className="d-flex">
                                                                        <div className="flex-shrink-0 avatar-xs">
                                                                            <div className="avatar-title bg-light text-success rounded-circle">
                                                                                M
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-3">
                                                                            <h6 className="fs-14 mb-1">
                                                                                Megan Elmore
                                                                            </h6>
                                                                            <small className="text-muted">Adding
                                                                                a new event with
                                                                                attachments -
                                                                                04:45PM</small>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body ms-2 ps-5">
                                                                    <div className="row g-2">
                                                                        <div className="col-auto">
                                                                            <div className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                <div className="flex-shrink-0">
                                                                                    <i className="ri-image-2-line fs-17 text-danger" />
                                                                                </div>
                                                                                <div className="flex-grow-1 ms-2">
                                                                                    <h6><a href="" className="stretched-link">Business
                                                                                        Template
                                                                                        -
                                                                                        UI/UX
                                                                                        design</a>
                                                                                    </h6>
                                                                                    <small>685
                                                                                        KB</small>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-auto">
                                                                            <div className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                <div className="flex-shrink-0">
                                                                                    <i className="ri-file-zip-line fs-17 text-info" />
                                                                                </div>
                                                                                <div className="flex-grow-1 ms-2">
                                                                                    <h6><a href="" className="stretched-link">Bank
                                                                                        Management
                                                                                        System
                                                                                        -
                                                                                        PSD</a>
                                                                                    </h6>
                                                                                    <small>8.78
                                                                                        MB</small>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item border-0">
                                                            <div className="accordion-header" id="headingThree">
                                                                <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapsethree" aria-expanded="false">
                                                                    <div className="d-flex">
                                                                        <div className="flex-shrink-0">
                                                                            <img src="/assets/images/users/avatar-5.jpg" className="avatar-xs rounded-circle" />
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-3">
                                                                            <h6 className="fs-14 mb-1">
                                                                                New ticket
                                                                                received</h6>
                                                                            <small className="text-muted mb-2">User
                                                                                <span className="text-secondary">Erica245</span>
                                                                                submitted a
                                                                                ticket -
                                                                                02:33PM</small>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item border-0">
                                                            <div className="accordion-header" id="headingFour">
                                                                <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapseFour" aria-expanded="true">
                                                                    <div className="d-flex">
                                                                        <div className="flex-shrink-0 avatar-xs">
                                                                            <div className="avatar-title bg-light text-muted rounded-circle">
                                                                                <i className="ri-user-3-fill" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-3">
                                                                            <h6 className="fs-14 mb-1">
                                                                                Nancy Martino
                                                                            </h6>
                                                                            <small className="text-muted">Commented
                                                                                on
                                                                                12:57PM</small>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div id="collapseFour" className="accordion-collapse collapse show" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body ms-2 ps-5 fst-italic">
                                                                    " A wonderful serenity has
                                                                    taken possession of my
                                                                    entire soul, like these
                                                                    sweet mornings of spring
                                                                    which I enjoy with my whole
                                                                    heart. Each design is a new,
                                                                    unique piece of art birthed
                                                                    into this world, and while
                                                                    you have the opportunity to
                                                                    be creative and make your
                                                                    own style choices. "
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item border-0">
                                                            <div className="accordion-header" id="headingFive">
                                                                <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapseFive" aria-expanded="true">
                                                                    <div className="d-flex">
                                                                        <div className="flex-shrink-0">
                                                                            <img src="/assets/images/users/avatar-7.jpg" className="avatar-xs rounded-circle" />
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-3">
                                                                            <h6 className="fs-14 mb-1">
                                                                                Lewis Arnold
                                                                            </h6>
                                                                            <small className="text-muted">Create
                                                                                new project
                                                                                buildng product
                                                                                -
                                                                                10:05AM</small>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div id="collapseFive" className="accordion-collapse collapse show" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body ms-2 ps-5">
                                                                    <p className="text-muted mb-2">
                                                                        Every team project can
                                                                        have a velzon. Use the
                                                                        velzon to share
                                                                        information with your
                                                                        team to understand and
                                                                        contribute to your
                                                                        project.</p>
                                                                    <div className="avatar-group">
                                                                        <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="Christi">
                                                                            <img src="/assets/images/users/avatar-4.jpg" className="rounded-circle avatar-xs" />
                                                                        </a>
                                                                        <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="Frank Hook">
                                                                            <img src="/assets/images/users/avatar-3.jpg" className="rounded-circle avatar-xs" />
                                                                        </a>
                                                                        <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title=" Ruby">
                                                                            <div className="avatar-xs">
                                                                                <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                    R
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                        <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="more">
                                                                            <div className="avatar-xs">
                                                                                <div className="avatar-title rounded-circle">
                                                                                    2+
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/*end accordion*/}
                                                </div>
                                            </div>
                                            <div className="tab-pane" id="weekly" role="tabpanel">
                                                <div className="profile-timeline">
                                                    <div className="accordion accordion-flush" id="weeklyExample">
                                                        <div className="accordion-item border-0">
                                                            <div className="accordion-header" id="heading6">
                                                                <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse6" aria-expanded="true">
                                                                    <div className="d-flex">
                                                                        <div className="flex-shrink-0">
                                                                            <img src="/assets/images/users/avatar-3.jpg" className="avatar-xs rounded-circle" />
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-3">
                                                                            <h6 className="fs-14 mb-1">
                                                                                Joseph Parker
                                                                            </h6>
                                                                            <small className="text-muted">New
                                                                                people joined
                                                                                with our company
                                                                                -
                                                                                Yesterday</small>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div id="collapse6" className="accordion-collapse collapse show" aria-labelledby="heading6" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body ms-2 ps-5">
                                                                    It makes a statement, it’s
                                                                    impressive graphic design.
                                                                    Increase or decrease the
                                                                    letter spacing depending on
                                                                    the situation and try, try
                                                                    again until it looks right,
                                                                    and each letter has the
                                                                    perfect spot of its own.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item border-0">
                                                            <div className="accordion-header" id="heading7">
                                                                <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse7" aria-expanded="false">
                                                                    <div className="d-flex">
                                                                        <div className="avatar-xs">
                                                                            <div className="avatar-title rounded-circle bg-light text-danger">
                                                                                <i className="ri-shopping-bag-line" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-3">
                                                                            <h6 className="fs-14 mb-1">
                                                                                Your order is
                                                                                placed <span className="badge bg-soft-success text-success align-middle">Completed</span>
                                                                            </h6>
                                                                            <small className="text-muted">These
                                                                                customers can
                                                                                rest assured
                                                                                their order has
                                                                                been placed - 1
                                                                                week Ago</small>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item border-0">
                                                            <div className="accordion-header" id="heading8">
                                                                <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse8" aria-expanded="true">
                                                                    <div className="d-flex">
                                                                        <div className="flex-shrink-0 avatar-xs">
                                                                            <div className="avatar-title bg-light text-success rounded-circle">
                                                                                <i className="ri-home-3-line" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-3">
                                                                            <h6 className="fs-14 mb-1">
                                                                                Velzon admin
                                                                                dashboard
                                                                                templates layout
                                                                                upload</h6>
                                                                            <small className="text-muted">We
                                                                                talked about a
                                                                                project on
                                                                                linkedin - 1
                                                                                week Ago</small>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div id="collapse8" className="accordion-collapse collapse show" aria-labelledby="heading8" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body ms-2 ps-5 fst-italic">
                                                                    Powerful, clean &amp; modern
                                                                    responsive bootstrap 5 admin
                                                                    template. The maximum file
                                                                    size for uploads in this
                                                                    demo :
                                                                    <div className="row mt-2">
                                                                        <div className="col-xxl-6">
                                                                            <div className="row border border-dashed gx-2 p-2">
                                                                                <div className="col-3">
                                                                                    <img src="/assets/images/small/img-3.jpg" className="img-fluid rounded" />
                                                                                </div>
                                                                                {/*end col*/}
                                                                                <div className="col-3">
                                                                                    <img src="/assets/images/small/img-5.jpg" className="img-fluid rounded" />
                                                                                </div>
                                                                                {/*end col*/}
                                                                                <div className="col-3">
                                                                                    <img src="/assets/images/small/img-7.jpg" className="img-fluid rounded" />
                                                                                </div>
                                                                                {/*end col*/}
                                                                                <div className="col-3">
                                                                                    <img src="/assets/images/small/img-9.jpg" className="img-fluid rounded" />
                                                                                </div>
                                                                                {/*end col*/}
                                                                            </div>
                                                                            {/*end row*/}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item border-0">
                                                            <div className="accordion-header" id="heading9">
                                                                <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse9" aria-expanded="false">
                                                                    <div className="d-flex">
                                                                        <div className="flex-shrink-0">
                                                                            <img src="/assets/images/users/avatar-6.jpg" className="avatar-xs rounded-circle" />
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-3">
                                                                            <h6 className="fs-14 mb-1">
                                                                                New ticket
                                                                                created <span className="badge bg-soft-info text-info align-middle">Inprogress</span>
                                                                            </h6>
                                                                            <small className="text-muted mb-2">User
                                                                                <span className="text-secondary">Jack365</span>
                                                                                submitted a
                                                                                ticket - 2 week
                                                                                Ago</small>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item border-0">
                                                            <div className="accordion-header" id="heading10">
                                                                <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse10" aria-expanded="true">
                                                                    <div className="d-flex">
                                                                        <div className="flex-shrink-0">
                                                                            <img src="/assets/images/users/avatar-5.jpg" className="avatar-xs rounded-circle" />
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-3">
                                                                            <h6 className="fs-14 mb-1">
                                                                                Jennifer Carter
                                                                            </h6>
                                                                            <small className="text-muted">Commented
                                                                                - 4 week
                                                                                Ago</small>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div id="collapse10" className="accordion-collapse collapse show" aria-labelledby="heading10" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body ms-2 ps-5">
                                                                    <p className="text-muted fst-italic mb-2">
                                                                        " This is an awesome
                                                                        admin dashboard
                                                                        template. It is
                                                                        extremely well
                                                                        structured and uses
                                                                        state of the art
                                                                        components (e.g. one of
                                                                        the only templates using
                                                                        boostrap 5.1.3 so far).
                                                                        I integrated it into a
                                                                        Rails 6 project. Needs
                                                                        manual integration work
                                                                        of course but the
                                                                        template structure made
                                                                        it easy. "</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/*end accordion*/}
                                                </div>
                                            </div>
                                            <div className="tab-pane" id="monthly" role="tabpanel">
                                                <div className="profile-timeline">
                                                    <div className="accordion accordion-flush" id="monthlyExample">
                                                        <div className="accordion-item border-0">
                                                            <div className="accordion-header" id="heading11">
                                                                <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse11" aria-expanded="false">
                                                                    <div className="d-flex">
                                                                        <div className="flex-shrink-0 avatar-xs">
                                                                            <div className="avatar-title bg-light text-success rounded-circle">
                                                                                M
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-3">
                                                                            <h6 className="fs-14 mb-1">
                                                                                Megan Elmore
                                                                            </h6>
                                                                            <small className="text-muted">Adding
                                                                                a new event with
                                                                                attachments - 1
                                                                                month
                                                                                Ago.</small>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div id="collapse11" className="accordion-collapse collapse show" aria-labelledby="heading11" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body ms-2 ps-5">
                                                                    <div className="row g-2">
                                                                        <div className="col-auto">
                                                                            <div className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                <div className="flex-shrink-0">
                                                                                    <i className="ri-image-2-line fs-17 text-danger" />
                                                                                </div>
                                                                                <div className="flex-grow-1 ms-2">
                                                                                    <h6><a href="" className="stretched-link">Business
                                                                                        Template
                                                                                        -
                                                                                        UI/UX
                                                                                        design</a>
                                                                                    </h6>
                                                                                    <small>685
                                                                                        KB</small>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-auto">
                                                                            <div className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                <div className="flex-shrink-0">
                                                                                    <i className="ri-file-zip-line fs-17 text-info" />
                                                                                </div>
                                                                                <div className="flex-grow-1 ms-2">
                                                                                    <h6><a href="" className="stretched-link">Bank
                                                                                        Management
                                                                                        System
                                                                                        -
                                                                                        PSD</a>
                                                                                    </h6>
                                                                                    <small>8.78
                                                                                        MB</small>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-auto">
                                                                            <div className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                <div className="flex-shrink-0">
                                                                                    <i className="ri-file-zip-line fs-17 text-info" />
                                                                                </div>
                                                                                <div className="flex-grow-1 ms-2">
                                                                                    <h6><a href="" className="stretched-link">Bank
                                                                                        Management
                                                                                        System
                                                                                        -
                                                                                        PSD</a>
                                                                                    </h6>
                                                                                    <small>8.78
                                                                                        MB</small>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item border-0">
                                                            <div className="accordion-header" id="heading12">
                                                                <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse12" aria-expanded="true">
                                                                    <div className="d-flex">
                                                                        <div className="flex-shrink-0">
                                                                            <img src="/assets/images/users/avatar-2.jpg" className="avatar-xs rounded-circle" />
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-3">
                                                                            <h6 className="fs-14 mb-1">
                                                                                Jacqueline Steve
                                                                            </h6>
                                                                            <small className="text-muted">We
                                                                                has changed 2
                                                                                attributes on 3
                                                                                month
                                                                                Ago</small>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div id="collapse12" className="accordion-collapse collapse show" aria-labelledby="heading12" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body ms-2 ps-5">
                                                                    In an awareness campaign, it
                                                                    is vital for people to begin
                                                                    put 2 and 2 together and
                                                                    begin to recognize your
                                                                    cause. Too much or too
                                                                    little spacing, as in the
                                                                    example below, can make
                                                                    things unpleasant for the
                                                                    reader. The goal is to make
                                                                    your text as comfortable to
                                                                    read as possible. A
                                                                    wonderful serenity has taken
                                                                    possession of my entire
                                                                    soul, like these sweet
                                                                    mornings of spring which I
                                                                    enjoy with my whole heart.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item border-0">
                                                            <div className="accordion-header" id="heading13">
                                                                <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse13" aria-expanded="false">
                                                                    <div className="d-flex">
                                                                        <div className="flex-shrink-0">
                                                                            <img src="/assets/images/users/avatar-5.jpg" className="avatar-xs rounded-circle" />
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-3">
                                                                            <h6 className="fs-14 mb-1">
                                                                                New ticket
                                                                                received</h6>
                                                                            <small className="text-muted mb-2">User
                                                                                <span className="text-secondary">Erica245</span>
                                                                                submitted a
                                                                                ticket - 5 month
                                                                                Ago</small>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item border-0">
                                                            <div className="accordion-header" id="heading14">
                                                                <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse14" aria-expanded="true">
                                                                    <div className="d-flex">
                                                                        <div className="flex-shrink-0 avatar-xs">
                                                                            <div className="avatar-title bg-light text-muted rounded-circle">
                                                                                <i className="ri-user-3-fill" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-3">
                                                                            <h6 className="fs-14 mb-1">
                                                                                Nancy Martino
                                                                            </h6>
                                                                            <small className="text-muted">Commented
                                                                                on 24 Nov,
                                                                                2021.</small>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div id="collapse14" className="accordion-collapse collapse show" aria-labelledby="heading14" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body ms-2 ps-5 fst-italic">
                                                                    " A wonderful serenity has
                                                                    taken possession of my
                                                                    entire soul, like these
                                                                    sweet mornings of spring
                                                                    which I enjoy with my whole
                                                                    heart. Each design is a new,
                                                                    unique piece of art birthed
                                                                    into this world, and while
                                                                    you have the opportunity to
                                                                    be creative and make your
                                                                    own style choices. "
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item border-0">
                                                            <div className="accordion-header" id="heading15">
                                                                <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse15" aria-expanded="true">
                                                                    <div className="d-flex">
                                                                        <div className="flex-shrink-0">
                                                                            <img src="/assets/images/users/avatar-7.jpg" className="avatar-xs rounded-circle" />
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-3">
                                                                            <h6 className="fs-14 mb-1">
                                                                                Lewis Arnold
                                                                            </h6>
                                                                            <small className="text-muted">Create
                                                                                new project
                                                                                buildng product
                                                                                - 8 month
                                                                                Ago</small>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div id="collapse15" className="accordion-collapse collapse show" aria-labelledby="heading15" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body ms-2 ps-5">
                                                                    <p className="text-muted mb-2">
                                                                        Every team project can
                                                                        have a velzon. Use the
                                                                        velzon to share
                                                                        information with your
                                                                        team to understand and
                                                                        contribute to your
                                                                        project.</p>
                                                                    <div className="avatar-group">
                                                                        <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="Christi">
                                                                            <img src="/assets/images/users/avatar-4.jpg" className="rounded-circle avatar-xs" />
                                                                        </a>
                                                                        <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="Frank Hook">
                                                                            <img src="/assets/images/users/avatar-3.jpg" className="rounded-circle avatar-xs" />
                                                                        </a>
                                                                        <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title=" Ruby">
                                                                            <div className="avatar-xs">
                                                                                <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                    R
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                        <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="more">
                                                                            <div className="avatar-xs">
                                                                                <div className="avatar-title rounded-circle">
                                                                                    2+
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/*end accordion*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>{/* end card body */}
                                </div>{/* end card */}
                            </div>{/* end col */}
                        </div>{/* end row */}
                        <div className="card" style={{ display: 'none' }}>
                            <div className="card-body">
                                <h5 className="card-title">audit</h5>
                                {/* Swiper */}
                                <div className="swiper project-swiper mt-n4">
                                    <div className="d-flex justify-content-end gap-2 mb-2">
                                        <div className="slider-button-prev">
                                            <div className="avatar-title fs-18 rounded px-1">
                                                <i className="ri-arrow-left-s-line" />
                                            </div>
                                        </div>
                                        <div className="slider-button-next">
                                            <div className="avatar-title fs-18 rounded px-1">
                                                <i className="ri-arrow-right-s-line" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className="card profile-project-card shadow-none profile-project-success mb-0">
                                                <div className="card-body p-4">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1 text-muted overflow-hidden">
                                                            <h5 className="fs-15 text-truncate mb-1">
                                                                <a href="#" className="text-dark">ABC
                                                                    Project Customization</a>
                                                            </h5>
                                                            <p className="text-muted text-truncate mb-0">
                                                                Last Update : <span className="fw-semibold text-dark">4
                                                                    hr Ago</span></p>
                                                        </div>
                                                        <div className="flex-shrink-0 ms-2">
                                                            <div className="badge badge-soft-warning fs-11">
                                                                Inprogress</div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex mt-4">
                                                        <div className="flex-grow-1">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div>
                                                                    <h5 className="fs-13 text-muted mb-0">
                                                                        Members :</h5>
                                                                </div>
                                                                <div className="avatar-group">
                                                                    <div className="avatar-group-item">
                                                                        <div className="avatar-xs">
                                                                            <img src="/assets/images/users/avatar-4.jpg" className="rounded-circle img-fluid" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar-group-item">
                                                                        <div className="avatar-xs">
                                                                            <img src="/assets/images/users/avatar-5.jpg" className="rounded-circle img-fluid" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar-group-item">
                                                                        <div className="avatar-xs">
                                                                            <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                A
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar-group-item">
                                                                        <div className="avatar-xs">
                                                                            <img src="/assets/images/users/avatar-2.jpg" className="rounded-circle img-fluid" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* end card body */}
                                            </div>
                                            {/* end card */}
                                        </div>
                                        {/* end slide item */}
                                        <div className="swiper-slide">
                                            <div className="card profile-project-card shadow-none profile-project-danger mb-0">
                                                <div className="card-body p-4">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1 text-muted overflow-hidden">
                                                            <h5 className="fs-15 text-truncate mb-1">
                                                                <a href="#" className="text-dark">Client -
                                                                    John</a>
                                                            </h5>
                                                            <p className="text-muted text-truncate mb-0">
                                                                Last Update : <span className="fw-semibold text-dark">1
                                                                    hr Ago</span></p>
                                                        </div>
                                                        <div className="flex-shrink-0 ms-2">
                                                            <div className="badge badge-soft-success fs-11">
                                                                Completed</div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex mt-4">
                                                        <div className="flex-grow-1">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div>
                                                                    <h5 className="fs-13 text-muted mb-0">
                                                                        Members :</h5>
                                                                </div>
                                                                <div className="avatar-group">
                                                                    <div className="avatar-group-item">
                                                                        <div className="avatar-xs">
                                                                            <img src="/assets/images/users/avatar-2.jpg" className="rounded-circle img-fluid" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar-group-item">
                                                                        <div className="avatar-xs">
                                                                            <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                C
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>{/* end card body */}
                                            </div>{/* end card */}
                                        </div>{/* end slide item */}
                                        <div className="swiper-slide">
                                            <div className="card profile-project-card shadow-none profile-project-info mb-0">
                                                <div className="card-body p-4">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1 text-muted overflow-hidden">
                                                            <h5 className="fs-15 text-truncate mb-1">
                                                                <a href="#" className="text-dark">Brand logo
                                                                    Design</a>
                                                            </h5>
                                                            <p className="text-muted text-truncate mb-0">
                                                                Last Update : <span className="fw-semibold text-dark">2
                                                                    hr Ago</span></p>
                                                        </div>
                                                        <div className="flex-shrink-0 ms-2">
                                                            <div className="badge badge-soft-warning fs-11">
                                                                Inprogress</div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex mt-4">
                                                        <div className="flex-grow-1">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div>
                                                                    <h5 className="fs-13 text-muted mb-0">
                                                                        Members :</h5>
                                                                </div>
                                                                <div className="avatar-group">
                                                                    <div className="avatar-group-item">
                                                                        <div className="avatar-xs">
                                                                            <img src="/assets/images/users/avatar-5.jpg" className="rounded-circle img-fluid" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>{/* end card body */}
                                            </div>{/* end card */}
                                        </div>{/* end slide item */}
                                        <div className="swiper-slide">
                                            <div className="card profile-project-card shadow-none profile-project-danger mb-0">
                                                <div className="card-body p-4">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1 text-muted overflow-hidden">
                                                            <h5 className="fs-15 text-truncate mb-1">
                                                                <a href="#" className="text-dark">Project
                                                                    update</a>
                                                            </h5>
                                                            <p className="text-muted text-truncate mb-0">
                                                                Last Update : <span className="fw-semibold text-dark">4
                                                                    hr Ago</span></p>
                                                        </div>
                                                        <div className="flex-shrink-0 ms-2">
                                                            <div className="badge badge-soft-success fs-11">
                                                                Completed</div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex mt-4">
                                                        <div className="flex-grow-1">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div>
                                                                    <h5 className="fs-13 text-muted mb-0">
                                                                        Members :</h5>
                                                                </div>
                                                                <div className="avatar-group">
                                                                    <div className="avatar-group-item">
                                                                        <div className="avatar-xs">
                                                                            <img src="/assets/images/users/avatar-4.jpg" className="rounded-circle img-fluid" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar-group-item">
                                                                        <div className="avatar-xs">
                                                                            <img src="/assets/images/users/avatar-5.jpg" className="rounded-circle img-fluid" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* end card body */}
                                            </div>
                                            {/* end card */}
                                        </div>
                                        {/* end slide item */}
                                        <div className="swiper-slide">
                                            <div className="card profile-project-card shadow-none profile-project-warning mb-0">
                                                <div className="card-body p-4">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1 text-muted overflow-hidden">
                                                            <h5 className="fs-15 text-truncate mb-1">
                                                                <a href="#" className="text-dark">Chat
                                                                    App</a>
                                                            </h5>
                                                            <p className="text-muted text-truncate mb-0">
                                                                Last Update : <span className="fw-semibold text-dark">1
                                                                    hr Ago</span></p>
                                                        </div>
                                                        <div className="flex-shrink-0 ms-2">
                                                            <div className="badge badge-soft-warning fs-11">
                                                                Inprogress</div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex mt-4">
                                                        <div className="flex-grow-1">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div>
                                                                    <h5 className="fs-13 text-muted mb-0">
                                                                        Members :</h5>
                                                                </div>
                                                                <div className="avatar-group">
                                                                    <div className="avatar-group-item">
                                                                        <div className="avatar-xs">
                                                                            <img src="/assets/images/users/avatar-4.jpg" className="rounded-circle img-fluid" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar-group-item">
                                                                        <div className="avatar-xs">
                                                                            <img src="/assets/images/users/avatar-5.jpg" className="rounded-circle img-fluid" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar-group-item">
                                                                        <div className="avatar-xs">
                                                                            <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                A
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* end card body */}
                                            </div>
                                            {/* end card */}
                                        </div>
                                        {/* end slide item */}
                                    </div>
                                </div>
                            </div>
                            {/* end card body */}
                        </div>{/* end card */}
                    </div>
                    {/*end col*/}
                </div>
                {/*end row*/}
            </div>
    )
}
