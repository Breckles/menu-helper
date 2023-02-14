import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import IWeeklyMenu, { IWeeklyMenuWithId } from '../../models/weekly-menu.model';
import IDailyMenu from '../../models/daily-menu.model';

import DailyMenu from './daily-menu';

import classes from './weekly-menu.module.scss';

const createNewWeeklyMenu = (weekStartDate: string) => {
  const dailyMenus: IDailyMenu[] = [];

  for (let weekDay = 0; weekDay <= 6; weekDay++) {
    dailyMenus.push({ weekDay, dishes: [''] });
  }

  const weeklyMenu: IWeeklyMenu = {
    weekStartDate,
    dailyMenus,
  };

  return weeklyMenu;
};

type WeeklyMenuProps = {
  weekStart: string;
  weeklyMenu?: IWeeklyMenuWithId;
};

const WeeklyMenu = (props: WeeklyMenuProps) => {
  const { weeklyMenu: existingMenu } = props;
  const updateMode = !!existingMenu;
  console.log(updateMode);

  const weeklyMenu: IWeeklyMenu = existingMenu
    ? {
        weekStartDate: existingMenu.weekStartDate,
        dailyMenus: existingMenu.dailyMenus,
      }
    : createNewWeeklyMenu(props.weekStart);

  const submitHandler = async () => {
    if (existingMenu) {
      const result = await fetch(`/api/weekly-menus/${existingMenu._id}`, {
        method: 'PATCH',
        body: JSON.stringify(weeklyMenu),
        headers: { 'Content-Type': 'application/json' },
      });

      if (result.ok) {
        console.log('updated WeeklyMenu successfully');
      } else {
        console.log('failed to update WeeklyMenu');
      }
    } else {
      const result = await fetch(`/api/weekly-menus`, {
        method: 'POST',
        body: JSON.stringify(weeklyMenu),
        headers: { 'Content-Type': 'application/json' },
      });

      if (result.ok) {
        console.log('created WeeklyMenu successfully');
      } else {
        console.log('failed to create WeeklyMenu');
      }
    }
  };

  const onChangeHandler = (updatedDailyMenu: IDailyMenu) => {
    weeklyMenu.dailyMenus[updatedDailyMenu.weekDay] = updatedDailyMenu;
  };

  const dailyMenus = weeklyMenu.dailyMenus.map((dm, i) => (
    <ListItem key={dm.weekDay} className={classes.dailyMenu}>
      <Typography variant="h3">
        {dayjs().day(dm.weekDay).format('dddd')}
      </Typography>
      <DailyMenu menu={dm} onChange={onChangeHandler} />
    </ListItem>
  ));

  return (
    <Box className={classes.container}>
      <button onClick={submitHandler}>
        {updateMode ? 'Update menu' : 'Create Menu'}
      </button>
      <List className={classes.dailyMenus}>{dailyMenus}</List>
    </Box>
  );
};

export default WeeklyMenu;
