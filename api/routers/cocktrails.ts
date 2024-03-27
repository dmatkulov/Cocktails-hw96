import { Router } from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import { imagesUpload } from '../multer';
import mongoose, { Types } from 'mongoose';
import { CocktailMutation } from '../types';
import Cocktail from '../models/Cocktail';
import user from '../middleware/user';

const cocktailsRouter = Router();

cocktailsRouter.get('/', user, async (req: RequestWithUser, res, next) => {
  try {
    let cocktails;

    if (req.user) {
      const isAdmin = req.user.role === 'admin';
      const isUser = req.user.role === 'user';

      if (isAdmin) {
        cocktails = await Cocktail.find();
      }

      if (isUser) {
        cocktails = await Cocktail.find({
          $or: [
            { isPublished: true },
            { user: req.user._id, isPublished: false },
          ],
        });
      }
    } else {
      cocktails = await Cocktail.find({ isPublished: true });
    }

    return res.send(cocktails);
  } catch (e) {
    return next(e);
  }
});

cocktailsRouter.post(
  '/',
  auth,
  permit('user'),
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      const userId = req.user?._id;
      const ingredients = req.body.ingredients;

      const parsedData = ingredients.map((ingredient: string) =>
        JSON.parse(ingredient),
      );

      const cocktailData: CocktailMutation = {
        user: userId,
        name: req.body.name,
        image: req.file ? req.file.filename : null,
        recipe: req.body.recipe,
        ingredients: parsedData,
      };

      const cocktail = new Cocktail(cocktailData);

      await cocktail.save();

      res.send({
        message: 'Your cocktail is being reviewed by a moderator',
        cocktail,
      });
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

      const cocktail = await Cocktail.findByIdAndUpdate(
        id,
        {
          isPublished: true,
        },
        { new: true },
      );

      return res.send({ message: 'Cocktail is published', cocktail });
    } catch (e) {
      return next(e);
    }
  },
);

cocktailsRouter.delete(
  '/:id',
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

      await Cocktail.findByIdAndDelete(id);
      return res.send({ message: 'Cocktail was successfully deleted' });
    } catch (e) {
      return next(e);
    }
  },
);

export default cocktailsRouter;
