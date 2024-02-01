import { ApplicationBody, useGetCitiesQuery, useGetCountriesQuery, useGetNationalitiesQuery, useGetSelectedMaintenancesQuery, useGetStatesQuery } from "../../store/api";
import { CheckboxComponent, SelectComponent, TextAreaInputComponent, TextInputComponent } from "../../ui/components/form";
import { delay, isMutationSuccessResponse } from "../../utils";
import { GeoInterface, MaintenanceInterface } from "../../interfaces";
import { Loading } from "../../ui/components";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

interface ApplicationNewFormProps {
    createApplication: any
    way: 'local' | 'internet';
}


const selectedMaintenances: string[] = [
    'AcademyProgram',
    'AttendingAnySchools',
    'HowDidYouHearAboutUs',
    'PreferredLanguage',
    'PreviousEducation',
];

const applicationsPublicUrl: string = `${import.meta.env.VITE_API_PUBLIC_URL}/applications`

export const ApplicationNewForm = ({ createApplication, way }: ApplicationNewFormProps) => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const { data: maintenancesData, isLoading: maintenancesDataLoading } = useGetSelectedMaintenancesQuery({ selectedMaintenances, Lang: '' })

    const {
        handleSubmit,
        register,
        formState: { errors: formErrors },
        reset,
        control,
    } = useForm<ApplicationBody>();

    const { data: countries, isLoading: countriesLoading, } = useGetCountriesQuery()
    const { data: nationalities, isLoading: nationalityLoading, } = useGetNationalitiesQuery()

    const AttendingAnySchools = useWatch({ control, name: 'AttendingAnySchools' })
    const HowDidYouHearAboutUsId = useWatch({ control, name: 'HowDidYouHearAboutUsId' })
    const AttendingAnySchoolsId = useWatch({ control, name: 'AttendingAnySchoolsId' })
    const CountryId = useWatch({ control, name: "CountryId" }) || ''
    const StateId = useWatch({ control, name: "StateId" }) || ''

    const { data: states, isLoading: statesLoading, } = useGetStatesQuery(CountryId)
    const { data: cities, isLoading: citiesLoading, } = useGetCitiesQuery({ countryId: CountryId, stateId: StateId })

    const isDataLoading = maintenancesDataLoading || countriesLoading || nationalityLoading

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

                if (way === 'local') {
                    navigate('/application/list');
                } else {
                    const pdfUrl = respData?.data?.PDF;
                    if (pdfUrl) {
                        await delay(1500);
                        window.open(`${applicationsPublicUrl}/${pdfUrl}`, '_blank');
                    } else {
                        toast.error("PDF not available for this application");
                    }
                }
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
                    <div className="col-lg-12">
                        <div className="row">
                            {statesLoading || citiesLoading && <Loading />}
                            <h4 className=" mb-3">{t('01 - New Application')}</h4>
                            {
                                way === 'local'
                                && <>
                                    <div className="col-lg-4">
                                        <div className="mb-3">
                                            <TextInputComponent
                                                name="ApplicationDate"
                                                register={register}
                                                formErrors={formErrors}
                                                label={t('Application Date')}
                                                placeholder={`${t('Enter')} ${t('Application Date')}`}
                                                type='date'
                                                rules={{
                                                    required: `'${t('Application Date')} ${t('is required')}'`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-8"></div>
                                </>
                            }

                            <div className="col-lg-4">
                                <div className="mb-3">
                                    <TextInputComponent
                                        name="FirstName"
                                        register={register}
                                        formErrors={formErrors}
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
                                    <TextInputComponent
                                        name="MiddleName"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t('Middle Name')}
                                        placeholder={`${t('Enter')} ${t('Middle Name')}`}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="mb-3">
                                    <TextInputComponent
                                        name="LastName"
                                        register={register}
                                        formErrors={formErrors}
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
                                    <TextInputComponent
                                        name="NickName"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t('Nick Name')}
                                        placeholder={`${t('Enter')} ${t('Nick Name')}`}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="mb-3">
                                    <SelectComponent
                                        name="NationalityId"
                                        register={register}
                                        formErrors={formErrors}
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

                            <div className="col-lg-4">
                                <div className="mb-3">
                                    <SelectComponent
                                        name="Gender"
                                        register={register}
                                        formErrors={formErrors}
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

                            <div className="col-lg-4">
                                <div className="mb-3">
                                    <TextInputComponent
                                        name="PhoneNumber"
                                        register={register}
                                        formErrors={formErrors}
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
                                    <TextInputComponent
                                        name="AddressLine1"
                                        register={register}
                                        formErrors={formErrors}
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
                                    <SelectComponent
                                        name="CountryId"
                                        register={register}
                                        formErrors={formErrors}
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
                                    <SelectComponent
                                        name="StateId"
                                        register={register}
                                        formErrors={formErrors}
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
                                    <TextInputComponent
                                        name="AddressLine2"
                                        register={register}
                                        formErrors={formErrors}
                                        label="Apt - Number"
                                        placeholder={`${t('Enter')} ${t('Apt - Number')}`}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="mb-3">
                                    <SelectComponent
                                        name="CityId"
                                        register={register}
                                        formErrors={formErrors}
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
                                    <TextInputComponent
                                        name="PostalCode"
                                        register={register}
                                        formErrors={formErrors}
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
                                <SelectComponent
                                    name="PreferredLanguageId"
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
                            <>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <SelectComponent
                                            name="AttendingAnySchoolsId"
                                            register={register}
                                            formErrors={formErrors}
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
                            </>
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


                        <h4 className="mb-3 mt-3">{t('03- Which Program are you interested in?')}</h4>
                        <div className="col-lg-12 border mb-3">
                            <div className="row mt-3">
                                {
                                    maintenancesData?.data?.AcademyProgram.map((maintenance: MaintenanceInterface) => {
                                        const { SelectTitle, Id } = maintenance

                                        return (
                                            <div key={Id} className="col-lg-6">
                                                <div className="mb-3 form-check">
                                                    <CheckboxComponent
                                                        register={register}
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
                                                    <CheckboxComponent
                                                        register={register}
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
                                <button type="submit" className="btn btn-primary">{t('Create')}</button>
                                <button type="button" className="btn btn-soft-success">{t('Cancel')}</button>
                            </div>
                        </div>
                    </div>


                </div>
            </form>
    )
}