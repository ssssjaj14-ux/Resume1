import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeTemplates } from '../data/resumeTemplates';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const templates = resumeTemplates;

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, onTemplateSelect }) => {
  const [showSheet, setShowSheet] = useState(false);

  const handleOpen = () => setShowSheet(true);
  const handleClose = () => setShowSheet(false);
  const handleSelect = (id: string) => {
    onTemplateSelect(id);
    setShowSheet(false);
  };

  return (
    <div className="w-full">
      {/* Change Template Button - always visible */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg text-lg w-full sm:w-auto"
          onClick={handleOpen}
        >
          <span role="img" aria-label="template">🎨</span> Change Template
        </button>
      </div>
      {/* Bottom Sheet/Modal for ALL devices */}
      <AnimatePresence>
        {showSheet && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
            onClick={handleClose}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="w-full sm:max-w-2xl bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-2xl shadow-2xl p-4 sm:p-8 max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">Choose a Template</h2>
              <div className="flex flex-col gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${selectedTemplate === template.id ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}
                    onClick={() => handleSelect(template.id)}
                  >
                    <img src={template.preview} alt={template.name} className="w-16 h-16 object-cover rounded-xl border" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{template.name}</h3>
                      <p className="text-gray-500 text-xs mb-1">{template.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {template.features.map((feature, i) => (
                          <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">{feature}</span>
                        ))}
                      </div>
                    </div>
                    {selectedTemplate === template.id && (
                      <span className="ml-2 text-blue-600 font-bold text-xl">✔</span>
                    )}
                  </div>
                ))}
              </div>
              <button
                className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg"
                onClick={handleClose}
              >
                Confirm Selection
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TemplateSelector;
