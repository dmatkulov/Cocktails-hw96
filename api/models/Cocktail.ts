import mongoose, { Schema, Types } from 'mongoose';
import { CocktailFields, Ingredient } from '../types';
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
        name: {
          type: String,
          required: [true, 'Name must be present'],
          validate: {
            validator: function (this: Ingredient[], value: string) {
              return this.length > 0 && value.trim() !== '';
            },
            message: 'Name must be present',
          },
        },
        amount: {
          type: String,
          required: [true, 'Amount must be present'],
          validate: {
            validator: function (this: Ingredient[], value: string) {
              return this.length > 0 && value.trim() !== '';
            },
            message: 'Amount must be present',
          },
        },
      },
    ],
    required: true,
    validate: {
      validator: (value: Ingredient[]) => {
        return (
          value.length > 0 &&
          value.every(
            (field) => field.name.length > 0 && field.amount.length > 0,
          )
        );
      },
      message: 'All fields must be filled',
    },
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

export default Cocktail;
