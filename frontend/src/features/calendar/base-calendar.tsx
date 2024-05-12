/* eslint-disable @typescript-eslint/no-explicit-any */

import { Calendar, Culture, DateLocalizer, NavigateAction, SlotInfo, View, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useCallback, useMemo } from "react";
import { BaseEvent } from "./base-event";
import { MonthEvent } from "./month-event";
import { AgendaEvent } from "./agenda-event";
import { ResourceHeader } from "./resource-header";
import { CalendarToolbar } from "./calendar-toolbar";
import { Appointment, DEFAULT_APPOINTMENT, FormattedAppointment } from "features/appointments/appointment";
import { useDispatch } from "react-redux";
import { setAppointmentData, setAppointmentDrawerVisibility } from "features/appointments/appointment-slice";
import { setCalendarDate, setCalendarDateAndView, setIsMoving } from "./calendar-slice";
import { Expert } from "features/experts/expert";

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

export interface BaseCalendarProps {
  events: FormattedAppointment[];
  data: Appointment[];
  resources?: Expert[];
}

export const BaseCalendar = ({ events, data, resources }: BaseCalendarProps) => {
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

  // TODO: add closed days
  const dayPropGetter = useCallback(
    (date: any) => ({
      ...(moment(date).day() === 1 && {
        style: {
          background: "repeating-linear-gradient(60deg, #F3F1F2, #F3F1F2 4px, #EBE8E9 4px, #EBE8E9 8px)",
          color: "transparent",
        },
      }),
    }),
    []
  );

  // todo: modify color
  const slotPropGetter = useCallback((date: any) => {
    const day = moment(date).day();

    if (day === 1) {
      return {
        ...(moment(date).day() === 1 && {
          style: {
            background: "repeating-linear-gradient(60deg, #F3F1F2, #F3F1F2 4px, #EBE8E9 4px, #EBE8E9 8px)",
            color: "transparent",
          },
        }),
      };
    }

    const hour = moment(date).hour();
    const intervalStart = Math.floor(hour);
    const backgroundColor = intervalStart % 2 === 0 ? "#d5dbe9" : "white";

    return {
      className: "slotDefault",
      style: {
        backgroundColor,
        color: "black",
      },
    };
  }, []);

  const eventPropGetter = useCallback(
    (event: any) => ({
      ...(event?.status === "IN_PROGRESS" && {
        style: {
          borderLeft: "6px green solid",
        },
      }),
      ...(event?.status === "ARRIVED" && {
        style: {
          borderLeft: "6px GoldenRod solid",
        },
      }),
      ...(event?.status === "" && {
        style: {
          borderLeft: "6px gray solid",
        },
      }),
      ...(event?.status === "NO_SHOW" && {
        style: {
          borderLeft: "6px red solid",
        },
      }),
      ...(event?.status === "DONE" && {
        style: {
          opacity: "0.5",
        },
      }),
    }),
    []
  );

  const slotGroupPropGetter = useCallback(
    () => ({
      style: {
        minHeight: 40,
      },
    }),
    []
  );

  const handleNavigate = useCallback(
    (newDate: Date, view: View, action: NavigateAction) => {
      if (action === "DATE") dispatch(setCalendarDateAndView({ view: "day", scheduleDate: newDate.toISOString() }));
      else dispatch(setCalendarDate(newDate.toISOString()));
    },
    [dispatch]
  );

  const handleEventResize = useCallback(
    (event: any) => {
      const selectedEvent = data.find((item) => item.id === event.event.id);
      dispatch(setAppointmentDrawerVisibility(true));
      dispatch(setAppointmentData({ ...selectedEvent, startTime: event.start.toISOString(), endTime: event.end.toISOString() }));
      dispatch(setIsMoving(true));
    },
    [dispatch, data]
  );

  const handleEventDrop = useCallback(
    (e: any) => {
      const { start, end, event, resourceId } = e;
      const selectedEvent = data.find((item) => item.id === event.id);
      const resource = resources?.find((item) => item.id === resourceId);
      dispatch(setAppointmentDrawerVisibility(true));
      dispatch(setAppointmentData({ ...selectedEvent, startTime: start.toISOString(), endTime: end.toISOString(), expert: resource ?? selectedEvent?.expert }));
      dispatch(setIsMoving(true));
    },
    [data, resources, dispatch]
  );

  const handleSelectSlot = useCallback(
    (event: SlotInfo) => {
      const { start, end, resourceId } = event;
      console.log(event);
      const resource = resources?.find((item) => item.id === resourceId) ?? undefined;
      dispatch(setAppointmentDrawerVisibility(true));
      dispatch(setAppointmentData({ ...DEFAULT_APPOINTMENT, startTime: start.toISOString(), endTime: end.toISOString(), expert: resource }));
    },
    [dispatch, resources]
  );

  const handleSelectEvent = useCallback(
    (event: any) => {
      const selectedEvent = data.find((item) => item.id === event.id) ?? DEFAULT_APPOINTMENT;
      dispatch(setAppointmentDrawerVisibility(true));
      dispatch(setAppointmentData({ ...selectedEvent }));
    },
    [dispatch, data]
  );

  const min = useMemo(() => new Date(1972, 0, 1, 9, 0, 0, 0), []);
  const max = useMemo(() => new Date(1972, 0, 1, 20, 0, 0, 0), []);

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
        dayPropGetter={dayPropGetter}
        slotPropGetter={slotPropGetter}
        eventPropGetter={eventPropGetter}
        slotGroupPropGetter={slotGroupPropGetter}
        resourceAccessor={(e: any) => e?.expert?.id}
        resources={resources}
        resourceIdAccessor={(e: any) => e?.id}
        resourceTitleAccessor={(e: any) => e?.nickname}
        onNavigate={handleNavigate}
        views={["day", "agenda", "week", "month"]}
        style={{ height: "93vh" }}
        onSelectSlot={handleSelectSlot}
        onEventResize={handleEventResize}
        onEventDrop={handleEventDrop}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};
