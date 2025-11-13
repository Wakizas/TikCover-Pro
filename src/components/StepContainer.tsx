import React from 'react';

interface StepContainerProps {
  title: string;
  subtitle?: string;
  question: string;
  children: React.ReactNode;
}

const StepContainer: React.FC<StepContainerProps> = ({ title, subtitle, question, children }) => {
  return (
    <div className="w-full text-center p-6 md:p-10 bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50">
      <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">{title}</h1>
      {subtitle && <p className="mt-2 text-gray-300">{subtitle}</p>}
      <p className="mt-8 mb-6 text-lg md:text-xl text-gray-200 font-medium">{question}</p>
      <div className="mt-4 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default StepContainer;
