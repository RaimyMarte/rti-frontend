import { useTranslation } from "react-i18next"
import { useGenerateTFAKeyQuery } from "../../store/api"
import { Loading } from "../../ui/components"
import { useState } from "react"

interface TwoFactorAuthConfigStep1Props {
    closeButtonRef: React.RefObject<HTMLButtonElement>
    handleNextStep: () => void
}

export const TwoFactorAuthConfigStep1 = ({ closeButtonRef, handleNextStep }: TwoFactorAuthConfigStep1Props) => {
    const { t } = useTranslation()
    const { data: tfaKey, isLoading: tfaKeyLoading } = useGenerateTFAKeyQuery()

    const [showKey, setshowKey] = useState(false)

    const toggleShowKey = () => setshowKey(prev => !prev)

    return (
        <>
            <div className="modal-body">
                <div className="row g-2">
                    {tfaKeyLoading ? <Loading /> : null}

                    {
                        showKey
                            ? <>
                                <div className="col-lg-12">
                                    <ol>
                                        <li>{t("InTheAuthApp")}</li>
                                        <li>
                                            {t("EnterEmailConfigKey")}
                                            <br />
                                            <strong>{tfaKey?.data?.key}</strong>
                                        </li>
                                        <li>{t("TapAdd")}</li>
                                    </ol>
                                </div>

                                <div className="col-lg-12 text-center">
                                    <button type="button" onClick={toggleShowKey} className="btn btn-link waves-effect">{t("ScanQRCode")}</button>
                                </div>
                            </>
                            : <>
                                <div className="col-lg-12">
                                    <ul>
                                        <li>
                                            {t("InYourAuthenticatorApp")} <strong>+</strong>
                                        </li>
                                        <li>{t("Choose")} <strong>{t("scanQRCode")}</strong></li>
                                    </ul>
                                </div>

                                <div className="col-lg-12 text-center">
                                    <img src={tfaKey?.data?.qrCode} className="img-fluid" alt="qrCode" />
                                </div>

                                <div className="col-lg-12 text-center">
                                    <button type="button" onClick={toggleShowKey} className="btn btn-link waves-effect">{t("CantScanQRCode")}</button>
                                </div>
                            </>
                    }
                </div>
            </div>

            <div className="modal-footer">
                <div className="hstack gap-2 justify-content-end">
                    <button type="button" className="btn btn-light" data-bs-dismiss="modal" ref={closeButtonRef}>{t("Close")}</button>

                    <button
                        type="button"
                        onClick={handleNextStep}
                        className="btn btn-success"
                    >
                        {t("Next")}
                    </button>
                </div>
            </div>
        </>
    )
}
