export const getEndtime = (startTime: string, duration: number) => {
  const formattedStartTime = new Date(startTime).getTime();
  const formattedDuration = duration * 60000;
  return new Date(formattedStartTime + formattedDuration);
};

export const getMinutesDifferences = (startTime: Date, endTime: Date) => {
  const differenceInMilliseconds = endTime.getTime() - startTime.getTime();
  return differenceInMilliseconds / (1000 * 60);
};

export const getFormattedDate = (date: Date) => {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split("T")[0];
};
