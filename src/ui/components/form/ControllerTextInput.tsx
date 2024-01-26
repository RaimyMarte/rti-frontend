import { Controller, Control, RegisterOptions, } from 'react-hook-form';

interface ControllerTextInputProps {
    name: string;
    control: Control<any, any>;
    className?: string;
    label?: string;
    rules?: Pick<
        RegisterOptions,
        "maxLength" | "minLength" | "validate" | "required" | "pattern"
    >
    placeholder?: string
    type?: string
    disabled?: boolean
}

export const ControllerTextInput = ({ className = '', name, disabled = false, control, rules, type = 'text', placeholder, label, }: ControllerTextInputProps) => {
    const required = Object.keys(rules || {}).includes('required');

    return (
        <>
            {label && <label className="form-label">{label} {required ? <span className="text-danger">*</span> : ''} </label>}

            <Controller
                name={name}
                control={control}
                rules={rules}
                disabled={disabled}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <input type={type} {...field} className={`form-control ${className}`} placeholder={placeholder} />

                        {error && <div className='text-danger invalid-input'>{error?.message}</div>}
                    </>
                )}
            />
        </>
    );
};