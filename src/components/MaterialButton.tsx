interface MaterialButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export default function MaterialButton({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = ''
}: MaterialButtonProps) {
  const getButtonStyle = () => {
    const baseStyle = {
      fontWeight: '500',
      borderRadius: '12px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.2s',
      transform: disabled ? 'none' : 'scale(1)',
      outline: 'none',
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1
    };

    const sizeStyles = {
      sm: { padding: '8px 16px', fontSize: '14px' },
      md: { padding: '12px 24px', fontSize: '16px' },
      lg: { padding: '16px 32px', fontSize: '18px' }
    };

    const variantStyles = {
      primary: {
        background: 'linear-gradient(to right, #8b5cf6, #7c3aed)',
        color: 'white'
      },
      secondary: {
        background: 'linear-gradient(to right, #f3e8ff, #e9d5ff)',
        color: '#7c2d12'
      },
      outlined: {
        background: 'transparent',
        border: '2px solid #8b5cf6',
        color: '#7c3aed'
      }
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant]
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      e.currentTarget.style.transform = 'scale(1.05)';
      if (variant === 'primary') {
        e.currentTarget.style.background = 'linear-gradient(to right, #7c3aed, #6d28d9)';
      } else if (variant === 'outlined') {
        e.currentTarget.style.background = '#faf5ff';
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      e.currentTarget.style.transform = 'scale(1)';
      if (variant === 'primary') {
        e.currentTarget.style.background = 'linear-gradient(to right, #8b5cf6, #7c3aed)';
      } else if (variant === 'outlined') {
        e.currentTarget.style.background = 'transparent';
      }
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={getButtonStyle()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </button>
  );
}