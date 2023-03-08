import { SyntheticEvent, useState } from 'react';
import dayjs from 'dayjs';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { SxProps } from '@mui/material';

import theme from '../../../styles/theme';

import IWeeklyMenu from '../../../models/weekly-menu.model';
import IDailyMenu from '../../../models/daily-menu.model';
import DailyMenu from '../daily-menu';

const mobileMenuStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '70px',
};

const tabPanelStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(),
  '.MuiTypography-root': {
    fontSize: theme.typography.h2,
  },
  '&.active': {
    flex: 1,
  },
};

const dailyMenuStyles: SxProps = {
  flex: 1,
};

type MobileMenuProps = {
  weeklyMenu: IWeeklyMenu;
  onChange: (updatedDailyMenu: IDailyMenu) => void;
  className?: string;
  sx?: SxProps;
};

const MobileMenu = (props: MobileMenuProps) => {
  const { weeklyMenu, className = 'mobileMenu', sx = {} } = props;
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
      className={i === currentTab ? 'active' : ''}
      aria-labelledby={`menu-tab-${i}`}
    >
      {i === currentTab && (
        <>
          <Typography>{dayjs().day(dm.weekDay).format('dddd')}</Typography>
          <DailyMenu sx={dailyMenuStyles} menu={dm} onChange={props.onChange} />
        </>
      )}
    </Box>
  ));
  const styles = { ...mobileMenuStyles, ...sx };
  console.log(styles);

  return (
    <Box className={className} sx={styles}>
      <Tabs value={currentTab} onChange={changeTabHandler} variant="scrollable">
        {tabs}
      </Tabs>
      {tabPanels}
    </Box>
  );
};

export default MobileMenu;
