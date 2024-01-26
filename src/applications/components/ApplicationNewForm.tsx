import { ApplicationBody, useCreateApplicationMutation, useGetSelectedMaintenancesQuery } from "../../store/api";
import { CheckboxComponent, SelectComponent, TextAreaInputComponent, TextInputComponent } from "../../ui/components/form";
import { isMutationSuccessResponse } from "../../utils";
import { Loading } from "../../ui/components";
import { MaintenanceInterface } from "../../interfaces";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";


const selectedMaintenances: string[] = [
    'ApplicationStatus',
    'HowDidYouHearAboutUs',
    'PreferredLanguage',
];

export const ApplicationNewForm = () => {
    const { t } = useTranslation()

    const { data: maintenancesData, isLoading: maintenancesDataLoading } = useGetSelectedMaintenancesQuery({ selectedMaintenances, Lang: '' })
    const [createApplication, { isLoading: createApplicationLoading }] = useCreateApplicationMutation()

    const {
        handleSubmit,
        register,
        formState: { errors: formErrors },
        reset,
        control,
    } = useForm<ApplicationBody>();

    const AttendingAnySchools = useWatch({ control, name: 'AttendingAnySchools' })
    const HowDidYouHearAboutUsId = useWatch({ control, name: 'HowDidYouHearAboutUsId' })

    const isDataLoading = maintenancesDataLoading

    const onFormSubmit = async (data: ApplicationBody) => {

        try {
            const response = await createApplication({ ...data });
            if (isMutationSuccessResponse(response)) {
                const { data: respData } = response

                if (!respData?.isSuccess) {
                    toast.error(respData?.message || "");
                    return;
                }

                toast.success(respData?.message)
                reset()
            }
        } catch (error) {
            toast.error(`An error occurred: ${error}`);
        }
    }

    return (
        isDataLoading
            ? <Loading />
            :
            <form onSubmit={handleSubmit(onFormSubmit)} className="tablelist-form">
                <div className="row">
                    {createApplicationLoading ? <Loading /> : null}
                    <div className="col-lg-6">
                        <h5 className="card-title mb-3">{t('Information')}</h5>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <TextInputComponent
                                        name="FirstName"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t('FirstName')}
                                        placeholder={`${t('Enter')} ${t('FirstName')}`}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <TextInputComponent
                                        name="MiddleName"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t('Middle Name')}
                                        placeholder={`${t('Enter')} ${t('Middle Name')}`}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <TextInputComponent
                                        name="LastName"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t('LastName')}
                                        placeholder={`${t('Enter')} ${t('LastName')}`}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <TextInputComponent
                                        name="NickName"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t('Nick Name')}
                                        placeholder={`${t('Enter')} ${t('Nick Name')}`}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <TextInputComponent
                                        name="EmailAddress"
                                        register={register}
                                        formErrors={formErrors}
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
                                    <TextInputComponent
                                        name="PhoneNumber"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t('Phone Number')}
                                        placeholder={`${t('Enter')} ${t('Phone Number')}`}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="mb-3">
                                    <TextInputComponent
                                        name="AddressLine1"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t('Address')}
                                        placeholder={`${t('Enter')} ${t('Address')}`}
                                    />
                                    <TextInputComponent
                                        name="AddressLine2"
                                        register={register}
                                        formErrors={formErrors}
                                        placeholder={`${t('Enter')} ${t('Address')}`}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <TextInputComponent
                                        name="PostalCode"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t('Postal Code')}
                                        placeholder={`${t('Enter')} ${t('Postal Code')}`}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <TextInputComponent
                                        name="DateOfBirth"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t('DateofBirth')}
                                        placeholder={`${t('Enter')} ${t('DateofBirth')}`}
                                        type='date'
                                    />
                                </div>
                            </div>

                            <h5 className="card-title mb-3 mt-3">{t('Application Information')}</h5>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <TextInputComponent
                                        name="ApplicationDate"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t('Application Date')}
                                        placeholder={`${t('Enter')} ${t('Application Date')}`}
                                        type='date'
                                    />
                                </div>
                            </div>

                            {/* <div className="col-lg-12">
                                <div className="mb-3 form-check">
                                    <CheckboxComponent
                                        register={register}
                                        name="OrientationTalk"
                                        label={t('Orientation Talk')}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <TextInputComponent
                                        name="OrientationTalkDate"
                                        register={register}
                                        formErrors={formErrors}
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
                                    <SelectComponent
                                        name="PreferredLanguage"
                                        register={register}
                                        formErrors={formErrors}
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
                                    <CheckboxComponent
                                        register={register}
                                        name="AttendingAnySchools"
                                        label={t('Attending Any Schools')}
                                    />
                                </div>
                            </div>

                            {
                                AttendingAnySchools &&
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <TextAreaInputComponent
                                            name="AttendingAnySchoolsExplain"
                                            register={register}
                                            formErrors={formErrors}
                                            label={t('Attending Any Schools Explain')}
                                            placeholder={`${t('Enter')} ${t('Attending Any Schools Explain')}`}
                                        />
                                    </div>
                                </div>
                            }

                            <div className="col-lg-6">
                                <div className="mb-3 form-check">
                                    <CheckboxComponent
                                        register={register}
                                        name="USAVeteran"
                                        label={t('USA Veteran')}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3 form-check">
                                    <CheckboxComponent
                                        register={register}
                                        name="NYCHAResident"
                                        label={t('NYCHA Resident')}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="mb-3">
                                    <SelectComponent
                                        name="HowDidYouHearAboutUsId"
                                        register={register}
                                        formErrors={formErrors}
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
                                        <TextAreaInputComponent
                                            name="HearABoutUsOther"
                                            register={register}
                                            formErrors={formErrors}
                                            label={t('Hear ABout Us Other')}
                                            placeholder={`${t('Enter')} ${t('Hear ABout Us Other')}`}
                                        />
                                    </div>
                                </div>
                            }





                            <div className="col-lg-12">
                                <div className="mb-3">
                                    <TextAreaInputComponent
                                        name="AdditionalComments"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t('Additional Comments')}
                                        placeholder={`${t('Enter')} ${t('Additional Comments')}`}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="hstack gap-2 justify-content-end">
                                    <button type="submit" className="btn btn-primary">{t('Create')}</button>
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