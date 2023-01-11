import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import DailyMenu from './daily-menu';

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

const dailyMenus = weekdayLabels.map((l) => (
  <ListItem key={l} className={classes.dailyMenu}>
    <Typography variant="h3">{l}</Typography>
    <DailyMenu items={devItems} />
  </ListItem>
));

const WeeklyMenu = () => {
  return (
    <Box className={classes.container}>
      <Typography variant="h2">WeeklyMenu component</Typography>
      <List className={classes.dailyMenus}>{dailyMenus}</List>
    </Box>
  );
};

export default WeeklyMenu;
