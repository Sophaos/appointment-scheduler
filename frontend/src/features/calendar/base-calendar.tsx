/* eslint-disable @typescript-eslint/no-explicit-any */

import { Calendar, Culture, DateLocalizer, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { useMemo } from 'react'
import { BaseEvent } from './base-event'
import { MonthEvent } from './month-event'
import { AgendaEvent } from './agenda-event'
import { ResourceHeader } from './resource-header'
import { CalendarToolbar } from './calendar-toolbar'
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

export const BaseCalendar = () => {
  const formats: any = useMemo(
    () => ({
      dayHeaderFormat: (date: Date, culture: Culture, localizer: DateLocalizer): string => localizer.format(date, "dddd D MMM, YYYY", culture),
      timeGutterFormat: (date: Date, culture: Culture, localizer: DateLocalizer): string => localizer.format( date,"HH:mm",culture ),
      eventTimeRangeFormat: ({ start, end }: { start: Date, end: Date }, culture: Culture, localizer: DateLocalizer): string => `${localizer.format(start, "HH:mm", culture)} - ${localizer.format(end, "HH:mm", culture)}`,
      agendaTimeRangeFormat: ({ start, end }: { start: Date, end: Date }, culture: Culture, localizer: DateLocalizer): string => `${localizer.format(start, "HH:mm", culture)} - ${localizer.format(end, "HH:mm", culture)}`,
    }),
    []
  );

  const components = useMemo(
    () => ({
      resourceHeader: ResourceHeader,
      toolbar: CalendarToolbar,
      agenda: {
        event: AgendaEvent,
      },
      day: {
        event: BaseEvent,
      },
      week: {
        event: BaseEvent,
      },
      month: {
        event: MonthEvent,
      },
    }),
    []
  );

  const min = useMemo(() => new Date(1972, 0, 1, 9, 0, 0, 0), []);
  const max = useMemo(() => new Date(1972, 0, 1, 20, 0, 0, 0), []);

  const events = [
  {
    title: "Meeting with Team",
    start: new Date(new Date().setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60))),
    end: new Date(new Date().setHours(Math.floor(Math.random() * 24) + 1, Math.floor(Math.random() * 60))),
  },
  {
    title: "Lunch Break",
    start: new Date(new Date().setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60))),
    end: new Date(new Date().setHours(Math.floor(Math.random() * 24) + 1, Math.floor(Math.random() * 60))),
  },
  {
    title: "Client Call",
    start: new Date(new Date().setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60))),
    end: new Date(new Date().setHours(Math.floor(Math.random() * 24) + 1, Math.floor(Math.random() * 60))),
  },
  {
    title: "Project Presentation",
    start: new Date(new Date().setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60))),
    end: new Date(new Date().setHours(Math.floor(Math.random() * 24) + 1, Math.floor(Math.random() * 60))),
  },
  {
    title: "Team Training",
    start: new Date(new Date().setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60))),
    end: new Date(new Date().setHours(Math.floor(Math.random() * 24) + 1, Math.floor(Math.random() * 60))),
  }
];

console.log(events);

  
  return (
    <div className="myCustomHeight">
    <DnDCalendar
        formats={formats}
        components={components}
        dayLayoutAlgorithm="no-overlap"
        step={15}
        timeslots={1}
        selectable
        length={1}
        draggableAccessor={() => true}
        localizer={localizer}
        min={min}
        max={max}
        events={events}
        popup
        // resourceAccessor={"technicianIds"}
        resources={undefined}
        // resourceIdAccessor={"id"}
        // resourceTitleAccessor={"nickname"}
      views={["day", "agenda", "week", "month"]}
      style={{ height: "93vh" }}
    />
  </div>
)}