import { ReactNode } from "react";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";

interface SelectComponentProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  formErrors: FieldErrors;
  options: ReactNode;
  rules?: Pick<
    RegisterOptions,
    "required"
  >
}
export const SelectComponent = ({ name, register, formErrors, rules, label, options }: SelectComponentProps) => {
  const required = Object.keys(rules || {}).includes('required');

  return (
    <>
      <label className="form-label">{label} {required ? <span className="text-danger">*</span> : ''} </label>

      <select
        className="form-select"
        {...register(name, rules)}
        data-choices
        data-choices-search-false
      >
        <option value="">Select {label}</option>
        {options}
      </select>

      {formErrors[name] && <div className='text-danger invalid-input'>{formErrors[name]?.message?.toString()}</div>}
    </>
  )
}
