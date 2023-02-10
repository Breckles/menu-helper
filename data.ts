import dayjs from 'dayjs';

console.log(dayjs().startOf('week').format('YYYY-MM-DD'));
console.log(dayjs().startOf('week').day());

export const weeklyMenuSeed = {
  weekStartDate: dayjs().day(0).format('YYYY-MM-DD'),
  dailyMenus: [
    {
      weekDay: 0,
      dishes: ['garbage Lasagna', 'Frozen Ravioli', 'Salad kit', 'Box of Wine'],
    },
    {
      weekDay: 1,
      dishes: ['Frozen Lasagna', 'Frozen Ravioli', 'Salad kit', 'Box of Wine'],
    },
    {
      weekDay: 2,
      dishes: ['Frozen Lasagna', 'Frozen Ravioli', 'Salad kit', 'Box of Wine'],
    },
    {
      weekDay: 3,
      dishes: ['Frozen Lasagna', 'Frozen Ravioli', 'Salad kit', 'Box of Wine'],
    },
    {
      weekDay: 4,
      dishes: ['Frozen Lasagna', 'Frozen Ravioli', 'Salad kit', 'Box of Wine'],
    },
    {
      weekDay: 5,
      dishes: ['Frozen Lasagna', 'Frozen Ravioli', 'Salad kit', 'Box of Wine'],
    },
    {
      weekDay: 6,
      dishes: ['Frozen Lasagna', 'Frozen Ravioli', 'Salad kit', 'Box of Wine'],
    },
  ],
};
