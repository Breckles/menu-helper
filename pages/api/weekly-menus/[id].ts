import { NextApiRequest, NextApiResponse } from 'next';
import {
  getAllWeeklyMenus,
  getWeeklyMenuById,
} from '../../../mongodb/db-weekly-menu';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const id = req.query['id'] as string;
        if (!id) {
          res.status(400).json({ success: false });
        }
        const weeklyMenu = await getWeeklyMenuById(id);
        if (weeklyMenu) {
          res.status(200).json(weeklyMenu);
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
