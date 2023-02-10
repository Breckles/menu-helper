import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { PickersDayProps } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

type WeekPickerProps = {
  weekStart?: Dayjs;
  onWeekChange: (newWeekStart: Dayjs) => void;
};

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
    <CalendarPicker
      date={null}
      renderDay={dayRenderer}
      onChange={dateChangeHandler}
    ></CalendarPicker>
  );
};

export default WeekPicker;
