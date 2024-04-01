import React, { useState } from 'react';
import { CocktailMutation, IngredientMutation } from '../../../types';
import { Alert, Box, Grid, TextField } from '@mui/material';
import FileInput from '../../../components/FileInput/FileInput';
import IngredientForm from './IngredientForm';
import { useAppSelector } from '../../../app/hooks';
import {
  selectCocktailsCreateError,
  selectCocktailsCreateLoading,
} from '../cocktailsSlice';
import { LoadingButton } from '@mui/lab';

interface Props {
  onSubmit: (state: CocktailMutation) => void;
}

const RecipeForm: React.FC<Props> = ({ onSubmit }) => {
  const error = useAppSelector(selectCocktailsCreateError);
  const isCreating = useAppSelector(selectCocktailsCreateLoading);

  const [state, setState] = useState<CocktailMutation>({
    name: '',
    recipe: '',
    ingredients: [],
    image: null,
  });

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = event.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const changeIngredient = (items: IngredientMutation[]) => {
    setState((prevState) => ({
      ...prevState,
      ingredients: items,
    }));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const ingredientsError = getFieldError('ingredients') || null;

  const onSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(state);
  };

  return (
    <Box component="form" onSubmit={onSubmitForm}>
      <Grid container item xs={6} direction="column" spacing={2} mx="auto">
        <Grid item xs>
          <TextField
            fullWidth
            type="text"
            label="Coctail name"
            name="name"
            value={state.name}
            onChange={inputChangeHandler}
            error={Boolean(getFieldError('name'))}
            helperText={getFieldError('name')}
          />
        </Grid>
        <Grid item xs>
          {ingredientsError && (
            <Alert severity="error">{ingredientsError}</Alert>
          )}

          <IngredientForm
            onChange={changeIngredient}
            getFieldError={getFieldError}
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            multiline
            rows={3}
            type="text"
            label="Recipe"
            name="recipe"
            value={state.recipe}
            onChange={inputChangeHandler}
            error={Boolean(getFieldError('recipe'))}
            helperText={getFieldError('recipe')}
          />
        </Grid>
        <Grid item xs>
          <FileInput
            name="image"
            label="Image"
            getFieldError={getFieldError}
            onChange={fileInputChangeHandler}
          />
        </Grid>
        <Grid item xs={3}>
          <LoadingButton
            type="submit"
            loading={isCreating}
            disableElevation
            sx={{ mt: 3, mb: 2, py: 1 }}
            disabled={isCreating}
            variant="contained"
          >
            Create Recipe
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecipeForm;
