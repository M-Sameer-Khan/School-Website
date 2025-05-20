import React from 'react';

/**
 * Reusable loading spinner component with configurable size and color
 */
const Spinner = ({ 
  size = 'md', 
  color = 'primary',
  label = 'Loading...',
  showLabel = true,
  fullScreen = false,
  className = '' 
}) => {
  // Size variants
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
    xl: 'w-24 h-24 border-4'
  };

  // Color variants for the spinner
  const colors = {
    primary: 'border-primary-500 border-t-transparent',
    secondary: 'border-secondary-500 border-t-transparent',
    white: 'border-white border-t-transparent'
  };

  // Choose the appropriate spinner markup based on fullScreen prop
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        <div className="text-center">
          <div className={`
            ${sizes[size]} 
            ${colors[color]} 
            rounded-full animate-spin mx-auto
            ${className}
          `}></div>
          {showLabel && <p className="mt-4 text-gray-700 font-medium">{label}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`
        ${sizes[size]} 
        ${colors[color]} 
        rounded-full animate-spin
        ${className}
      `}></div>
      {showLabel && <p className="mt-2 text-gray-700">{label}</p>}
    </div>
  );
};

export default Spinner;
