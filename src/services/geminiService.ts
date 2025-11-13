import type { UserInputs, StyleVariation } from '../types';

export const generateCoverPrompt = (inputs: UserInputs, variation: StyleVariation): string => {
  const { text, styles, emotions, backgrounds, tuning } = inputs;

  const backgroundInstruction = backgrounds.includes("Garder l'original")
    ? `Conserve et améliore le fond original de l'image. Tu peux fusionner de manière créative les autres styles de fond demandés (${backgrounds.filter(b => b !== "Garder l'original").join(', ')}) avec l'original pour le rendre plus percutant.`
    : `Remplace complètement l'arrière-plan de l'image originale par un nouveau fond stylisé et professionnel, inspiré par : ${backgrounds.join(', ')}.`;

  let styleSpecificInstructions = '';

  switch (variation) {
    case 'Impact':
      styleSpecificInstructions = `
        - Couleurs : Utilise des couleurs très vives, saturées et percutantes. Fort contraste.
        - Texte : Le texte doit être très grand, en gras (bold/heavy), et très lisible. Applique un effet de lueur (glow) ou une ombre portée nette pour le faire ressortir.
        - Composition : Dynamique et audacieuse. N'hésite pas à utiliser des angles ou des éléments graphiques percutants.
      `;
      break;
    case 'Cinématique':
      styleSpecificInstructions = `
        - Couleurs : Applique une colorimétrie de type cinéma, souvent avec des tons froids dans les ombres (bleu/cyan) et des tons chauds dans les hautes lumières (orange/jaune). L'ambiance doit être immersive.
        - Lumière : Crée une lumière douce et dramatique, comme celle d'un tournage de film, pour mettre en valeur le sujet. Ajoute un effet de profondeur de champ.
        - Texte : Utilise une police élégante et épurée, comme sur une affiche de film. Le texte doit être bien intégré à l'image.
      `;
      break;
    case 'Minimaliste':
      styleSpecificInstructions = `
        - Couleurs : Utilise une palette de couleurs limitée et harmonieuse. L'esthétique doit être propre et épurée.
        - Composition : Centrée sur l'essentiel. Laisse de l'espace négatif pour que le design respire.
        - Texte : La typographie doit être simple, moderne et parfaitement lisible. C'est un élément clé du design.
      `;
      break;
    case 'Artistique':
      styleSpecificInstructions = `
        - Esthétique : Approche artistique et conceptuelle. Pense comme un designer d'affiche d'art.
        - Composition : Utilise des compositions audacieuses, asymétriques ou inhabituelles. Intègre des éléments graphiques abstraits ou des textures de peinture.
        - Texte : La typographie est un élément de design central. Elle peut être déformée, intégrée dans une forme, ou interagir de manière créative avec les éléments de l'image.
        - Couleurs : Palette de couleurs recherchée et originale, pouvant être soit très contrastée soit subtilement monochrome.
      `;
      break;
    case 'Vibrant':
      styleSpecificInstructions = `
        - Énergie : Le design doit déborder d'énergie et de dynamisme. Pense pop art, culture jeune et maximalisme.
        - Couleurs : Palette de couleurs extrêmement vive, néon, ou "acidulée". N'hésite pas à utiliser des dégradés audacieux et des combinaisons de couleurs inattendues.
        - Texte : Utilise une police de caractères forte et moderne, avec des effets comme des contours, des ombres multiples ou des motifs. Le texte doit "popper".
        - Composition : Très chargée et dynamique, avec des superpositions d'éléments graphiques, des formes géométriques et des éclats de lumière.
      `;
      break;
  }

  return `
    Tu es un expert en design graphique pour les réseaux sociaux, spécialisé dans la création de visuels professionnels et épurés. Ta mission est de transformer l'image fournie en une couverture percutante au format 1080x1920 (portrait 9:16).

    **INSTRUCTIONS FONDAMENTALES :**
    1.  **Texte à Intégrer :** Le texte suivant doit être le point central de la composition : **"${text}"**.
    2.  **Gestion du Texte Existant :** L'image fournie contient très probablement déjà une version de ce texte. Ta tâche la plus importante est de **REMPLACER complètement** ce texte existant. Tu ne dois en aucun cas le dupliquer ou ajouter du texte à côté. Le texte original doit disparaître, remplacé par ta version, qui doit être parfaitement intégrée, créative et professionnelle. Le résultat doit être impeccable et "clean".
    3.  **Qualité d'Intégration :** Le texte ne doit pas avoir l'air d'un simple ajout. Il doit s'intégrer à la scène en jouant avec la lumière, les ombres, la perspective et les éléments du décor.

    **INSTRUCTIONS DE STYLE POUR CETTE VERSION :**

    **1. Thème de base pour cette image : "${variation}"**
    ${styleSpecificInstructions}

    **2. Éléments créatifs à intégrer :**
    - **Styles généraux :** ${styles.join(', ')}
    - **Émotions à évoquer :** ${emotions.join(', ')}
    - **Arrière-plan :** ${backgroundInstruction}
    - **Tuning & Effets visuels :** ${tuning.join(', ')}

    **DIRECTIVES FINALES :**
    - Combine tous ces éléments pour créer un visuel harmonieux, moderne et très attractif.
    - La lisibilité du texte est primordiale, même avec une approche créative. Place-le intelligemment en tenant compte de la composition.
    - Assure-toi que le format final est bien 1080x1920.
    - Le rendu doit être d'une qualité professionnelle irréprochable, sans aucun débris ou artefact du texte original.
  `;
};
