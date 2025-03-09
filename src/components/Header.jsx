import Language from '../icons/Language'
import Moon from '../icons/Moon'
import Document from '../icons/Document'

function Header () {
  return (
    <header className='text-primary h-[70px] fixed top-0 z-10 w-full px-8 bg-bg-primary flex justify-between items-center'>
      <h1 className='flex gap-1 items-center text-2xl italic font-semibold'>
        <Language className='size-7 stroke-2' />
        <span>NeoTranslate</span>
      </h1>
      <section className='flex gap-3'>
        <a href='https://mymemory.translated.net/doc/spec.php' target='_blank' className='action-button-white flex items-center gap-1' rel='noreferrer' disabled>
          <Document className='size-5' />
          <span>API</span>
        </a>
        <button className='action-button' disabled>
          <Moon className='size-5' />
        </button>
      </section>
    </header>
  )
}

export default Header
