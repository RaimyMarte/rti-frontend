import { ReactNode } from 'react';
import { Controller, Control, RegisterOptions, } from 'react-hook-form';

interface ControllerSelectProps {
    name: string;
    control: Control<any, any>;
    label: string;
    options: ReactNode;
    disabled?: boolean
    rules?: Pick<
        RegisterOptions,
        "required"
    >
}

export const ControllerSelect = ({ name, disabled = false, control, rules, label, options }: ControllerSelectProps) => {
    const required = Object.keys(rules || {}).includes('required');

    return (
        <>
            <label className="form-label">{label} {required ? <span className="text-danger">*</span> : ''} </label>

            <Controller
                name={name}
                control={control}
                rules={rules}

                render={({ field, fieldState: { error } }) => (
                    <>
                        <select
                            className="form-select"
                            {...field}
                            disabled={disabled}
                            data-choices
                            data-choices-search-false
                        >
                            <option value="">Select {label}</option>
                            {options}
                        </select>

                        {error && <div className='text-danger invalid-input'>{error?.message}</div>}
                    </>
                )}
            />
        </>
    );
};