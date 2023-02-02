import IDailyMenu, { validateDailyMenu } from './daily-menu.model';

interface IWeeklyMenu {
  _id?: string;
  weekStartDate: string;
  dailyMenus: IDailyMenu[];
}

export const validateWeeklyMenu = (menu: IWeeklyMenu) => {
  // Check that week starts on a Sunday (format: yyyy/mm/dd)
  // mm values from 0-11
  const date = new Date(menu.weekStartDate);

  if (date.getDay() !== 0) {
    return false;
  }

  for (const dailyMenu of menu.dailyMenus) {
    if (!validateDailyMenu(dailyMenu)) {
      return false;
    }
  }

  // Check that dailyMenus contains 7 entries
  if (menu.dailyMenus.length !== 7) {
    return false;
  }

  return true;
};

export default IWeeklyMenu;
