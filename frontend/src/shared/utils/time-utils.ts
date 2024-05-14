export const getEndtime = (startTime: string, duration: number) => {
  const formattedStartTime = new Date(startTime).getTime();
  const formattedDuration = duration * 60000;
  return new Date(formattedStartTime + formattedDuration);
};

export const getMinutesDifferences = (startTime: Date, endTime: Date) => {
  const differenceInMilliseconds = endTime.getTime() - startTime.getTime();
  return differenceInMilliseconds / (1000 * 60);
};
