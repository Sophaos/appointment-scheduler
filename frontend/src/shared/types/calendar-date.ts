export interface CalendarDate {
  period: Period;
  date: string;
}

export type Period = "day" | "agenda" | "week" | "month";
