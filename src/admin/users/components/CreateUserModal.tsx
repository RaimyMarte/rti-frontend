import { CheckboxComponent, PasswordInput, SelectComponent, TextInputComponent } from '../../../ui/components/form';
import { CreateUserBody, useCreateUserMutation, useGetMaintenanceQuery } from '../../../store/api';
import { ErrorAlert, Loading } from '../../../ui/components';
import { isMutationSuccessResponse } from '../../../utils';
import { MaintenanceInterface } from '../../../interfaces';
import { useForm, useWatch } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export const CreateUserModal = () => {
    const { data: usersRoles, isLoading: usersRolesLoading, } = useGetMaintenanceQuery('UserRole')

    const [createUser, { isLoading: createUserLoading, }] = useCreateUserMutation()
    const [error, setError] = useState('')

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const {
        handleSubmit,
        register,
        formState: { errors: formErrors },
        reset,
        setValue,
        control,
    } = useForm<CreateUserBody>()

    const watchAutomaticPassword = useWatch({ control, name: "AutomaticPassword" })

    useEffect(() => {
        setValue('AutomaticPassword', true)
    }, [])


    const onFormSubmit = async (data: CreateUserBody) => {
        try {
            const response = await createUser(data);
            if (isMutationSuccessResponse(response)) {
                const { data: respData } = response

                if (!respData?.isSuccess) {
                    setError(respData?.message || "");
                    return;
                }

                toast.success(respData?.message)

                reset();
                setError('')
                closeButtonRef.current?.click();
            }
        } catch (error) {
            setError(`An error occurred: ${error}`);
        }
    }

    return (
        <div className="modal fade" id="createUserModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                {createUserLoading || usersRolesLoading ? <Loading /> : null}

                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create user</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <form onSubmit={handleSubmit(onFormSubmit)} className="tablelist-form">
                        <div className="modal-body">
                            <div className="row g-3">
                                <div className="col-lg-6">
                                    <TextInputComponent
                                        name="FirstName"
                                        register={register}
                                        formErrors={formErrors}
                                        label="First Name"
                                        rules={{
                                            required: 'First name is required',
                                        }}
                                        placeholder="Enter first name"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <TextInputComponent
                                        name="LastName"
                                        register={register}
                                        formErrors={formErrors}
                                        label="Last Name"
                                        rules={{
                                            required: 'Last name is required',
                                        }}
                                        placeholder="Enter last name"
                                    />
                                </div>

                                <div className="col-lg-12">
                                    <TextInputComponent
                                        name="Email"
                                        register={register}
                                        formErrors={formErrors}
                                        label="Email"
                                        rules={{
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                                message: 'Invalid email address',
                                            },
                                        }}
                                        placeholder="Enter email"
                                    />
                                </div>

                                <div className="col-lg-6">
                                    <SelectComponent
                                        name="UserRoleId"
                                        register={register}
                                        formErrors={formErrors}
                                        label="User Role"
                                        rules={{
                                            required: 'User role is required',
                                        }}
                                        options={
                                            usersRoles?.data.map((role: MaintenanceInterface) => {
                                                const { Name, Id } = role

                                                return (
                                                    <option key={Id} value={Id}>{Name}</option>
                                                )
                                            })
                                        }
                                    />
                                </div>

                                <div className="col-lg-6">
                                    <TextInputComponent
                                        name="Phone"
                                        register={register}
                                        formErrors={formErrors}
                                        label="Phone"
                                        placeholder="Enter phone number"
                                    />
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-check">
                                        <CheckboxComponent
                                            register={register}
                                            name="Authorized"
                                            label="Authorized"
                                            defaultChecked={true}
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-check form-switch">
                                        <CheckboxComponent
                                            register={register}
                                            name="AutomaticPassword"
                                            label="Automatic Password"
                                            defaultChecked={true}
                                        />
                                    </div>
                                </div>
                            </div>

                            {
                                !watchAutomaticPassword
                                    ? <div className="row g-3 mt-2">
                                        <div className="col-lg-6">
                                            <PasswordInput
                                                name="Password"
                                                label="Password"
                                                register={register}
                                                formErrors={formErrors}
                                                activeAllRules
                                            />
                                        </div>

                                        <div className="col-lg-6">
                                            <PasswordInput
                                                name="ConfirmPassword"
                                                label="Confirm Password"
                                                register={register}
                                                formErrors={formErrors}
                                                activeAllRules
                                            />
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="form-check form-switch">
                                                <CheckboxComponent
                                                    register={register}
                                                    name="ChangePwdNextLogin"
                                                    label="Change Password Next Login"
                                                    defaultChecked={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    : null
                            }

                            <div className="mt-3">
                                <ErrorAlert error={error} />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <div className="hstack gap-2 justify-content-end">
                                <button type="button" className="btn btn-light" data-bs-dismiss="modal" ref={closeButtonRef}>Close</button>
                                <button type="submit" className="btn btn-success" id="add-btn">Create user</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}