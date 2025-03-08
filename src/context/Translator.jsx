import React, { createContext, useState } from 'react'

export const TranslatorContext = createContext()

const API_URL = 'https://api.mymemory.translated.net/get?q=Hello%20World!&langpair=Autodetect|it'

function TranslatorProvider ({ children }) {
  const [toTranslate, setToTranslate] = useState('')
  const [toTranslateLang, setToTranslateLang] = useState('autodetect')
  const [translationLang, setTranslationLang] = useState('es')

  return (
    <TranslatorContext.Provider value={{
      toTranslate,
      setToTranslate,
      setToTranslateLang
    }}
    >
      {children}
    </TranslatorContext.Provider>
  )
}

export default TranslatorProvider
