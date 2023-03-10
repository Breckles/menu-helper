import { GetServerSideProps, GetStaticProps } from 'next';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import theme from '../styles/theme';

import { IWeeklyMenuWithId } from '../models/weekly-menu.model';
import { getWeeklyMenuByDate } from '../mongodb/db-weekly-menu';

import WeekPicker from '../components/ui/week-picker';
import WeeklyMenu from '../components/menus/weekly-menu';

type HomePageProps = {
  currentWeekMenu?: IWeeklyMenuWithId;
};

const homePageStyles = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: { mobile: theme.spacing(3) },
  width: '100%',
  height: '100%',
  '.weeklyMenu': {
    flex: 1,
  },
};

export default function Home(props: HomePageProps) {
  const { currentWeekMenu } = props;

  const [weeklyMenu, setWeeklyMenu] = useState(currentWeekMenu);
  const [displayWeekStart, setDisplayWeekStart] = useState(
    dayjs(weeklyMenu?.weekStartDate).startOf('week')
  );

  const displayWeekEnd = displayWeekStart.endOf('week');
  const displayFormat = 'ddd, MMM DD';

  const onWeekChange = async (newWeek: Dayjs) => {
    const response = await fetch(
      `/api/weekly-menus?date=${newWeek.format('YYYY-MM-DD')}`
    );

    if (response.ok) {
      const body = await response.json();
      const menu: IWeeklyMenuWithId = body.weeklyMenu;
      setWeeklyMenu(menu);
    } else {
      setWeeklyMenu(undefined);
    }

    setDisplayWeekStart(newWeek);
  };

  return (
    <Box id="homePage" sx={homePageStyles}>
      <WeekPicker onWeekChange={onWeekChange} />
      <Typography variant="h2">
        {displayWeekStart.format(displayFormat)} -{' '}
        {displayWeekEnd.format(displayFormat)}
      </Typography>
      <WeeklyMenu
        weekStart={displayWeekStart.format('YYYY-MM-DD')}
        weeklyMenuWithId={weeklyMenu}
      />
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const currentWeekStartString = dayjs().startOf('week').format('YYYY-MM-DD');
  const currentWeekMenu = await getWeeklyMenuByDate(currentWeekStartString);

  const serverProps = {
    props: {
      currentWeekMenu,
    },
  };

  return serverProps;
};
