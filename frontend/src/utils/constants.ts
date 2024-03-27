export const apiURL = 'http://localhost:8000';
export const GOOGLE_CLIENT_ID = import.meta.env[
  'VITE_GOOGLE_CLIENT_ID'
] as string;

export const axiosRoutes = {
  users: '/users',
  sessions: '/users/sessions',
  google: '/users/google',
  cocktails: '/cocktails',
};

export const routes = {
  home: '/',
  register: '/register',
  login: '/login',
  newCocktail: '/new-cocktail',
  userCocktail: '/my-cocktails',
};
