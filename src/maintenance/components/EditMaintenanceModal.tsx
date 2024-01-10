import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { MaintenanceBody, useUpdateMaintenanceMutation } from '../../store/api';
import { isMutationSuccessResponse } from '../../helpers';
import { ErrorAlert, Loading } from '../../ui/components';
import { MaintenanceInterface } from '../../interfaces';

interface EditMaintenanceModalProps {
    maintenanceName: string
    maintenanceButtonText: string
    activeMaintenance: MaintenanceInterface | null
}

export const EditMaintenanceModal = ({ activeMaintenance, maintenanceName, maintenanceButtonText }: EditMaintenanceModalProps) => {
    const [updateMaintenance, { isLoading: updateMaintenanceLoading, }] = useUpdateMaintenanceMutation()
    const [error, setError] = useState('')

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors: formErrors },
        setValue,
    } = useForm<MaintenanceBody>();

    useEffect(() => {
        if (activeMaintenance) {
            setValue('Name', activeMaintenance?.Name || '');
            setValue('Code', activeMaintenance?.Code || '');
            setValue('Description', activeMaintenance?.Description || '');
            setValue('Enabled', activeMaintenance?.Enabled || true);
        }
    }, [activeMaintenance]);

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

                    reset();
                    setError('')
                    closeButtonRef.current?.click();
                }
            } catch (error) {
                setError(`An error occurred: ${error}`);
            }
        }
    }

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
                                    <label className="form-label">Name <span className="text-danger">*</span></label>
                                    <input type="text" {...register("Name", { required: 'Name is required', })} className="form-control" placeholder="Enter name" />
                                    {formErrors?.Name && <div className='text-danger invalid-input'>{formErrors?.Name.message}</div>}
                                </div>

                                <div className="col-lg-6">
                                    <label className="form-label">Code</label>
                                    <input type="text"  {...register("Code")} className="form-control" placeholder="Enter code" />
                                    {formErrors?.Code && <div className='text-danger invalid-input'>{formErrors?.Code.message}</div>}
                                </div>

                                <div className="col-lg-12">
                                    <label className="form-label">Description</label>
                                    <input type="text"  {...register("Description")} className="form-control" placeholder="Enter description" />
                                    {formErrors?.Description && <div className='text-danger invalid-input'>{formErrors?.Description.message}</div>}
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" defaultChecked={true} {...register("Enabled")} />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Enabled
                                        </label>
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
                                <button type="submit" className="btn btn-success" id="add-btn">Edit {maintenanceButtonText}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}