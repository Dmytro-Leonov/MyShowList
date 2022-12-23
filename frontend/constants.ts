export const Category: { [id: number]: string } = {
  1: 'Movie',
  2: 'TV Show',
  3: 'Cartoon',
  4: 'Anime'
};

export const AgeRating: { [id: number]: string } = {
  1: '0+',
  2: '10+',
  3: '13+',
  4: '16+',
  5: '18+'
};

type List = {
  id: number,
  name: string,
  color: string,
}

export const ListType: { [id: number]: List } = {
  1: { id: 1, name: 'Watching',      color: 'bg-purple-500/90'  },
  2: { id: 2, name: 'Plan to Watch', color: 'bg-blue-500/90'   },
  3: { id: 3, name: 'Finished',      color: 'bg-green-500/90' },
  4: { id: 4, name: 'Dropped',       color: 'bg-red-500/90'    },
};

export const PersonType: {[id: number]: string} = {
  1: 'Producer',
  2: 'Writer',
  3: 'Actor'
}

export const maxNameLength: number = 100
