import React from 'react'
import Header from './Header'
import TranslatorInput from './TranslatorInput'
import TranslatorOutput from './TranslatorOutput'

function Layout () {
  return (
    <>
      <Header />
      <div className='h-screen bg-bg-primary pt-24 flex flex-col gap-5 items-center'>
        <Header />
        <section className='flex gap-5'>
          <TranslatorInput />
          <TranslatorOutput />
        </section>
      </div>
    </>
  )
}

export default Layout
