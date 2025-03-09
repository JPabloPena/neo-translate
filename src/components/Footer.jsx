import github from '../assets/github.svg'
import linkedin from '../assets/linkedin.svg'

function Footer () {
  return (
    <footer className='w-full relative flex flex-col py-10 gap-7 bg-bg-primary text-primary after:gradient-line '>
      <div className='flex justify-center gap-10'>
        <p>Developed by ⚡ JPabloPena</p>
      </div>
      <div className='flex justify-center gap-10'>
        <a className='flex items-center gap-1.5 transition-all hover:scale-105' href='https://github.com/JPabloPena/neo-translate'>
          <img src={github} className='w-7' />
          <span>Github</span>
        </a>
        <a className='flex items-center gap-1.5 transition-all hover:scale-105' href='https://www.linkedin.com/in/jpablopena/'>
          <img src={linkedin} className='w-7' />
          <span>LinkedIn</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer
