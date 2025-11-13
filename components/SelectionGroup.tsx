
import React from 'react';

interface SelectionGroupProps {
  title: string;
  options: readonly string[];
  selectedOptions: string[];
  onToggle: (option: string) => void;
}

const SelectionGroup: React.FC<SelectionGroupProps> = ({ title, options, selectedOptions, onToggle }) => {
  return (
    <div className="w-full mb-8">
      <h3 className="text-xl font-semibold text-gray-200 mb-4">{title}</h3>
      <div className="flex flex-wrap gap-3 justify-center">
        {options.map((option) => {
          const isSelected = selectedOptions.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 border-2 text-sm md:text-base ${
                isSelected
                  ? 'bg-cyan-500 border-cyan-400 text-white shadow-lg transform scale-105'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SelectionGroup;
