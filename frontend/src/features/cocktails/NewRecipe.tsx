import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CocktailMutation } from '../../types';
import { Alert, Container, Typography } from '@mui/material';
import RecipeForm from './components/RecipeForm';
import { createCocktail } from './cocktailsThunks';
import { hideToastMessage, selectCreateMessage } from './cocktailsSlice';
import { useNavigate } from 'react-router-dom';

const NewRecipe: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createMessage = useAppSelector(selectCreateMessage);

  const onFormSubmit = async (state: CocktailMutation) => {
    try {
      await dispatch(createCocktail(state)).unwrap();
      setTimeout(() => {
        dispatch(hideToastMessage());
        navigate('/');
      }, 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container disableGutters>
      {createMessage && (
        <Alert severity="success">{createMessage.message}</Alert>
      )}
      <Typography
        variant="h4"
        component="h1"
        textAlign="center"
        gutterBottom
        mb={3}
      >
        Build cocktail recipe
      </Typography>

      <RecipeForm onSubmit={onFormSubmit} />
    </Container>
  );
};

export default NewRecipe;
