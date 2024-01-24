import { ControllerCheckbox, ControllerTextInput } from '../../ui/components/form';
import { ErrorAlert, Loading } from '../../ui/components';
import { isMutationSuccessResponse } from '../../utils';
import { MaintenanceBody, useUpdateMaintenanceMutation } from '../../store/api';
import { MaintenanceInterface } from '../../interfaces';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface EditMaintenanceModalProps {
    maintenanceName: string
    maintenanceButtonText: string
    activeMaintenance: MaintenanceInterface | null
}

export const EditMaintenanceModal = ({ activeMaintenance, maintenanceName, maintenanceButtonText }: EditMaintenanceModalProps) => {
    const [updateMaintenance, { isLoading: updateMaintenanceLoading, }] = useUpdateMaintenanceMutation()

    const [error, setError] = useState('')

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const defaultValues: MaintenanceBody = {
        Name: activeMaintenance?.Name || '',
        Code: activeMaintenance?.Code || '',
        Description: activeMaintenance?.Description || '',
        Enabled: activeMaintenance?.Enabled || false,
    };

    const {
        handleSubmit,
        control,
        reset,
    } = useForm<MaintenanceBody>({ defaultValues });


    const onFormSubmit = async (data: MaintenanceBody) => {
        if (activeMaintenance) {
            try {
                const response = await updateMaintenance({ body: data, maintenanceName, maintenanceId: activeMaintenance?.Id });
                if (isMutationSuccessResponse(response)) {
                    const { data: respData } = response

                    if (!respData?.isSuccess) {
                        setError(respData?.message || "");
                        return;
                    }

                    toast.success(respData?.message)

                    setError('')
                    reset()
                    closeButtonRef.current?.click();
                }
            } catch (error) {
                setError(`An error occurred: ${error}`);
            }
        }
    }

    useEffect(() => {
        reset(defaultValues as MaintenanceBody);
    }, [activeMaintenance, reset]);

    return (
        <div className="modal fade" id="editMaintenanceModal" tabIndex={-1} aria-hidden="true" >
            <div className="modal-dialog modal-dialog-centered">
                {updateMaintenanceLoading ? <Loading /> : null}

                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit {maintenanceButtonText}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <form onSubmit={handleSubmit(onFormSubmit)} className="tablelist-form">
                        <div className="modal-body">
                            <div className="row g-3">
                                <div className="col-lg-6">
                                    <ControllerTextInput
                                        name="Name"
                                        control={control}
                                        label="Name"
                                        rules={{
                                            required: 'Name is required',
                                        }}
                                        placeholder="Enter name"
                                    />
                                </div>

                                <div className="col-lg-6">
                                    <ControllerTextInput
                                        name="Code"
                                        control={control}
                                        label="Code"
                                        placeholder="Enter code"
                                    />
                                </div>

                                <div className="col-lg-12">
                                    <ControllerTextInput
                                        name="Description"
                                        control={control}
                                        label="Description"
                                        placeholder="Enter description"
                                    />
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-check form-switch">
                                        <ControllerCheckbox
                                            control={control}
                                            name="Enabled"
                                            label="Enabled"
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
                                <button type="submit" className="btn btn-success" id="add-btn">Save {maintenanceButtonText}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}