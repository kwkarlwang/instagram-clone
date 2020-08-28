/**
 * Calculate the time difference between now and given date
 * @param {String} date the date to diff
 */
export const diffTime = (date) => {
  const then = new Date(date);
  const now = new Date();
  const diff = now - then;
  const seconds = diff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  return {
    seconds: Math.round(seconds),
    minutes: Math.round(minutes),
    hours: Math.round(hours),
    days: Math.round(days),
  };
};
/**
 * Make the post time string
 * @param {String} date the date to diff
 */
export const createTimeString = (date) => {
  const { seconds, minutes, hours, days } = diffTime(date);
  let timeString = "";
  if (days) {
    const dayOrDays = days === 1 ? "DAY AGO" : "DAYS AGO";
    timeString = `${days} ${dayOrDays}`;
  } else if (hours) {
    const hourOrHours = hours === 1 ? "HOUR AGO" : "HOURS AGO";
    timeString = `${hours} ${hourOrHours}`;
  } else if (minutes) {
    const minuteOrMinutes = minutes === 1 ? "MINUTE AGO" : "MINUTES AGO";
    timeString = `${minutes} ${minuteOrMinutes}`;
  } else {
    const secondOrSeconds = seconds === 1 ? "SECOND AGO" : "SECONDS AGO";
    timeString = `${seconds} ${secondOrSeconds}`;
  }
  return timeString;
};

/**
 * Make the comment time string
 * @param {String} date the date to diff
 */
export const createCommentTimeString = (date) => {
  const { seconds, minutes, hours, days } = diffTime(date);
  let timeString = "";
  if (days) {
    timeString = `${days}d`;
  } else if (hours) {
    timeString = `${hours}h`;
  } else if (minutes) {
    timeString = `${minutes}m`;
  } else {
    timeString = `${seconds}s`;
  }
  return timeString;
};
