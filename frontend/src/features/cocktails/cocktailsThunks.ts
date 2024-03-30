import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Cocktail,
  CocktailApi,
  CocktailMutation,
  CocktailResponse,
  ValidationError,
} from '../../types';
import axiosApi from '../../utils/axiosApi';
import { axiosRoutes } from '../../utils/constants';
import { isAxiosError } from 'axios';

export const fetchCocktails = createAsyncThunk<Cocktail[]>(
  'cocktails/fetchAll',
  async () => {
    const response = await axiosApi.get<Cocktail[]>(axiosRoutes.cocktails);
    return response.data ?? [];
  },
);

export const fetchByAuthor = createAsyncThunk<Cocktail[], string>(
  'cocktails/fetchByAuthor',
  async (id) => {
    const url = axiosRoutes.cocktails + '?author=' + id;
    const response = await axiosApi.get<Cocktail[]>(url);

    return response.data ?? [];
  },
);

export const createCocktail = createAsyncThunk<
  CocktailResponse,
  CocktailMutation,
  { rejectValue: ValidationError }
>('cocktails/create', async (cocktailMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    formData.append('name', cocktailMutation.name);
    formData.append('recipe', cocktailMutation.recipe);
    formData.append(
      'ingredients',
      JSON.stringify(cocktailMutation.ingredients),
    );

    if (cocktailMutation.image) {
      formData.append('image', cocktailMutation.image);
    }

    const response = await axiosApi.post(axiosRoutes.cocktails, formData);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const fetchOne = createAsyncThunk<CocktailApi, string>(
  'cocktails/fetchOne',
  async (id) => {
    const response = await axiosApi.get<CocktailApi>(
      axiosRoutes.cocktails + '/' + id,
    );
    return response.data;
  },
);

export const publishCocktail = createAsyncThunk<CocktailResponse, string>(
  'cocktails/publish',
  async (id) => {
    const response = await axiosApi.patch(
      `${axiosRoutes.cocktails}/${id}/togglePublished`,
    );
    return response.data;
  },
);

export const deleteCocktail = createAsyncThunk<void, string>(
  'cocktails/delete',
  async (id) => {
    await axiosApi.delete(`${axiosRoutes.cocktails}/${id}`);
  },
);
