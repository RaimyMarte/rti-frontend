import { ErrorAlert, Loading } from '../../../ui/components';
import { isMutationSuccessResponse } from '../../../helpers';
import { MaintenanceInterface } from '../../../interfaces';
import { CreateUserBody, useCreateUserMutation, useGetMaintenanceQuery } from '../../../store/api';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export const CreateUserModal = () => {
    const { data: usersRoles, isLoading: usersRolesLoading, } = useGetMaintenanceQuery('UserRole')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [createUser, { isLoading: createUserLoading, }] = useCreateUserMutation()
    const [error, setError] = useState('')

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const {
        handleSubmit,
        register,
        formState: { errors: formErrors },
        reset,
        watch,
    } = useForm<CreateUserBody>()

    const watchAutomaticPassword = watch('AutomaticPassword')

    const onFormSubmit = async (data: CreateUserBody) => {
        try {
            const response = await createUser(data);
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
            }
        } catch (error) {
            setError(`An error occurred: ${error}`);
        }
    }

    return (
        <div className="modal fade" id="createUserModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                {createUserLoading || usersRolesLoading ? <Loading /> : null}

                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create user</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <form onSubmit={handleSubmit(onFormSubmit)} className="tablelist-form">
                        <div className="modal-body">
                            <div className="row g-3">
                                <div className="col-lg-6">
                                    <label className="form-label">First Name <span className="text-danger">*</span></label>
                                    <input type="text" {...register("FirstName", { required: 'FirstName is required', })} className="form-control" placeholder="Enter first name" />
                                    {formErrors?.FirstName && <div className='text-danger invalid-input'>{formErrors?.FirstName.message}</div>}
                                </div>
                                <div className="col-lg-6">
                                    <label className="form-label">Last Name <span className="text-danger">*</span></label>
                                    <input type="text"  {...register("LastName", { required: 'LastName is required', })} className="form-control" placeholder="Enter last name" />
                                    {formErrors?.LastName && <div className='text-danger invalid-input'>{formErrors?.LastName.message}</div>}
                                </div>

                                <div className="col-lg-12">
                                    <label className="form-label">Email <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        {...register("Email",
                                            {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                                    message: 'Invalid email address',
                                                },
                                            })}
                                        className="form-control"
                                        placeholder="Enter email"
                                    />
                                    {formErrors?.Email && <div className='text-danger invalid-input'>{formErrors?.Email.message}</div>}
                                </div>

                                <div className="col-lg-6">
                                    <label className="form-label">Role <span className="text-danger">*</span></label>
                                    <select className="form-control"  {...register("UserRoleId", { required: 'User role is required', })} data-choices data-choices-search-false>
                                        <option value="">Select a role</option>
                                        {
                                            usersRoles?.data.map((role: MaintenanceInterface) => {
                                                const { Name, Id } = role

                                                return (
                                                    <option key={Id} value={Id}>{Name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    {formErrors?.UserRoleId && <div className='text-danger invalid-input'>{formErrors?.UserRoleId.message}</div>}
                                </div>

                                <div className="col-lg-6">
                                    <label className="form-label">Phone</label>
                                    <input type="text"  {...register("Phone")} className="form-control" placeholder="Enter phone number" />
                                    {formErrors?.Phone && <div className='text-danger invalid-input'>{formErrors?.Phone.message}</div>}
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" role="switch" defaultChecked={true} {...register("Authorized")} />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Authorized
                                        </label>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" defaultChecked={true} {...register("AutomaticPassword")} />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Automatic Password
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {
                                !watchAutomaticPassword
                                    ? <div className="row g-3 mt-2">
                                        <div className="col-lg-6">
                                            <label className="form-label" htmlFor="password-input">Password <span className="text-danger">*</span></label>
                                            <div className="position-relative auth-pass-inputgroup">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className="form-control pe-5 password-input"
                                                    placeholder="Enter password"
                                                    {...register("Password", {
                                                        required: 'Password is required',
                                                        minLength: {
                                                            value: 8,
                                                            message: 'Password must be at least 8 characters',
                                                        },
                                                        pattern: {
                                                            value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                                                            message: 'The password must have at least one uppercase letter, one lowercase letter, and one number.',
                                                        },
                                                    })}
                                                    aria-describedby="passwordInput"
                                                />
                                                <button
                                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                                    type="button"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                >
                                                    <i className="ri-eye-fill align-middle" />
                                                </button>
                                            </div>
                                            {formErrors?.Password && <div className='text-danger invalid-input'>{formErrors?.Password.message}</div>}
                                        </div>

                                        <div className="col-lg-6">
                                            <label className="form-label" htmlFor="password-input">Confirm password <span className="text-danger">*</span></label>
                                            <div className="position-relative auth-pass-inputgroup">
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    className="form-control pe-5 password-input"
                                                    placeholder="Enter password"
                                                    {...register("ConfirmPassword", {
                                                        required: 'Password is required',
                                                        minLength: {
                                                            value: 8,
                                                            message: 'Password must be at least 8 characters',
                                                        },
                                                        pattern: {
                                                            value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                                                            message: 'The password must have at least one uppercase letter, one lowercase letter, and one number.',
                                                        },
                                                    })}
                                                    aria-describedby="passwordInput"
                                                />
                                                <button
                                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                >
                                                    <i className="ri-eye-fill align-middle" />
                                                </button>
                                            </div>
                                            {formErrors?.ConfirmPassword && <div className='text-danger invalid-input'>{formErrors?.ConfirmPassword.message}</div>}
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" id="formCheck6" {...register("ChangePwdNextLogin")} />
                                                <label className="form-check-label" htmlFor="formCheck6">
                                                    Change Password Next Login
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    : null
                            }

                            <div className="mt-3">
                                <ErrorAlert error={error} />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <div className="hstack gap-2 justify-content-end">
                                <button type="button" className="btn btn-light" data-bs-dismiss="modal" ref={closeButtonRef}>Close</button>
                                <button type="submit" className="btn btn-success" id="add-btn">Create user</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}