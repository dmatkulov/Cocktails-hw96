import { Router } from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import { imagesUpload } from '../multer';
import mongoose, { FilterQuery, Types } from 'mongoose';
import { CocktailFields, CocktailMutation } from '../types';
import Cocktail from '../models/Cocktail';
import user from '../middleware/user';

const cocktailsRouter = Router();

cocktailsRouter.get('/', user, async (req: RequestWithUser, res, next) => {
  try {
    let filter: FilterQuery<CocktailFields> = {};
    const authorId = req.query.author as string;
    if (req.user) {
      const isAdmin = req.user.role === 'admin';
      const isUser = req.user.role === 'user';

      if (isAdmin) {
        filter = {};
      }

      if (isUser) {
        filter = { isPublished: true };

        if (isUser && authorId) {
          filter = { user: authorId };
        }
      }
    } else {
      filter = { isPublished: true };
    }

    const cocktails = await Cocktail.find(filter).select(
      '-user -recipe -ingredients',
    );

    return res.send(cocktails);
  } catch (e) {
    return next(e);
  }
});

cocktailsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    try {
      new Types.ObjectId(id);
    } catch {
      return res.status(404).send({ error: 'Wrong ID!' });
    }

    const cocktail = await Cocktail.findById(id);

    if (!cocktail) {
      return res.status(404).send({ error: 'Not found' });
    }

    return res.send(cocktail);
  } catch (e) {
    return next(e);
  }
});

cocktailsRouter.post(
  '/',
  auth,
  permit('admin', 'user'),
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      const userId = req.user?._id;
      const ingredientsData = req.body.ingredients;

      const cocktailData: CocktailMutation = {
        user: userId,
        name: req.body.name,
        image: req.file ? req.file.filename : null,
        recipe: req.body.recipe,
        ingredients: JSON.parse(ingredientsData),
      };

      const cocktail = new Cocktail(cocktailData);

      await cocktail.save();

      res.send({ message: 'Your cocktail is being reviewed by a moderator' });
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  },
);

cocktailsRouter.patch(
  '/:id/togglePublished',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const id = req.params.id;

      try {
        new Types.ObjectId(id);
      } catch {
        return res.status(404).send({ error: 'Wrong ID!' });
      }

      await Cocktail.findByIdAndUpdate(
        id,
        {
          isPublished: true,
        },
        { new: true },
      );

      return res.send({ message: 'Successfully published' });
    } catch (e) {
      return next(e);
    }
  },
);

cocktailsRouter.delete(
  '/:id',
  auth,
  permit('admin', 'user'),
  async (req, res, next) => {
    try {
      const id = req.params.id;

      try {
        new Types.ObjectId(id);
      } catch {
        return res.status(404).send({ error: 'Wrong ID!' });
      }

      await Cocktail.findByIdAndDelete(id);
      return res.send({ message: 'Cocktail was successfully deleted' });
    } catch (e) {
      return next(e);
    }
  },
);

export default cocktailsRouter;
