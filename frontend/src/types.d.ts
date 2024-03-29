export interface User {
  _id: string;
  email: string;
  displayName: string;
  token: string;
  role: string;
  avatar: string;
}

export interface Cocktail {
  _id: string;
  name: string;
  image: string;
  isPublished: boolean;
}

export interface CocktailApi {
  _id: string;
  user: string;
  name: string;
  image: string;
  recipe: string;
  ingredients: Ingredient[];
  isPublished: boolean;
}

export interface Ingredient {
  _id: string;
  name: string;
  amount: string;
}

export type IngredientMutation = Omit<Ingredient, '_id'>;

export interface CocktailMutation {
  name: string;
  image: File | null;
  recipe: string;
  ingredients: IngredientMutation[];
}

export interface RegisterMutation {
  email: string;
  displayName: string;
  password: string;
  avatar: File | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

//errors & responses
export interface RegisterResponse {
  user: User;
}

export interface CocktailResponse {
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
