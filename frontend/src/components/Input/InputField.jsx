import { useFormContext } from 'react-hook-form';
import './InputField.css';

function InputField({
  name,
  label,
  type = 'text',
  required = false,
  className = '',
  as = 'input',
  options = [],
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldProps = register(name, {
    required: required ? `O campo ${label.toLowerCase()} é obrigatório.` : false,
  });

  return (
    <div className="input-wrapper campo mb-3">
      <label htmlFor={name} className="form-label">{label}</label>

      {as === 'textarea' && (
        <textarea
          id={name}
          className={`form-control ${className}`}
          placeholder={`Digite ${label.toLowerCase()}`}
          rows="3"
          {...fieldProps}
        />
      )}

      {as === 'select' && (
        <select
          id={name}
          className={`form-select ${className}`}
          {...fieldProps}
        >
          <option value="">Selecione</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {as === 'input' && (
        <input
          id={name}
          type={type}
          className={`form-control ${className}`}
          placeholder={`Digite ${label.toLowerCase()}`}
          {...fieldProps}
        />
      )}

      {errors[name] && (
        <small className="text-danger">{errors[name].message}</small>
      )}
    </div>
  );
}

export default InputField;
