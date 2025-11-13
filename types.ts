
export interface UserInputs {
  image: File;
  text: string;
  styles: string[];
  emotions: string[];
  backgrounds: string[];
  tuning: string[];
}

export type StyleVariation = 'Impact' | 'Cinématique' | 'Minimaliste' | 'Artistique' | 'Vibrant';
