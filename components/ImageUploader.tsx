
import React, { useState, useCallback } from 'react';
import { UI_TEXT } from '../constants';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = useCallback((file: File | null | undefined) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        onImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFile(e.target.files?.[0]);
  };

  if (preview) {
      // The image is already uploaded and handled by the parent, so this component becomes null.
      // The parent component will transition to the next step.
      return null;
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <label
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`flex justify-center items-center w-full h-64 px-6 transition bg-gray-900 border-2 ${isDragging ? 'border-cyan-500' : 'border-gray-700'} border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-500 focus:outline-none`}
      >
        <span className="flex flex-col items-center space-y-2">
           <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-medium text-gray-300">
            {UI_TEXT.imageUploader.prompt.split(',')[0]},
            <span className="text-cyan-400 underline"> {UI_TEXT.imageUploader.prompt.split(',')[1]}</span>
          </span>
          <span className="text-xs text-gray-500">{UI_TEXT.imageUploader.fileTypes}</span>
        </span>
        <input type="file" name="file_upload" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
      </label>
    </div>
  );
};

export default ImageUploader;