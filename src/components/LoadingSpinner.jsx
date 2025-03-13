
import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  className = ''
}) => {
  const sizeClass = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`${sizeClass[size]} border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin`}></div>
    </div>
  );
};

export default LoadingSpinner;
