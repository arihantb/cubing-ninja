import moment from 'moment';

import {constants} from '_data/constants';

/**
 * Converts the time given in string format to milliseconds.
 * @param {string} time the time in string format (mm:ss.sss), example: 1:49.853.
 * @returns the time in milliseconds.
 */
export const getTimeInMilliseconds = time => {
  if (time.split(/[:.]+/).length === 2) {
    return (
      parseInt(time.split(/[:.]+/)[1], 10) +
      parseInt(time.split(/[:.]+/)[0], 10) * 1000
    );
  }

  return (
    parseInt(time.split(/[:.]+/)[2], 10) +
    parseInt(time.split(/[:.]+/)[1], 10) * 1000 +
    parseInt(time.split(/[:.]+/)[0], 10) * 60000
  );
};

/**
 * Converts the time given in milliseconds to string format.
 * @param {number} time the time in milliseconds.
 * @returns the time in string format (mm:ss.sss), example: 1:49.853.
 */
export const getTimeInString = time => {
  const duration = moment.duration(time);
  let timeInString =
    (getDigit(duration.seconds(), 1) > 0
      ? getDigit(duration.seconds(), 1).toString()
      : '') +
    getDigit(duration.seconds(), 0).toString() +
    constants.dot +
    getDigit(duration.milliseconds(), 2).toString() +
    getDigit(duration.milliseconds(), 1).toString() +
    getDigit(duration.milliseconds(), 0).toString().split('.')[0];

  if (duration.minutes()) {
    timeInString =
      (getDigit(duration.minutes(), 1) > 0
        ? getDigit(duration.minutes(), 1).toString()
        : '') +
      getDigit(duration.minutes(), 0).toString() +
      constants.colon +
      timeInString;
  }

  return timeInString;
};

/**
 * Extracts the digit of the given number from a given place.
 * @param {number} number the number whose digit is expected.
 * @param {number} place the place value of the digit expected.
 * @returns the digit at the given place value.
 */
export const getDigit = (number, place) => {
  for (let i = 0; i < place; i++) {
    number = Math.floor(number / 10);
  }

  return number % 10;
};
