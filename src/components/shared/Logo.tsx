import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  // Determine dimensions based on size
  const dimensions = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
  };

  const { width, height } = dimensions[size];

  return (
    <motion.img
      src="https://dazzleconsulting.fr/wp-content/uploads/2024/08/azzle.-5.png"
      alt="DazzleConsulting Logo"
      width={width}
      height={height}
      className={`object-contain ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    />
  );
};

export default Logo;
