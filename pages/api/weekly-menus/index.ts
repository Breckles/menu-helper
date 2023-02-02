import { NextApiRequest, NextApiResponse } from 'next';
import IWeeklyMenu from '../../../models/weekly-menu.model';
import {
  createWeeklyMenu,
  getAllWeeklyMenus,
} from '../../../mongodb/db-weekly-menu';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const allWeeklyMenus = await getAllWeeklyMenus();
        if (allWeeklyMenus) {
          res.status(200).json({ success: true, allWeeklyMenus });
        }
        break;
      case 'POST':
        const bodyMenu = req.body as IWeeklyMenu;
        const newWeeklyMenu = await createWeeklyMenu(bodyMenu);
        if (newWeeklyMenu) {
          res.status(201).json({ success: true, newWeeklyMenu });
        }
        break;
      default:
        break;
    }
  } catch (error) {
    console.log('Error in weekly-menus api route: %o', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export default handler;
