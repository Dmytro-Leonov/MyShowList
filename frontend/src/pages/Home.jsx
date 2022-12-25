import FiltersBlock from '../components/Filters'
import Show from '../components/SearcShow'
import useInstance from '../hooks/useInstance'
import { useQuery } from '@tanstack/react-query'
import { Oval } from 'react-loader-spinner'

export default function Home() {
  const instance = useInstance()

  const { data, isLoading } = useQuery(['search'], () => { return instance.get(`/shows/`).then(res => res.data) }, {cacheTime: 0})

  return (
    <>
      <div className='flex gap-4 w-full'>
        <div className='grid grid-cols-5 gap-4 w-4/5'>
          {
            !isLoading ?
              data.results.map(show => {
                return <Show key={show.slug} show={show} />
              }) :
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
        <div className='w-1/5'>
          <FiltersBlock />
        </div>
      </div>

    </>
  )
}
