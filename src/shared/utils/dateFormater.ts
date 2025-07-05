import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DISPLAY_DATE_FORMAT = 'DD-MM-YYYY';
export const DISPLAY_DATE_TIME_FORMAT = 'DD-MM-YYYY HH:mm';
export const HTML_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
export const TIME_FORMAT = 'HH:mm';

export const formatTime = (date: Date | string | null | undefined): string => {
  if (!date) return '';
  return dayjs(date).format(TIME_FORMAT);
};

export const formatDateTime = (date: Date | string | null | undefined): string => {
  if (!date) return '';
  return dayjs(date).format(DATE_FORMAT);
};

export const formatDateTimeForInput = (date: Date | string | null | undefined): string => {
  if (!date) return '';
  return dayjs(date).format(HTML_DATE_TIME_FORMAT);
};

export const formatDisplayDate = (date: Date | string | null | undefined): string => {
  if (!date) return '';
  return dayjs(date).format(DISPLAY_DATE_FORMAT);
};

export const formatDisplayDateTime = (date: Date | string | null | undefined): string => {
  if (!date) return '';
  return dayjs(date).format(DISPLAY_DATE_TIME_FORMAT);
};

export const formatHtmlDate = (date: Date | string | null | undefined): string => {
  if (!date) return '';
  return dayjs(date).format(HTML_DATE_TIME_FORMAT);
};

export const getCurrentDateTime = (): string => {
  return dayjs().format(DATE_TIME_FORMAT);
};

export const parseDateTime = (dateString: string): Date => {
  return dayjs(dateString).toDate();
};

export const parseDateUTC = (date: Date): Date => {
  return dayjs.tz(date, 'America/Argentina/Buenos_Aires').utc().toDate();
};
