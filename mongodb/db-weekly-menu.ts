import { ObjectId } from 'mongodb';

import IWeeklyMenu from '../models/weekly-menu.model';
import db from './db';

const weeklyMenus = db.collection<IWeeklyMenu>('weekly-menus');

export const getAllWeeklyMenus = async () => {
  try {
    const cursor = await weeklyMenus.find<IWeeklyMenu>({});
    const allMenus = await cursor.toArray();
    return allMenus;
  } catch (error) {
    console.log('An error occurred fetching all menus: %o', error);
  }

  return null;
};

export const getWeeklyMenuById = async (_id: string) => {
  try {
    const weeklyMenu = (await weeklyMenus.findOne({
      _id,
    })) as IWeeklyMenu | null;
    return weeklyMenu;
  } catch (error) {
    console.log('An error occurred fetching all menus: %o', error);
  }

  return null;
};

export const createWeeklyMenu = async (menu: IWeeklyMenu) => {
  // If an _id was provided, remove it

  const insertMenu: IWeeklyMenu = { ...menu, _id: undefined };
  try {
    const result = await weeklyMenus.insertOne(insertMenu);

    if (result) {
      const newWeeklyMenu: IWeeklyMenu = { ...menu, _id: result.insertedId };
      return newWeeklyMenu;
    }
  } catch (error) {
    console.log('An error occurred while creating a new menu: %o', error);
  }

  return null;
};
