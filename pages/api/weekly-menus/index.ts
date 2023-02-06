import { NextApiRequest, NextApiResponse } from 'next';
import IWeeklyMenu, {
  validateWeeklyMenu,
} from '../../../models/weekly-menu.model';
import {
  createWeeklyMenu,
  getAllWeeklyMenus,
} from '../../../mongodb/db-weekly-menu';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const allWeeklyMenus = await getAllWeeklyMenus();
  if (allWeeklyMenus) {
    res.status(200).json({ success: true, allWeeklyMenus });
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
        handleGet(req, res);
        break;
      case 'POST':
        handlePost(req, res);
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
