
import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { UI_TEXT, STYLE_OPTIONS, EMOTION_OPTIONS, BACKGROUND_OPTIONS, TUNING_OPTIONS } from './constants';
import type { UserInputs, StyleVariation } from './types';
import { generateCoverPrompt } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import StepContainer from './components/StepContainer';
import Loader from './components/Loader';
import ResultsDisplay from './components/ResultsDisplay';
import SelectionGroup from './components/SelectionGroup';

const App: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [userInputs, setUserInputs] = useState<Partial<UserInputs>>({});
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // State for the multi-selection step
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedBackgrounds, setSelectedBackgrounds] = useState<string[]>([]);
  const [selectedTuning, setSelectedTuning] = useState<string[]>([]);


  const handleImageUpload = (file: File) => {
    setUserInputs(prev => ({ ...prev, image: file }));
    setStep(2);
  };

  const handleTextSubmit = (text: string) => {
    setUserInputs(prev => ({ ...prev, text }));
    setStep(3);
  };

  const handleSelectionsSubmit = () => {
      if (selectedStyles.length === 0 || selectedEmotions.length === 0 || selectedBackgrounds.length === 0 || selectedTuning.length === 0) {
          setError("Veuillez sélectionner au moins une option dans chaque catégorie pour continuer.");
          return;
      }
      setError(null);

      const finalInputs = {
          ...userInputs,
          styles: selectedStyles,
          emotions: selectedEmotions,
          backgrounds: selectedBackgrounds,
          tuning: selectedTuning,
      } as UserInputs;
      
      setUserInputs(finalInputs);
      generateImages(finalInputs);
  };

  const fileToBase64 = (file: File): Promise<{mimeType: string, data: string}> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const [header, data] = result.split(',');
        const mimeType = header.match(/:(.*?);/)?.[1] || 'application/octet-stream';
        resolve({ mimeType, data });
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const generateImages = useCallback(async (finalInputs: UserInputs) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);
    setStep(4); // Move to a "loading" step view

    // FIX: Use process.env.API_KEY as per guidelines.
    if (!process.env.API_KEY) {
      setError(UI_TEXT.error.apiKey);
      setIsLoading(false);
      return;
    }

    try {
      // FIX: Use process.env.API_KEY as per guidelines.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const imagePart = await fileToBase64(finalInputs.image);

      const variations: StyleVariation[] = ['Impact', 'Cinématique', 'Minimaliste', 'Artistique', 'Vibrant'];
      
      const imagePromises = variations.map(async (variation) => {
        const prompt = generateCoverPrompt(finalInputs, variation);
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ inlineData: imagePart }, { text: prompt }],
          },
          config: {
            responseModalities: [Modality.IMAGE],
          },
        });
        
        const candidate = response.candidates?.[0];
        if (!candidate) {
          const blockReason = response.promptFeedback?.blockReason;
          if (blockReason) {
            throw new Error(`La requête a été bloquée. Raison : ${blockReason}`);
          }
          throw new Error("Aucun candidat n'a été retourné par l'API. La réponse est vide.");
        }

        if (candidate.finishReason && candidate.finishReason !== 'STOP') {
          throw new Error(`La génération a été interrompue. Raison : ${candidate.finishReason}`);
        }

        if (!candidate.content?.parts) {
          throw new Error(`La réponse de l'API est invalide ou a été bloquée (Raison de fin: ${candidate.finishReason}).`);
        }

        for (const part of candidate.content.parts) {
          if (part.inlineData) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
        }
        
        throw new Error(`Aucune donnée d'image trouvée dans la réponse pour le style ${variation}.`);
      });

      const results = await Promise.all(imagePromises);
      setGeneratedImages(results);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : UI_TEXT.error.generic;
      setError(`${UI_TEXT.error.api} ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const restart = () => {
    setStep(1);
    setUserInputs({});
    setGeneratedImages([]);
    setError(null);
    setIsLoading(false);
    setSelectedStyles([]);
    setSelectedEmotions([]);
    setSelectedBackgrounds([]);
    setSelectedTuning([]);
  };
  
  const goBackToSelections = () => {
    setGeneratedImages([]);
    setStep(3);
  };

  const handleToggle = (setter: React.Dispatch<React.SetStateAction<string[]>>, option: string) => {
      setter(prev => prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]);
  };

  const renderContent = () => {
    if (error && step !== 3) { // Show blocking error unless on the selection screen where it's shown inline
        return (
            <div className="text-center p-8 bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-xl border border-red-500/30">
                <h2 className="text-2xl font-bold text-red-500 mb-4">{UI_TEXT.error.title}</h2>
                <p className="text-red-300 mb-6">{error}</p>
                <button
                    onClick={restart}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                    {UI_TEXT.buttons.mainMenu}
                </button>
            </div>
        );
    }

    switch (step) {
      case 1:
        return (
          <StepContainer title={UI_TEXT.title} subtitle={UI_TEXT.subtitle} question={UI_TEXT.questions[0]}>
            <ImageUploader onImageUpload={handleImageUpload} />
          </StepContainer>
        );
      case 2:
        return (
          <StepContainer title={`${UI_TEXT.step} 2/3`} question={UI_TEXT.questions[1]}>
            <form onSubmit={(e) => { e.preventDefault(); handleTextSubmit((e.currentTarget.elements.namedItem('textInput') as HTMLInputElement).value); }} className="w-full flex flex-col items-center">
              <input name="textInput" required defaultValue={userInputs.text || ''} className="w-full md:w-2/3 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none placeholder-gray-500 text-center" placeholder="Votre texte ici..." />
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <button type="button" onClick={() => setStep(1)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">{UI_TEXT.buttons.back}</button>
                <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-8 rounded-lg transition-colors">{UI_TEXT.buttons.next}</button>
              </div>
            </form>
            <button onClick={restart} className="mt-8 text-gray-400 hover:text-white transition-colors text-sm underline">{UI_TEXT.buttons.mainMenu}</button>
          </StepContainer>
        );
      case 3:
        return (
          <StepContainer title={`${UI_TEXT.step} 3/3`} question={UI_TEXT.questions[2]}>
            <div className="w-full max-w-4xl">
                <SelectionGroup title="Style Principal" options={STYLE_OPTIONS} selectedOptions={selectedStyles} onToggle={(option) => handleToggle(setSelectedStyles, option)} />
                <SelectionGroup title="Émotion" options={EMOTION_OPTIONS} selectedOptions={selectedEmotions} onToggle={(option) => handleToggle(setSelectedEmotions, option)} />
                <SelectionGroup title="Arrière-plan / Effets" options={BACKGROUND_OPTIONS} selectedOptions={selectedBackgrounds} onToggle={(option) => handleToggle(setSelectedBackgrounds, option)} />
                <SelectionGroup title="Tuning / Effets Visuels" options={TUNING_OPTIONS} selectedOptions={selectedTuning} onToggle={(option) => handleToggle(setSelectedTuning, option)} />
            </div>
             {error && <p className="text-red-400 mt-4 mb-2">{error}</p>}
            <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
              <button type="button" onClick={() => setStep(2)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">
                {UI_TEXT.buttons.back}
              </button>
              <button onClick={handleSelectionsSubmit} className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-12 rounded-lg transition-colors text-lg shadow-lg hover:shadow-pink-500/50">
                {UI_TEXT.buttons.generate}
              </button>
            </div>
            <button onClick={restart} className="mt-8 text-gray-400 hover:text-white transition-colors text-sm underline">{UI_TEXT.buttons.mainMenu}</button>
          </StepContainer>
        );
      case 4:
        if (isLoading) return <Loader />;
        if (generatedImages.length > 0) return <ResultsDisplay images={generatedImages} onRestart={restart} onBack={goBackToSelections} userText={userInputs.text as string} />;
        // If there was an error during generation, it will be caught by the general error handler above.
        return null;
      default:
        return <div>{UI_TEXT.error.unknownStep}</div>;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-dots">
      <main className="w-full max-w-5xl mx-auto">
        {renderContent()}
      </main>
      <style>{`
        .bg-dots {
          background-color: #010101;
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
          background-size: 25px 25px;
        }
      `}</style>
    </div>
  );
};

export default App;
