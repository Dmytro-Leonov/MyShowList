import ShowDetails from '../../components/ShowDetails'
import { BASE_URL } from '../../config'
import { DetailedShowResponse } from '../../api/types'

const getShowDetails = async (slug: string) => {
  console.log(slug)
  return await fetch(`${BASE_URL}shows/show/${slug}/`)
}

export async function getServerSideProps(context: { params: { slug: any } }) {
  const { slug } = context.params
  const response = await getShowDetails(slug)

  if (response.status == 404)
    return {notFound: true}
  
  const show = await response.json()
  
  return {
    props: {
      show: show
    }
  }
}


export default function Show({ show }: {show: DetailedShowResponse}) {

  return (
    <>
      <div className='flex'>
        <ShowDetails
          show={{ ...show.show }}
          franchise={{ ...show.franchise }}
        />
      </div>

    </>
  )
}
// {
//   id: 1,
//   category: 4,
//   english_name: 'Violet Evergarden',
//   slug: 'violet-evergarden',
//   alt_names: ['Vaioretto Evāgāden', 'ヴァイオレット・エヴァーガーデン'],
//   poster: 'http://localhost:8080/media/posters/2022/12/21/b2d89fc869959bu67b38l.jpg',
//   age_rating: 4,
//   premiere_date: '2018-01-10',
//   finale_date: '2018-07-18',
//   slogan: 'In the aftermath of a great war, Violet Evergarden, a young female ex-soldier, gets a job at a writers',
//   duration_minutes: 25,
//   episodes: '14',
//   description: "In the aftermath of a great war, Violet Evergarden, a young female ex-soldier, gets a job at a writers' agency and goes on assignments to create letters that can connect people.\r\nAfter four long years of conflict, The Great War has finally come to an end. Caught up in the bloodshed was Violet Evergarden, a young girl raised to be a deadly weapon on the battlefield. Hospitalized and maimed in a bloody skirmish during the War's final leg, she was left with only words from the person she held dearest, but no understanding of their meaning. Recovering from her wounds, Violet starts a new life working at CH Postal Services. There, she witnesses by pure chance the work of an \"Auto Memory Doll\", amanuenses that transcribe people's thoughts and feelings into words on paper. Moved by the notion, Violet begins work as an Auto Memory Doll, a trade that will take her on an adventure, one that will reshape the lives of her clients and hopefully lead to self-discovery.",
//   countries:
//     [
//       {
//         id: 1,
//         name: 'Japan'
//       },
//       {
//         id: 2,
//         name: 'USA'
//       }
//     ],
//   genres:
//     [
//       {
//         id: 1,
//         name: 'Drama',
//         category: 4
//       },
//       {
//         id: 2,
//         name: 'Romance',
//         category: 4
//       },
//       {
//         id: 3,
//         name: 'Fantasy',
//         category: 4
//       }
//     ],
//   rating: ,
//   times_rated: 3,
//   people:
//     [
//       {
//         person: {
//           id: 1,
//           name: 'Taichi Ishidate'
//         },
//         person_type: 1
//       },
//       {
//         person: {
//           id: 2,
//           name: 'Yui Ishikawa'
//         },
//         person_type: 2
//       },
//       {
//         person: {
//           id: 3,
//           name: 'Takehito Koyasu'
//         },
//         person_type: 2
//       }
//     ],
//   my_list: 2,
//   my_rate: 10,
//   in_lists: 1,
// }

// {
//   name: 'Violet Evergarden',
//   shows:
//     [
//       {
//         show: {
//           id: 1,
//           slug: 'violet-evergarden',
//           english_name: 'Violet Evergarden',
//           premiere_date: '2018-01-10',
//           rating: Math.round((8.66667 + Number.EPSILON) * 100) / 100
//         },
//         watch_order: 1
//       },
//       {
//         show: {
//           id: 2,
//           slug: 'violet-evergarden-eternity-and-the-auto-memories-doll',
//           english_name: 'Violet Evergarden: Eternity and the Auto Memories Doll',
//           premiere_date: '2019-09-06',
//           rating: Math.round((10 + Number.EPSILON) * 100) / 100
//         },
//         watch_order: 2
//       }
//     ]
// }