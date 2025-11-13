
import React from 'react';
import { UI_TEXT } from '../constants';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-xl">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
      <h2 className="mt-6 text-xl font-semibold text-white">{UI_TEXT.loader.split('.')[0]}...</h2>
      <p className="mt-2 text-gray-300">{UI_TEXT.loader.split('.')[1]}</p>
    </div>
  );
};

export default Loader;