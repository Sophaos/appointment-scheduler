import { Calendar } from "primereact/calendar";
import { FormEvent } from "primereact/ts-helpers";
import { getFormattedDate } from "shared/utils/time-utils";
import { useSearchParams } from "react-router-dom";

export const CalendarDateSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view") || "day";
  const calendarDate = searchParams.get("date") || getFormattedDate(new Date());

  const formattedCalendarDate = calendarDate ? new Date(calendarDate) : new Date();
  const handleDateChange = (event: FormEvent<Date>) => {
    setSearchParams({ view, date: getFormattedDate(event.value ?? new Date()) });
  };

  return <Calendar value={formattedCalendarDate} showIcon dateFormat="DD dd, MM, yy" onChange={handleDateChange} />;
};
