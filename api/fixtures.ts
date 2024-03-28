import mongoose from 'mongoose';
import config from './config';
import Cocktail from './models/Cocktail';
import User from './models/User';
import { randomUUID } from 'crypto';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const models = [Cocktail, User];

  for (const model of models) {
    await dropCollection(db, model.collection.collectionName);
  }

  const [user1, user2] = await User.create(
    {
      email: 'john@john.com',
      displayName: 'John Doe',
      avatar: 'fixtures/avatars/john.jpg',
      password: '123',
      token: randomUUID(),
      role: 'user',
    },
    {
      email: 'jane@jane.com',
      displayName: 'Jane Meghan',
      avatar: 'fixtures/avatars/jane.jpg',
      password: '123',
      token: randomUUID(),
      role: 'user',
    },
    {
      email: 'admin@admin.com',
      displayName: 'Admin',
      avatar: 'fixtures/avatars/dave.jpg',
      password: '123',
      token: randomUUID(),
      role: 'admin',
    },
  );

  await Cocktail.create(
    {
      user: user1,
      name: 'Air Mail',
      image: 'fixtures/cocktails/air-mail.jpg',
      recipe:
        'Shake first 3 ingredients with ice and strain into an ice-filled glass (preferably a column of ice). TOP with champagne.',
      ingredients: [
        {
          name: 'Light gold rum (1-3 year old molasses column)',
          amount: '1 shot',
        },
        {
          name: 'Lime juice (freshly squeezed)',
          amount: '½ shot',
        },
        {
          name: 'Honey syrup (3 honey to 1 water)',
          amount: '½ shot',
        },
        {
          name: 'Brut champagne or sparkling wine',
          amount: '½ shot',
        },
      ],
      isPublished: true,
    },
    {
      user: user1,
      name: 'Rhubarb gin',
      image: 'fixtures/cocktails/rhubarb-gin.webp',
      recipe:
        'Use seasonal rhubarb to make this G&T-with-a-difference, or top the finished gin with soda water for a refreshing and gloriously pink summertime drink',
      ingredients: [
        {
          name: 'Pink rhubarb stalks',
          amount: '1 kg',
        },
        {
          name: "caster sugar (don't use golden - it muddies the colour)",
          amount: '400g',
        },
        {
          name: 'Gin',
          amount: '800ml',
        },
      ],
      isPublished: true,
    },
    {
      user: user1,
      name: 'Sex on the beach cocktail',
      image: 'fixtures/cocktails/sx-beach.webp',
      recipe:
        'Combine vodka with peach schnapps and cranberry juice to make a classic sex on the beach cocktail. Garnish with cocktail cherries and orange slices',
      ingredients: [
        {
          name: 'Vodka',
          amount: '50ml',
        },
        {
          name: 'Peach schnapps',
          amount: '25ml',
        },
        {
          name: 'Oranges, juiced, plus 2 slices to garnish',
          amount: '2',
        },
        {
          name: 'Cranberry juice',
          amount: '60ml',
        },
        {
          name: 'glacé cherries, to garnish',
          amount: '(optional)',
        },
      ],
      isPublished: true,
    },
    {
      user: user2,
      name: 'Cranberry vodka',
      image: 'fixtures/cocktails/cr-vodka.webp',
      recipe:
        'Combine vodka with peach schnapps and cranberry juice to make a classic sex on the beach cocktail. Garnish with cocktail cherries and orange slicesThis bittersweet fruity vodka is best served well chilled in shot glasses. It can also be made with other berries like blackcurrants or strawberries.',
      ingredients: [
        {
          name: 'Fresh or frozen cranberries or other berries',
          amount: '250g',
        },
        {
          name: 'Bottle vodka',
          amount: '1l',
        },
        {
          name: 'Caster sugar',
          amount: '175g',
        },
      ],
      isPublished: true,
    },
    {
      user: user2,
      name: 'Hurricane cocktail',
      image: 'fixtures/cocktails/hurricane.webp',
      recipe:
        'Our tropical, rum-based hurricane cocktail is easy to make and sure to get your party started. Garnish with orange and cocktail cherries for a kitsch touch',
      ingredients: [
        {
          name: 'Fresh or frozen cranberries or other berries',
          amount: '250g',
        },
        {
          name: 'Bottle vodka',
          amount: '1l',
        },
        {
          name: 'Caster sugar',
          amount: '175g',
        },
      ],
      isPublished: false,
    },
    {
      user: user2,
      name: 'Festive rum & ginger punch',
      image: 'fixtures/cocktails/Festive-rum-and-ginger-punch.webp',
      recipe:
        'Prepare this festive punch before your guests arrive for a stress-free party. It uses our mince pie rum, but can also be made with spiced rum',
      ingredients: [
        {
          name: 'Mince pie rum (see below for the recipe, or use spiced rum)',
          amount: '300ml',
        },
        {
          name: 'Dark rum',
          amount: '150ml',
        },
        {
          name: 'grenadine',
          amount: '3 tbsp',
        },
        {
          name: 'Lime, juiced',
          amount: '4',
        },
        {
          name: 'Dried or fresh orange slices',
          amount: '10',
        },
        {
          name: 'Ginger beer',
          amount: '1 litre',
        },
      ],
      isPublished: false,
    },
  );

  await db.close();
};

void run();
