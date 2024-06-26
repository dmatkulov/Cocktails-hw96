import React, { useEffect } from 'react';
import CardItem from './components/CardItem';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCocktails, selectCocktailsLoading } from './cocktailsSlice';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import { fetchCocktails } from './cocktailsThunks';
import { selectUser } from '../users/usersSlice';
import 'react-toastify/dist/ReactToastify.css';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const cocktails = useAppSelector(selectCocktails);
  const isLoading = useAppSelector(selectCocktailsLoading);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  let contentArea: React.ReactNode | null;

  if (user && user.role === 'user') {
    const filteredByUser = cocktails.filter((item) => item.isPublished);
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

        {!cocktails.length && (
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="normal" color="grey">
              List is empty
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
