import SpeakerWave from '../icons/SpeakerWave'
import ChevronDown from '../icons/ChevronDown'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { TranslatorContext } from '../context/Translator'
import debounce from 'just-debounce-it'
import CopyToClipboard from './CopyToClipboard'
import Exchange from '../icons/Exchange'

function TranslatorInput () {
  const { toTranslateNoDebounce, setToTranslateNoDebounce, toTranslate, setToTranslate, translation, toTranslateLang, setToTranslateLang, translationLang, setTranslationLang } = useContext(TranslatorContext)
  const [activeLangButton, setActiveLangButton] = useState(`btn-from-${toTranslateLang}`)
  const [translationLength, setTranslationLength] = useState(0)
  const selectRef = useRef(null)
  const textareaRef = useRef(null)

  const maxCharacters = 360
  const activeLanguageClass = 'bg-accent'
  const selectOptions = ['btn-from-fr', 'btn-from-ca']

  const handleSelectFocus = () => {
    selectRef.current.selectedIndex = 0
    selectRef.current.blur()
    setToTranslateLang('autodetect')
    setActiveLangButton('btn-from-autodetect')
  }

  const handleActiveLanguage = e => {
    let newToTranslateActiveButton
    if (e.target.tagName === 'SELECT') {
      newToTranslateActiveButton = `btn-from-${e.target.value}`
    } else {
      newToTranslateActiveButton = e.target.id
    }
    setActiveLangButton(newToTranslateActiveButton)

    const newToTranslateLang = e.target.value
    setToTranslateLang(newToTranslateLang)
  }

  const debounceTranslation = useCallback(
    debounce(toTranslate => {
      setToTranslate(toTranslate)
    }, 500),
    [toTranslate]
  )

  const handleTextareaChange = e => {
    const newToTranslate = e.target.value
    setTranslationLength(newToTranslate.length)
    setToTranslateNoDebounce(newToTranslate)
    debounceTranslation(newToTranslate.trim())

    // Dynamically adjust textarea height
    if (newToTranslate.trim() === '') {
      textareaRef.current.style.height = '100%'
    }
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
  }

  const handleClickExchangeButton = () => {
    // Update buttons
    const currentToTranslateLang = toTranslateLang
    const currentTranslationLang = translationLang

    setToTranslateLang(currentTranslationLang)
    setTranslationLang(currentToTranslateLang)

    setActiveLangButton(`btn-to-${toTranslateLang}`)

    // Update text
    const currentTranslation = translation
    setToTranslateNoDebounce(currentTranslation)
  }

  useEffect(() => {
    setActiveLangButton(`btn-from-${toTranslateLang}`)
    if (selectOptions.includes(`btn-from-${toTranslateLang}`)) {
      selectRef.current.value = toTranslateLang
    }
  }, [toTranslateLang])

  return (
    <div className='min-h-65 md:h-96 w-full max-w-[620px] bg-bg-secondary border-b-1 md:border-1 border-accent md:rounded-2xl p-5 text-white text-sm md:text-base flex flex-col transition'>
      <section className='hidden md:flex items-center gap-5 border-b-1 border-accent pb-3'>
        <button id='btn-from-autodetect' className={`lang-button ${activeLangButton === 'btn-from-autodetect' ? activeLanguageClass : ''}`} value='autodetect' onClick={handleActiveLanguage}>Detect Language</button>
        <button id='btn-from-en' className={`lang-button ${activeLangButton === 'btn-from-en' ? activeLanguageClass : ''}`} value='en' onClick={handleActiveLanguage}>English</button>
        <button id='btn-from-es' className={`lang-button ${activeLangButton === 'btn-from-es' ? activeLanguageClass : ''}`} value='es' onClick={handleActiveLanguage}>Spanish</button>
        <div className='relative items-center'>
          <select ref={selectRef} defaultValue='fr' className={`change-lang-button ${selectOptions.includes(activeLangButton) ? activeLanguageClass : ''}`} onChange={handleActiveLanguage} onFocus={handleSelectFocus}>
            <option className='bg-accent' disabled>Select</option>
            <option id='btn-from-fr' className='bg-accent' value='fr'>French</option>
            <option id='btn-from-ca' className='bg-accent' value='ca'>Catalan</option>
          </select>
          <ChevronDown className='size-3 pointer-events-none absolute inset-y-4 right-3 stroke-3' />
        </div>
      </section>
      <section className='md:hidden flex items-center gap-2 border-b-1 border-accent pb-3'>
        <button className='w-full'>English</button>
        <button className='action-button' onClick={handleClickExchangeButton} disabled={toTranslateLang === 'autodetect'}>
          <Exchange className='size-4 md:size-5' />
        </button>
        <button className='w-full'>Spanish</button>
      </section>
      <textarea
        ref={textareaRef}
        placeholder='Write your text here...'
        value={toTranslateNoDebounce}
        maxLength={maxCharacters}
        autoCapitalize='off'
        autoComplete='off'
        autoCorrect='off'
        className='w-full md:h-full pt-4 mb-4 text-2xl focus:outline-none resize-none'
        onChange={handleTextareaChange}
      />
      <section className='flex justify-between items-center'>
        <div className='flex gap-2.5'>
          <button className='action-button' disabled>
            <SpeakerWave className='size-4 md:size-5' />
          </button>
          <CopyToClipboard text={toTranslate} />
        </div>
        <p className='text-right text-secondary'>{translationLength}/{maxCharacters}</p>
      </section>
    </div>
  )
}

export default TranslatorInput
