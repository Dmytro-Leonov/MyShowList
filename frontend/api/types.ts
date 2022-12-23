type PaginatedResult = {
  count: number
  next: number | null
  previous: number | null
}

export type SearchedShow = {
  english_name: string
  slug: string
  poster: string
  category: number
  rating: number
  premiere_date: string
  finale_date: string | null
  my_list: number | null | undefined
  my_rate: number | null
}

export type ShowsSearch = PaginatedResult & { results: SearchedShow[] }


export type Country = {
  id: number,
  name: string,
}

export type Genre = {
  id: number,
  name: string,
  category: number
}

export type Person = {
  id: number,
  name: string,
}

type ShowPerson = {
  person: Person,
  person_type: number
}

export type DetailedShow = {
  id: number,
  category: number,
  english_name: string,
  slug: string,
  alt_names: string[],
  poster: string,
  age_rating: number,
  premiere_date: string,
  finale_date: string,
  slogan: string | null,
  duration_minutes: number,
  episodes: string,
  description: string
  countries: Country[],
  genres: Genre[],
  rating: number,
  times_rated: number,
  people: ShowPerson[],
  my_list: number | null,
  my_rate: number | null,
  in_lists: number
}

type FranchiseShow = {
  show: {
    id: number
    slug: string
    english_name: string
    premiere_date: string
    rating: number
  },
  watch_order: number
}

export type DetailedFranchise = {
  name: string; 
  shows: FranchiseShow[]
}

export type DetailedShowResponse = {
  show: DetailedShow
  franchise: DetailedFranchise
}

export type Filters = {
  genres: Genre[]
  countries: Country[]
}
