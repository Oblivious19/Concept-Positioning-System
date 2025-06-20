import { useState } from 'react';
import '../styles/LanguageSelection.css';

const languages = ['C++', 'Java', 'Python', 'JavaScript'];

const LanguageSelection = () => {
  const [expandedLanguage, setExpandedLanguage] = useState<string | null>(null);

  const handleClick = (language: string) => {
    setExpandedLanguage(expandedLanguage === language ? null : language);
  };

  return (
    <div className="container-fluid min-vh-100 bg-light d-flex flex-column justify-content-center align-items-center">
      <div className="text-center mb-5">
        <h1 className="display-4 text-primary fw-bold">Choose Your Programming Language</h1>
        <p className="lead text-muted">
          Select the programming language you want to learn and start coding today.
        </p>
      </div>

      <div className="row w-100 justify-content-center">
        {languages.map((language) => (
          <div
            key={language}
            className={`col-md-3 m-3 p-4 language-card ${expandedLanguage === language ? 'selected' : ''}`}
            onClick={() => handleClick(language)}
          >
            <h3>{language}</h3>
            <p>
              {expandedLanguage === language
                ? `You selected ${language}`
                : `Click to select ${language}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelection;