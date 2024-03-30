import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCocktails, selectCocktailsLoading } from './cocktailsSlice';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import CardItem from './components/CardItem';
import { fetchByAuthor } from './cocktailsThunks';
import { selectUser } from '../users/usersSlice';

const Profile: React.FC = () => {
  const cocktails = useAppSelector(selectCocktails);
  const isLoading = useAppSelector(selectCocktailsLoading);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchByAuthor(user._id));
    }
  }, [dispatch, user]);

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
