
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

export const BaseCalendar = () => (
  <div className="myCustomHeight">
    {/* Tailwindcss test */}
    {/* <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1> */}
    <Calendar
      localizer={localizer}
      events={[]}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "95vh" }}
    />
  </div>
)