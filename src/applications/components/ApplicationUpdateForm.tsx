import { ApplicationBody, useUpdateApplicationMutation, useGetSelectedMaintenancesQuery } from "../../store/api";
import { ControllerCheckbox, ControllerTextInput, ControllerSelect, ControllerTextAreaInput, } from "../../ui/components/form";
import { isMutationSuccessResponse } from "../../utils";
import { Loading } from "../../ui/components";
import { ApplicationInterface, MaintenanceInterface } from "../../interfaces";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useEffect } from "react";


const selectedMaintenances: string[] = [
    'ApplicationStatus',
    'HowDidYouHearAboutUs',
    'PreferredLanguage',
];

interface ApplicationUpdateFormProps {
    applicationData: ApplicationInterface
}

export const ApplicationUpdateForm = ({ applicationData }: ApplicationUpdateFormProps) => {
    const { t } = useTranslation()

    const { data: maintenancesData, isLoading: maintenancesDataLoading } = useGetSelectedMaintenancesQuery({ selectedMaintenances, Lang: '' })
    const [updateApplication, { isLoading: updateApplicationLoading }] = useUpdateApplicationMutation()


    const defaultValues: ApplicationBody = {
        FirstName: applicationData?.FirstName,
        MiddleName: applicationData?.MiddleName,
        LastName: applicationData?.LastName,
        NickName: applicationData?.NickName,
        EmailAddress: applicationData?.EmailAddress,
        PhoneNumber: applicationData?.PhoneNumber,
        AddressLine1: applicationData?.AddressLine1,
        AddressLine2: applicationData?.AddressLine2,
        PostalCode: applicationData?.PostalCode,
        DateOfBirth: applicationData?.DateOfBirth,
        ApplicationDate: applicationData?.ApplicationDate,
        PreferredLanguageId: applicationData?.PreferredLanguageId,
        AttendingAnySchools: applicationData?.AttendingAnySchools,
        AttendingAnySchoolsExplain: applicationData?.AttendingAnySchoolsExplain,
        USAVeteran: applicationData?.USAVeteran,
        NYCHAResident: applicationData?.NYCHAResident,
        HowDidYouHearAboutUsId: applicationData?.HowDidYouHearAboutUsId,
        HearABoutUsOther: applicationData?.HearABoutUsOther,
        AdditionalComments: applicationData?.AdditionalComments,
    }

    const {
        handleSubmit,
        control,
        reset,
    } = useForm<ApplicationBody>({ defaultValues });

    const AttendingAnySchools = useWatch({ control, name: 'AttendingAnySchools' })
    const HowDidYouHearAboutUsId = useWatch({ control, name: 'HowDidYouHearAboutUsId' })

    const isDataLoading = maintenancesDataLoading

    const onFormSubmit = async (data: ApplicationBody) => {

        try {
            const response = await updateApplication({ body: data, id: applicationData?.Id });
            if (isMutationSuccessResponse(response)) {
                console.log(response)
                const { data: respData } = response

                if (!respData?.isSuccess) {
                    toast.error(respData?.message || "");
                    return;
                }

                toast.success(respData?.message)
            }
        } catch (error) {
            toast.error(`An error occurred: ${error}`);
        }
    }

    useEffect(() => {
        reset(defaultValues)
    }, [applicationData])


    return (
        isDataLoading
            ? <Loading />
            :
            <form onSubmit={handleSubmit(onFormSubmit)} className="tablelist-form">
                <div className="row">
                    {updateApplicationLoading ? <Loading /> : null}
                    <div className="col-lg-6">
                        <h5 className="card-title mb-3">{t('Information')}</h5>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <ControllerTextInput
                                        name="FirstName"
                                        control={control}
                                        label={t('FirstName')}
                                        placeholder={`${t('Enter')} ${t('FirstName')}`}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <ControllerTextInput
                                        name="MiddleName"
                                        control={control}
                                        label={t('Middle Name')}
                                        placeholder={`${t('Enter')} ${t('Middle Name')}`}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <ControllerTextInput
                                        name="LastName"
                                        control={control}
                                        label={t('LastName')}
                                        placeholder={`${t('Enter')} ${t('LastName')}`}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <ControllerTextInput
                                        name="NickName"
                                        control={control}
                                        label={t('Nick Name')}
                                        placeholder={`${t('Enter')} ${t('Nick Name')}`}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <ControllerTextInput
                                        name="EmailAddress"
                                        control={control}
                                        label={t('Email Address')}
                                        rules={{
                                            // required: 'Email is required',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                                message: t('Invalid email address'),
                                            },
                                        }}
                                        placeholder={`${t('Enter')} ${t('Email Address')}`}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <ControllerTextInput
                                        name="PhoneNumber"
                                        control={control}
                                        label={t('Phone Number')}
                                        placeholder={`${t('Enter')} ${t('Phone Number')}`}
                                    />
                                </div>
                            </div>

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

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <ControllerTextInput
                                        name="PostalCode"
                                        control={control}
                                        label={t('Postal Code')}
                                        placeholder={`${t('Enter')} ${t('Postal Code')}`}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <ControllerTextInput
                                        name="DateOfBirth"
                                        control={control}
                                        label={t('DateofBirth')}
                                        placeholder={`${t('Enter')} ${t('DateofBirth')}`}
                                        type='date'
                                    />
                                </div>
                            </div>

                            <h5 className="card-title mb-3 mt-3">{t('Application Information')}</h5>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <ControllerTextInput
                                        name="ApplicationDate"
                                        control={control}
                                        label={t('Application Date')}
                                        placeholder={`${t('Enter')} ${t('Application Date')}`}
                                        type='date'
                                    />
                                </div>
                            </div>

                            {/* <div className="col-lg-12">
                                <div className="mb-3 form-check">
                                    <ControllerCheckbox
                                       control={control}
                                        name="OrientationTalk"
                                        label={t('Orientation Talk')}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <ControllerTextInput
                                        name="OrientationTalkDate"
                                       control={control}
                                                                            label={t('Orientation Talk Date')}
                                        placeholder={`${t('Enter')} ${t('Orientation Talk Date')}`}
                                        type='date'
                                    />
                                </div>
                            </div> */}

                            {/*end col*/}
                        </div>
                        {/*end row*/}
                    </div>

                    <div className="col-lg-6">
                        <h5 className="card-title mb-3">{t('Extra Information')}</h5>

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="mb-3">
                                    <ControllerSelect
                                        name="PreferredLanguageId"
                                        control={control}
                                        label={t('PreferredLanguage')}
                                        options={
                                            maintenancesData?.data?.PreferredLanguage.map((maintenance: MaintenanceInterface) => {
                                                const { SelectTitle, Id } = maintenance

                                                return (
                                                    <option key={Id} value={Id}>{SelectTitle}</option>
                                                )
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="mb-3 form-check">
                                    <ControllerCheckbox
                                        control={control}
                                        name="AttendingAnySchools"
                                        label={t('Attending Any Schools')}
                                    />
                                </div>
                            </div>

                            {
                                AttendingAnySchools &&
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <ControllerTextAreaInput
                                            name="AttendingAnySchoolsExplain"
                                            control={control}
                                            label={t('Attending Any Schools Explain')}
                                            placeholder={`${t('Enter')} ${t('Attending Any Schools Explain')}`}
                                        />
                                    </div>
                                </div>
                            }

                            <div className="col-lg-6">
                                <div className="mb-3 form-check">
                                    <ControllerCheckbox
                                        control={control}
                                        name="USAVeteran"
                                        label={t('USA Veteran')}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3 form-check">
                                    <ControllerCheckbox
                                        control={control}
                                        name="NYCHAResident"
                                        label={t('NYCHA Resident')}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="mb-3">
                                    <ControllerSelect
                                        name="HowDidYouHearAboutUsId"
                                        control={control}
                                        label={t('HowDidYouHearAboutUs')}
                                        options={
                                            maintenancesData?.data?.HowDidYouHearAboutUs.map((maintenance: MaintenanceInterface) => {
                                                const { SelectTitle, Id } = maintenance

                                                return (
                                                    <option key={Id} value={Id}>{SelectTitle}</option>
                                                )
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            {
                                HowDidYouHearAboutUsId === '3' &&
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <ControllerTextAreaInput
                                            name="HearABoutUsOther"
                                            control={control}
                                            label={t('Hear ABout Us Other')}
                                            placeholder={`${t('Enter')} ${t('Hear ABout Us Other')}`}
                                        />
                                    </div>
                                </div>
                            }





                            <div className="col-lg-12">
                                <div className="mb-3">
                                    <ControllerTextAreaInput
                                        name="AdditionalComments"
                                        control={control}
                                        label={t('Additional Comments')}
                                        placeholder={`${t('Enter')} ${t('Additional Comments')}`}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="hstack gap-2 justify-content-end">
                                    <button type="submit" className="btn btn-primary">{t('Update')}</button>
                                    <button type="button" className="btn btn-soft-success">{t('Cancel')}</button>
                                </div>
                            </div>
                        </div>
                        {/*end row*/}
                    </div>
                </div>
            </form>
    )
}