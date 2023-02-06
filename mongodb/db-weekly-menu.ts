import { ObjectId, Document } from 'mongodb';

import db from './db';
import IWeeklyMenu, { IWeeklyMenuWithId } from '../models/weekly-menu.model';
import IDailyMenu from '../models/daily-menu.model';

// interface IDocWeeklyMenu extends IWeeklyMenu {
//   _id: ObjectId;
//   weekStartDate: string;
//   dailyMenus: IDailyMenu[];
//   __v: number;
// }

// interface IDocWeeklyMenu extends IWeeklyMenu {
//   _id: ObjectId;
//   __v: number;
// }

// const convertDocToIWeeklyMenu = (d: IDocWeeklyMenu) => {
//   return {
//     _id: d._id.toString(),
//     weekStartDate: d.weekStartDate,
//     dailyMenus: d.dailyMenus,
//   } as IWeeklyMenu;
// };

const weeklyMenus = db.collection<IWeeklyMenu>('weekly-menus');

export const getAllWeeklyMenus = async () => {
  try {
    const cursor = await weeklyMenus.find({});
    const allMenuDocs = await cursor.toArray();
    // const allMenus: IWeeklyMenu[] = allMenuDocs.map((d) =>
    //   convertDocToIWeeklyMenu(d)
    // );
    return allMenuDocs;
  } catch (error) {
    throw new Error(`An error occurred fetching all menus: ${error}`);
  }
};

export const createWeeklyMenu = async (menu: IWeeklyMenu) => {
  const result = await weeklyMenus.insertOne(menu);

  if (!result.insertedId) {
    return null;
  }

  return { ...menu, _id: result.insertedId.toString() } as IWeeklyMenuWithId;
};

export const getWeeklyMenuById = async (id: string) => {
  const weeklyMenuDoc = await weeklyMenus.findOne({
    _id: new ObjectId(id),
  });

  if (!weeklyMenuDoc) {
    return null;
  }

  return {
    ...weeklyMenuDoc,
    _id: weeklyMenuDoc._id.toString(),
  } as IWeeklyMenuWithId;
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
