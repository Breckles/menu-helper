import { SyntheticEvent, useState } from 'react';
import dayjs from 'dayjs';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import theme from '../../../styles/theme';

import IWeeklyMenu from '../../../models/weekly-menu.model';
import IDailyMenu from '../../../models/daily-menu.model';
import DailyMenu from '../daily-menu';

const mobileMenuStyles = {
  minHeight: '70px',
  padding: '20px',
};

const tabPanelStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  '.MuiTypography-root': {
    fontSize: '2rem',
  },
};

type MobileMenuProps = {
  weeklyMenu: IWeeklyMenu;
  onChange: (updatedDailyMenu: IDailyMenu) => void;
};

const MobileMenu = (props: MobileMenuProps) => {
  const { weeklyMenu } = props;
  const [currentTab, setCurrentTab] = useState(0);

  const changeTabHandler = (e: SyntheticEvent, newTab: number) => {
    setCurrentTab(newTab);
  };

  const tabs = weeklyMenu.dailyMenus.map((dm, i) => (
    <Tab
      key={dm.weekDay}
      id={`menu-tab-${dm.weekDay}`}
      label={dayjs().day(dm.weekDay).format('ddd')}
      aria-controls={`menu-tabpanel-${i}`}
    />
  ));

  const tabPanels = weeklyMenu.dailyMenus.map((dm, i) => (
    <Box
      key={dm.weekDay}
      id={`menu-tabpanel-${i}`}
      sx={tabPanelStyles}
      aria-labelledby={`menu-tab-${i}`}
    >
      {i === currentTab && (
        <>
          <Typography>{dayjs().day(dm.weekDay).format('dddd')}</Typography>
          <DailyMenu menu={dm} onChange={props.onChange} />
        </>
      )}
    </Box>
  ));

  return (
    <Box sx={mobileMenuStyles}>
      <Tabs value={currentTab} onChange={changeTabHandler} variant="scrollable">
        {tabs}
      </Tabs>
      {tabPanels}
    </Box>
  );
};

export default MobileMenu;
