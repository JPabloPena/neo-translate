import SpeakerWave from '../icons/SpeakerWave'
import Copy from '../icons/Copy'
import Exchange from '../icons/Exchange'
import ChevronDown from '../icons/ChevronDown'

function TranslatorOutput () {
  const activeLanguageClass = 'bg-accent'

  return (
    <div className='h-96 w-[620px] bg-bg-secondary border-1 border-accent rounded-2xl p-5 text-white flex flex-col transition'>
      <section className='flex justify-between items-center border-b-1 border-accent pb-3'>
        <div className='flex gap-5'>
          <button className='lang-button'>English</button>
          <button className={`lang-button ${activeLanguageClass}`}>Spanish</button>
          <div className='relative items-center'>
            <select className='change-lang-button'>
              <option className='bg-accent'>French</option>
              <option className='bg-accent'>Catalan</option>
            </select>
            <ChevronDown className='size-3 pointer-events-none absolute inset-y-4 right-3 stroke-3' />
          </div>
        </div>
        <button className='action-button'>
          <Exchange className='size-5' />
        </button>
      </section>
      <textarea
        disabled
        className='w-full h-full pt-4 mb-4 text-2xl resize-none'
      />
      <section>
        <div className='flex gap-2.5'>
          <button className='action-button'>
            <SpeakerWave className='size-5' />
          </button>
          <button className='action-button'>
            <Copy className='size-5' />
          </button>
        </div>
      </section>
    </div>
  )
}

export default TranslatorOutput
