import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { Box, Typography } from '@mui/material';

import { IWeeklyMenuWithId } from '../models/weekly-menu.model';
import { getWeeklyMenuByDate } from '../mongodb/db-weekly-menu';
import WeeklyMenu from '../components/menus/weekly-menu';
import WeekPicker from '../components/ui/week-picker';

type HomePageProps = {
  currentWeeklyMenu?: IWeeklyMenuWithId;
};

export default function Home(props: HomePageProps) {
  const { currentWeeklyMenu } = props;

  const [weeklyMenu, setWeeklyMenu] = useState(currentWeeklyMenu);
  const [displayWeekStart, setDisplayWeekStart] = useState(
    dayjs(weeklyMenu?.weekStartDate).startOf('week')
  );

  // const weekStart = dayjs(weeklyMenu?.weekStartDate).startOf('week');
  const weekEnd = displayWeekStart.endOf('week');
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
      <Head>
        <title>Menu Helper</title>
        <meta
          name="description"
          content="A simple application to help build and persist a weekly food menu."
        />
      </Head>
      <Box>
        <WeekPicker onWeekChange={onWeekChange} />
        <Typography>
          {displayWeekStart.format(displayFormat)} -{' '}
          {weekEnd.format(displayFormat)}
        </Typography>
        <WeeklyMenu
          weekStart={displayWeekStart.format('YYYY-MM-DD')}
          weeklyMenu={weeklyMenu}
        />
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const currentWeekStartString = dayjs().startOf('week').format('YY-MM-DD');
  const currentWeeklyMenu = await getWeeklyMenuByDate(currentWeekStartString);
  const staticReturn: { props: any; revalidate: false | number } = {
    props: {
      latestWeeklyMenu: currentWeeklyMenu,
    },
    revalidate: false,
  };

  if (currentWeeklyMenu) {
    staticReturn.revalidate = 86400;
  }

  return staticReturn;
};
