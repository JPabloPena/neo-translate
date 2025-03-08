import React, { createContext, useEffect, useState } from 'react'

export const TranslatorContext = createContext()

const API_URL = 'https://api.mymemory.translated.net'

function TranslatorProvider ({ children }) {
  const [toTranslate, setToTranslate] = useState('')
  const [translation, setTranslation] = useState('')
  const [toTranslateLang, setToTranslateLang] = useState('autodetect')
  const [translationLang, setTranslationLang] = useState('es')

  useEffect(() => {
    async function fetchTranslation () {
      if (toTranslate.length === 0) return

      const encodedQuery = encodeURIComponent(toTranslate)
      const response = await fetch(`${API_URL}/get?q=${encodedQuery}&langpair=${toTranslateLang}|${translationLang}`)

      if (!response.ok) throw new Error('Error searching your translation')

      const translationData = await response.json()
      const { matches: [{ translation: translatedText }] } = translationData
      setTranslation(translatedText)

      if (toTranslateLang === 'autodetect') {
        const { responseData: { detectedLanguage } } = translationData
        setToTranslateLang(detectedLanguage)
      }
    }

    fetchTranslation()
  }, [toTranslate, toTranslateLang, translationLang])

  return (
    <TranslatorContext.Provider value={{
      toTranslate,
      setToTranslate,
      translation,
      toTranslateLang,
      setToTranslateLang,
      translationLang,
      setTranslationLang
    }}
    >
      {children}
    </TranslatorContext.Provider>
  )
}

export default TranslatorProvider
