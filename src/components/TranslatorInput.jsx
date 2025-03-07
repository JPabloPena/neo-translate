import SpeakerWave from '../icons/SpeakerWave'
import Copy from '../icons/Copy'
import ChevronDown from '../icons/ChevronDown'

function TranslatorInput () {
  const activeLanguageClass = 'bg-accent'

  return (
    <div className='h-96 w-[620px] bg-bg-secondary border-1 border-accent rounded-2xl p-5 text-white flex flex-col transition'>
      <section className='flex gap-5 border-b-1 border-accent pb-3'>
        <button className={`lang-button ${activeLanguageClass}`}>Detect Language</button>
        <button className='lang-button'>English</button>
        <button className='lang-button'>Spanish</button>
        <div className='relative items-center'>
          <select className='change-lang-button'>
            <option className='bg-accent'>French</option>
            <option className='bg-accent'>Catalan</option>
          </select>
          <ChevronDown className='size-3 pointer-events-none absolute inset-y-4 right-3 stroke-3' />
        </div>
      </section>
      <textarea
        placeholder='Write your text here...'
        maxLength='500'
        autoCapitalize='off'
        autoComplete='off'
        autoCorrect='off'
        className='w-full h-full pt-4 text-2xl focus:outline-none resize-none'
      />
      <section>
        <p className='text-right text-secondary'>19/500</p>
      </section>
      <section className='flex justify-between'>
        <div className='flex gap-2.5'>
          <button className='action-button'>
            <SpeakerWave className='size-5' />
          </button>
          <button className='action-button'>
            <Copy className='size-5' />
          </button>
        </div>
        <button>Translate</button>
      </section>
    </div>
  )
}

export default TranslatorInput
