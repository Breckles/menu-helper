import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import WeeklyMenu from '../components/menus/weekly-menu';
import { weeklyMenuSeed } from '../data';
import { IWeeklyMenuWithId } from '../models/weekly-menu.model';
import { getLatestWeeklyMenu } from '../mongodb/db-weekly-menu';

type HomePageProps = {
  latestWeeklyMenu?: IWeeklyMenuWithId;
};

export default function Home(props: HomePageProps) {
  const { latestWeeklyMenu } = props;
  // const createWeeklyMenuHandler = () => {
  //   fetch('/api/weekly-menus', {
  //     method: 'POST',
  //     body: JSON.stringify(weeklyMenuSeed),
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {latestWeeklyMenu ? (
          <WeeklyMenu weeklyMenu={latestWeeklyMenu} />
        ) : (
          <Box>You have no weekly menus</Box>
        )}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const latestWeeklyMenu = await getLatestWeeklyMenu();
  console.log(latestWeeklyMenu);
  return {
    props: {
      latestWeeklyMenu,
    },
  };
};
