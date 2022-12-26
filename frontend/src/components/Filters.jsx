import { AgeRating, Category } from '../utils/constants'
import Select from 'react-select'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'



export default function FiltersBlock({ setSearchParams, setFirstLoad, setPage }) {
  const [filters, setFilters] = useState()

  const getFilters = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/shows/filters/`)
    setFilters(res.data)
  }

  useEffect(() => {
    getFilters()
  }, [])

  useEffect(() => {
    if (filters instanceof Object) {
      filters.genres.map(genre => {
        if (Category[genre.category] === "Movie")
          movieGenres.current.push({ value: genre.id, label: genre.name })
        else if (Category[genre.category] === "TV Show")
          showGenres.current.push({ value: genre.id, label: genre.name })
        else if (Category[genre.category] === "Cartoon")
          cartoonGenres.current.push({ value: genre.id, label: genre.name })
        else if (Category[genre.category] === "Anime")
          animeGenres.current.push({ value: genre.id, label: genre.name })
      })

      filters.countries.map(country => countries.current.push({ value: country.id, label: country.name }))
    }

    return () => {
      movieGenres.current = []
      showGenres.current = []
      cartoonGenres.current = []
      animeGenres.current = []
      countries.current = []
    }
  }, [filters])

  const animeGenres = useRef([])
  const movieGenres = useRef([])
  const showGenres = useRef([])
  const cartoonGenres = useRef([])

  const countries = useRef([])

  const categories = Object.keys(Category).map((key) => { return { id: key, name: Category[+key] } })
  const ageRatings = Object.keys(AgeRating).map((key) => { return { value: key, label: AgeRating[+key] } })

  const [movies, setMovies] = useState(false)
  const [shows, setShows] = useState(false)
  const [cartoons, setCartoons] = useState(false)
  const [anime, setAnime] = useState(false)

  const showName = useRef(null)
  const yearGTE = useRef(null)
  const yearLTE = useRef(null)

  const [selectedAgeRatings, setSelectedAgeRatings] = useState([])

  const [selectedCountries, setSelectedCountries] = useState([])

  const [selectedMovies, setSelectedMovies] = useState([])
  const [selectedShows, setSelectedShows] = useState([])
  const [selectedCartoons, setSelectedCartoons] = useState([])
  const [selectedAnime, setSelectedAnime] = useState([])




  // const doFiltering = () => {
  //   console.log(
  //     showName, 
  //     movies,
  //     shows,
  //     cartoons,
  //     anime,
  //     selectedAgeRatings, 
  //     selectedCountries, 
  //     selectedMovies, 
  //     selectedShows, 
  //     selectedCartoons, 
  //     selectedAnime
  //     )

  // }




  useEffect(() => {
    const moviesBlock = document.getElementById('movies')
    const showsBlock = document.getElementById('shows')
    const cartoonsBlock = document.getElementById('cartoons')
    const animeBlock = document.getElementById('anime')

    if (moviesBlock)
      if (movies)
        moviesBlock.style.display = 'block'
      else {
        moviesBlock.style.display = 'none'
        setSelectedMovies(selectedMovies)
      }

    if (showsBlock)
      if (shows)
        showsBlock.style.display = 'block'
      else {
        showsBlock.style.display = 'none'
        setSelectedShows(selectedShows)
      }

    if (cartoonsBlock)
      if (cartoons)
        cartoonsBlock.style.display = 'block'
      else {
        cartoonsBlock.style.display = 'none'
        setSelectedCartoons(selectedCartoons)
      }

    if (animeBlock)
      if (anime)
        animeBlock.style.display = 'block'
      else {
        animeBlock.style.display = 'none'
        setSelectedAnime(selectedAnime)
      }
    animeBlock.style.display = anime ? 'block' : 'none'

  }, [movies, shows, cartoons, anime])

  const handleChange = (category) => {
    if (category === 'Movie') {
      if (movies) setSelectedMovies([])
      setMovies(!movies)
    }
    else if (category === 'TV Show') {
      if (shows) setSelectedShows([])
      setShows(!shows)
    }
    else if (category === 'Cartoon') {
      if (cartoons) setSelectedCartoons([])
      setCartoons(!cartoons)
    }
    else if (category === 'Anime') {
      if (anime) setSelectedAnime([])
      setAnime(!anime)
    }

    if (movies && selectedMovies.length == 0)
      setSelectedMovies([])
    if (shows && selectedShows.length == 0)
      setSelectedShows([])
    if (cartoons && selectedCartoons.length == 0)
      setSelectedCartoons([])
    if (anime && selectedAnime.length == 0)
      setSelectedAnime([])
  }

  const ageRatingsSelect = (selected) => {
    setSelectedAgeRatings(selected)
  }

  const countriesSelect = (selected) => {
    setSelectedCountries(selected)
  }

  const moviesSelect = (selected) => {
    setSelectedMovies(selected)
  }
  const showsSelect = (selected) => {
    setSelectedShows(selected)
  }
  const cartoonsSelect = (selected) => {
    setSelectedCartoons(selected)
  }
  const animeSelect = (selected) => {
    setSelectedAnime(selected)
  }

  const filterShows = () => {
    let query = new URLSearchParams()

    if (showName.current)
      query.append("name", showName.current.value.trim())

    if (movies)
      query.append("category", "1")
    if (shows)
      query.append("category", "2")
    if (cartoons)
      query.append("category", "3")
    if (anime)
      query.append("category", "4")

    selectedAgeRatings.map((ageRating) => {
      query.append("age", ageRating.value)
    })
    selectedCountries.map((country) => {
      query.append("country", country.value)
    })
    const genres = [...selectedMovies, ...selectedShows, ...selectedCartoons, ...selectedAnime]
    genres.map((genre) => {
      query.append('genre_exact', genre.value)
    })

    if (yearGTE.current)
      query.append('year_gte', yearGTE.current.value)
    if (yearLTE.current)
      query.append('year_lte', yearLTE.current.value)

    setSearchParams(query.toString())
    setFirstLoad(true)
    setPage(0)
    console.log(query.toString())
  }

  return (
    <div className='border p-5 rounded-md'>
      <input ref={showName} type="text" placeholder='Show name' className='bg-dark-primary rounded-md w-full border p-2 focus-visible:border my-2' />
      <div>
        <h3>Choose categories:</h3>
        <div className="grid grid-cols-2">
          {
            categories.map(category => {
              return (
                <label key={category.id} className='select-none'>
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
          onChange={ageRatingsSelect}
          isMulti={true}
          noOptionsMessage={() => "No More Age Ratings"}
        />
      </div>
      <div className='my-2'>
        <h3>Countries:</h3>
        <Select
          isSearchable={true}
          closeMenuOnSelect={false}
          className="select-container"
          classNamePrefix="select"
          options={countries.current}
          onChange={countriesSelect}
          isMulti={true}
          noOptionsMessage={() => "No More Countries"}
        />
      </div>
      <div className='grid grid-cols-2 gap-3 my-2'>
        <div>
          <h3>Year <span className='text-green-500'>&ge;</span>:</h3>
          <input ref={yearGTE} type="number" min={1900} max={new Date().getFullYear() + 10} className='bg-dark-primary rounded-md w-full border p-2 focus-visible:border' />
        </div>
        <div className=''>
          <h3>Year <span className='text-red-500'>&le;</span>:</h3>
          <input ref={yearLTE} type="number" min={1900} max={new Date().getFullYear() + 10} className='bg-dark-primary rounded-md w-full border p-2 focus-visible:border' />
        </div>
      </div>
      <div id='movies' style={{ display: 'none' }}>
        <div className='my-2'>
          <h3>Movie Genres:</h3>
          <Select
            closeMenuOnSelect={false}
            className="select-container"
            classNamePrefix="select"
            options={movieGenres.current}
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
            options={showGenres.current}
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
            options={cartoonGenres.current}
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
            options={animeGenres.current}
            isMulti={true}
            onChange={animeSelect}
            value={selectedAnime}
            noOptionsMessage={() => "No More Anime Genres"}
          />
        </div>
      </div>
      <button onClick={filterShows} className='border rounded-md p-2 w-full hover:bg-dark-secondary transition-colors duration-300 my-2'>Go</button>
    </div>
  )
}
