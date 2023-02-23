import { GetServerSideProps, GetStaticProps } from 'next';
import Head from 'next/head';
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

  // const weekStart = dayjs(weeklyMenu?.weekStartDate).startOf('week');
  const weekEnd = displayWeekStart.endOf('week');
  const displayFormat = 'ddd, MMM DD';

  const onWeekChange = async (newWeek: Dayjs) => {
    const response = await fetch(
      `/api/weekly-menus?date=${newWeek.format('YYYY-MM-DD')}`
    );

    if (response.ok) {
      const body = await response.json();
      console.log('in onweekchange %o', body.weeklyMenu);

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
