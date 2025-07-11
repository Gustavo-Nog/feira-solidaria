import './InputField.css';
import { useFormContext } from 'react-hook-form';

function InputField({ name, label, type = 'text', required }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="input-wrapper">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        className="custom-input"
        {...register(name, { required })}
        placeholder={`Digite seu ${label.toLowerCase()}`}
        autoComplete="off"
      />
      {errors[name] && (
        <span className="text-danger">{errors[name].message}</span>
      )}
    </div>
  );
}

export default InputField;
