import IDailyMenu from './daily-menu.model';

interface IWeeklyMenu {
  id: string;
  weekStartDate: string;
  dishes: IDailyMenu[];
}

export default IWeeklyMenu;
