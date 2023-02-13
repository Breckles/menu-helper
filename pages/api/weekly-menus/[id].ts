import { NextApiRequest, NextApiResponse } from 'next';
import IWeeklyMenu, {
  IWeeklyMenuWithId,
  validateWeeklyMenu,
} from '../../../models/weekly-menu.model';
import {
  deleteWeeklyMenu,
  getWeeklyMenuById,
  updateWeeklyMenu,
} from '../../../mongodb/db-weekly-menu';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;

  const weeklyMenu = await getWeeklyMenuById(id);

  if (weeklyMenu) {
    res.status(200).json({ success: true, weeklyMenu });
  } else {
    // 404 - Not Found
    res.status(404).json({ success: false });
  }
};

const handlePatch = async (req: NextApiRequest, res: NextApiResponse) => {
  const weeklyMenuDB: IWeeklyMenuWithId = req.body;
  const id = req.query.id as string;
  console.log(weeklyMenuDB['_id']);
  console.log(id);

  // Check if menu in request body contains _id field. If so, ensure it matches the query param.
  if (weeklyMenuDB._id && weeklyMenuDB._id !== id) {
    // 400 - Bad Request
    res.status(400).json({ success: false });
    return;
  }
  debugger;

  if (!validateWeeklyMenu(weeklyMenuDB)) {
    // 400 - Bad Request
    res.status(400).json({ success: false });
    return;
  }

  const weeklyMenu: IWeeklyMenu = {
    weekStartDate: weeklyMenuDB.weekStartDate,
    dailyMenus: weeklyMenuDB.dailyMenus,
  };

  const updateSuccessful = await updateWeeklyMenu(id, weeklyMenu);

  if (updateSuccessful) {
    // 200 - OK
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ success: false });
  }
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  const deleteSuccessful = await deleteWeeklyMenu(id);

  if (deleteSuccessful) {
    // 200 - OK
    res.status(200).json({ success: true });
  } else {
    // 404 - Not found
    res.status(404).json({ success: false });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Don't rightly know how this could happen, but just to be safe
  if (!req.query.id) {
    res.status(400).json({ success: false });
    return;
  }

  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        await handleGet(req, res);
        break;
      case 'PATCH':
        await handlePatch(req, res);
        break;
      case 'DELETE':
        await handleDelete(req, res);
        break;
      default:
        // 405 - Method Not Allowed
        res.status(405).json({ success: false });
        break;
    }
  } catch (error) {
    console.log(
      `Error in weekly-menus/[id] api route using ${method} method: ${error}`
    );
    // 500 - Internal Server Error
    res.status(500).json({ success: false });
  }
};

export default handler;
