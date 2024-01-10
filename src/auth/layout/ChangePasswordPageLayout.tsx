import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { ErrorAlert, Loading } from '../../ui/components'
import { AuthLayout } from './AuthLayout'
import { useState } from 'react'

interface FormInputs {
    Password: string
    ConfirmPassword: string
}
interface ChangePasswordPageLayoutInterface {
    loading: boolean,
    onSubmit: any
    error: string,
    formErrors:FieldErrors<FormInputs>,
    register: UseFormRegister<FormInputs>
}

export const ChangePasswordPageLayout = ({ formErrors,loading, onSubmit, error, register }: ChangePasswordPageLayoutInterface) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <AuthLayout>
            <div className="col-lg-6">
                {loading ? (<Loading />) : null}
                <div className="p-lg-5 p-4">
                    <h5 className="text-primary">Create new password</h5>
                    <p className="text-muted">Your new password must be different from previous used password.</p>
                    <div className="p-2">
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
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

                            <div className="mb-3">
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

                            <div className="mt-4">
                                <ErrorAlert error={error} />
                                <button className="btn btn-success w-100" type="submit">Reset Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}
