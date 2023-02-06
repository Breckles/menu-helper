import IDailyMenu, { validateDailyMenu } from './daily-menu.model';

interface IWeeklyMenu {
  weekStartDate: string;
  dailyMenus: IDailyMenu[];
}

export interface IWeeklyMenuWithId extends IWeeklyMenu {
  _id: string;
}

export const validateWeeklyMenu = (menu: IWeeklyMenu) => {
  if (!menu.weekStartDate) {
    return false;
  }

  // Check that week starts on a Sunday (format: yyyy/mm/dd)
  // mm values from 1=12
  const date = new Date(menu.weekStartDate);

  if (date.getDay() !== 0) {
    return false;
  }

  if (!menu.dailyMenus) {
    return false;
  }

  for (const dailyMenu of menu.dailyMenus) {
    if (!validateDailyMenu(dailyMenu)) {
      return false;
    }
  }

  if (menu.dailyMenus.length !== 7) {
    return false;
  }

  return true;
};

export default IWeeklyMenu;
