import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { PickersDayProps } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

const styles = {
  '&.currentWeek': {
    backgroundColor: 'red',
  },
};

type WeekPickerProps = {
  currentWeekStart?: Dayjs;
};

const WeekPicker = (props: WeekPickerProps) => {
  let { currentWeekStart } = props;

  if (!currentWeekStart) {
    currentWeekStart = dayjs().startOf('week');
  }

  const nextWeekStart = currentWeekStart
    ? currentWeekStart.add(1, 'week')
    : undefined;

  const dayRenderer = (
    date: Dayjs,
    selectedDays: Array<Dayjs | null>,
    pickersDayProps: PickersDayProps<Dayjs>
  ) => {
    const dayStyles: any = {};

    // Only allow Sundays to be selectable
    if (date.day() !== 0) {
      pickersDayProps.disabled = true;
    }

    // Highlight current week
    if (
      date.isSame(currentWeekStart) ||
      (date.isAfter(currentWeekStart) && date.isBefore(nextWeekStart))
    ) {
      dayStyles.backgroundColor = 'red';
    }

    return <PickersDay sx={dayStyles} {...pickersDayProps}></PickersDay>;
  };

  return (
    <CalendarPicker
      openTo="day"
      date={null}
      renderDay={dayRenderer}
      onChange={() => {}}
    ></CalendarPicker>
  );
};

export default WeekPicker;
