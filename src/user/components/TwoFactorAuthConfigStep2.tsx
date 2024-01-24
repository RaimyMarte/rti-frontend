import { ErrorAlert, Loading } from "../../ui/components"
import { isMutationSuccessResponse } from "../../utils";
import { useState } from "react"
import { useTranslation } from "react-i18next";
import { useVerifyTFAKeyMutation } from "../../store/api";
import AuthCode from "react-auth-code-input";
import toast from "react-hot-toast";

interface TwoFactorAuthConfigStep2Props {
    closeButtonRef: React.RefObject<HTMLButtonElement>
    handleGoToFirstStep: () => void
    handleBackStep: () => void
}

export const TwoFactorAuthConfigStep2 = ({ closeButtonRef, handleGoToFirstStep, handleBackStep }: TwoFactorAuthConfigStep2Props) => {
    const { t } = useTranslation()

    const [verifyTFAKey, { isLoading: verifyTFAKeyLoading, }] = useVerifyTFAKeyMutation()

    const [error, setError] = useState('')
    const [token, setToken] = useState('');

    const handleOnChange = (res: string) => {
        setToken(res);
    };

    const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (token.length !== 6) {
            setError(t('YouNeedToEnter6DigitCode'))
        }
        else {
            try {
                const response = await verifyTFAKey(token);
                console.log(response)
                if (isMutationSuccessResponse(response)) {
                    const { data: respData } = response

                    if (!respData?.isSuccess) {
                        setError(respData?.message || "");
                        return;
                    }
                    toast.success(respData?.message)

                    setError('')
                    setToken('')
                    closeButtonRef.current?.click();
                }
            } catch (error) {
                setError(`An error occurred: ${error}`);
            }
        }

    };
    return (
        <form onSubmit={onFormSubmit}>
            <div className="modal-body">
                <div className="row g-2">
                    {verifyTFAKeyLoading ? <Loading /> : null}

                    <p>{t("Enter6Code")}</p>

                    <AuthCode
                        containerClassName="container"
                        inputClassName="otp-input"
                        onChange={handleOnChange}
                    />

                    <div className="mt-3">
                        <ErrorAlert error={error} />
                    </div>
                </div>
            </div>

            <div className="modal-footer">
                <div className="hstack gap-2 justify-content-end">
                    <button type="button" onClick={handleGoToFirstStep} className="btn btn-light" data-bs-dismiss="modal" ref={closeButtonRef}>{t("Close")}</button>
                    <button type="button" onClick={handleBackStep} className="btn btn-danger">{t("Back")}</button>

                    <button
                        type="submit"
                        className="btn btn-success"
                    >
                        {t("Verify")}
                    </button>
                </div>
            </div>
        </form>
    )
}
