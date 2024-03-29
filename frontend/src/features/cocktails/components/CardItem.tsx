import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cocktail } from '../../../types';
import { apiURL, routes } from '../../../utils/constants';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import {
  deleteCocktail,
  fetchCocktails,
  publishCocktail,
} from '../cocktailsThunks';
import {
  selectCocktailsDeleteLoading,
  selectCocktailsPublishLoading,
} from '../cocktailsSlice';
import UserActions from './UserActions';

interface Props {
  cocktail: Cocktail;
}

const CardItem: React.FC<Props> = ({ cocktail }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const isPublishing = useAppSelector(selectCocktailsPublishLoading);
  const isDeleting = useAppSelector(selectCocktailsDeleteLoading);

  const cardImage = apiURL + '/' + cocktail.image;

  const handlePublish = useCallback(async () => {
    await dispatch(publishCocktail(cocktail._id)).unwrap();
    await dispatch(fetchCocktails()).unwrap();
  }, [dispatch]);

  const handleDelete = useCallback(async () => {
    await dispatch(deleteCocktail(cocktail._id)).unwrap();
    await dispatch(fetchCocktails()).unwrap();
  }, [dispatch]);

  return (
    <>
      <Card
        elevation={0}
        sx={{
          borderRadius: '12px',
          height: '100%',
          maxWidth: 345,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          image={cardImage}
          sx={{
            borderRadius: '6px',
            width: '100%',
            height: '200px',
            backgroundColor: 'rgba(0,0,0,0.8)',
            p: 1,
            transition: 'width 0.3s ease-in-out',
            '&:hover': {
              width: '125%',
            },
          }}
        >
          {user && !cocktail.isPublished && (
            <Chip label="Unpublished" color="error" size="small" />
          )}
        </CardMedia>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexGrow: 1,
            pb: 0,
          }}
        >
          <Typography gutterBottom variant="h6">
            {cocktail.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="space-between" alignItems="center">
            <Button
              size="small"
              onClick={() => navigate(routes.recipes + '/' + cocktail._id)}
            >
              Read more
            </Button>
          </Grid>
          <UserActions
            user={user}
            published={cocktail.isPublished}
            isPublishing={isPublishing}
            isDeleting={isDeleting}
            onPublish={handlePublish}
            onDelete={handleDelete}
          />
        </CardActions>
      </Card>
    </>
  );
};

export default CardItem;
