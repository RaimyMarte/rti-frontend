import { ErrorAlert } from "../../../../ui/components";
import { SelectComponent, TextInputComponent } from "../../../../ui/components/form";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next"

export const CreatePaymentsModal = () => {
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
        <div className="modal fade" id="createPaymentsModalgrid" tabIndex={-1} aria-labelledby="createPaymentsModalgridLabel" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createPaymentsModalgridLabel">{t("Payments")}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(onFormSubmit)} className="tablelist-form">
                            <div className="row g-3">

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
                                        name="PaymentSourceId"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("PaymentSource")}
                                        options={<option>{t("PaymentSource")}</option>}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <SelectComponent
                                        name="CategoryId"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("Category")}
                                        options={<option>{t("Category")}</option>}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <SelectComponent
                                        name="MethodId"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("Method")}
                                        options={<option>{t("Method")}</option>}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextInputComponent
                                        name="PaymentDate"
                                        register={register}
                                        formErrors={formErrors}
                                        type="date"
                                        label={t("PaymentDate")}
                                        placeholder={`${t('Enter')} ${t("PaymentDate")}`}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextInputComponent
                                        name="Amount"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("Amount")}
                                        placeholder={`${t('Enter')} ${t("Amount")}`}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextInputComponent
                                        name="TransactionCode"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("TransactionCode")}
                                        placeholder={`${t('Enter')} ${t("TransactionCode")}`}
                                    />
                                </div>

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
                                    <TextInputComponent
                                        name="PostingDate"
                                        register={register}
                                        formErrors={formErrors}
                                        type="date"
                                        label={t("PostingDate")}
                                        placeholder={`${t('Enter')} ${t("PostingDate")}`}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <SelectComponent
                                        name="CollectorId"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("Collector")}
                                        options={<option>{t("Collector")}</option>}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <SelectComponent
                                        name="ExcelContractId"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("ExcelContract")}
                                        options={<option>{t("ExcelContract")}</option>}
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