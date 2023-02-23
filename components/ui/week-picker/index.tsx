import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { PickersDayProps } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';

type WeekPickerProps = {
  weekStart?: Dayjs;
  onWeekChange: (newWeekStart: Dayjs) => void;
};

const desktopStyles = {};

const mobileStyles = {};

const dayStyles = {
  '&.currentDay': {
    border: '2px solid #00000080',
  },
  '&.currentWeek': {
    backgroundColor: '#1976d290',
    color: 'white',
  },
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
      <Box
        sx={{ display: { mobile: 'none', tablet: 'unset', desktop: 'unset' } }}
      >
        <CalendarPicker
          date={null}
          renderDay={dayRenderer}
          onChange={dateChangeHandler}
        />
      </Box>
      <Box
        sx={{ display: { mobile: 'unset', tablet: 'none', desktop: 'none' } }}
      >
        <MobileDatePicker
          renderDay={dayRenderer}
          onChange={dateChangeHandler}
          renderInput={(props) => <TextField {...props} />}
          value={currentWeekStart}
        />
      </Box>
    </>
  );
};

export default WeekPicker;
