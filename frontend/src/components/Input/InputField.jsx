import './InputField.css';
import { useFormContext } from 'react-hook-form';

function InputField({ name, label, type = 'text', required, className = '' }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="input-wrapper">
      <label htmlFor={name} className="form-label">{label}</label>
      <input
        id={name}
        type={type}
        className={`custom-input ${className}`} // junta a sua classe + bootstrap
        {...register(name, { required })}
        placeholder={`Digite seu ${label.toLowerCase()}`}
      />
      {errors[name] && (
        <span className="text-danger">{errors[name].message}</span>
      )}
    </div>
  );
}

export default InputField;
