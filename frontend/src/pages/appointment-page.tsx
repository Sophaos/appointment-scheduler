import { AppointmentDrawer } from "features/appointments/appointment-drawer";
import { setAppointmentDrawerVisibility, useGetAppointmentsQuery } from "features/appointments/appointment-slice";
import { BaseCalendar } from "features/calendar/base-calendar";
import { ClientDrawer } from "features/clients/client-drawer";
import { ExpertDrawer } from "features/experts/expert-drawer";
import { ServiceDrawer } from "features/services/service-drawer";
import { useDispatch } from "react-redux";

export const AppointmentsPage = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAppointmentsQuery();

  const handleEventResize = () => {
    dispatch(setAppointmentDrawerVisibility(true));
  };

  const handleSelectSlot = () => {
    dispatch(setAppointmentDrawerVisibility(true));
  };

  const handleSelectEvent = () => {
    dispatch(setAppointmentDrawerVisibility(true));
  };

  return (
    <>
      <BaseCalendar onEventResize={handleEventResize} onSelectSlot={handleSelectSlot} onSelectEvent={handleSelectEvent} />
      <AppointmentDrawer />
      <ClientDrawer />
      <ServiceDrawer />
      <ExpertDrawer />
    </>
  );
};
