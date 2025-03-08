import Layout from './components/Layout'
import TranslatorProvider from './context/Translator'

function App () {
  return (
    <>
      <TranslatorProvider>
        <Layout />
      </TranslatorProvider>
    </>
  )
}

export default App
