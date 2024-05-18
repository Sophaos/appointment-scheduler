import { Calendar } from "primereact/calendar";
import { useDispatch, useSelector } from "react-redux";
import { selectCalendarDate, setCalendarDate } from "./calendar-slice";
import { FormEvent } from "primereact/ts-helpers";
import { getFormattedDate } from "shared/utils/time-utils";

export const CalendarDateSelect = () => {
  const dispatch = useDispatch();
  const calendarDate = useSelector(selectCalendarDate);
  const formattedCalendarDate = calendarDate ? new Date(calendarDate) : new Date();
  const handleDateChange = (event: FormEvent<Date>) => {
    dispatch(setCalendarDate(getFormattedDate(event.value ?? new Date())));
  };

  return <Calendar value={formattedCalendarDate} showIcon dateFormat="DD, MM, yy" onChange={handleDateChange} />;
};
