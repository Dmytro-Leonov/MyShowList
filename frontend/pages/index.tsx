import { Filters } from '../api/types'
import FiltersBlock from '../components/Filters'
import Show from '../components/SearcShow'
import { BASE_URL } from '../config'

const getShows = async () => {
  return (await fetch(`${BASE_URL}shows/`)).json()
}

// export async function getServerSideProps(context: { params: { slug: any } }) {
//   const shows = await getShows()
//   return {
//     props: {
//       shows: shows
//     },
//   }
// }

export async function getStaticProps() {
  const filters: Filters = await (await fetch(`${BASE_URL}shows/filters/`)).json()
  return {
    props: {
      filters: filters
    },
    revalidate: 60,
  }
}

export default function Home({ filters }: { filters: Filters }) {
  return (
    <>
      <div className='grid grid-cols-5 gap-4'>
        <div className='grid grid-cols-5 gap-4 col-span-4'>
          <Show
            english_name={'Violet Evergarden'}
            slug={'violet-evergarden'}
            poster={'http://127.0.0.1:8080/media/posters/2022/12/21/b2d89fc869959bu67b38l.jpg'}
            category={4}
            rating={Math.round((8.66667 + Number.EPSILON) * 100) / 100}
            premiere_date={'2018-01-10'}
            finale_date={'2019-07-18'}
            my_list={1}
            my_rate={10}
          />
          <Show
            english_name={'Violet Evergarden: Eternity and the Auto Memories'}
            slug={'violet-evergarden-eternity-and-the-auto-memories-doll'}
            poster={'http://127.0.0.1:8080/media/posters/2022/12/21/ydec4a159b562tg79o56g.jpg'}
            category={4}
            rating={9.373}
            premiere_date={'2019-09-06'}
            my_list={2}
            my_rate={9}
          />
          <Show
            english_name={'Violet Evergarden'}
            slug={'violet-evergarden'}
            poster={'http://127.0.0.1:8080/media/posters/2022/12/21/b2d89fc869959bu67b38l.jpg'}
            category={4}
            rating={Math.round((8.66667 + Number.EPSILON) * 100) / 100}
            premiere_date={'2018-01-10'}
            finale_date={'2019-07-18'}
            my_list={1}
            my_rate={10}
          />
          <Show
            english_name={'Violet Evergarden: Eternity and the Auto Memories'}
            slug={'violet-evergarden-eternity-and-the-auto-memories-doll'}
            poster={'http://127.0.0.1:8080/media/posters/2022/12/21/ydec4a159b562tg79o56g.jpg'}
            category={4}
            rating={9.373}
            premiere_date={'2019-09-06'}
            my_list={2}
            my_rate={9}
          />
          <Show
            english_name={'Violet Evergarden'}
            slug={'violet-evergarden'}
            poster={'http://127.0.0.1:8080/media/posters/2022/12/21/b2d89fc869959bu67b38l.jpg'}
            category={4}
            rating={Math.round((8.66667 + Number.EPSILON) * 100) / 100}
            premiere_date={'2018-01-10'}
            finale_date={'2019-07-18'}
            my_list={1}
            my_rate={10}
          />
          <Show
            english_name={'Violet Evergarden: Eternity and the Auto Memories'}
            slug={'violet-evergarden-eternity-and-the-auto-memories-doll'}
            poster={'http://127.0.0.1:8080/media/posters/2022/12/21/ydec4a159b562tg79o56g.jpg'}
            category={4}
            rating={9.373}
            premiere_date={'2019-09-06'}
            my_list={2}
            my_rate={9}
          />
        </div>
        <div className='w-full'>
          <FiltersBlock filters={{ ...filters }} />
        </div>
      </div>

    </>
  )
}
