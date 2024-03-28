import React, { useCallback } from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { CocktailApi } from '../../../types';
import { apiURL } from '../../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import AdminActions from './AdminActions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import {
  selectCocktailsDeleteLoading,
  selectCocktailsPublishLoading,
} from '../cocktailsSlice';
import { deleteCocktail, fetchOne, publishCocktail } from '../cocktailsThunks';

interface Props {
  cocktail: CocktailApi;
}

const RecipeItem: React.FC<Props> = ({ cocktail }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);
  const isPublishing = useAppSelector(selectCocktailsPublishLoading);
  const isDeleting = useAppSelector(selectCocktailsDeleteLoading);
  const image = `${apiURL}/${cocktail.image}`;

  const handlePublish = useCallback(async () => {
    await dispatch(publishCocktail(cocktail._id)).unwrap();
    await dispatch(fetchOne(cocktail._id)).unwrap();
  }, [dispatch]);

  const handleDelete = useCallback(async () => {
    await dispatch(deleteCocktail(cocktail._id)).unwrap();
    await dispatch(fetchOne(cocktail._id)).unwrap();
  }, [dispatch]);

  return (
    <Container disableGutters component="section">
      <Button
        component={Link}
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ textTransform: 'none', fontWeight: 'normal', mb: 2 }}
      >
        Back
      </Button>
      <Grid container justifyContent="space-between">
        <Grid item xs={3}>
          <Box
            sx={{ height: '300px', overflow: 'hidden', borderRadius: '12px' }}
          >
            <img
              src={image}
              alt={cocktail.name}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h4">{cocktail.name}</Typography>
            <AdminActions
              user={user}
              published={cocktail.isPublished}
              isPublishing={isPublishing}
              isDeleting={isDeleting}
              onPublish={handlePublish}
              onDelete={handleDelete}
            />
          </Stack>
          {user && !cocktail.isPublished && (
            <Chip label="Unpublished" color="error" size="small" />
          )}
          <Stack mb={3}>
            <Typography gutterBottom variant="subtitle1" fontWeight="bold">
              Recipe:
            </Typography>
            <Typography variant="body1">{cocktail.recipe}</Typography>
          </Stack>
          <Divider />
          <Stack mt={3}>
            <Typography gutterBottom variant="subtitle1" fontWeight="bold">
              Ingredients:
            </Typography>
            {cocktail.ingredients.map((ing, i) => (
              <Grid
                container
                key={ing._id}
                alignItems="center"
                sx={{ backgroundColor: i % 2 && '#ececec' }}
                px={2}
                py={1}
              >
                <Grid item xs={8}>
                  {ing.name}
                </Grid>
                <Grid item xs={3}>
                  {ing.amount}
                </Grid>
              </Grid>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecipeItem;
