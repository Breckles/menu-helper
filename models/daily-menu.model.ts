interface IDailyMenu {
  weekDay: number;
  dishes: string[];
}

const validWeekDays = [0, 1, 2, 3, 4, 5, 6];

export const validateDailyMenu = (menu: IDailyMenu) => {
  // Check that weekDay has a value between 0-6
  if (!validWeekDays.find((d) => d === menu.weekDay)) {
    return false;
  }
};

export default IDailyMenu;
