import { ApplicationBody, useUpdateApplicationMutation, useGetSelectedMaintenancesQuery, useGetCountriesQuery, useGetStatesQuery, useGetCitiesQuery, useGetNationalitiesQuery } from "../../store/api";
import { ApplicationInterface, GeoInterface, MaintenanceInterface } from "../../interfaces";
import { ControllerCheckbox, ControllerTextInput, ControllerSelect, ControllerTextAreaInput, } from "../../ui/components/form";
import { isMutationSuccessResponse } from "../../utils";
import { Loading } from "../../ui/components";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";


const selectedMaintenances: string[] = [
    'AcademyProgram',
    'ApplicationStatus',
    'HowDidYouHearAboutUs',
    'PreferredLanguage',
    'PreviousEducation',
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
        Gender: applicationData?.Gender,
        EmailAddress: applicationData?.EmailAddress,
        PhoneNumber: applicationData?.PhoneNumber,
        AddressLine1: applicationData?.AddressLine1,
        AddressLine2: applicationData?.AddressLine2,
        PostalCode: applicationData?.PostalCode,
        DateOfBirth: applicationData?.DateOfBirth,
        ApplicationDate: applicationData?.ApplicationDate,
        NationalityId: applicationData?.NationalityId,
        CountryId: applicationData?.CountryId,
        StateId: applicationData?.StateId,
        CityId: applicationData?.CityId,
        PreferredLanguageId: applicationData?.PreferredLanguageId,
        AttendingAnySchools: applicationData?.AttendingAnySchools,
        AttendingAnySchoolsExplain: applicationData?.AttendingAnySchoolsExplain,
        StatusId: applicationData?.StatusId,
        AttendingAnySchoolsId: applicationData?.AttendingAnySchoolsId,
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
        // setValue
    } = useForm<ApplicationBody>({ defaultValues });

    const { data: countries, isLoading: countriesLoading, } = useGetCountriesQuery()
    const { data: nationalities, isLoading: nationalityLoading, } = useGetNationalitiesQuery()

    const AttendingAnySchools = useWatch({ control, name: 'AttendingAnySchools' })
    const HowDidYouHearAboutUsId = useWatch({ control, name: 'HowDidYouHearAboutUsId' })
    const AttendingAnySchoolsId = useWatch({ control, name: 'AttendingAnySchoolsId' })
    const CountryId = useWatch({ control, name: "CountryId" }) || ''
    const StateId = useWatch({ control, name: "StateId" }) || ''

    const { data: states, isLoading: statesLoading, } = useGetStatesQuery(CountryId)
    const { data: cities, isLoading: citiesLoading, } = useGetCitiesQuery({ countryId: CountryId, stateId: StateId })

    useEffect(() => {
        const defaultPreviousEducation: { [key: string]: boolean } = {};

        if (!maintenancesDataLoading && maintenancesData?.data) {
            maintenancesData?.data?.PreviousEducation?.forEach(({ Id }: { Id: number }) => {
                defaultPreviousEducation[Id] = applicationData?.ApplicationPreviousEducation?.some(({ PreviousEducationId }) => Id === PreviousEducationId);
            });


            // const previousEducationFields = maintenancesData?.data?.PreviousEducation?.map(({ Id }: { Id: string }) => `PreviousEducation-${Id}`);

            // // Populate defaultPreviousEducation with default values
            // previousEducationFields?.forEach(field => {
            //     defaultPreviousEducation[field] = false;
            // });
            // console.log(previousEducationFields)
            // applicationData?.ApplicationPreviousEducation?.forEach(({ Id }) => {
            //     const key = `PreviousEducation-${Id}`;
            //     if (key in defaultPreviousEducation) {
            //         defaultPreviousEducation[key] = true;
            //         // setValue(defaultPreviousEducation[key],fale)
            //     }
            // });
        }
    }, [maintenancesDataLoading, maintenancesData])

    const isDataLoading = maintenancesDataLoading || countriesLoading || nationalityLoading

    const onFormSubmit = async (data: ApplicationBody) => {

        try {
            const response = await updateApplication({ body: data, id: applicationData?.Id });
            if (isMutationSuccessResponse(response)) {

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
                    <div className="col-lg-12">
                        <div className="row">
                            {statesLoading || citiesLoading && <Loading />}
                            {updateApplicationLoading && <Loading />}
                            <h4 className=" mb-3">{t('01 - New Application')}</h4>

                            <div className="col-lg-4">
                                <div className="mb-3">
                                    <ControllerTextInput
                                        name="ApplicationDate"
                                        control={control}
                                        label={t('Application Date')}
                                        placeholder={`${t('Enter')} ${t('Application Date')}`}
                                        type='date'
                                        rules={{
                                            required: `'${t('Application Date')} ${t('is required')}'`,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="mb-3">
                                    <ControllerSelect
                                        name="StatusId"
                                        control={control}
                                        label={t('ApplicationStatus')}
                                        options={
                                            maintenancesData?.data?.ApplicationStatus.map((maintenance: MaintenanceInterface) => {
                                                const { SelectTitle, Id } = maintenance

                                                return (
                                                    <option key={Id} value={Id}>{SelectTitle}</option>
                                                )
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="mb-3">
                                    <ControllerTextInput
                                        name="FirstName"
                                        control={control}
                                        label={t('FirstName')}
                                        placeholder={`${t('Enter')} ${t('FirstName')}`}
                                        rules={{
                                            required: `'${t('FirstName')} ${t('is required')}'`,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="mb-3">
                                    <ControllerTextInput
                                        name="MiddleName"
                                        control={control}
                                        label={t('Middle Name')}
                                        placeholder={`${t('Enter')} ${t('Middle Name')}`}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="mb-3">
                                    <ControllerTextInput
                                        name="LastName"
                                        control={control}
                                        label={t('LastName')}
                                        placeholder={`${t('Enter')} ${t('LastName')}`}
                                        rules={{
                                            required: `'${t('LastName')} ${t('is required')}'`,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="mb-3">
                                    <ControllerTextInput
                                        name="NickName"
                                        control={control}
                                        label={t('Nick Name')}
                                        placeholder={`${t('Enter')} ${t('Nick Name')}`}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="mb-3">
                                    <ControllerSelect
                                        name="NationalityId"
                                        control={control}
                                        label={t('Nationality')}
                                        options={
                                            nationalities?.data.map((nationality: GeoInterface) => {
                                                const { Nationality, Id } = nationality

                                                return (
                                                    <option key={Id} value={Id}>{Nationality}</option>
                                                )
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4">
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

                            <div className="col-lg-4">
                                <div className="mb-3">
                                    <ControllerSelect
                                        name="Gender"
                                        control={control}
                                        label={t('Gender')}
                                        options={
                                            <>
                                                <option value='M'>{t('Male')} </option>
                                                <option value='F'>{t('Female')} </option>
                                                <option value='U'>{t('Unknow')} </option>
                                            </>
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4">
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

                            <div className="col-lg-4">
                                <div className="mb-3">
                                    <ControllerTextInput
                                        name="PhoneNumber"
                                        control={control}
                                        label={t('Phone Number')}
                                        placeholder={`${t('Enter')} ${t('Phone Number')}`}
                                        rules={{
                                            required: `'${t('Phone')} ${t('is required')}'`,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <ControllerTextInput
                                        name="AddressLine1"
                                        control={control}
                                        label={t('Address')}
                                        placeholder={`${t('Enter')} ${t('Address')}`}
                                        rules={{
                                            required: `'${t('Address')} ${t('is required')}'`,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-3">
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

                            <div className="col-lg-3">
                                <div className="mb-3">
                                    <ControllerSelect
                                        name="StateId"
                                        control={control}
                                        label={t('State')}
                                        disabled={!CountryId}
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
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <ControllerTextInput
                                        name="AddressLine2"
                                        control={control}
                                        label="Apt - Number"
                                        placeholder={`${t('Enter')} ${t('Apt - Number')}`}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="mb-3">
                                    <ControllerSelect
                                        name="CityId"
                                        control={control}
                                        disabled={!StateId && !CountryId}
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
                            </div>

                            <div className="col-lg-3">
                                <div className="mb-3">
                                    <ControllerTextInput
                                        name="PostalCode"
                                        control={control}
                                        label={t('Postal Code')}
                                        placeholder={`${t('Enter')} ${t('Postal Code')}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <h4 className="mb-3 mt-3">{t('02 - Extra Information')}</h4>
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
                            <>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <ControllerSelect
                                            name="AttendingAnySchoolsId"
                                            control={control}
                                            label={t('Attending Any Schools')}
                                            options={
                                                maintenancesData?.data?.AttendingAnySchools.map((maintenance: MaintenanceInterface) => {
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
                                    AttendingAnySchoolsId === "5" &&
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
                            </>
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


                        <h4 className="mb-3 mt-3">{t('03- Which Program are you interested in?')}</h4>
                        <div className="col-lg-12 border mb-3">
                            <div className="row mt-3">
                                {
                                    maintenancesData?.data?.AcademyProgram.map((maintenance: MaintenanceInterface) => {
                                        const { SelectTitle, Id } = maintenance

                                        return (
                                            <div key={Id} className="col-lg-6">
                                                <div className="mb-3 form-check">
                                                    <ControllerCheckbox
                                                        control={control}
                                                        name={`AcademyProgram-${Id}`}
                                                        label={SelectTitle || ''}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="row">
                                <h4 className="mb-3 mt-3">{t('04 - Previous Education')}</h4>
                                {
                                    maintenancesData?.data?.PreviousEducation.map((maintenance: MaintenanceInterface) => {
                                        const { SelectTitle, Id } = maintenance

                                        return (
                                            <div key={Id} className="col-lg-6">
                                                <div className="mb-3 form-check">
                                                    <ControllerCheckbox
                                                        control={control}
                                                        name={`PreviousEducation-${Id}`}
                                                        label={SelectTitle || ''}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {/*end row*/}
                        </div>

                        <div className="col-lg-12">
                            <div className="hstack gap-2 justify-content-end mt-auto">
                                <button type="submit" className="btn btn-primary">{t('Update')}</button>
                                <button type="button" className="btn btn-soft-success">{t('Cancel')}</button>
                            </div>
                        </div>
                    </div>


                </div>
            </form>
    )
}