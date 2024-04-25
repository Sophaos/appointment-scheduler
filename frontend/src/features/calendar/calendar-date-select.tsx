import { Calendar } from "primereact/calendar";
import { useDispatch, useSelector } from "react-redux";
import { selectCalendarDate } from "./calendar-slice";

export const CalendarDateSelect = () => {
  const dispatch = useDispatch();
  const calendarDate = useSelector(selectCalendarDate);
  const formattedCalendarDate = new Date(calendarDate);

  // const handleDateChange = (e) => dispatch(setCalendarDate(e.format("YYYY-MM-DD")));
  return <Calendar value={formattedCalendarDate} showIcon dateFormat="DD, MM, yy" />;
};
