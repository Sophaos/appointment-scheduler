import { Calendar } from "primereact/calendar";
import { useDispatch, useSelector } from "react-redux";
import { selectCalendarDate, setCalendarDate } from "./calendar-slice";
import { FormEvent } from "primereact/ts-helpers";

export const CalendarDateSelect = () => {
  const dispatch = useDispatch();
  const calendarDate = useSelector(selectCalendarDate);
  const formattedCalendarDate = new Date(calendarDate);
  const handleDateChange = (event: FormEvent<Date>) => {
    dispatch(setCalendarDate(event.value?.toISOString()));
  };

  // const handleDateChange = (e) => dispatch(setCalendarDate(e.format("YYYY-MM-DD")));
  return <Calendar value={formattedCalendarDate} showIcon dateFormat="DD, MM, yy" onChange={handleDateChange} />;
};
