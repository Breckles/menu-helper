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
  <li key={l} className={classes.dailyMenu}>
    <h2>{l}</h2>
    <DailyMenu items={devItems} />
  </li>
));

const WeeklyMenu = () => {
  return (
    <div className={classes.container}>
      <h1>WeeklyMenu component</h1>
      <ul className={classes.dailyMenus}>{dailyMenus}</ul>
    </div>
  );
};

export default WeeklyMenu;
