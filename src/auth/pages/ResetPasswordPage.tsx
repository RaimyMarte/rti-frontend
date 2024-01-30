import { useLocation, useNavigate } from "react-router-dom"
import { ChangePasswordPageLayout } from "../layout"
import { isMutationSuccessResponse } from "../../utils"
import { useConfirmResetPasswordMutation, useGetIPQuery } from "../../store/api"
import { useForm } from "react-hook-form"
import { useState } from "react"
import toast from 'react-hot-toast';

interface FormInputs {
  Password: string
  ConfirmPassword: string
}

export const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const currentUrl = `https://portal.rtiny.org/${location.pathname}${location.search}`;

  const { data: dataIpApi, isLoading: dataIpApiLoading } = useGetIPQuery()
  const [confirmResetPassword, { isLoading: confirmResetPasswordLoading }] = useConfirmResetPasswordMutation()

  const [error, setError] = useState('')

  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    reset,
  } = useForm<FormInputs>()


  const onFormSubmit = async ({ Password, ConfirmPassword }: FormInputs) => {
    try {
      const response = await confirmResetPassword({
        Password,
        ConfirmPassword,
        UrlValidation: currentUrl,
        IpAddress: dataIpApi?.ip_address,
      });

      if (isMutationSuccessResponse(response)) {
        const { data: respData } = response

        if (!respData?.isSuccess) {
          setError(respData?.message || "");
          return;
        }

        toast.success(respData?.message)

        reset();
        setError('')
        navigate('/auth/login')
      }
    } catch (error) {
      setError(`An error occurred: ${error}`);
    }
  };

  return (
    <ChangePasswordPageLayout
      error={error}
      formErrors={formErrors}
      onSubmit={handleSubmit(onFormSubmit)}
      loading={dataIpApiLoading || confirmResetPasswordLoading}
      register={register}
    />
  )
}