import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCocktails, selectCocktailsLoading } from './cocktailsSlice';
import { fetchCocktails } from './cocktailsThunks';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import CardItem from './components/CardItem';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const isLoading = useAppSelector(selectCocktailsLoading);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  return (
    <Container disableGutters>
      <Typography variant="h4" component="h1">
        My recipes
      </Typography>

      {isLoading && <CircularProgress />}

      <Grid container item justifyContent="flex-start" spacing={2} pt="60px">
        {cocktails.map((item) => (
          <Grid item xs={4} key={item._id}>
            <CardItem cocktail={item} />
          </Grid>
        ))}

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

export default Profile;
