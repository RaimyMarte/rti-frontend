import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputComponentProps {
  name: string;
  label?: string;
  register: UseFormRegister<any>
  className?: string;
  formErrors: FieldErrors
  rules?: Pick<
    RegisterOptions,
    "maxLength" | "minLength" | "validate" | "required" | "pattern"
  >
  placeholder?: string
  type?: string
  disabled?: boolean
}
export const TextInputComponent = ({ className = '', disabled = false, name, register, rules, formErrors, type = 'text', placeholder, label, }: TextInputComponentProps) => {
  const required = Object.keys(rules || {}).includes('required');

  return (
    <>
      {label && <label className="form-label">{label} {required ? <span className="text-danger">*</span> : ''} </label>}

      <input
        type={type}
        disabled={disabled}
        {...register(name, rules)}
        className={`form-control ${className}`}
        placeholder={placeholder}
      />

      {formErrors[name] && <div className='text-danger invalid-input'>{formErrors[name]?.message?.toString()}</div>}
    </>
  )
}
