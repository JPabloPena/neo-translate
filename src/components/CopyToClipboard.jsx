import { useState } from 'react'
import Copy from '../icons/Copy'
import DocumentCheck from '../icons/DocumentCheck'
import copyToClipboard from '../utils/copyToClipboard'

function CopyToClipboard ({ text, disabled }) {
  const [isSuccess, setIsSuccess] = useState(false)

  const handleButtonClick = () => {
    if (text.length === 0) return

    copyToClipboard(text)
    setIsSuccess(true)
    setTimeout(() => {
      setIsSuccess(false)
    }, 1500)
  }

  return (
    <>
      {isSuccess
        ? (
          <button className='success-button'>
            <DocumentCheck className='size-5' />
          </button>
          )
        : (
          <button className='action-button' onClick={handleButtonClick} disabled={disabled}>
            <Copy className='size-5' />
          </button>
          )}
    </>
  )
}

export default CopyToClipboard
