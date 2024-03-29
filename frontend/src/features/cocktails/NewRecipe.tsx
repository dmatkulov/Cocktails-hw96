import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { CocktailMutation } from '../../types';
import { Container, Typography } from '@mui/material';
import RecipeForm from './components/RecipeForm';
import { createCocktail } from './cocktailsThunks';
import { useNavigate } from 'react-router-dom';

const NewRecipe: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (state: CocktailMutation) => {
    try {
      await dispatch(createCocktail(state)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container disableGutters>
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
