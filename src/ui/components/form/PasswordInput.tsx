import { useState } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface PasswordInputProps {
    name: string;
    label: string;
    register: UseFormRegister<any>
    formErrors: FieldErrors
    activeAllRules?: boolean
    placeholder?: string
}

export const PasswordInput = ({ register, activeAllRules = false, formErrors, label, name, placeholder = "Enter password" }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <>
            <label className="form-label" htmlFor="password-input">{label} <span className="text-danger">*</span></label>
            <div className="position-relative auth-pass-inputgroup">
                <input
                    type={showPassword ? "text" : "password"}
                    className="form-control pe-5 password-input"
                    placeholder={placeholder}
                    {...register(name, {
                        required: `${label} is required`,
                        ...(activeAllRules && {
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters',
                            },
                            pattern: {
                                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                                message: 'The password must have at least one uppercase letter, one lowercase letter, and one number.',
                            },
                        }),
                    })}
                />

                <button
                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    <i className="ri-eye-fill align-middle" />
                </button>
            </div>

            {formErrors[name] && <div className='text-danger invalid-input'>{formErrors[name]?.message?.toString()}</div>}
        </>
    )
}
