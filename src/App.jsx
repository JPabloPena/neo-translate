import TranslatorInput from './components/TranslatorInput'
import TranslatorOutput from './components/TranslatorOutput'

function App () {
  return (
    <>
      <div className='h-screen bg-bg-primary flex gap-5 justify-center items-center'>
        <TranslatorInput />
        <TranslatorOutput />
      </div>
    </>
  )
}

export default App
