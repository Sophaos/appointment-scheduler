/* eslint-disable @typescript-eslint/no-explicit-any */

import { Calendar, Culture, DateLocalizer, SlotInfo, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop, { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import { useCallback, useMemo } from "react";
import { BaseEvent } from "./base-event";
import { MonthEvent } from "./month-event";
import { AgendaEvent } from "./agenda-event";
import { ResourceHeader } from "./resource-header";
import { CalendarToolbar } from "./calendar-toolbar";
import { Appointment, DEFAULT_APPOINTMENT, FormattedAppointment } from "features/appointments/appointment";
import { useDispatch } from "react-redux";
import { setAppointmentData, setAppointmentDrawerVisibility } from "features/appointments/appointment-slice";

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

export interface BaseCalendarProps {
  events: FormattedAppointment[];
  data: Appointment[];
}

export const BaseCalendar = ({ events, data }: BaseCalendarProps) => {
  const dispatch = useDispatch();
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

  const handleEventResize = useCallback((event: any) => dispatch(setAppointmentDrawerVisibility(true)), [dispatch]);
  const handleSelectSlot = useCallback(
    (event: SlotInfo) => {
      const { start, end } = event;
      dispatch(setAppointmentDrawerVisibility(true));
      dispatch(setAppointmentData({ ...DEFAULT_APPOINTMENT, startTime: start.toISOString(), endTime: end.toISOString() }));
    },
    [dispatch]
  );

  const handleSelectEvent = useCallback(
    (event: any) => {
      const selectedEvent = data.find((item) => item.id === event.id) ?? DEFAULT_APPOINTMENT;
      dispatch(setAppointmentDrawerVisibility(true));
      dispatch(setAppointmentData({ ...selectedEvent, startTime: selectedEvent.startTime, endTime: selectedEvent.endTime }));
    },
    [dispatch, data]
  );

  const min = useMemo(() => new Date(1972, 0, 1, 9, 0, 0, 0), []);
  const max = useMemo(() => new Date(1972, 0, 1, 20, 0, 0, 0), []);
  // const resources = [
  //   { id: 1, nickname: "Alex" },
  //   { id: 2, nickname: "John" },
  //   { id: 3, nickname: "Camille" },
  //   { id: 4, nickname: "Justine" },
  //   { id: 5, nickname: "Vicki" },
  // ];

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
        // resourceAccessor={(e: any) => e.serviceId}
        // resources={resources}
        // resourceIdAccessor={(e: any) => e.id}
        // resourceTitleAccessor={(e: any) => e.nickname}
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
