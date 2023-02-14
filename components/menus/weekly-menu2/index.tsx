import IWeeklyMenu, {
  IWeeklyMenuWithId,
} from '../../../models/weekly-menu.model';
// import WeeklyMenu from '../weekly-menu';

type WeeklyMenuProps = {
  mode?: 'update' | 'create';
  weeklyMenu?: IWeeklyMenuWithId;
};

const WeeklyMenu = (props: WeeklyMenuProps) => {
  return <WeeklyMenu />;
};

export default WeeklyMenu;
