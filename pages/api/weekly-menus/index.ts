import { NextApiRequest, NextApiResponse } from 'next';
import IWeeklyMenu, {
  validateWeeklyMenu,
} from '../../../models/weekly-menu.model';
import {
  createWeeklyMenu,
  getAllWeeklyMenus,
  getWeeklyMenuByDate,
  getWeeklyMenuById,
} from '../../../mongodb/db-weekly-menu';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.id) {
    const idQueryString = req.query.id as string;

    const weeklyMenu = await getWeeklyMenuById(idQueryString);

    if (weeklyMenu) {
      res.status(200).json({ success: true, weeklyMenu });
    } else {
      // 404 - Not Found
      res.status(404).json({ success: false });
    }
  } else if (req.query.date) {
    const dateQueryString = req.query.date as string;

    const weeklyMenu = await getWeeklyMenuByDate(dateQueryString);

    if (weeklyMenu) {
      res.status(200).json({ success: true, weeklyMenu });
    } else {
      // 404 - Not Found
      res.status(404).json({ success: false });
    }
  } else {
    const allWeeklyMenus = await getAllWeeklyMenus();
    if (allWeeklyMenus) {
      res.status(200).json({ success: true, allWeeklyMenus });
    }
  }
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const bodyMenu: IWeeklyMenu = {
    weekStartDate: req.body.weekStartDate,
    dailyMenus: req.body.dailyMenus,
  };

  if (!validateWeeklyMenu(bodyMenu)) {
    // 400 - Bad Request
    res.status(400).json({ success: false });
  } else {
    const newWeeklyMenu = await createWeeklyMenu(bodyMenu);
    if (newWeeklyMenu) {
      // 201 - Created
      res.status(201).json({ success: true, newWeeklyMenu });
    }
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        await handleGet(req, res);
        break;
      case 'POST':
        await handlePost(req, res);
        break;
      default:
        // 405 - Method Not Allowed
        res.status(405).json({ success: false });
        break;
    }
  } catch (error) {
    console.log(
      `Error in weekly-menus api route using ${method} method: ${error}`
    );
    // 500 - Internal Server Error
    res.status(500).json({ success: false });
  }
};

export default handler;
