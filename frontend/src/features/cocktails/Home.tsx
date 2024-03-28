import React, { useEffect } from 'react';
import CardItem from './components/CardItem';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCocktails, selectCocktailsLoading } from './cocktailsSlice';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import { fetchCocktails } from './cocktailsThunks';
import { selectUser } from '../users/usersSlice';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const cocktails = useAppSelector(selectCocktails);
  const isLoading = useAppSelector(selectCocktailsLoading);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  let contentArea: React.ReactNode | null;
  const filteredByUser = cocktails.filter((item) => item.isPublished);

  if (user && user.role === 'user') {
    contentArea = filteredByUser.map((item) => (
      <Grid item xs={4} key={item._id}>
        <CardItem cocktail={item} />
      </Grid>
    ));
  } else {
    contentArea = cocktails.map((item) => (
      <Grid item xs={4} key={item._id}>
        <CardItem cocktail={item} />
      </Grid>
    ));
  }

  return (
    <Container disableGutters>
      <Typography variant="h4" component="h1">
        Popular cocktails
      </Typography>

      {isLoading && <CircularProgress />}

      <Grid container item justifyContent="flex-start" spacing={2} pt="60px">
        {contentArea}
      </Grid>
    </Container>
  );
};

export default Home;
