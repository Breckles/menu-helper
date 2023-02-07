import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import DailyMenu from './daily-menu';
import IWeeklyMenu from '../../models/weekly-menu.model';

import classes from './weekly-menu.module.scss';

const devItems = [
  { id: '1', item: 'Frozen Lasagna' },
  { id: '2', item: 'Frozen Ravioli' },
  { id: '3', item: 'Salad kit' },
  { id: '4', item: 'Box of Wine' },
];

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
  weeklyMenu: IWeeklyMenu;
};

const WeeklyMenu = (props: WeeklyMenuProps) => {
  const { weeklyMenu } = props;

  const dailyMenus = weeklyMenu.dailyMenus.map((dm, i) => (
    <ListItem key={dm.weekDay} className={classes.dailyMenu}>
      <Typography variant="h3">{weekdayLabels[i]}</Typography>
      <DailyMenu menu={dm} />
    </ListItem>
  ));

  return (
    <Box className={classes.container}>
      <Typography variant="h2">WeeklyMenu component</Typography>
      <List className={classes.dailyMenus}>{dailyMenus}</List>
    </Box>
  );
};

export default WeeklyMenu;
