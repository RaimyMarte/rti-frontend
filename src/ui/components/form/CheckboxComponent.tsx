import { UseFormRegister, } from 'react-hook-form';

interface CheckboxComponentProps {
    name: string;
    label: string;
    register: UseFormRegister<any>
    defaultChecked?: boolean
}

export const CheckboxComponent = ({ name, register, defaultChecked = false, label, }: CheckboxComponentProps) => {

    return (
        <>
            <input
                {...register(name)}
                className="form-check-input"
                type="checkbox"
                role="switch"
                defaultChecked={defaultChecked}
            />

            <label className="form-check-label">{label}</label>
        </>
    );
};