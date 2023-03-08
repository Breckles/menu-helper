import { useState, useEffect, FormEventHandler } from 'react';

import Box from '@mui/material/Box';

import IWeeklyMenu, {
  IWeeklyMenuWithId,
} from '../../../models/weekly-menu.model';
import IDailyMenu from '../../../models/daily-menu.model';

import MobileMenu from './mobile-menu';
import DesktopMenu from './desktop-menu';
import { SxProps } from '@mui/material';

const createNewWeeklyMenu = (weekStartDate: string) => {
  const dailyMenus: IDailyMenu[] = [];

  for (let weekDay = 0; weekDay <= 6; weekDay++) {
    dailyMenus.push({ weekDay, dishes: [] });
  }

  const weeklyMenu: IWeeklyMenu = {
    weekStartDate,
    dailyMenus,
  };

  return weeklyMenu;
};

const weeklyMenuStyles = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
};

const mobileStyles: SxProps = {
  flex: 1,
  display: { mobile: 'flex', tablet: 'none' },
};

const desktopStyles: SxProps = {
  display: { mobile: 'none', tablet: 'block' },
};

type WeeklyMenuProps = {
  weekStart: string;
  weeklyMenuWithId?: IWeeklyMenuWithId;
};

interface ICurrentWeeklyMenu extends IWeeklyMenu {
  _id?: string;
}

const WeeklyMenu = (props: WeeklyMenuProps) => {
  const [isCreateMode, setIsCreateMode] = useState(false);

  const [weeklyMenu, setWeeklyMenu] = useState<ICurrentWeeklyMenu | undefined>(
    props.weeklyMenuWithId ? props.weeklyMenuWithId : undefined
  );

  useEffect(() => {
    setWeeklyMenu(props.weeklyMenuWithId);
  }, [props.weeklyMenuWithId]);

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();

    const method = weeklyMenu!._id ? 'PATCH' : 'POST';
    const url = weeklyMenu!._id
      ? `/api/weekly-menus/${weeklyMenu!._id}`
      : `/api/weekly-menus`;

    const result = await fetch(url, {
      method,
      body: JSON.stringify(weeklyMenu),
      headers: { 'Content-Type': 'application/json' },
    });

    if (result.ok) {
      // update/create successful
      if (method === 'POST') {
        const responseData = await result.json();
        const newWeeklyMenu = responseData.newWeeklyMenu as IWeeklyMenuWithId;
        setIsCreateMode(false);
        setWeeklyMenu(newWeeklyMenu);
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
    <Box className="weeklyMenu" sx={weeklyMenuStyles}>
      It looks like you have no menu for this week
      <button onClick={toggleCreateMode}>Create weekly menu</button>
    </Box>
  );

  if (weeklyMenu) {
    content = (
      <Box
        className="weeklyMenu"
        component={'form'}
        sx={weeklyMenuStyles}
        onSubmit={submitHandler}
      >
        <MobileMenu
          className="mobileMenu"
          weeklyMenu={weeklyMenu}
          onChange={onChangeHandler}
          sx={mobileStyles}
        />
        <DesktopMenu
          className="desktopMenu"
          weeklyMenu={weeklyMenu}
          onChange={onChangeHandler}
          sx={desktopStyles}
        />

        <button type="submit">
          {isCreateMode ? 'Create menu' : 'Update Menu'}
        </button>
        {isCreateMode && (
          <button type="button" onClick={toggleCreateMode}>
            Cancel
          </button>
        )}
      </Box>
    );
  }

  return (
    <Box className="weeklyMenu" sx={weeklyMenuStyles}>
      {content}
    </Box>
  );
};

export default WeeklyMenu;
