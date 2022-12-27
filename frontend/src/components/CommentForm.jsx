import { useRef } from 'react'

export default function CommentForm({ textRef, onCancel, onSubmit, cancelText, submitText }) {
  const commentText = useRef(null)

  return (
    <div>
      <div className='flex'>
        <textarea
          maxLength={2000}
          ref={textRef}
          id='commentText'
          type="text"
          placeholder='Your comment here'
          className='grow max-h-32 min-h-[6rem] bg-dark-primary rounded-md border p-2 focus-visible:border'
        />

      </div>
      <div className='flex gap-4'>
        <button onClick={() => onCancel()} className='p-2 text-center text-dark-primary bg-light-primary mt-3 rounded-md hover:bg-light-secondary transition-colors'>{cancelText}</button>
        <button onClick={() => onSubmit()} className='p-2 text-center mt-3 border rounded md hover:bg-dark-secondary transition-colors'>{submitText}</button>
      </div>
    </div>
  )
}