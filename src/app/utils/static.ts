export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  MOVIES: '/movies',
  MOVIE_DETAILS: '/movies/:id',
  MOVIES_CREATE: '/movies/create',
  MOVIES_CREATE_MANUAL: '/movies/create-manual',
  WATCH_LIST: '/watchlist',
} as const;

export const QUERRY_KEYS = {
  MOVIES: 'movies',
  MOVIE: 'movie',
  GENRES: 'genres',
  VOTE: 'vote',
  COMMENTS: 'comments',
  WATCH_LIST: 'watchlist',
  POPULAR: 'popular',
  RELATED: 'related',
  OMDB: 'omdb',
} as const;
