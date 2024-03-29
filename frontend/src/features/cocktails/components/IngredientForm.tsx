import React, { useState } from 'react';
import { Box, Grid, IconButton, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { IngredientMutation } from '../../../types';

interface Props {
  onChange: (ingredients: IngredientMutation[]) => void;
}

const IngredientForm: React.FC<Props> = ({ onChange }) => {
  const [ingredients, setIngredients] = useState<IngredientMutation[]>([
    {
      name: '',
      amount: '',
    },
  ]);

  const changeIngredient = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const { name, value } = event.target;

    setIngredients((prevIngredients) => {
      const newIngredients = [...prevIngredients];
      newIngredients[index][name as keyof IngredientMutation] = value;
      return newIngredients;
    });
    onChange(ingredients);
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        name: '',
        amount: '',
      },
    ]);
  };

  const removeIngredient = (index: number) => {
    setIngredients((prevIngredients) => {
      const newIngredients = [...prevIngredients];
      newIngredients.splice(index, 1);
      return newIngredients;
    });
  };

  return (
    <>
      {ingredients.map((ingredient, i: number) => (
        <Box key={i} mt={1}>
          <Grid container item spacing={2} alignItems="center" mb={1}>
            <Grid item xs={7}>
              <TextField
                fullWidth
                size="small"
                label={'Ingredient ' + (i + 1)}
                name="name"
                type="text"
                value={ingredient.name}
                onChange={(event) => changeIngredient(event, i)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                size="small"
                label="Amount"
                name="amount"
                type="text"
                value={ingredient.amount}
                onChange={(event) => changeIngredient(event, i)}
              />
            </Grid>
            <Grid item xs={1}>
              {ingredients.length > 1 && (
                <IconButton onClick={() => removeIngredient(i)} disableRipple>
                  <BackspaceIcon color="error" />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={1}>
              {ingredients.length - 1 === i && (
                <IconButton onClick={addIngredient}>
                  <AddCircleIcon color="primary" fontSize="large" />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Box>
      ))}
    </>
  );
};

export default IngredientForm;
