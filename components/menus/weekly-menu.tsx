import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import IWeeklyMenu, { IWeeklyMenuWithId } from '../../models/weekly-menu.model';
import IDailyMenu from '../../models/daily-menu.model';

import DailyMenu from './daily-menu';

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
  weeklyMenuWithId?: IWeeklyMenuWithId;
};

const WeeklyMenu = (props: WeeklyMenuProps) => {
  // const existingMenu = props.weeklyMenu;
  const [isCreateMode, setIsCreateMode] = useState(false);

  const [weeklyMenu, setWeeklyMenu] = useState<IWeeklyMenu | undefined>(
    undefined
  );

  useEffect(() => {
    console.log('in useEffect %o', props.weeklyMenuWithId);

    setWeeklyMenu(props.weeklyMenuWithId);
  }, [props.weeklyMenuWithId]);

  console.log('in WeeklyMenu %o', weeklyMenu);

  const submitHandler = async () => {
    const method = props.weeklyMenuWithId ? 'PATCH' : 'POST';
    const url = props.weeklyMenuWithId
      ? `/api/weekly-menus/${props.weeklyMenuWithId._id}`
      : `/api/weekly-menus`;

    const result = await fetch(url, {
      method,
      body: JSON.stringify(weeklyMenu),
      headers: { 'Content-Type': 'application/json' },
    });

    if (result.ok) {
      // update/create successful
      if (method === 'PATCH') {
      }
    } else {
      console.log('Error occurred during request.');
    }
  };

  const toggleCreateMode = () => {
    if (isCreateMode) {
      setWeeklyMenu(undefined);
    } else {
      const blankMenu = createNewWeeklyMenu(props.weekStart);
      setWeeklyMenu(blankMenu);
    }
    setIsCreateMode((current) => !current);
  };

  const onChangeHandler = (updatedDailyMenu: IDailyMenu) => {
    if (weeklyMenu) {
      weeklyMenu.dailyMenus[updatedDailyMenu.weekDay] = updatedDailyMenu;
    }
  };

  let content = (
    <>
      It looks like you have no menu for this week
      <button onClick={toggleCreateMode}>Create weekly menu</button>
    </>
  );

  if (weeklyMenu) {
    console.log('about to create list of dailyMenus %o', weeklyMenu);
    
    const dailyMenus = weeklyMenu.dailyMenus.map((dm, i) => (
      <ListItem key={dm.weekDay}>
        <Typography variant="h3">
          {dayjs().day(dm.weekDay).format('dddd')}
        </Typography>
        <DailyMenu menu={dm} onChange={onChangeHandler} />
      </ListItem>
    ));

    content = (
      <form onSubmit={submitHandler}>
        <button type="submit">
          {isCreateMode ? 'Create menu' : 'Update Menu'}
        </button>
        {isCreateMode && (
          <button type="button" onClick={toggleCreateMode}>
            Cancel
          </button>
        )}
        <List>{dailyMenus}</List>
      </form>
    );
  }

  return <Box>{content}</Box>;
};

export default WeeklyMenu;
