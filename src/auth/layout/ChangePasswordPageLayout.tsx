import { AuthLayout } from './AuthLayout'
import { ErrorAlert, Loading } from '../../ui/components'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { PasswordInput } from '../../ui/components/form'

interface FormInputs {
    Password: string
    ConfirmPassword: string
}
interface ChangePasswordPageLayoutInterface {
    loading: boolean,
    onSubmit: any
    error: string,
    formErrors: FieldErrors<FormInputs>,
    register: UseFormRegister<FormInputs>
}

export const ChangePasswordPageLayout = ({ formErrors, loading, onSubmit, error, register }: ChangePasswordPageLayoutInterface) => {

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
                                <PasswordInput
                                    name="Password"
                                    label="Password"
                                    register={register}
                                    formErrors={formErrors}
                                    activeAllRules
                                />
                            </div>

                            <div className="mb-3">
                                <PasswordInput
                                    name="ConfirmPassword"
                                    label="Confirm Password"
                                    register={register}
                                    formErrors={formErrors}
                                    activeAllRules
                                />
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
