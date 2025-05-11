import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Loader, Placeholder } from "@aws-amplify/ui-react";
import "./App.css";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
import { translations, languageFlags, type Language } from "./translations";


import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const amplifyClient = generateClient<Schema>({
  authMode: "userPool",
});

function App() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<Language>("nl");
  const [prompt, setPrompt] = useState<string>("");
  
  // Get translations for the current language
  const t = translations[language];
  
  // Load saved language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "nl" || 
        savedLanguage === "de" || savedLanguage === "fr")) {
      setLanguage(savedLanguage as Language);
    }
  }, []);
  
  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("preferredLanguage", language);
  }, [language]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setPrompt("");
    setResult("");

    try {
      const formData = new FormData(event.currentTarget);
      const ingredientsInput = formData.get("ingredients")?.toString() || "";
      
      // Split ingredients by commas to create a proper array
      const ingredientsList = ingredientsInput.split(',').map(item => item.trim()).filter(item => item);
      
      const { data, errors } = await amplifyClient.queries.askBedrock({
        ingredients: ingredientsList.length > 0 ? ingredientsList : [""],
        language: language // Pass the current language to the API
      });

      if (!errors) {
        setResult(data?.body || t.noDataReturned);
        // Set the prompt that was sent to the AI
        if (data?.prompt) {
          setPrompt(data.prompt);
        }
      } else {
        console.log(errors);
      }

  
    } catch (e) {
      alert(`${t.errorOccurred}${e}`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      // You might want to redirect or update UI state after logout
      alert(t.logoutSuccess);
    } catch (error) {
      console.error("Error signing out: ", error);
      alert(t.logoutError);
    }
  };
  
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className="app-container">
      <div className="language-selector">
        {(Object.keys(languageFlags) as Language[]).map((lang) => (
          <button
            key={lang}
            className={`language-button ${language === lang ? 'active' : ''}`}
            onClick={() => changeLanguage(lang)}
            title={lang === 'en' ? 'English' : lang === 'nl' ? 'Nederlands' : lang === 'de' ? 'Deutsch' : 'Français'}
          >
            {languageFlags[lang]}
          </button>
        ))}
      </div>
      <div className="header-container">
        <h1 className="main-header">
          {t.title}
          <br />
          <span className="highlight">{t.subtitle}</span>
        </h1>
        <p className="description">
          {t.description}
        </p>
      </div>
      <form onSubmit={onSubmit} className="form-container">
        <div className="search-container">
          <input
            type="text"
            className="wide-input"
            id="ingredients"
            name="ingredients"
            placeholder={t.inputPlaceholder}
          />
          <button type="submit" className="search-button">
            {t.generateButton}
          </button>
          <button 
            type="button" 
            className="search-button" 
            onClick={handleLogout}
          >
            {t.logoutButton}
          </button>
        </div>
      </form>
      <div className="result-container">
        {loading ? (
          <div className="loader-container">
            <p>{t.loading}</p>
            <Loader size="large" />
            <Placeholder size="large" />
            <Placeholder size="large" />
            <Placeholder size="large" />
          </div>
        ) : (
          <>
            {prompt && (
              <div className="prompt-container">
                <h3>{t.promptSentToAI}</h3>
                <p className="prompt">{prompt}</p>
              </div>
            )}
            {result && <p className="result">{result}</p>}
          </>
        )}
      </div>
    </div>
  );
}

export default App;