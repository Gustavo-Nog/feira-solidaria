import './InputField.css';
import { useFormContext } from 'react-hook-form';


function InputField({ name, label, type = 'text', required, className = '', as = 'input', options = [] }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const renderField = () => {

    switch (as) {
      case 'textarea':
        return (
          <textarea
            id={name}
            className={`custom-input ${className}`}
            {...register(name, { required })}
            placeholder={`Digite a ${label.toLowerCase()}`}
            rows="3"
          />
        );
      case 'select':
        return (
          <select
            id={name}
            className={`custom-input ${className}`}
            {...register(name, { required })}
          >
            <option value="">Selecione</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            id={name}
            type={type}
            className={`custom-input ${className}`}
            {...register(name, { required })}
            placeholder={`Digite seu ${label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <div className="input-wrapper campo">
      <label htmlFor={name} className="form-label">{label}</label>
      {renderField()} 
      {errors[name] && (
        <span className="text-danger">{errors[name].message}</span>
      )}
    </div>
  );
}

export default InputField;