export const DURATION_OPTIONS = [
  { id: 15, label: "15 minutes" },
  { id: 30, label: "30 minutes" },
  { id: 45, label: "45 minutes" },
  { id: 60, label: "60 minutes" },
  { id: 75, label: "75 minutes" },
  { id: 90, label: "90 minutes" },
];

export const getEndtime = (startTime: string, duration: number) => {
  const formattedStartTime = new Date(startTime).getTime();
  const formattedDuration = duration * 60000;
  return new Date(formattedStartTime + formattedDuration);
};

export const getMinutesDifferences = (startTime: Date, endTime: Date) => {
  const differenceInMilliseconds = endTime.getTime() - startTime.getTime();
  return differenceInMilliseconds / (1000 * 60);
};
