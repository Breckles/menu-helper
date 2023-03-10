import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import theme from '../../../styles/theme';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { PickersDayProps } from '@mui/x-date-pickers';

const dayStyles = {
  '&.currentDay': {
    border: '2px solid #00000080',
  },
  '&.currentWeek': {
    backgroundColor: '#1976d290',
    color: 'white',
  },
};

const desktopStyles: SxProps = {
  display: { mobile: 'none', tablet: 'unset' },
};

const mobileStyles: SxProps = {
  display: { mobile: 'flex', tablet: 'none' },
  flexDirection: 'column',
  gap: theme.spacing(),
  alignItems: 'center',
};

type WeekPickerProps = {
  weekStart?: Dayjs;
  onWeekChange: (newWeekStart: Dayjs) => void;
};

const WeekPicker = (props: WeekPickerProps) => {
  let { weekStart } = props;

  if (!weekStart) {
    weekStart = dayjs().startOf('week');
  }

  const [currentWeekStart, setCurrentWeekStart] = useState(weekStart);

  const currentWeekEnd = currentWeekStart.endOf('week');

  const dayRenderer = (
    date: Dayjs,
    _selectedDays: Array<Dayjs | null>,
    pickersDayProps: PickersDayProps<Dayjs>
  ) => {
    // Only allow Sundays to be selectable
    if (date.day() !== 0) {
      pickersDayProps.disabled = true;
    }

    let classNames = '';

    // Mark current day
    if (date.isSame(dayjs(), 'day')) {
      classNames += 'currentDay ';
    }

    // Mark days in current week
    if (
      date.isSame(currentWeekStart) ||
      (date.isAfter(currentWeekStart) && date.isBefore(currentWeekEnd))
    ) {
      classNames += 'currentWeek ';
    }

    return (
      <PickersDay
        className={classNames}
        sx={dayStyles}
        {...pickersDayProps}
      ></PickersDay>
    );
  };

  const dateChangeHandler = (date: Dayjs | null) => {
    if (date && !date.isSame(currentWeekStart)) {
      props.onWeekChange(date);
      setCurrentWeekStart(date);
    }
  };

  return (
    <>
      <Box sx={desktopStyles}>
        <CalendarPicker
          date={null}
          renderDay={dayRenderer}
          onChange={dateChangeHandler}
        />
      </Box>
      <Box sx={mobileStyles}>
        <Typography component={'label'} htmlFor="datePickerTextField">
          Week starting date
        </Typography>
        <MobileDatePicker
          renderDay={dayRenderer}
          onChange={dateChangeHandler}
          renderInput={(props) => (
            <TextField id="datePickerTextField" {...props} />
          )}
          value={currentWeekStart}
        />
      </Box>
    </>
  );
};

export default WeekPicker;
