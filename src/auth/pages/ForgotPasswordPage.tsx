import { ApiMutationResponse, ApiResponseInterface } from "../../interfaces"
import { AuthLayout } from "../layout/AuthLayout"
import { Link, useNavigate } from "react-router-dom"
import { Loading } from "../../ui/components"
import { useForm } from "react-hook-form"
import { RequestResetPasswordBody, useGetIPQuery, useRequestResetPasswordMutation } from "../../store/api"
import { useState } from "react"
import toast from 'react-hot-toast';

const isSuccessResponse = (response: ApiMutationResponse): response is { data: ApiResponseInterface } => {
  return (response as { data: ApiResponseInterface }).data !== undefined;
}

export const ForgotPasswordPage = () => {
  const navigate = useNavigate()

  const { data: dataIpApi, isLoading: dataIpApiLoading } = useGetIPQuery()
  const [requestResetPassword, { isLoading: requestResetPasswordLoading }] = useRequestResetPasswordMutation()

  const [error, setError] = useState('')

  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    reset,
  } = useForm<RequestResetPasswordBody>()


  const onFormSubmit = async ({ UserNameOrEmail, }: RequestResetPasswordBody) => {
    try {
      const response = await requestResetPassword({
        UserNameOrEmail: UserNameOrEmail.toLowerCase().trim(),
        IpAddress: dataIpApi?.ip_address,
      });

      if (isSuccessResponse(response)) {
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
    <AuthLayout>
      <div className="col-lg-6">
        {requestResetPasswordLoading || dataIpApiLoading ? (<Loading />) : null}
        <div className="p-lg-5 p-4">
          <h5 className="text-primary">Forgot Password?</h5>
          <p className="text-muted">Reset password</p>
          <div className="mt-2 text-center">
            {/* <lord-icon src="https://cdn.lordicon.com/rhvddzym.json" trigger="loop" colors="primary:#0ab39c" className="avatar-xl">
      </lord-icon> */}
          </div>
          <div className="alert alert-borderless alert-warning text-center mb-2 mx-2" role="alert">
            Enter your email and instructions will be sent to you!
          </div>
          <div className="p-2">
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <div className="mb-4">
                <label htmlFor="UserNameOrEmail" className="form-label">Username or Email <span className="text-danger">*</span></label>
                <input type="text" className="form-control" {...register("UserNameOrEmail", { required: 'Username or Email is required', })} placeholder="Enter username or email" />
                {formErrors?.UserNameOrEmail && <div className='text-danger invalid-input'>{formErrors?.UserNameOrEmail.message}</div>}
              </div>

              <div className="text-center mt-4">
                {
                  error
                    ? <div className="alert alert-danger alert-solid" role="alert" >
                      <strong>Something went wrong!</strong> - {error}
                    </div>
                    : null
                }

                <button className="btn btn-success w-100" type="submit">Recover Password</button>
              </div>
            </form>{/* end form */}
          </div>
          <div className="mt-5 text-center">
            <p className="mb-0">Wait, I remember my password... <Link to="/auth/login" className="fw-semibold text-primary text-decoration-underline"> Click here </Link> </p>
          </div>
        </div>
      </div>


    </AuthLayout>
  )
}