import { Category, AgeRating, ListType, PersonType, Ratings } from '../utils/constants'
import { AiFillStar, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs'
import { MdBookmarks } from 'react-icons/md'
import ShowPerson from './ShowPerson';
import FranchiseDetails from './FranchiseDetails';
import { roundRating } from '../utils/helpers';
import Select from 'react-select'
import useInstance from '../hooks/useInstance';
import Modal from './Modal'
import { useRef, useState } from 'react';
import { UserContext } from '../UserContext';
import { useContext } from 'react';
import CommentsBlock from './CommentsBlock'
import { useQuery } from '@tanstack/react-query'
import CommentForm from './CommentForm'

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

  const [isOpened, setIsOpened] = useState(false)

  const rateShow = (rating) => {
    if (myRate !== rating) {
      instance.post('shows/show/rate/', { show: show.id, rating: rating })
      setMyRate(rating)
    }
    else {
      instance.delete('shows/show/rate/', { data: { show: show.id } })
      setMyRate(null)
    }
    setIsOpened(false)

  }

  const [myRate, setMyRate] = useState(show.my_rate)
  const { user, } = useContext(UserContext)

  const { data: comments, isLoading } = useQuery(
    ["show-comments"],
    () => { return instance.get(`/comments/for-show/${show.id}/?order=-date`).then(res => res.data) },
    { cacheTime: 0, }
  )

  const commentTex = useRef()

  const submitComment = () => {
    const comment = commentTex.current.value.trim()
    if (comment)
      instance.post('comments/', { show: show.id, text: comment })
        .then(res => res.data)
        .then(data => {
          commentTex.current.value = ''
        })
        .catch()
  }

  const cancelComment = () => {
    commentTex.current.value = ''
    setIsCommentFormVisible(!isCommentFormVisible)
  }

  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false)

  return (
    <>
      {
        (isOpened && user) &&
        <Modal
          setIsOpened={setIsOpened}
          children={
            <div className='flex flex-col gap-2 w-[200px]'>
              {
                Ratings.map(rating => {
                  return (
                    <button
                      key={rating.rate}
                      value={rating.rate}
                      onClick={() => rateShow(rating.rate)}
                      className={myRate === rating.rate ? 'w-full text-left py-2 px-5 rounded-md border' : 'w-full text-left py-2 px-5 rounded-md'}
                    >
                      {rating.rate}: {rating.name}
                    </button>
                  )
                })
              }
            </div>

          }
        />
      }
      <div className='w-[250px] flex flex-col gap-4'>
        <div className='w-[250px] aspect-[2/3] relative rounded-md overflow-hidden'>
          <img
            src={show.poster}
            alt={show.english_name}
            className='h-full'
          />
        </div>
        {
          user ?
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
            : <div className='p-2 border select-none border-yellow-200/70 text-center text-yellow-200/70 rounded md'>Sign In to add this shw to list</div>
        }
        <div>
          <h3 className='text-2xl mb-2'>More Information:</h3>
          <div className='grid grid-cols-[max-content_auto] gap-y-1 gap-x-6'>

            <div>Age rating:</div>
            <p>{AgeRating[show.age_rating]}</p>

            <div>Premiere date:</div>
            <p>{show.premiere_date}</p>

            {
              (show.finale_date && show.premiere_date !== show.finale_date) &&
              <>
                <div>Finaly date:</div>
                <p>{show.finale_date}</p>
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
          </div>
        </div>
      </div>
      <div className='w-full px-5 pt-3'>
        <div className='border-b-[1px] border-light-secondary'>
          <h1 className='text-4xl'>{show.english_name}</h1>
          <h3 className='text-xl text-light-secondary'>{show.alt_names.join(' / ')}</h3>
          <div className='flex py-3 gap-5 items-center text-lg'>
            <button onClick={() => setIsOpened(true)} className='bg-yellow-500 hover:text-gray-200 hover:bg-yellow-500/90 transition-colors px-2 py-1 rounded-md text-white flex items-center gap-1 cursor-pointer'>
              <AiFillStar size={20} />
              <span>{roundRating(show.rating)}</span>
            </button>
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
            <h3 className='text-2xl mb-2'>Description:</h3>
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
              <div>{show.countries.length > 1 ? 'Countries' : 'Country'}:</div>
              <p>
                {
                  show.countries.map((country) => {
                    return (
                      country.name
                    )
                  }).join(', ')
                }
              </p>
            </div>

            <div className='my-2'>
              <FranchiseDetails franchise={franchise} current_id={show.id} />
            </div>
            <div className="flex gap-4 items-center">
              <h3 className='text-2xl mb-2'>Comments:</h3>
              {
                !isCommentFormVisible &&
                <AiOutlinePlusCircle onClick={() => setIsCommentFormVisible(!isCommentFormVisible)} size={25} className='cursor-pointer hover:rotate-180 transition-transform' />
              }
            </div>
            {
              isCommentFormVisible &&
              <CommentForm
                textRef={commentTex}
                onCancel={cancelComment}
                onSubmit={submitComment}
                cancelText={'Cancel'}
                submitText={'Send'}
              />
            }
            {
              !isLoading &&
              comments.results.length !== 0 &&
              <CommentsBlock comments={comments} />
            }
          </div>
        </div>
      </div>
    </>
  );
}