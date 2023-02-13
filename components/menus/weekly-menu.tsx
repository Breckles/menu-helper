import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { IWeeklyMenuWithId } from '../../models/weekly-menu.model';
import IDailyMenu from '../../models/daily-menu.model';

import DailyMenu from './daily-menu';

import classes from './weekly-menu.module.scss';

const weekdayLabels = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

type WeeklyMenuProps = {
  weeklyMenu: IWeeklyMenuWithId;
};

const WeeklyMenu = (props: WeeklyMenuProps) => {
  const { weeklyMenu } = props;

  const weekStart = dayjs(weeklyMenu.weekStartDate);
  const weekEnd = dayjs(weekStart).add(6, 'day');
  const displayFormat = 'ddd, MMM DD';

  const updateMenuHandler = async () => {
    const result = await fetch(`/api/weekly-menus/${weeklyMenu._id}`, {
      method: 'PATCH',
      body: JSON.stringify(weeklyMenu),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  const onChangeHandler = (newDailyMenu: IDailyMenu) => {
    weeklyMenu.dailyMenus[newDailyMenu.weekDay] = newDailyMenu;
  };

  const dailyMenus = weeklyMenu.dailyMenus.map((dm, i) => (
    <ListItem key={dm.weekDay} className={classes.dailyMenu}>
      <Typography variant="h3">{weekdayLabels[i]}</Typography>
      <DailyMenu menu={dm} onChange={onChangeHandler} />
    </ListItem>
  ));

  return (
    <Box className={classes.container}>
      <button onClick={updateMenuHandler}>Update menu</button>
      <Typography>
        {weekStart.format(displayFormat)} - {weekEnd.format(displayFormat)}
      </Typography>
      <List className={classes.dailyMenus}>{dailyMenus}</List>
    </Box>
  );
};

export default WeeklyMenu;
