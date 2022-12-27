import { Link } from 'react-router-dom'
import { Category } from '../utils/constants'
import { AiFillStar } from 'react-icons/ai'

export default function ListShow({ show }) {
  return (
    <Link to={`/show/${show.slug}`} className='border-b last:border-none'>
      <div className="grid grid-cols-[max-content_50%_auto_auto] gap-4 w-full items-center py-1 overflow-hidden hover:text-light-secondary">
        <div className='w-14'><img src={show.poster} alt={show.english_name} className={'h-full'} /></div>
        <div>{show.english_name}</div>
        <div>{Category[show.category]}</div>
        <div className='flex gap-1 items-center text-yellow-500/90'><AiFillStar />{show.rating} {show.my_rate ? `(${show.my_rate})` : ''}</div>
      </div>
    </Link>
  )
}