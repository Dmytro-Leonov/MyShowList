import { BASE_URL } from '../config'
import { Filters } from '../api/types'
import { AgeRating, Category } from '../constants'
import Select, { useStateManager } from 'react-select'
import { useEffect, useState } from 'react'

export default function FiltersBlock({ filters }: { filters: Filters }) {
  const categories = Object.keys(Category).map((key) => { return { id: key, name: Category[+key] } })
  const ageRatings = Object.keys(AgeRating).map((key) => { return { value: key, label: AgeRating[+key] } })
  let movieGenres: any = []
  let showGenres: any = []
  let cartoonGenres: any = []
  let animeGenres: any = []

  filters.genres.map(genre => {
    if (Category[genre.category] === "Movie")
      movieGenres.push({ value: genre.id, label: genre.name })
    else if (Category[genre.category] === "TV Show")
      showGenres.push({ value: genre.id, label: genre.name })
    else if (Category[genre.category] === "Cartoon")
      cartoonGenres.push({ value: genre.id, label: genre.name })
    else if (Category[genre.category] === "Anime")
      animeGenres.push({ value: genre.id, label: genre.name })
  })

  const [movies, setMovies] = useState(false)
  const [shows, setShows] = useState(false)
  const [cartoons, setCartoons] = useState(false)
  const [anime, setAnime] = useState(false)

  const [selectedMovies, setSelectedMovies] = useState([])
  const [selectedShows, setSelectedShows] = useState([])
  const [selectedCartoons, setSelectedCartoons] = useState([])
  const [selectedAnime, setSelectedAnime] = useState([])

  useEffect(() => {
    const moviesBlock = document.getElementById('movies')
    const showsBlock = document.getElementById('shows')
    const cartoonsBlock = document.getElementById('cartoons')
    const animeBlock = document.getElementById('anime')

    if (moviesBlock)
      if (movies)
        moviesBlock!.style.display = 'block'
      else {
        moviesBlock!.style.display = 'none'
        setSelectedMovies(selectedMovies)
      }

    if (showsBlock)
      if (shows)
        showsBlock!.style.display = 'block'
      else {
        showsBlock!.style.display = 'none'
        setSelectedShows(selectedShows)
      }

    if (cartoonsBlock)
      if (cartoons)
        cartoonsBlock!.style.display = 'block'
      else {
        cartoonsBlock!.style.display = 'none'
        setSelectedCartoons(selectedCartoons)
      }

    if (animeBlock)
      if (anime)
        animeBlock!.style.display = 'block'
      else {
        animeBlock!.style.display = 'none'
        setSelectedAnime(selectedAnime)
      }
    animeBlock!.style.display = anime ? 'block' : 'none'

  }, [movies, shows, cartoons, anime])

  const handleChange = (category: string) => {
    if (category === 'Movie')
      setMovies(!movies)
    else if (category === 'TV Show')
      setShows(!shows)
    else if (category === 'Cartoon')
      setCartoons(!cartoons)
    else if (category === 'Anime')
      setAnime(!anime)
    
    if (movies)
      setSelectedMovies([])
    if (shows)
      setSelectedShows([])
    if (cartoons)
      setSelectedCartoons([])
    if (anime)
      setSelectedAnime([])
  }

  const moviesSelect = (selected: any) => {
    setSelectedMovies(selected)
  }
  const showsSelect = (selected: any) => {
    setSelectedShows(selected)
  }
  const cartoonsSelect = (selected: any) => {
    setSelectedCartoons(selected)
  }
  const animeSelect = (selected: any) => {
    setSelectedAnime(selected)
  }

  return (
    <div className='border p-5 rounded-md'>
      <input type="text" placeholder='Show name' className='bg-dark-primary rounded-md w-full border p-2 focus-visible:border my-2' />
      <div>
        <h3>Choose categories:</h3>
        <div className="grid grid-cols-2">
          {
            categories.map(category => {
              return (
                <label className='select-none'>
                  <input onChange={(selected) => { handleChange(category.name) }} type="checkbox" value={category.id} /> {category.name}
                </label>
              )
            })
          }
        </div>
      </div>

      <div className='my-2'>
        <h3>Age rating:</h3>
        <Select
          isSearchable={false}
          closeMenuOnSelect={false}
          className="select-container"
          classNamePrefix="select"
          options={ageRatings}
          isMulti={true}
          noOptionsMessage={() => "No More Age Ratings"}
        />
      </div>
      <div id='movies' style={{ display: 'none' }}>
        <div className='my-2'>
          <h3>Movie Genres:</h3>
          <Select
            closeMenuOnSelect={false}
            className="select-container"
            classNamePrefix="select"
            options={movieGenres}
            isMulti={true}
            onChange={moviesSelect}
            value={selectedMovies}
            noOptionsMessage={() => "No More Movie Genres"}
          />
        </div>
      </div>

      <div id='shows' style={{ display: 'none' }}>
        <div className="my-2">
          <h3>TV Show Genres:</h3>
          <Select
            closeMenuOnSelect={false}
            className="select-container mb-2"
            classNamePrefix="select"
            options={showGenres}
            isMulti={true}
            onChange={showsSelect}
            value={selectedShows}
            noOptionsMessage={() => "No More TV Show Genres"}
          />
        </div>
      </div>

      <div id='cartoons' style={{ display: 'none' }}>
        <div className="my-2">
          <h3>Cartoon Genres:</h3>
          <Select
            closeMenuOnSelect={false}
            className="select-container mb-2"
            classNamePrefix="select"
            options={cartoonGenres}
            isMulti={true}
            onChange={cartoonsSelect}
            value={selectedCartoons}
            noOptionsMessage={() => "No More Cartoon Genres"}
          />
        </div>
      </div>

      <div id='anime' style={{ display: 'none' }}>
        <div className="my-2">
          <h3>Anime Genres:</h3>
          <Select
            closeMenuOnSelect={false}
            className="select-container mb-2"
            classNamePrefix="select"
            options={animeGenres}
            isMulti={true}
            onChange={animeSelect}
            value={selectedAnime}
            noOptionsMessage={() => "No More Anime Genres"}
          />
        </div>
      </div>
      <button onClick={() => { }} className='border rounded-md p-2 w-full hover:bg-dark-secondary transition-colors duration-300 my-2'>Go</button>
    </div>
  )
}
