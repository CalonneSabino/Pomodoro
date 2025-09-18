interface MaterialCardProps {
  children: React.ReactNode;
  className?: string;
  elevation?: 'low' | 'medium' | 'high';
  hover?: boolean;
  onClick?: () => void;
}

export default function MaterialCard({ 
  children, 
  className = '',
  elevation = 'medium',
  hover = false,
  onClick
}: MaterialCardProps) {
  const getCardStyle = () => {
    const elevations = {
      low: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      medium: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      high: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    };

    return {
      background: 'white',
      borderRadius: '16px',
      border: '1px solid #e9d5ff',
      boxShadow: elevations[elevation],
      transition: 'all 0.2s',
      cursor: onClick || hover ? 'pointer' : 'default'
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hover) {
      e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
      e.currentTarget.style.transform = 'scale(1.05)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hover) {
      const elevations = {
        low: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        medium: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        high: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      };
      e.currentTarget.style.boxShadow = elevations[elevation];
      e.currentTarget.style.transform = 'scale(1)';
    }
  };

  return (
    <div
      onClick={onClick}
      style={getCardStyle()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </div>
  );
}