import { useContext } from 'react';
import { UserContext } from '../UserContext';
import useInstance from '../hooks/useInstance';
import { useState, useRef } from 'react'
import { ListType } from '../utils/constants'
import { useQuery } from '@tanstack/react-query'
import PageNotFound from './404';
import ListShow from '../components/ListShow'
import { Oval } from 'react-loader-spinner'
import Modal from '../components/Modal'
import pic from '../assets/default_user_avatar.png'

export default function Profile() {
  const instance = useInstance()
  const { user, setUser } = useContext(UserContext)
  const [tab, setTab] = useState(1)
  const [isOpened, setIsOpened] = useState(false)
  const lists = Object.keys(ListType).map((key) => {
    return { value: key, label: ListType[key].name }
  })

  const { data: listsCount, isLoading: listsCountLoading } = useQuery(
    ['listsCount'],
    () => { return instance.get(`/lists/lists-show-count/`).then(res => res.data) },
    {
      cacheTime: 0
    }
  )

  const { data: userShows, isLoading: userShowsLoading, refetch } = useQuery(
    ['userShows', tab],
    () => { return instance.post(`/lists/list/`, { list_type: tab }).then(res => res.data) },
    {
      cacheTime: 0
    }
  )

  const fullName = useRef(null)
  const picture = useRef(null)
  const deletePicture = useRef(null)

  const editProfile = async () => {
    let data = new FormData()
    if (fullName.current.value) {
      data.append('full_name', fullName.current.value)
      const files = picture.current?.files
      if (files.length !== 0)
        data.append('picture', files[0])
      data.append('delete_picture', deletePicture.current.checked)
      await instance.post(
        '/users/current/',
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      window.location.reload()
    }
  }

  return (
    user ?
      <>
        {
          isOpened &&
          <Modal
            setIsOpened={setIsOpened}
            children={
              <form onSubmit={e => { e.preventDefault() }}>
                <div className='flex flex-col gap-2 items-start'>
                  <div className='flex flex-col w-full'>
                    <label htmlFor="full_name">Full name:</label>
                    <input ref={fullName} id='full_name' value={user.full_name} type="text" placeholder='Full name' className='bg-dark-primary rounded-md border p-2 focus-visible:border' />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="picture">Picture:</label>
                    <input ref={picture} id='picture' type="file" accept='.png,.jpg' className='p-2 text-center border rounded md' />
                  </div>

                  <div className='flex gap-2'>
                    <input ref={deletePicture} id='delete_picture' type="checkbox" />
                    <label htmlFor="delete_picture">Delete my picture</label>
                  </div>

                </div>
                <div className='flex flex-row-reverse'>
                  <button onClick={() => editProfile()} type='submit' className='p-2 text-center mt-3 border rounded md'>Edit Profile</button>
                </div>
              </form>
            }
          />
        }
        <div className="flex w-full gap-5">
          <div className='w-1/4 rounded-md'>
            {
              user.picture ?
                <img src={user.picture} alt="Profile pic" className='w-full' />
                : <img src={pic} alt="Profile pic" className='w-full' />
            }
          </div>
          <div className='w-3/4'>
            <div className='flex items-center gap-4'>
              <h3 className='text-5xl uppercase'>{user.full_name}</h3>
              <button onClick={() => setIsOpened(true)} className='p-2 text-center mt-3 border rounded md'>Edit Profile</button>
            </div>
            <p className='text-xl'>{user.email}</p>
            {
              !listsCountLoading ?
                <>
                  <div className='mt-5 flex'>
                    {
                      lists.map(list => {
                        return (
                          <button
                            onClick={() => { refetch(); setTab(list.value); }} key={list.value} value={list.value}
                            className={tab == list.value ? 'py-2 px-5 border-y' : 'py-2 px-5'}
                          >
                            {list.label} ({listsCount.find(lista => lista.list_type == list.value)?.show_count || 0})
                          </button>
                        )
                      })
                    }
                  </div>

                  {
                    !userShowsLoading ?
                      userShows.length != 0 ?
                        <div className="flex flex-col mt-4 ">
                          {userShows.map(show => <ListShow key={show.id} show={{ ...show }} />)}
                        </div>
                        : null
                      : <div className='flex justify-center mt-4'>
                        <Oval
                          height={80}
                          width={80}
                          color="hsl(0deg 0% 100% / 77%)"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                          ariaLabel='oval-loading'
                          secondaryColor="hsl(0deg 0% 100% / 60%)"
                          strokeWidth={2}
                          strokeWidthSecondary={2}
                        />
                      </div>
                  }

                </> :
                <div></div>
            }
          </div>
        </div>
      </>
      : <PageNotFound />
  )
}