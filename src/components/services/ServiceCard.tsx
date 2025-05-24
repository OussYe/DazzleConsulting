import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
  index?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  imageSrc, 
  link,
  index = 0
}) => {
  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  const background = useMotionTemplate`
    radial-gradient(
      500px circle at ${mouseX * 100}% ${mouseY * 100}%,
      rgba(0, 128, 128, 0.1),
      transparent 80%
    )
  `;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300"
    >
      {/* Mouse gradient effect */}
      <motion.div 
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background }}
      />
      
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60" />
      </div>
      
      <div className="p-6 relative z-10">
        <h3 className="text-xl font-semibold text-slate-gray mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <Link
          to={link}
          className="inline-flex items-center text-teal group-hover:underline font-medium"
        >
          En savoir plus
          <ArrowUpRight size={18} className="ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
