/* eslint-disable @typescript-eslint/no-explicit-any */

import { Calendar, Culture, DateLocalizer, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useCallback, useMemo } from "react";
import { BaseEvent } from "./base-event";
import { MonthEvent } from "./month-event";
import { AgendaEvent } from "./agenda-event";
import { ResourceHeader } from "./resource-header";
import { CalendarToolbar } from "./calendar-toolbar";
import { events } from "./events";
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

export interface BaseCalendarProps {
  onEventResize: () => void;
  onSelectSlot: () => void;
  onSelectEvent: () => void;
}

export const BaseCalendar = ({ onEventResize, onSelectSlot, onSelectEvent }: BaseCalendarProps) => {
  const formats: any = useMemo(
    () => ({
      dayHeaderFormat: (date: Date, culture: Culture, localizer: DateLocalizer): string => localizer.format(date, "dddd D MMM, YYYY", culture),
      timeGutterFormat: (date: Date, culture: Culture, localizer: DateLocalizer): string => localizer.format(date, "HH:mm", culture),
      eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }, culture: Culture, localizer: DateLocalizer): string =>
        `${localizer.format(start, "HH:mm", culture)} - ${localizer.format(end, "HH:mm", culture)}`,
      agendaTimeRangeFormat: ({ start, end }: { start: Date; end: Date }, culture: Culture, localizer: DateLocalizer): string =>
        `${localizer.format(start, "HH:mm", culture)} - ${localizer.format(end, "HH:mm", culture)}`,
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

  const handleEventResize = useCallback((event) => onEventResize(), [onEventResize]);
  const handleSelectSlot = useCallback((event) => onSelectSlot(), [onSelectSlot]);
  const handleSelectEvent = useCallback((event) => onSelectEvent(), [onSelectEvent]);

  const min = useMemo(() => new Date(1972, 0, 1, 9, 0, 0, 0), []);
  const max = useMemo(() => new Date(1972, 0, 1, 20, 0, 0, 0), []);
  const resources = [
    { id: 1, nickname: "Alex" },
    { id: 2, nickname: "John" },
    { id: 3, nickname: "Camille" },
    { id: 4, nickname: "Justine" },
    { id: 5, nickname: "Vicki" },
  ];

  return (
    <div className="myCustomHeight">
      <DnDCalendar
        defaultView="day"
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
        resourceAccessor={(e: any) => e.serviceId}
        resources={resources}
        resourceIdAccessor={(e: any) => e.id}
        resourceTitleAccessor={(e: any) => e.nickname}
        views={["day", "agenda", "week", "month"]}
        style={{ height: "93vh" }}
        onSelectSlot={handleSelectSlot}
        onEventResize={handleEventResize}
        onEventDrop={handleEventResize}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};
