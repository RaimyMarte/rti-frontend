import { ErrorAlert } from "../../../../ui/components";
import { SelectComponent, TextInputComponent } from "../../../../ui/components/form";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next"

export const CreateFollowUpModal = () => {
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
        <div className="modal fade" id="createFollowUpModal" tabIndex={-1} aria-labelledby="createFollowUpModalLabel" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createFollowUpModalLabel">{t("FollowUp")}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(onFormSubmit)} className="tablelist-form">
                            <div className="row g-3">

                                <div className="col-md-6">
                                    <SelectComponent
                                        name="FollowUpId"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("FollowUp")}
                                        options={<option>{t("FollowUp")}</option>}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <SelectComponent
                                        name="DescriptionId"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("Description")}
                                        options={<option>{t("Description")}</option>}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <SelectComponent
                                        name="InterfaceCommentId"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("InterfaceComment")}
                                        options={<option>{t("InterfaceComment")}</option>}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextInputComponent
                                        name="Notes"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("Notes")}
                                        placeholder={`${t('Enter')} ${t("Notes")}`}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextInputComponent
                                        name="RevisedNotesToFacility"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("RevisedNotesToFacility")}
                                        placeholder={`${t('Enter')} ${t("RevisedNotesToFacility")}`}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextInputComponent
                                        name="NextFollowUp"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("NextFollowUp")}
                                        placeholder={`${t('Enter')} ${t("NextFollowUp")}`}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextInputComponent
                                        name="CreatedOn"
                                        register={register}
                                        formErrors={formErrors}
                                        type="date"
                                        label={t("CreatedOn")}
                                        placeholder={`${t('Enter')} ${t("CreatedOn")}`}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <SelectComponent
                                        name="StatusId"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("Status")}
                                        options={<option>{t("Status")}</option>}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <SelectComponent
                                        name="ReasonId"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("Reason")}
                                        options={<option>{t("Reason")}</option>}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextInputComponent
                                        name="Description"
                                        register={register}
                                        formErrors={formErrors}
                                        label={t("Description")}
                                        placeholder={`${t('Enter')} ${t("Description")}`}
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