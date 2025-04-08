import React, { useState, useEffect, ReactNode } from 'react';
import { Language, translations } from '../i18n/translation';
import { LanguageContext } from '../contexts/LanguageContext';

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'vi' || savedLanguage === 'en')
      ? savedLanguage
      : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, params?: Record<string, string | number>): string => {
    const translation = translations[key]?.[language] || key;
    if (params) {
      return Object.entries(params).reduce((result, [param, value]) => {
        return result.replace(`\${${param}}`, String(value));
      }, translation);
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};