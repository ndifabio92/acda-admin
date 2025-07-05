import dayjs from 'dayjs';

export const isDayLessThan11 = (): boolean => {
  const currentDay = dayjs().date();
  return currentDay < 11;
};
