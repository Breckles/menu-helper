import dayjs from 'dayjs';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import IWeeklyMenu from '../../../models/weekly-menu.model';
import IDailyMenu from '../../../models/daily-menu.model';

import DailyMenu from '../daily-menu';
import { SxProps } from '@mui/material';

const desktopStyles: SxProps = {
  width: '100%',
  height: '100%',
};

type DesktopMenuProps = {
  weeklyMenu: IWeeklyMenu;
  onChange: (updatedDailyMenu: IDailyMenu) => void;
  className?: string;
  sx?: SxProps;
};

const DesktopMenu = (props: DesktopMenuProps) => {
  const { weeklyMenu, onChange, className = 'desktopMenu', sx = {} } = props;

  const listItems = weeklyMenu.dailyMenus.map((dm) => (
    <ListItem key={dm.weekDay}>
      <Typography variant="h3">
        {dayjs().day(dm.weekDay).format('dddd')}
      </Typography>
      <DailyMenu menu={dm} onChange={props.onChange} />
    </ListItem>
  ));

  return (
    <List className={className} sx={sx}>
      {listItems}
    </List>
  );
};

export default DesktopMenu;
