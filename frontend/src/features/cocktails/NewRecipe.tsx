import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CocktailMutation } from '../../types';
import { Container, Typography } from '@mui/material';
import RecipeForm from './components/RecipeForm';
import { selectCreateMessage } from './cocktailsSlice';
import { createCocktail } from './cocktailsThunks';

const NewRecipe: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createMessage = useAppSelector(selectCreateMessage);
  const onFormSubmit = async (state: CocktailMutation) => {
    try {
      await dispatch(createCocktail(state)).unwrap();
      console.log(state);
      // navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container disableGutters>
      {createMessage && <h6>{createMessage.message}</h6>}
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
