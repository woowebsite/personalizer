import dayjs from 'dayjs';

/** Datetime picker */

/**
 * Disable day from 'startDate'
 * @param field compare with 'startDate' field
 * @returns boolean
 */
export const smallerThan = (date: string) => {
  return current => {
    return current && current < dayjs(date).endOf('day');
  };
};
