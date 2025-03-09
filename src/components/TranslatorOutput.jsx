import SpeakerWave from '../icons/SpeakerWave'
import Exchange from '../icons/Exchange'
import ChevronDown from '../icons/ChevronDown'
import { useContext, useEffect, useRef, useState } from 'react'
import { TranslatorContext } from '../context/Translator'
import CopyToClipboard from './CopyToClipboard'

function TranslatorOutput () {
  const { setToTranslateNoDebounce, translation, toTranslateLang, setToTranslateLang, translationLang, setTranslationLang } = useContext(TranslatorContext)
  const [activeLangButton, setActiveLangButton] = useState('btn-to-es')
  const selectRef = useRef(null)

  const activeLanguageClass = 'bg-accent'
  const selectOptions = ['btn-to-fr', 'btn-to-ca']

  const handleSelectFocus = () => {
    selectRef.current.selectedIndex = 0
    selectRef.current.blur()
    setTranslationLang('en')
    setActiveLangButton('btn-to-en')
  }

  const handleActiveLanguage = e => {
    let newToTranslateActiveButton
    if (e.target.tagName === 'SELECT') {
      newToTranslateActiveButton = `btn-to-${e.target.value}`
    } else {
      newToTranslateActiveButton = e.target.id
    }
    setActiveLangButton(newToTranslateActiveButton)

    const newToTranslateLang = e.target.value
    setTranslationLang(newToTranslateLang)
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
    if (selectOptions.includes(`btn-to-${translationLang}`)) {
      selectRef.current.value = translationLang
    }
  }, [translationLang])

  return (
    <div className='h-96 w-[620px] bg-bg-secondary border-1 border-accent rounded-2xl p-5 text-white flex flex-col transition'>
      <section className='flex justify-between items-center border-b-1 border-accent pb-3'>
        <div className='flex gap-5'>
          <button id='btn-to-en' className={`lang-button ${activeLangButton === 'btn-to-en' ? activeLanguageClass : ''}`} value='en' onClick={handleActiveLanguage}>English</button>
          <button id='btn-to-es' className={`lang-button ${activeLangButton === 'btn-to-es' ? activeLanguageClass : ''}`} value='es' onClick={handleActiveLanguage}>Spanish</button>
          <div className='relative items-center'>
            <select ref={selectRef} defaultValue='fr' className={`change-lang-button ${selectOptions.includes(activeLangButton) ? activeLanguageClass : ''}`} onChange={handleActiveLanguage} onFocus={handleSelectFocus}>
              <option className='bg-accent' disabled>Select</option>
              <option id='btn-to-fr' className='bg-accent' value='fr'>French</option>
              <option id='btn-to-ca' className='bg-accent' value='ca'>Catalan</option>
            </select>
            <ChevronDown className='size-3 pointer-events-none absolute inset-y-4 right-3 stroke-3' />
          </div>
        </div>
        <button className='action-button' onClick={handleClickExchangeButton} disabled={toTranslateLang === 'autodetect'}>
          <Exchange className='size-5' />
        </button>
      </section>
      <textarea
        disabled
        value={translation}
        className={`w-full h-full pt-4 mb-4 text-2xl resize-none ${translation.length > 0 ? 'hover:cursor-text' : 'hover:cursor-default'}`}
      />
      <section>
        <div className='flex gap-2.5'>
          <button className='action-button' disabled>
            <SpeakerWave className='size-5' />
          </button>
          <CopyToClipboard text={translation} />
        </div>
      </section>
    </div>
  )
}

export default TranslatorOutput
