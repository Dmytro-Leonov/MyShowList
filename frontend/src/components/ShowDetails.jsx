import { Category, AgeRating, ListType, PersonType } from '../utils/constants'
import { AiFillStar } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs'
import { MdBookmarks } from 'react-icons/md'
import ShowPerson from './ShowPerson';
import FranchiseDetails from './FranchiseDetails';
import { roundRating } from '../utils/helpers';
import Select from 'react-select'
import { Link } from "react-router-dom";
import useInstance from '../hooks/useInstance';

const GetDateWithLink = ({ date }) => {
  return (
    <p>
      <Link to={`/?year_gte=${date.getFullYear()}&year_lte=${date.getFullYear()}`}>
        <span className='link'>{date.getFullYear()}</span>
      </Link>
      -{('0' + (date.getMonth() + 1)).slice(-2)}-{('0' + date.getDate()).slice(-2)}
    </p>
  )
}



export default function ShowDetails({ show, franchise }) {
  const instance = useInstance()

  const changeList = (selected) => {
    if (selected)
      instance.post('lists/add-show/', { show: show.id, list_type: selected.value })
    else
      instance.delete('lists/delete-show/', { data: { show: show.id } })
  }

  let user_list = null
  const lists = Object.keys(ListType).map((key) => {
    if (key == show.my_list)
      user_list = { value: key, label: ListType[key].name }
    return { value: key, label: ListType[key].name }
  })
  let producers = []
  let actors = []
  let writers = []

  show.people.forEach(show_person => {
    if (PersonType[show_person.person_type] === 'Actor')
      actors.push(show_person.person)
    else if (PersonType[show_person.person_type] === 'Writer')
      writers.push(show_person.person)
    else
      producers.push(show_person.person)
  })

  return (
    <>
      <div className='w-[250px] flex flex-col gap-4'>
        <div className='w-[250px] aspect-[2/3] relative rounded-md overflow-hidden'>
          <img
            src={show.poster}
            alt={show.english_name}
            className='h-full'
          />
        </div>
        <Select
          className="select-container"
          classNamePrefix="select"
          options={lists}
          defaultValue={user_list}
          onChange={changeList}
          isSearchable={false}
          isClearable={true}
          placeholder={'Add To List'}
        />
        <div>
          <h3 className='text-2xl mb-2'>More Information:</h3>
          <div className='grid grid-cols-[max-content_auto] gap-y-1 gap-x-6'>
            

            <div>Age rating:</div>
            <div>
              <Link to={`/?age=${show.age_rating}`} className='block max-w-min'>
                <p className="link">{AgeRating[show.age_rating]}</p>
              </Link>
            </div>

            <div>Premiere date:</div>
            <GetDateWithLink date={new Date(show.premiere_date)} />

            {
              (show.finale_date && show.premiere_date !== show.finale_date) &&
              <>
                <div>Finaly date:</div>
                <GetDateWithLink date={new Date(show.finale_date)} />
              </>
            }

            <div>Duration:</div>
            <p>{show.duration_minutes} minutes</p>

            {
              show.episodes &&
              <>
                <div>Episodes:</div>
                <p>{show.episodes}</p>
              </>
            }

            <div>{show.countries.length > 1 ? 'Countries' : 'Country'}:</div>
            <div className='flex gap-x-3'>
              {
                show.countries.map((country) => {
                  return (
                    <Link to={`/?country=${country.id}`}>
                      <p className='link'>{country.name}</p>
                    </Link>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      <div className='w-full px-5 pt-3'>
        <div className='border-b-[1px] border-light-secondary'>
          <h1 className='text-4xl'>{show.english_name}</h1>
          <h3 className='text-xl text-light-secondary'>{show.alt_names.join(' / ')}</h3>
          <div className='flex py-3 gap-5 items-center text-lg'>
            <div className='bg-yellow-500 hover:text-gray-200 hover:bg-yellow-500/90 transition-colors px-2 py-1 rounded-md text-white flex items-center gap-1 cursor-pointer'>
              <AiFillStar size={20} />
              <span>{roundRating(show.rating)}</span>
            </div>
            <div className='flex items-center gap-1'>
              <BsFillPersonFill size={20} /> {show.times_rated}
            </div>
            <div className='flex items-center gap-1'>
              <MdBookmarks size={20} /> {show.in_lists}
            </div>
            <div>{Category[show.category]}</div>
          </div>
        </div>
        <div className='py-2'>
          <div className='mt-2'>
            {/* <h3 className='text-2xl mb-2'>Description:</h3> */}
            <p>{show.description}</p>
            <div className='grid grid-cols-[max-content_auto] gap-y-1 gap-x-6 my-2'>
              {
                show.slogan &&
                <>
                  <div>Slogan:</div>
                  <p>{show.slogan}</p>
                </>
              }
              <ShowPerson
              people={writers}
              name={'Writer'}
              name_plural={'Writers'}
            />
            <ShowPerson
              people={producers}
              name={'Producer'}
              name_plural={'Producers'}
            />

            <ShowPerson
              people={actors}
              name={'Actor'}
              name_plural={'Actors'}
            />
            </div>

            <div>

              <div className='my-2'>
                <FranchiseDetails franchise={franchise} current_id={show.id} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}