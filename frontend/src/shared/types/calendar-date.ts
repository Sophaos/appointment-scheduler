export interface CalendarDate {
  view: View;
  date: string;
}

export type View = "day" | "agenda" | "week" | "month";
