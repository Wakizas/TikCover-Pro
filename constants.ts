
export const UI_TEXT = {
  title: "TikCover Pro ✨",
  subtitle: "Générez des couvertures TikTok IA professionnelles en quelques secondes.",
  step: "Étape",
  questions: [
    "Téléverse ton image pour commencer.",
    "Quel texte veux-tu afficher sur ta couverture ? (Écris-le exactement comme tu veux le voir.)",
    "Personnalise ta couverture. Choisis un ou plusieurs éléments dans chaque catégorie.",
  ],
  buttons: {
    next: "Suivant",
    generate: "Générer mes couvertures",
    mainMenu: "Menu Principal",
    back: "Précédent",
    tweak: "Modifier les options",
    download: "Télécharger",
    downloadAll: "Télécharger tout",
    originalBg: "Garder le fond original",
    stylizedBg: "Créer un fond stylisé",
    upload: "Choisir un fichier",
  },
  loader: "Création de vos couvertures en cours... Un instant, la magie opère !",
  results: {
    title: "Voici vos 5 propositions !",
    subtitle: "Cliquez sur une image pour la télécharger.",
    impact: "💥 Style Impact",
    cinematic: "🎬 Style Cinématique",
    minimalist: "✨ Style Minimaliste",
    artistic: "🎨 Style Artistique",
    vibrant: "🌟 Style Vibrant",
  },
  error: {
    title: "Oh non, une erreur est survenue !",
    apiKey: "La clé API n'est pas configurée. Veuillez configurer la variable d'environnement API_KEY.",
    api: "Une erreur est survenue lors de la communication avec l'API Gemini :",
    generic: "Une erreur inconnue est survenue.",
    unknownStep: "Étape inconnue.",
  },
  imageUploader: {
    prompt: "Glisse et dépose une image ici, ou clique pour sélectionner un fichier.",
    fileTypes: "PNG, JPG, WEBP jusqu'à 10MB",
  },
};

export const STYLE_OPTIONS = ["Cinématique", "Buzz", "Minimaliste", "Fun", "Motivation", "Éducatif", "Storytelling", "Luxe", "Rétro", "Futuriste", "Documentaire", "Sport"] as const;
export const EMOTION_OPTIONS = ["Surprise", "Joie", "Mystère", "Choc", "Inspiration", "Confiance", "Nostalgie", "Humour", "Épique", "Sérénité"] as const;
export const BACKGROUND_OPTIONS = ["Garder l'original", "Flou stylisé", "Effet Néon", "Dégradé de couleurs", "Texture Urbaine", "Fond Abstrait", "Paysage Épique", "Studio Photo Pro"] as const;

export const TUNING_OPTIONS = [
  "Grain de film", 
  "Aberration chromatique", 
  "Lueur néon douce", 
  "Effet Glitch subtil", 
  "Vignette cinématique", 
  "Filtre 'Golden Hour'", 
  "Saturation Vibrante", 
  "Contraste Dramatique", 
  "Look 'Blade Runner' (Cyan/Magenta)", 
  "Esthétique 'Vaporwave'", 
  "Effet 'Holographique' / Iridiscent", 
  "Filtre 'Polaroid Vintage'", 
  "Lens Flare anamorphique", 
  "Look 'Cinestill 800T' (Halations rouges)", 
  "Style 'Anime' des années 90",
  "Effet 'Bloom' / Flou lumineux"
] as const;
