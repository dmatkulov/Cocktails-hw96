import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCocktail, selectOneLoading } from './cocktailsSlice';
import { fetchOne } from './cocktailsThunks';
import { CircularProgress } from '@mui/material';
import RecipeItem from './components/RecipeItem';

const Recipe: React.FC = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const cocktail = useAppSelector(selectCocktail);
  const isLoading = useAppSelector(selectOneLoading);

  const fetchOneCocktail = useCallback(async () => {
    await dispatch(fetchOne(id)).unwrap();
  }, [dispatch, id]);

  useEffect(() => {
    void fetchOneCocktail();
  }, [fetchOneCocktail]);

  return (
    <>
      {isLoading && <CircularProgress />}
      {cocktail && <RecipeItem cocktail={cocktail} />}
    </>
  );
};

export default Recipe;
