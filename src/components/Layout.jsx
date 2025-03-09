import React from 'react'
import Header from './Header'
import TranslatorInput from './TranslatorInput'
import TranslatorOutput from './TranslatorOutput'
import Footer from './Footer'

function Layout () {
  return (
    <>
      <Header />
      <div className='h-screen bg-bg-primary pt-25 flex flex-col gap-5 items-center'>
        <section className='flex gap-5'>
          <TranslatorInput />
          <TranslatorOutput />
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Layout
