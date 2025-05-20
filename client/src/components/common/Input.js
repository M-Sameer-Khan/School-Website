import React from 'react';

/**
 * Reusable Input component with error handling
 */
const Input = ({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  disabled = false,
  required = false,
  className = '',
  helperText,
  ...props
}) => {
  // Show error only if field has been touched and has an error
  const showError = touched && error;
  
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={id || name} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        id={id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        className={`
          w-full px-3 py-2 border rounded-md
          focus:outline-none focus:ring-2 focus:ring-primary-500
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${showError 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-primary-500'}
        `}
        {...props}
      />
      
      {helperText && !showError && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
      
      {showError && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;
