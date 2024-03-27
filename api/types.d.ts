import mongoose, { Model } from 'mongoose';

/* Schema Fields */
export interface UserFields {
  email: string;
  displayName: string;
  avatar: string | null;
  password: string;
  role: string;
  googleID?: string;
  token: string;
}

export interface CocktailFields {
  user: mongoose.Types.ObjectId;
  name: string;
  image: string;
  recipe: string;
  ingredients: Ingredient[];
  isPublished: boolean;
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface CocktailMutation {
  user: mongoose.Types.ObjectId | undefined;
  name: string;
  image: string | null;
  recipe: string;
  ingredients: Ingredient[];
}

/* Schema Methods */

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

type UserModel = Model<UserFields, unknown, UserMethods>;
