import FiltersBlock from '../components/Filters'
import Show from '../components/SearcShow'
import useInstance from '../hooks/useInstance'
import { Oval } from 'react-loader-spinner'
import { useState, useEffect } from 'react'

export default function Home() {
  const instance = useInstance()

  const perPage = 10

  const [shows, setShows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)
  const [searchParams, setSearchParams] = useState('')

  useEffect(() => {
    setIsLoading(true)
    instance.get(`/shows/?order=-rating&limit=${perPage}&offset=${page * perPage}&${searchParams}`).then(res => {
      if (!firstLoad)
        setShows([...shows, ...res.data.results])
      else
        setShows(res.data.results)
      setIsLoading(false)
      setHasMore(res.data.next != null)
      setFirstLoad(false)
    })
  }, [page, searchParams])

  return (
    <>
      <div className='flex gap-4 w-full'>
        <div className='flex flex-col gap-5 w-4/5 items-center'>
          <div className='grid grid-cols-5 gap-4 grow'>
            {
              (!isLoading || !firstLoad) ?
                shows.length !== 0 ?
                  shows.map(show => {
                    return <Show key={show.slug} show={show} />
                  }) :
                  <div className='col-span-5 flex items-center justify-center '>Nothing found</div> :
                <div className='col-span-5 flex items-center justify-center'>
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
          </div>
          <div>
            {
              (!isLoading && hasMore) &&
              <button onClick={() => setPage(page + 1)} className='p-2 border rounded-md'>Load more...</button>
            }
          </div>
        </div>
        <div className='w-1/5'>
          <FiltersBlock setSearchParams={setSearchParams} setFirstLoad={setFirstLoad} setPage={setPage} setsShows={setShows} />
        </div>
      </div>
    </>
  )
}
