import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outlined';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  const buttonClasses =
    'px-4 py-2 rounded-md font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2' +
    (variant === 'primary'
      ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
      : variant === 'secondary'
      ? 'bg-gray-800 hover:bg-gray-900 focus:ring-gray-700'
      : variant === 'outlined'
      ? 'bg-transparent border border-blue-600 hover:bg-blue-100 focus:ring-blue-500 text-blue-600'
      : '');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;