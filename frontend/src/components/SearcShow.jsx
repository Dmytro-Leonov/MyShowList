import { Category, ListType, maxNameLength } from '../utils/constants'
import { AiFillStar } from 'react-icons/ai'
import { roundRating } from '../utils/helpers'
import { Link } from "react-router-dom"


export default function Show({ show }) {
  const premiere_yaer = new Date(show.premiere_date).getFullYear()
  const finale_date = show.finale_date ? new Date(show.finale_date).getFullYear() : null
  return (
    <div className='w-full'>
      <Link to={`show/${show.slug}`} className='flex-col'>
        <div className='rounded-md overflow-hidden relative aspect-[2/3] mb-2'>
          <div className='absolute top-0 right-0 rounded-bl-md text-white z-[1] bg-yellow-500/80 py-[2px]  flex items-center px-1 font-medium gap-[2px]'>
            <AiFillStar size={16} className='' />
            <span>{roundRating(show.rating)}</span>
          </div>
          {
            show.my_rate &&
            <div className='absolute top-8 right-0 rounded-l-md text-white z-[1] bg-green-500/80 py-[2px] flex items-center px-1 font-medium gap-[2px]'>
              <AiFillStar size={16} />
              <span>{show.my_rate}</span>
            </div>
          }

          <img
            src={show.poster}
            alt={show.english_name}
            className='h-full'
          />
          {
            show.my_list &&
            <p className={`absolute bottom-0 w-full m-auto text-center text-white ${ListType[show.my_list].color}`}>
              {ListType[show.my_list].name}
            </p>
          }
        </div>
      </Link>
      <h4>{show.english_name.length > maxNameLength ? `${show.english_name.slice(0, maxNameLength).trim()}...` : show.english_name}</h4>
      <p className='text-light-secondary'>
        {Category[show.category]}&nbsp;
        {
          finale_date ?
            finale_date > premiere_yaer ?
              `${premiere_yaer}-${finale_date}` :
              finale_date === premiere_yaer ?
                `${premiere_yaer}` :
                `${premiere_yaer}-...` :
            `${premiere_yaer}-...`
        }
      </p>
    </div>
  )
}