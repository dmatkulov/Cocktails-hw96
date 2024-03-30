import {
  Cocktail,
  CocktailApi,
  CocktailResponse,
  ValidationError,
} from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  createCocktail,
  deleteCocktail,
  fetchByAuthor,
  fetchCocktails,
  fetchOne,
  publishCocktail,
} from './cocktailsThunks';

interface CocktailsState {
  items: Cocktail[];
  item: CocktailApi | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  createError: ValidationError | null;
  deleteLoading: boolean;
  createMessage: CocktailResponse | null;
  publishLoading: boolean;
}

const initialState: CocktailsState = {
  items: [],
  item: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  createError: null,
  createMessage: null,
  publishLoading: false,
  deleteLoading: false,
};

export const cocktailSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {
    hideToastMessage: (state) => {
      state.createMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchCocktails.fulfilled, (state, { payload: cocktails }) => {
        state.fetchLoading = false;
        state.items = cocktails;
      })
      .addCase(fetchCocktails.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(fetchByAuthor.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchByAuthor.fulfilled, (state, { payload: cocktails }) => {
        state.fetchLoading = false;
        state.items = cocktails;
      })
      .addCase(fetchByAuthor.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(fetchOne.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(fetchOne.fulfilled, (state, { payload: cocktail }) => {
        state.fetchOneLoading = false;
        state.item = cocktail;
      })
      .addCase(fetchOne.rejected, (state) => {
        state.fetchOneLoading = false;
      });

    builder
      .addCase(createCocktail.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createCocktail.fulfilled, (state, { payload: message }) => {
        state.createLoading = false;
        state.createMessage = message;
      })
      .addCase(createCocktail.rejected, (state, { payload: error }) => {
        state.createLoading = false;
        state.createError = error || null;
      });

    builder
      .addCase(publishCocktail.pending, (state) => {
        state.publishLoading = true;
      })
      .addCase(publishCocktail.fulfilled, (state, { payload: message }) => {
        state.publishLoading = false;
        state.createMessage = message;
      })
      .addCase(publishCocktail.rejected, (state) => {
        state.publishLoading = false;
      });

    builder
      .addCase(deleteCocktail.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteCocktail.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteCocktail.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const cocktailsReducer = cocktailSlice.reducer;

export const { hideToastMessage } = cocktailSlice.actions;

export const selectCocktails = (state: RootState) => state.cocktails.items;
export const selectCocktail = (state: RootState) => state.cocktails.item;
export const selectCocktailsLoading = (state: RootState) =>
  state.cocktails.fetchLoading;
export const selectOneLoading = (state: RootState) =>
  state.cocktails.fetchOneLoading;
export const selectCocktailsCreateLoading = (state: RootState) =>
  state.cocktails.createLoading;
export const selectCocktailsCreateError = (state: RootState) =>
  state.cocktails.createError;
export const selectCreateMessage = (state: RootState) =>
  state.cocktails.createMessage;
export const selectCocktailsPublishLoading = (state: RootState) =>
  state.cocktails.publishLoading;
export const selectCocktailsDeleteLoading = (state: RootState) =>
  state.cocktails.deleteLoading;
