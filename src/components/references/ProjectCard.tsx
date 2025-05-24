import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  client: string;
  category: string;
  tags: string[];
  imageSrc: string;
  description: string;
  results?: string[];
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  client,
  category,
  tags,
  imageSrc,
  description,
  results = [],
  index = 0
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group cursor-pointer"
        onClick={openModal}
      >
        <div className="relative aspect-square overflow-hidden rounded-lg shadow-md">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <div>
              <p className="text-sm font-medium text-teal">{category}</p>
              <h3 className="text-xl font-semibold text-white">{title}</h3>
            </div>
            <div className="ml-auto">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-teal">
                <ArrowUpRight size={20} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-sm font-medium text-teal">{client}</p>
          <h3 className="text-lg font-medium text-slate-gray">{title}</h3>
        </div>
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-gray text-white flex items-center justify-center z-10 hover:bg-opacity-90 transition-colors"
              >
                <X size={20} />
              </button>

              {/* Project Image */}
              <div className="h-64 md:h-80 overflow-hidden">
                <img
                  src={imageSrc}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Project Content */}
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mb-6">
                  <p className="text-sm font-medium text-teal">{client}</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-gray mb-2">
                    {title}
                  </h2>
                  <p className="text-gray-600">{description}</p>
                </div>

                {/* Results */}
                {results.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-slate-gray mb-3">
                      Results
                    </h3>
                    <ul className="space-y-2">
                      {results.map((result, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-teal mr-2">•</span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
