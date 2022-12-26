import { VscTriangleRight } from 'react-icons/vsc'
import { AiFillStar } from 'react-icons/ai';
import { roundRating } from '../utils/helpers';
import { Link } from "react-router-dom";

export default function FranchiseDetails({franchise, current_id}) {
  return (
    <>
      {
        franchise.shows.length != 0 &&
        <>
          <h3 className='text-2xl mb-2'>{franchise.name}:</h3>
          <div className='flex flex-col gap-2 text-ligh'>
            {
              franchise?.shows?.map(franchise_show => {
                return (
                  <Link key={franchise_show.show.id} to={`/show/${franchise_show.show.slug}`}>
                    <div className='w-full border radius-md py-2 px-4 flex items-center gap-4 rounded-md hover:text-light-secondary transition-colors'>
                      <div>
                        {franchise_show.watch_order}
                      </div>
                      <div className='grow flex items-center gap-2'>
                        {franchise_show.show.id === current_id && <VscTriangleRight />}
                        {franchise_show.show.english_name}
                      </div>
                      <div>
                        {new Date(franchise_show.show.premiere_date).getFullYear()}
                      </div>
                      <div className='w-20'>
                        <div className='px-2 py-1 rounded-md flex items-center gap-1'>
                          <AiFillStar />
                          <span>{roundRating(franchise_show.show.rating)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })
            }
          </div>
        </>
      }
    </>
  );
}