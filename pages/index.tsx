import { GetServerSideProps, GetStaticProps } from 'next';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { Box, Typography } from '@mui/material';

import { IWeeklyMenuWithId } from '../models/weekly-menu.model';
import { getWeeklyMenuByDate } from '../mongodb/db-weekly-menu';
import WeeklyMenu from '../components/menus/weekly-menu';
import WeekPicker from '../components/ui/week-picker';

type HomePageProps = {
  currentWeekMenu?: IWeeklyMenuWithId;
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
    <>
      <Box>
        <WeekPicker onWeekChange={onWeekChange} />
        <Typography>
          {displayWeekStart.format(displayFormat)} -{' '}
          {displayWeekEnd.format(displayFormat)}
        </Typography>
        <WeeklyMenu
          weekStart={displayWeekStart.format('YYYY-MM-DD')}
          weeklyMenuWithId={weeklyMenu}
        />
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const currentWeekStartString = dayjs().startOf('week').format('YYYY-MM-DD');
  const currentWeekMenu = await getWeeklyMenuByDate(currentWeekStartString);
  // const staticReturn: { props: any; revalidate: false | number } = {
  //   props: {
  //     latestWeeklyMenu: currentWeeklyMenu,
  //   },
  //   revalidate: false,
  // };

  // if (currentWeekMenu) {
  //   staticReturn.revalidate = 86400;
  // }

  const serverProps = {
    props: {
      currentWeekMenu,
    },
  };

  return serverProps;
};
