import mongoose, { Schema, Types } from 'mongoose';
import { CocktailFields } from '../types';
import User from './User';

const CocktailSchema = new mongoose.Schema<CocktailFields>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist!',
    },
  },
  name: {
    type: String,
    required: [true, 'Name must be present'],
    unique: true,
  },
  image: {
    type: String,
    required: [true, 'Image must be present'],
  },
  recipe: {
    type: String,
    required: [true, 'Recipe must be present'],
  },
  ingredients: {
    type: [
      {
        name: String,
        amount: String,
      },
    ],
    required: true,
    default: [],
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

export default Cocktail;
