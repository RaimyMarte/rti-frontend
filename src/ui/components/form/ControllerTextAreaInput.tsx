import { Controller, Control, RegisterOptions, } from 'react-hook-form';

interface ControllerTextAreaInputProps {
    name: string;
    control: Control<any, any>;
    className?: string;
    label?: string;
    rules?: Pick<
        RegisterOptions,
        "maxLength" | "minLength" | "validate" | "required" | "pattern"
    >
    placeholder?: string
    rows?: number
}

export const ControllerTextAreaInput = ({ className = '', name, control, rules, rows = 3, placeholder, label, }: ControllerTextAreaInputProps) => {
    const required = Object.keys(rules || {}).includes('required');

    return (
        <>
            {label && <label className="form-label">{label} {required ? <span className="text-danger">*</span> : ''} </label>}

            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <textarea rows={rows} {...field} className={`form-control ${className}`} placeholder={placeholder} />

                        {error && <div className='text-danger invalid-input'>{error?.message}</div>}
                    </>
                )}
            />
        </>
    );
};