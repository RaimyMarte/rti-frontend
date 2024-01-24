import { CheckboxComponent, SelectComponent, TextInputComponent } from "../../../../ui/components/form";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next"
import toast from "react-hot-toast";

export const AccountProfileAuditTab = () => {
  const { t } = useTranslation()

  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    // reset,
  } = useForm<any>()

  const onFormSubmit = async (data: any) => {
    console.log({ data, })

    toast.success('submit')
  }

  return (
    <div className="tab-pane fade" id="audit" role="tabpanel">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-6">
              <h5 className="card-title mb-3">{t("DenialInformation")}</h5>
              <form onSubmit={handleSubmit(onFormSubmit)} className="tablelist-form">
                <div className="row">

                  {/*end col*/}
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <SelectComponent
                        name="DenialTypeId"
                        register={register}
                        formErrors={formErrors}
                        label={t("DenialType")}
                        options={<option>{t("DenialType")}</option>}
                      />
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <SelectComponent
                        name="DenialSub-TypeId"
                        register={register}
                        formErrors={formErrors}
                        label={t("DenialSub-Type")}
                        options={<option>{t("DenialSub-Type")}</option>}
                      />
                    </div>
                  </div>

                  {/*end col*/}
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <SelectComponent
                        name="ErrorCodeId"
                        register={register}
                        formErrors={formErrors}
                        label={t("ErrorCode")}
                        options={<option>{t("ErrorCode")}</option>}
                      />
                    </div>
                  </div>
                  {/*end col*/}

                  <div className="col-lg-12">
                    <div className="form-check mb-3">
                      <CheckboxComponent
                        register={register}
                        name="Bypass"
                        label={t("BypassAccountWhenPrintingBatchLetters")}
                      />
                    </div>
                  </div>
                  {/*end col*/}

                  <div className="col-lg-12 mt-3">
                    <div className="mb-3">
                      <TextInputComponent
                        name="PatientResponsabilityAmount"
                        register={register}
                        formErrors={formErrors}
                        label={t("PatientResponsabilityAmount")}
                        placeholder={`${t('Enter')} ${t("PatientResponsabilityAmount")}`}
                      />
                    </div>
                  </div>
                  {/*end col*/}


                  <div className="col-lg-12">
                    <div className="hstack gap-2 justify-content-end">
                      <button type="submit" className="btn btn-primary">{t("Update")}</button>
                      <button type="button" className="btn btn-soft-success">{t("Cancel")}</button>
                    </div>
                  </div>
                  {/*end col*/}
                </div>
                {/*end row*/}
              </form>
            </div>

          </div>
          {/*end row*/}
        </div>
        {/*end card-body*/}
      </div>
      {/*end card*/}
    </div>
  )
}
