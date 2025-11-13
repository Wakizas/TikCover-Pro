
import React from 'react';
import { UI_TEXT } from '../constants';

interface ResultsDisplayProps {
  images: string[];
  onRestart: () => void;
  onBack: () => void;
  userText: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ images, onRestart, onBack, userText }) => {
  const styles = [
      UI_TEXT.results.impact, 
      UI_TEXT.results.cinematic, 
      UI_TEXT.results.minimalist,
      UI_TEXT.results.artistic,
      UI_TEXT.results.vibrant
    ];

  const sanitizeFilename = (text: string): string => {
    const cleaned = text.replace(/[^a-zA-Z0-9 ]/g, "").trim();
    return cleaned.replace(/\s+/g, '_').substring(0, 25);
  };

  const handleDownload = (imageUrl: string, style: string) => {
    const sanitizedText = sanitizeFilename(userText || 'cover');
    const sanitizedStyle = style.replace(/[^a-zA-Z0-9]/g, '');

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `TikCoverPro_${sanitizedText}_${sanitizedStyle}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    images.forEach((image, index) => {
      // Use a short delay to help browsers handle multiple downloads
      setTimeout(() => {
        handleDownload(image, styles[index]);
      }, index * 300);
    });
  };

  return (
    <div className="w-full flex flex-col items-center p-4 md:p-8 bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700/50">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">{UI_TEXT.results.title}</h1>
      <p className="mt-2 mb-8 text-gray-300 text-center">{UI_TEXT.results.subtitle}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
        {images.map((image, index) => (
          <div key={index} className="group relative flex flex-col items-center">
            <h3 className="mb-2 text-lg font-semibold">{styles[index]}</h3>
            <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden shadow-lg border-2 border-gray-700 group-hover:border-cyan-500 transition-colors duration-300">
                <img src={image} alt={`Generated cover ${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => handleDownload(image, styles[index])}
                    className="opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-90 transition-all duration-300 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    {UI_TEXT.buttons.download}
                  </button>
                </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-12">
        <button
            onClick={onBack}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
            {UI_TEXT.buttons.tweak}
        </button>
        <button
            onClick={onRestart}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
            {UI_TEXT.buttons.mainMenu}
        </button>
         <button
            onClick={handleDownloadAll}
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-pink-500/50"
        >
            {UI_TEXT.buttons.downloadAll}
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
