import SpeakerWave from '../icons/SpeakerWave'
import Copy from '../icons/Copy'
import ChevronDown from '../icons/ChevronDown'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { TranslatorContext } from '../context/Translator'
import debounce from 'just-debounce-it'

function TranslatorInput () {
  const { toTranslate, setToTranslate, toTranslateLang, setToTranslateLang } = useContext(TranslatorContext)
  const [activeLangButton, setActiveLangButton] = useState(`btn-from-${toTranslateLang}`)
  const [translationLength, setTranslationLength] = useState(0)
  const selectRef = useRef(null)

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
    debounceTranslation(newToTranslate.trim())
  }

  useEffect(() => {
    setActiveLangButton(`btn-from-${toTranslateLang}`)
    if (selectOptions.includes(`btn-from-${toTranslateLang}`)) {
      selectRef.current.value = toTranslateLang
    }
  }, [toTranslateLang])

  return (
    <div className='h-96 w-[620px] bg-bg-secondary border-1 border-accent rounded-2xl p-5 text-white flex flex-col transition'>
      <section className='flex gap-5 border-b-1 border-accent pb-3'>
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
      <textarea
        placeholder='Write your text here...'
        maxLength={maxCharacters}
        autoCapitalize='off'
        autoComplete='off'
        autoCorrect='off'
        className='w-full h-full pt-4 text-2xl focus:outline-none resize-none'
        onChange={handleTextareaChange}
      />
      <section className='flex justify-between items-center'>
        <div className='flex gap-2.5'>
          <button className='action-button' disabled>
            <SpeakerWave className='size-5' />
          </button>
          <button className='action-button' disabled>
            <Copy className='size-5' />
          </button>
        </div>
        <p className='text-right text-secondary'>{translationLength}/{maxCharacters}</p>
      </section>
    </div>
  )
}

export default TranslatorInput
