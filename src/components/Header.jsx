import Language from '../icons/Language'
import Moon from '../icons/Moon'

function Header () {
  return (
    <header className='text-primary h-[70px] fixed top-0 z-10 w-full px-8 bg-bg-primary flex justify-between items-center'>
      <h1 className='flex gap-2 items-center text-2xl font-semibold'>
        <Language className='size-7 stroke-1.5' />
        <span>NeoTranslator</span>
      </h1>
      <section>
        <button className='action-button' disabled>
          <Moon className='size-5' />
        </button>
      </section>
    </header>
  )
}

export default Header
