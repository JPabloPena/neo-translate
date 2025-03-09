import React, { createContext, useEffect, useState } from 'react'

export const TranslatorContext = createContext()

const API_URL = 'https://api.mymemory.translated.net'

function TranslatorProvider ({ children }) {
  const [toTranslateNoDebounce, setToTranslateNoDebounce] = useState('')
  const [toTranslate, setToTranslate] = useState('')
  const [translation, setTranslation] = useState('')
  const [toTranslateLang, setToTranslateLang] = useState('autodetect')
  const [translationLang, setTranslationLang] = useState('es')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchTranslation () {
      if (toTranslate.length === 0) {
        setTranslation('')
        return
      }

      setIsLoading(true)

      if (toTranslateLang === translationLang) {
        setTranslation(toTranslate)
        setIsLoading(false)
        return
      }

      const encodedQuery = encodeURIComponent(toTranslate)
      const response = await fetch(`${API_URL}/get?q=${encodedQuery}&langpair=${toTranslateLang}|${translationLang}`)

      if (!response.ok) throw new Error('Error searching your translation')

      const translationData = await response.json()
      const { responseStatus } = translationData

      if (responseStatus === '403') {
        setTranslation(toTranslate)
        setIsLoading(false)
        return
      }

      const { matches: [{ translation: translatedText }] } = translationData
      setTranslation(translatedText)

      if (toTranslateLang === 'autodetect') {
        const { responseData: { detectedLanguage } } = translationData
        setToTranslateLang(detectedLanguage)
      }

      setIsLoading(false)
    }

    fetchTranslation()
  }, [toTranslate, toTranslateLang, translationLang])

  return (
    <TranslatorContext.Provider value={{
      toTranslateNoDebounce,
      setToTranslateNoDebounce,
      toTranslate,
      setToTranslate,
      translation,
      toTranslateLang,
      setToTranslateLang,
      translationLang,
      setTranslationLang,
      isLoading
    }}
    >
      {children}
    </TranslatorContext.Provider>
  )
}

export default TranslatorProvider
