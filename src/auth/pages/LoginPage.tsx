import { AuthLayout } from "../layout/AuthLayout"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { Link } from "react-router-dom"
import { ErrorAlert, Loading } from "../../ui/components"
import { SerializedError } from "@reduxjs/toolkit"
import { useAuthStore } from "../../hooks"
import { useForm, } from "react-hook-form"
import { LoginBody, useGetIPQuery, useLoginMutation, } from "../../store/api"
import { UserApiResponseInterface } from "../../interfaces"
import { useState } from "react"
import toast from 'react-hot-toast';


type ApiResponse = {
    data: UserApiResponseInterface;
} | {
    error: FetchBaseQueryError | SerializedError;
}

const isSuccessResponse = (response: ApiResponse): response is { data: UserApiResponseInterface } => {
    return (response as { data: UserApiResponseInterface }).data !== undefined;
}

export const LoginPage = () => {
    const { data: dataIpApi, isLoading: dataIpApiLoading } = useGetIPQuery()

    const [login, { isLoading: loginLoading, }] = useLoginMutation()
    const { handleLoginState, handleLogoutState, } = useAuthStore()

    const [showPassword, setShowPassword] = useState(false)

    const [error, setError] = useState('')

    const {
        handleSubmit,
        register,
        formState: { errors: formErrors },
        reset,
    } = useForm<LoginBody>()


    const onFormSubmit = async ({ UserNameOrEmail, Password }: LoginBody) => {
        try {
            const response = await login({
                UserNameOrEmail: UserNameOrEmail.toLowerCase().trim(),
                Password,
                IpAddress: dataIpApi?.ip_address,
            });

            if (isSuccessResponse(response)) {
                const { data: respData } = response

                if (!respData?.isSuccess) {
                    setError(respData?.message || "");
                    handleLogoutState();
                    return;
                }

                handleLoginState(respData?.data?.user);
                toast.success(respData?.message)

                reset();
                setError('')
            }
        } catch (error) {
            setError(`An error occurred: ${error}`);
        }
    };


    return (
        <AuthLayout>
            <div className="col-lg-6">
                {loginLoading || dataIpApiLoading ? (<Loading />) : null}
                <div className="p-lg-5 p-4">
                    <div>
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p className="text-muted">Sign in to continue to Renaissance Technical Institute.</p>
                    </div>
                    <div className="mt-4">
                        <form onSubmit={handleSubmit(onFormSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="UserNameOrEmail" className="form-label">Username or Email <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" {...register("UserNameOrEmail", { required: 'Username or Email is required', })} placeholder="Enter username or email" />
                                {formErrors?.UserNameOrEmail && <div className='text-danger invalid-input'>{formErrors?.UserNameOrEmail.message}</div>}
                            </div>
                            <div className="mb-3">
                                <div className="float-end">
                                    <Link to="/auth/recover_password" className="text-muted">Forgot password?</Link>
                                </div>
                                <label className="form-label" htmlFor="password-input">Password <span className="text-danger">*</span></label>
                                <div className="position-relative auth-pass-inputgroup mb-3">
                                    <input type={showPassword ? "text" : "password"} className="form-control pe-5 password-input" placeholder="Enter password" {...register("Password", { required: 'Password is required', })} />
                                    <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" onClick={() => setShowPassword((prev) => !prev)}><i className="ri-eye-fill align-middle" /></button>
                                    {formErrors?.Password && <div className='text-danger invalid-input'>{formErrors?.Password.message}</div>}
                                </div>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="auth-remember-check" />
                                <label className="form-check-label" htmlFor="auth-remember-check">Remember me</label>
                            </div>

                            <div className="mt-4">
                                <ErrorAlert error={error} />

                                <button className="btn btn-success w-100" type="submit">Sign In</button>
                            </div>

                            {/* <div className="mt-4 text-center">

                                <div className="signin-other-title">
                                    <h5 className="fs-13 mb-4 title">Sign In with</h5>
                                </div>
                                <div className="d-flex gap-1 justify-content-center">
                                    <button type="button" className="btn btn-primary btn-icon waves-effect waves-light"><i className="ri-facebook-fill fs-16" /></button>
                                    <button type="button" className="btn btn-danger btn-icon waves-effect waves-light"><i className="ri-google-fill fs-16" /></button>
                                    <button type="button" className="btn btn-dark btn-icon waves-effect waves-light"><i className="ri-github-fill fs-16" /></button>
                                    <button type="button" className="btn btn-info btn-icon waves-effect waves-light"><i className="ri-twitter-fill fs-16" /></button>
                                </div>
                            </div> */}
                        </form>
                    </div>

                    {/* <div className="mt-5 text-center">
                        <p className="mb-0">Don't have an account ? <a href="auth-signup-cover.html" className="fw-semibold text-primary text-decoration-underline"> Signup</a> </p>
                    </div> */}
                </div>
            </div>
        </AuthLayout>
    )
}
