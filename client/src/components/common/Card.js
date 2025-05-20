import React from 'react';

/**
 * Card component with configurable styling options
 */
const Card = ({ 
  children, 
  className = '', 
  title, 
  subtitle,
  footer,
  noPadding = false,
  shadow = 'md',
  hover = false,
  border = false,
  ...props 
}) => {
  // Shadow variants
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  return (
    <div 
      className={`
        bg-white rounded-lg overflow-hidden
        ${shadows[shadow]}
        ${hover ? 'hover:shadow-lg transition-shadow duration-300' : ''}
        ${border ? 'border border-gray-200' : ''}
        ${className}
      `}
      {...props}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
        </div>
      )}
      
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
