import TranslatorInput from './components/TranslatorInput'
import TranslatorOutput from './components/TranslatorOutput'
import TranslatorProvider from './context/Translator'

function App () {
  return (
    <>
      <TranslatorProvider>
        <div className='h-screen bg-bg-primary flex gap-5 justify-center items-center'>
          <TranslatorInput />
          <TranslatorOutput />
        </div>
      </TranslatorProvider>
    </>
  )
}

export default App
