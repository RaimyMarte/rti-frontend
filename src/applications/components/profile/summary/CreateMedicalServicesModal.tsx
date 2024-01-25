import { ErrorAlert } from "../../../../ui/components";
import { SelectComponent, TextInputComponent } from "../../../../ui/components/form";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next"

export const CreateMedicalServicesModal = () => {
    const { t } = useTranslation()

    const [error, setError] = useState('')
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const {
        handleSubmit,
        register,
        formState: { errors: formErrors },
        // reset,
    } = useForm<any>()

    const onFormSubmit = async (data: any) => {
        console.log({ data, error })

        setError('')
    }

    return (
        <div className="modal fade" id="createMedicalServicesModal" tabIndex={-1} aria-labelledby="createMedicalServicesModalLabel" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createMedicalServicesModalLabel">{t("MedicalService")}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(onFormSubmit)} className="tablelist-form">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <TextInputComponent
                                        name="CPTCode"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("CPTCode")}
                                        placeholder={`${t('Enter')} ${t("CPTCode")}`}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <SelectComponent
                                        name="MedicalServiceId"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("MedicalService")}
                                        options={<option>{t("MedicalService")}</option>}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <SelectComponent
                                        name="LocationId"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("Location")}
                                        options={<option>{t("Location")}</option>}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <SelectComponent
                                        name="ImplantTypeId"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("ImplantType")}
                                        options={<option>{t("ImplantType")}</option>}
                                    />
                                </div>


                                <div className="col-md-6">
                                    <TextInputComponent
                                        name="ChargeAmount"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("ChargeAmount")}
                                        placeholder={`${t('Enter')} ${t("ChargeAmount")}`}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextInputComponent
                                        name="DaysUnits"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("DaysUnits")}
                                        placeholder={`${t('Enter')} ${t("DaysUnits")}`}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextInputComponent
                                        name="Percentage"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("Percentage")}
                                        placeholder={`${t('Enter')} ${t("Percentage")}`}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextInputComponent
                                        name="ReimbursementNumber"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("ReimbursementNumber")}
                                        placeholder={`${t('Enter')} ${t("ReimbursementNumber")}`}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextInputComponent
                                        name="ServiceCharge"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("ServiceCharge")}
                                        placeholder={`${t('Enter')} ${t("ServiceCharge")}`}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextInputComponent
                                        name="ClaimNumber"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("ClaimNumber")}
                                        placeholder={`${t('Enter')} ${t("ClaimNumber")}`}
                                    />
                                </div>

                                <div className="mt-3">
                                    <ErrorAlert error={error} />
                                </div>

                                <div className="col-lg-12">
                                    <div className="hstack gap-2 justify-content-end">
                                        <button type="button" className="btn btn-light" ref={closeButtonRef} data-bs-dismiss="modal">{t("Close")}</button>
                                        <button type="submit" className="btn btn-primary">{t("Create")}</button>
                                    </div>
                                </div>{/*end col*/}
                            </div>{/*end row*/}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
