import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cocktail, CocktailApi } from '../../types';
import axiosApi from '../../axiosApi';
import { axiosRoutes } from '../../utils/constants';

export const fetchCocktails = createAsyncThunk<Cocktail[]>(
  'cocktails/fetchAll',
  async () => {
    const response = await axiosApi.get<Cocktail[]>(axiosRoutes.cocktails);
    return response.data ?? [];
  },
);

export const fetchOne = createAsyncThunk<CocktailApi, string>(
  'cocktails/fetchOne',
  async (id) => {
    const response = await axiosApi.get<CocktailApi>(
      axiosRoutes.cocktails + '/' + id,
    );
    return response.data;
  },
);

export const publishCocktail = createAsyncThunk<void, string>(
  'cocktails/publish',
  async (id) => {
    await axiosApi.patch(`${axiosRoutes.cocktails}/${id}/togglePublished`);
  },
);

export const deleteCocktail = createAsyncThunk<void, string>(
  'cocktails/delete',
  async (id) => {
    await axiosApi.delete(`${axiosRoutes.cocktails}/${id}`);
  },
);
