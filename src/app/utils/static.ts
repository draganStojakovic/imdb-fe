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

export type AppBarLink = {
  title: string;
  link?: string;
  buttonAction: boolean;
};

export const APP_BAR_AUTH: ReadonlyArray<AppBarLink> = [
  {
    title: 'Home',
    link: ROUTES.MOVIES,
    buttonAction: false,
  },
  {
    title: 'Create Movie',
    link: ROUTES.MOVIES_CREATE,
    buttonAction: false,
  },
  {
    title: 'Watch List',
    link: ROUTES.WATCH_LIST,
    buttonAction: false,
  },
  {
    title: 'Log Out',
    buttonAction: true,
  },
];

export const APP_BAR_GUEST: ReadonlyArray<AppBarLink> = [
  {
    title: 'Log In',
    link: ROUTES.LOGIN,
    buttonAction: false,
  },
  {
    title: 'Register',
    link: ROUTES.REGISTER,
    buttonAction: false,
  },
];
