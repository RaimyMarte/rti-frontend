import { CheckboxComponent, TextInputComponent } from '../../ui/components/form';
import { ErrorAlert, Loading } from '../../ui/components';
import { isMutationSuccessResponse } from '../../utils';
import { MaintenanceBody, useCreateMaintenanceMutation } from '../../store/api';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface CreateMaintenanceModalProps {
    maintenanceName: string
    maintenanceButtonText: string
}

export const CreateMaintenanceModal = ({ maintenanceName, maintenanceButtonText }: CreateMaintenanceModalProps) => {
    const [createMaintenance, { isLoading: createMaintenanceLoading, }] = useCreateMaintenanceMutation()
    const [error, setError] = useState('')

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const {
        handleSubmit,
        register,
        formState: { errors: formErrors },
        reset,
    } = useForm<MaintenanceBody>()

    const onFormSubmit = async (data: MaintenanceBody) => {
        try {
            const response = await createMaintenance({ body: data, maintenanceName });
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
        <div className="modal fade" id="createMaintenanceModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                {createMaintenanceLoading ? <Loading /> : null}

                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create {maintenanceButtonText}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <form onSubmit={handleSubmit(onFormSubmit)} className="tablelist-form">
                        <div className="modal-body">
                            <div className="row g-3">
                                <div className="col-lg-6">
                                    <TextInputComponent
                                        name="Name"
                                        register={register}
                                        formErrors={formErrors}
                                        label="Name"
                                        rules={{
                                            required: 'Name is required',
                                        }}
                                        placeholder="Enter name"
                                    />
                                </div>

                                <div className="col-lg-6">
                                    <TextInputComponent
                                        name="Code"
                                        register={register}
                                        formErrors={formErrors}
                                        label="Code"
                                        placeholder="Enter code"
                                    />
                                </div>

                                <div className="col-lg-12">
                                    <TextInputComponent
                                        name="Description"
                                        register={register}
                                        formErrors={formErrors}
                                        label="Description"
                                        placeholder="Enter description"
                                    />
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-check form-switch">
                                        <CheckboxComponent
                                            register={register}
                                            name="Enabled"
                                            label="Enabled"
                                            defaultChecked={true}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3">
                                <ErrorAlert error={error} />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <div className="hstack gap-2 justify-content-end">
                                <button type="button" className="btn btn-light" data-bs-dismiss="modal" ref={closeButtonRef}>Close</button>
                                <button type="submit" className="btn btn-success" id="add-btn">Create {maintenanceButtonText}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}