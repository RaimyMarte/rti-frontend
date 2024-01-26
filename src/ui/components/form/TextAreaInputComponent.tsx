import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextAreaInputComponentProps {
    name: string;
    label?: string;
    register: UseFormRegister<any>
    className?: string;
    rows?: number;
    formErrors: FieldErrors
    rules?: Pick<
        RegisterOptions,
        "maxLength" | "minLength" | "validate" | "required" | "pattern"
    >
    placeholder?: string
    disabled?: boolean
}
export const TextAreaInputComponent = ({ className = '', disabled = false, rows = 3, name, register, rules, formErrors, placeholder, label, }: TextAreaInputComponentProps) => {
    const required = Object.keys(rules || {}).includes('required');

    return (
        <>
            {label && <label className="form-label">{label} {required ? <span className="text-danger">*</span> : ''} </label>}

            <textarea
                {...register(name, rules)}
                className={`form-control ${className}`}
                rows={rows}
                disabled={disabled}
                placeholder={placeholder}
            />

            {formErrors[name] && <div className='text-danger invalid-input'>{formErrors[name]?.message?.toString()}</div>}
        </>
    )
}
