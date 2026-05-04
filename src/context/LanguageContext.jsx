import { createContext, useContext, useState } from 'react'
import en from '../translations/en'
import id from '../translations/id'

const translations = { en, id }
const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')

  const toggleLang = () => {
    const next = lang === 'en' ? 'id' : 'en'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
