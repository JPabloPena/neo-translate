import React from 'react'
import Header from './Header'
import TranslatorInput from './TranslatorInput'
import TranslatorOutput from './TranslatorOutput'
import Footer from './Footer'

function Layout () {
  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <div className='flex-1 bg-bg-primary pt-25 pb-15 px-15 flex flex-col gap-5 items-center'>
        <section className='w-full flex flex-col lg:flex-row justify-center items-center gap-5'>
          <TranslatorInput />
          <TranslatorOutput />
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
