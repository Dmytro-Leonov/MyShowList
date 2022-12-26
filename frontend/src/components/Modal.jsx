import { IoCloseSharp } from 'react-icons/io5'

export default function Modal({ setIsOpened, children }) {
  return (
    <>
      <div onClick={() => setIsOpened(false)} className='absolute top-0 bottom-0 left-0 right-0 bg-dark-secondary/80 z-10' />
      <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
        <div className='p-5 bg-dark-primary rounded-md z-20'>
          <div className='flex flex-row-reverse mb-2'>
            <button onClick={() => setIsOpened(false)} className='group border rounded-md p-2 aspect-square h-8 flex justify-center items-center cursor-pointer select-none'>
              <div className='group-hover:rotate-180 duration-300'>
                <IoCloseSharp size={20} />
              </div>
            </button>
          </div>
          {children}
        </div>
      </div>
    </>

  )
}