interface IDailyMenu {
  weekDay: number;
  dishes: string[];
}

const validWeekDays = [0, 1, 2, 3, 4, 5, 6];

export const validateDailyMenu = (menu: IDailyMenu) => {
  return validWeekDays.includes(menu.weekDay);
};

export default IDailyMenu;
