
import { AuthLayout } from "../layout"
import { ErrorAlert, Loading } from "../../ui/components";
import { isMutationSuccessResponse } from "../../utils";
import { useAuthStore } from "../../hooks";
import { useGetIPQuery, useValidateTFAMutation } from "../../store/api";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AuthCode from "react-auth-code-input";
import toast from "react-hot-toast";


export const TwoFactorAuthPage = () => {
    const { t } = useTranslation()
    const { data: dataIpApi, isLoading: dataIpApiLoading } = useGetIPQuery()

    const [validateTFA, { isLoading: validateTFALoading, }] = useValidateTFAMutation()
    const { tfaState, handleLoginState, handleLogoutState } = useAuthStore()

    const [error, setError] = useState('')
    const [token, setToken] = useState('');

    const handleOnChange = (res: string) => {
        setToken(res);
    };

    const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (token.length !== 6) {
            setError(t('YouNeedToEnter6DigitCode'))
        } else {
            try {
                const response = await validateTFA({
                    token,
                    userId: tfaState?.userId,
                    IpAddress: dataIpApi?.ip_address,
                });

                if (isMutationSuccessResponse(response)) {
                    const { data: respData } = response

                    if (!respData?.isSuccess) {
                        setError(respData?.message || "");
                    } else {
                        handleLoginState(respData?.data?.user);
                        toast.success(respData?.message)

                        setError('')
                        setToken('')
                    }
                }
            } catch (error) {
                setError(`An error occurred: ${error}`);
            }
        }
    };

    return (
        <AuthLayout>
            {validateTFALoading || dataIpApiLoading ? (<Loading />) : null}
            <div className="col-lg-6">
                <div className="p-lg-5 p-4">
                    <div className="mb-4">
                        <div className="avatar-lg mx-auto">
                            <div className="avatar-title bg-light text-primary display-5 rounded-circle">
                                <i className="ri-mail-line" />
                            </div>
                        </div>
                    </div>
                    <div className="text-muted text-center mx-lg-3">
                        <h4 >Verify Your Email</h4>
                        <p>Please enter the 4 digit code sent to <span className="fw-semibold">example@abc.com</span></p>
                    </div>
                    <div className="mt-4 text-center">
                        <form onSubmit={onFormSubmit}>
                            <AuthCode
                                containerClassName="container"
                                inputClassName="otp-input"
                                onChange={handleOnChange}
                            />

                            <div className="row mt-3 g-1">
                                <div className="col-12">
                                    <ErrorAlert error={error} />
                                </div>

                                
                                <div className="col-12 col-sm-6">
                                    <button type="submit" className="btn btn-success w-100">Confirm</button>
                                </div>

                                <div className="col-12 col-sm-6">
                                    <button type="button" onClick={handleLogoutState} className="btn btn-danger w-100">Cancel</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}
