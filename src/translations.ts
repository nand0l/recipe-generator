// Translations for the Recipe AI application

type TranslationKeys = {
  title: string;
  subtitle: string;
  description: string;
  inputPlaceholder: string;
  generateButton: string;
  logoutButton: string;
  loading: string;
  logoutSuccess: string;
  logoutError: string;
  errorOccurred: string;
  noDataReturned: string;
  promptSentToAI: string;
};

type Translations = {
  [key: string]: TranslationKeys;
};

export const translations: Translations = {
  en: {
    title: "Meet Your Personal",
    subtitle: "Recipe AI",
    description: "Simply type a few ingredients using the format ingredient1, ingredient2, etc., and Recipe AI will generate an all-new recipe on demand...",
    inputPlaceholder: "Ingredient1, Ingredient2, Ingredient3,...etc",
    generateButton: "Generate",
    logoutButton: "Logout",
    loading: "Loading...",
    logoutSuccess: "You have been logged out successfully",
    logoutError: "Error signing out",
    errorOccurred: "An error occurred: ",
    noDataReturned: "No data returned",
    promptSentToAI: "Prompt sent to AI:",
  },
  nl: {
    title: "Ontmoet Je Persoonlijke",
    subtitle: "Recept AI",
    description: "Typ simpelweg een paar ingrediënten in het formaat ingrediënt1, ingrediënt2, enz., en Recept AI zal op aanvraag een volledig nieuw recept genereren...",
    inputPlaceholder: "Ingrediënt1, Ingrediënt2, Ingrediënt3,...enz",
    generateButton: "Genereren",
    logoutButton: "Uitloggen",
    loading: "Laden...",
    logoutSuccess: "Je bent succesvol uitgelogd",
    logoutError: "Fout bij uitloggen",
    errorOccurred: "Er is een fout opgetreden: ",
    noDataReturned: "Geen gegevens ontvangen",
    promptSentToAI: "Prompt verzonden naar AI:",
  },
  de: {
    title: "Treffen Sie Ihren Persönlichen",
    subtitle: "Rezept KI",
    description: "Geben Sie einfach einige Zutaten im Format Zutat1, Zutat2 usw. ein, und Rezept KI generiert auf Anfrage ein völlig neues Rezept...",
    inputPlaceholder: "Zutat1, Zutat2, Zutat3,...usw",
    generateButton: "Generieren",
    logoutButton: "Abmelden",
    loading: "Wird geladen...",
    logoutSuccess: "Sie wurden erfolgreich abgemeldet",
    logoutError: "Fehler beim Abmelden",
    errorOccurred: "Ein Fehler ist aufgetreten: ",
    noDataReturned: "Keine Daten zurückgegeben",
    promptSentToAI: "An KI gesendeter Prompt:",
  },
  fr: {
    title: "Rencontrez Votre",
    subtitle: "IA de Recettes Personnelle",
    description: "Tapez simplement quelques ingrédients en utilisant le format ingrédient1, ingrédient2, etc., et l'IA de Recettes générera une toute nouvelle recette à la demande...",
    inputPlaceholder: "Ingrédient1, Ingrédient2, Ingrédient3,...etc",
    generateButton: "Générer",
    logoutButton: "Déconnexion",
    loading: "Chargement...",
    logoutSuccess: "Vous avez été déconnecté avec succès",
    logoutError: "Erreur lors de la déconnexion",
    errorOccurred: "Une erreur s'est produite: ",
    noDataReturned: "Aucune donnée retournée",
    promptSentToAI: "Prompt envoyé à l'IA:",
  },
};

export const languageFlags: Record<Language, string> = {
  en: "🇬🇧", // UK flag for English
  nl: "🇳🇱", // Netherlands flag
  de: "🇩🇪", // Germany flag
  fr: "🇫🇷", // France flag
};

export type Language = 'en' | 'nl' | 'de' | 'fr';