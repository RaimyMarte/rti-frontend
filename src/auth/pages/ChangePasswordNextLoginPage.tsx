import { ChangePasswordPageLayout } from "../layout"
import { isMutationSuccessResponse } from "../../utils"
import { ChangePasswordNextLoginBody, useChangePasswordNextLoginMutation } from "../../store/api"
import { useForm } from "react-hook-form"
import { useState } from "react"
import toast from 'react-hot-toast';


export const ChangePasswordNextLoginPage = () => {
    const [changePasswordNextLogin, { isLoading: changePasswordNextLoginLoading }] = useChangePasswordNextLoginMutation()

    const [error, setError] = useState('')

    const {
        handleSubmit,
        register,
        formState: { errors: formErrors },
        reset,
    } = useForm<ChangePasswordNextLoginBody>()


    const onFormSubmit = async ({ Password, ConfirmPassword }: ChangePasswordNextLoginBody) => {
        try {
            const response = await changePasswordNextLogin({
                Password,
                ConfirmPassword,
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
            }
        } catch (error) {
            setError(`An error occurred: ${error}`);
        }
    };

    return (
        <ChangePasswordPageLayout
            error={error}
            onSubmit={handleSubmit(onFormSubmit)}
            formErrors={formErrors}
            loading={changePasswordNextLoginLoading}
            register={register}
        />
    )
}