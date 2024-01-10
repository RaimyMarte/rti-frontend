import { CreateAccountBody, useCreateAccountMutation, useGetCitiesQuery, useGetCountriesQuery, useGetMaintenanceQuery, useGetStatesQuery } from '../../store/api';
import { ErrorAlert, Loading } from '../../ui/components';
import { isMutationSuccessResponse } from '../../helpers';
import { MaintenanceInterface } from '../../interfaces';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface CountryInterface {
    Name: string
    Id: number
}

export const CreateAccountModal = () => {
    const navigate = useNavigate()
    const { data: accountTypes, isLoading: accountTypesLoading, } = useGetMaintenanceQuery('AccountType')
    const { data: countries, isLoading: countriesLoading, } = useGetCountriesQuery()

    const [createAccount, { isLoading: createAccountLoading, }] = useCreateAccountMutation()
    const [error, setError] = useState('')

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors: formErrors },
        watch,
    } = useForm<CreateAccountBody>()

    const watchCountryId = watch('CountryId')
    const watchTypeId = watch('TypeId')
    const watchStateId = watch('StateId')

    const { data: states, isLoading: statesLoading, } = useGetStatesQuery(watchCountryId)
    const { data: cities, isLoading: citiesLoading, } = useGetCitiesQuery({ countryId: watchCountryId, stateId: watchStateId })

    const onFormSubmit = async (data: CreateAccountBody) => {
        try {
            if (data.DOB === '') delete data.DOB;

            const response = await createAccount(data);
            if (isMutationSuccessResponse(response)) {
                const { data: respData } = response

                if (!respData?.isSuccess) {
                    setError(respData?.message || "");
                    return;
                }

                toast.success(respData?.message)

                reset();
                setError('')
                closeButtonRef.current?.click();
                navigate(`/accounts/details/${respData?.data?.Id}`)
            }
        } catch (error) {
            setError(`An error occurred: ${error}`);
        }
    }

    return (
        <div className="modal fade" id="createAccountModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">

                {accountTypesLoading || createAccountLoading || countriesLoading || statesLoading || citiesLoading ? <Loading /> : null}

                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create account</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <form onSubmit={handleSubmit(onFormSubmit)} className="tablelist-form">
                        <div className="modal-body">
                            <div className="row g-3">
                                <div className="col-lg-12">
                                    <div className="text-center">
                                        <div className="position-relative d-inline-block">
                                            <div className="avatar-lg p-1">
                                                <div className="avatar-title bg-light rounded-circle">
                                                    <img
                                                        src={
                                                            watchTypeId === "1"
                                                                ? "/assets/images/facility.png"
                                                                : watchTypeId === "2"
                                                                    ? "/assets/images/physician.png"
                                                                    : "/assets/images/users/user-dummy-img.jpg"
                                                        }
                                                        id="customer-img"
                                                        className="avatar-md rounded-circle object-cover"
                                                        alt='avatar'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div>
                                        <label className="form-label">Account Type <span className="text-danger">*</span></label>
                                        <select className="form-control"  {...register("TypeId", { required: 'Account type is required', })} data-choices data-choices-search-false>
                                            <option value="">Select an account type</option>
                                            {
                                                accountTypes?.data.map((type: MaintenanceInterface) => {
                                                    const { Name, Id } = type

                                                    return (
                                                        <option key={Id} value={Id}>{Name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        {formErrors?.TypeId && <div className='text-danger invalid-input'>{formErrors?.TypeId.message}</div>}
                                    </div>
                                </div>
                                {
                                    watchTypeId === "1"
                                        ? <>
                                            <div className="col-lg-6">
                                                <div>
                                                    <label className="form-label">Name <span className="text-danger">*</span></label>
                                                    <input type="text"   {...register("Name", { required: 'Name is required', })} className="form-control" placeholder="Enter name" />
                                                    {formErrors?.Name && <div className='text-danger invalid-input'>{formErrors?.Name.message}</div>}
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div>
                                                    <label className="form-label">Phone</label>
                                                    <input type="text"  {...register("Phone")} className="form-control" placeholder="Enter phone" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div>
                                                    <label className="form-label">Address</label>
                                                    <input type="text"  {...register("AddressLine1")} className="form-control" placeholder="Enter address" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div>
                                                    <input type="text"  {...register("AddressLine2")} className="form-control" placeholder="Enter address" />
                                                </div>
                                            </div>
                                        </>

                                        : watchTypeId === "2"
                                            ? <>
                                                <div className="col-lg-6">
                                                    <div >
                                                        <label className="form-label">First Name <span className="text-danger">*</span></label>
                                                        <input type="text" {...register("FirstName", { required: 'FirstName is required', })} className="form-control" placeholder="Enter first name" />
                                                        {formErrors?.FirstName && <div className='text-danger invalid-input'>{formErrors?.FirstName.message}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Last Name <span className="text-danger">*</span></label>
                                                        <input type="text"  {...register("LastName", { required: 'LastName is required', })} className="form-control" placeholder="Enter last name" />
                                                        {formErrors?.LastName && <div className='text-danger invalid-input'>{formErrors?.LastName.message}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Date of Birth</label>
                                                        <input type="date" className="form-control" {...register("DOB")} placeholder="Enter date of birth" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Social Security Number</label>
                                                        <input
                                                            type="text"
                                                            {...register("SSN", {
                                                                minLength: {
                                                                    value: 9,
                                                                    message: 'SSN must be 9 characters',
                                                                },
                                                                maxLength: {
                                                                    value: 9,
                                                                    message: 'SSN must be 9 characters',
                                                                },
                                                            })}
                                                            className="form-control"
                                                            placeholder="Ex. 000-11-1234"
                                                        />
                                                        {formErrors?.SSN && <div className='text-danger invalid-input'>{formErrors?.SSN.message}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div>
                                                        <label className="form-label">Address</label>
                                                        <input type="text"  {...register("AddressLine1")} className="form-control" placeholder="Enter address" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div>
                                                        <input type="text"  {...register("AddressLine2")} className="form-control" placeholder="Enter address" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div>
                                                        <label className="form-label">Country</label>
                                                        <select className="form-control" {...register("CountryId")} data-choices data-choices-search-false>
                                                            <option value="">Select a country</option>
                                                            {
                                                                countries?.data.map((country: CountryInterface) => {
                                                                    const { Name, Id } = country

                                                                    return (
                                                                        <option key={Id} value={Id}>{Name}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                {
                                                    watchCountryId
                                                        ? <div className="col-lg-6">
                                                            <div>
                                                                <label className="form-label">State</label>
                                                                <select className="form-control" {...register("StateId")} data-choices data-choices-search-false>
                                                                    <option value="">Select a state</option>
                                                                    {
                                                                        states?.data.map((state: CountryInterface) => {
                                                                            const { Name, Id } = state

                                                                            return (
                                                                                <option key={Id} value={Id}>{Name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                        : null

                                                }
                                                {
                                                    watchCountryId && watchStateId
                                                        ? <div className="col-lg-6">
                                                            <div>
                                                                <label className="form-label">City</label>
                                                                <select className="form-control" {...register("CityId")} data-choices data-choices-search-false>
                                                                    <option value="">Select a city</option>
                                                                    {
                                                                        cities?.data.map((city: CountryInterface) => {
                                                                            const { Name, Id } = city

                                                                            return (
                                                                                <option key={Id} value={Id}>{Name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                        : null
                                                }
                                            </>

                                            : null
                                }


                            </div>

                            <ErrorAlert error={error} />
                        </div>
                        <div className="modal-footer">
                            <div className="hstack gap-2 justify-content-end">
                                <button type="button" className="btn btn-light" data-bs-dismiss="modal" ref={closeButtonRef}>Close</button>
                                <button type="submit" className="btn btn-success" id="add-btn">Add Account</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
