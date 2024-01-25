import { Controller, Control, } from 'react-hook-form';

interface ControllerSelectProps {
    name: string;
    control: Control<any, any>;
    label: string;
}

export const ControllerCheckbox = ({ name, control, label, }: ControllerSelectProps) => {

    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <input {...field} className="form-check-input" type="checkbox" role="switch" checked={field.value} />

                        {error && <div className='text-danger invalid-input'>{error?.message}</div>}
                    </>
                )}
            />

            <label className="form-check-label">{label}</label>
        </>
    );
};