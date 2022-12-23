import { BASE_URL } from '../config'
import { Filters } from '../api/types'
import { Category } from '../constants'
import Select from 'react-select'

const colorTheme = () => {
  return {
    borderRadius: '0.375rem',
    colors: (colors: any) => ({
      ...colors,
    }),
    spacing: (spacing: any) => ({
      ...spacing,
    })
  }
}

export default function FiltersBlock({ filters }: { filters: Filters }) {
  let movieGenres: any = []
  let showGenres: any = []
  let cartoonGenres: any = []
  let animeGenres: any = []

  filters.genres.map(genre => {
    if (Category[genre.category] === "Movie")
      movieGenres.push({ value: genre.id, label: genre.name })
    else if (Category[genre.category] === "Tv Show")
      showGenres.push({ value: genre.id, label: genre.name })
    else if (Category[genre.category] === "Cartoon")
      cartoonGenres.push({ value: genre.id, label: genre.name })
    else if (Category[genre.category] === "Anime")
      animeGenres.push({ value: genre.id, label: genre.name })
  })

  return (
    <div className='border p-5 rounded-md'>
      <h3>Movie Genres:</h3>
      <Select
        closeMenuOnSelect={false}
        className="select-container"
        classNamePrefix="select"
        options={movieGenres}
        isMulti={true}
        noOptionsMessage={() => "No More Movie Genres"}
      />
      <h3>Tv show genres:</h3>
      <Select
        closeMenuOnSelect={false}
        className="select-container"
        classNamePrefix="select"
        options={showGenres}
        isMulti={true}
        noOptionsMessage={() => "No More TV Show Genres"}
      />
      <h3>Cartoon genres:</h3>
      <Select
        closeMenuOnSelect={false}
        className="select-container"
        classNamePrefix="select"
        options={cartoonGenres}
        isMulti={true}
        noOptionsMessage={() => "No More Cartoon Genres"}
      />
      <h3>Anime genres:</h3>
      <Select
        closeMenuOnSelect={false}
        className="select-container"
        classNamePrefix="select"
        options={animeGenres}
        isMulti={true}
        noOptionsMessage={() => "No More Anime Genres"}
      />
    </div>
  )
}
