import { ObjectId } from 'mongodb';

import db from './db';
import IWeeklyMenu, { IWeeklyMenuWithId } from '../models/weekly-menu.model';

interface IDBWeeklyMenu extends IWeeklyMenu {
  _id: ObjectId;
}

const convertDBDoc = (doc: IDBWeeklyMenu) => {
  const weeklyMenu: IWeeklyMenuWithId = {
    _id: doc._id.toString(),
    weekStartDate: doc.weekStartDate,
    dailyMenus: doc.dailyMenus,
  };

  return weeklyMenu;
};

const weeklyMenus = db.collection<IWeeklyMenu>('weekly-menus');

export const getAllWeeklyMenus = async () => {
  try {
    const cursor = await weeklyMenus.find({});
    const allMenuDocs = await cursor.toArray();
    return allMenuDocs;
  } catch (error) {
    throw new Error(`An error occurred fetching all menus: ${error}`);
  }
};

export const getLatestWeeklyMenu = async () => {
  const weeklyMenuDoc = await weeklyMenus.findOne(
    {},
    {
      sort: { weekStartDate: -1 },
    }
  );

  if (!weeklyMenuDoc) {
    return null;
  }

  const weeklyMenu: IWeeklyMenuWithId = {
    _id: weeklyMenuDoc._id.toString(),
    weekStartDate: weeklyMenuDoc.weekStartDate,
    dailyMenus: weeklyMenuDoc.dailyMenus,
  };

  return weeklyMenu;
};

export const createWeeklyMenu = async (menu: IWeeklyMenu) => {
  const result = await weeklyMenus.insertOne(menu);

  if (!result.insertedId) {
    return null;
  }

  const newWeeklyMenu: IWeeklyMenuWithId = {
    _id: result.insertedId.toString(),
    weekStartDate: menu.weekStartDate,
    dailyMenus: menu.dailyMenus,
  };

  return newWeeklyMenu;
};

export const getWeeklyMenuById = async (id: string) => {
  const weeklyMenuDoc: IDBWeeklyMenu | null = await weeklyMenus.findOne({
    _id: new ObjectId(id),
  });

  if (!weeklyMenuDoc) {
    return null;
  }

  return convertDBDoc(weeklyMenuDoc);
};

export const getWeeklyMenuByDate = async (date: string) => {
  const weeklyMenuDoc: IDBWeeklyMenu | null = await weeklyMenus.findOne({
    weekStartDate: date,
  });

  if (!weeklyMenuDoc) {
    return null;
  }

  return convertDBDoc(weeklyMenuDoc);
};

export const updateWeeklyMenu = async (id: string, menu: IWeeklyMenu) => {
  const result = await weeklyMenus.updateOne(
    { _id: new ObjectId(id) },
    { $set: menu }
  );

  if (!result.acknowledged) {
    throw new Error('Database did not acknowledge the update operation.');
  }

  // result.modifiedCount may be zero if an update applies no changes. So return true if just a match was found
  return result.matchedCount !== 0;
};

export const deleteWeeklyMenu = async (id: string) => {
  const result = await weeklyMenus.deleteOne({ _id: new ObjectId(id) });

  if (!result.acknowledged) {
    throw new Error('Database did not acknowledge the delete operation.');
  }

  return result.deletedCount !== 0;
};
