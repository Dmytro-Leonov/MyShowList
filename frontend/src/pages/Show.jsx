import ShowDetails from '../components/ShowDetails'
import { useQuery } from '@tanstack/react-query'
import useInstance from '../hooks/useInstance'
import { useParams } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'


export default function Show() {
  const { slug } = useParams()
  const instance = useInstance()

  const { data, isLoading } = useQuery(
    [slug],
    () => { return instance.get(`/shows/show/${slug}/`).then(res => res.data) },
    { cacheTime: 0 }
  )

  return (
    <>
      {
        !isLoading ?
          <ShowDetails
            show={{ ...data.show }}
            franchise={{ ...data.franchise }}
          /> :
          <div className='flex items-center justify-center w-full'>
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

    </>
  )
}