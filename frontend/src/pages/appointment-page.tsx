import { AppointmentDrawer } from "features/appointments/appointment-drawer";
import { setAppointmentDrawerVisibility, useGetAppointmentsQuery } from "features/appointments/appointment-slice";
import { BaseCalendar } from "features/calendar/base-calendar";
import { ClientDrawer } from "features/clients/client-drawer";
import { useGetClientsQuery } from "features/clients/client-slice";
import { ExpertDrawer } from "features/experts/expert-drawer";
import { useGetExpertsQuery } from "features/experts/expert-slice";
import { ServiceDrawer } from "features/services/service-drawer";
import { useGetServicesQuery } from "features/services/service-slice";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

export const AppointmentsPage = () => {
  const dispatch = useDispatch();
  const { data: appointmentsData, error, isLoading } = useGetAppointmentsQuery();
  const { data: expertsData } = useGetExpertsQuery();
  const { data: servicesData } = useGetServicesQuery();
  const { data: clientsData } = useGetClientsQuery();

  const formatedAppointments = useMemo(
    () =>
      appointmentsData?.map((a) => ({
        ...a,
        start: new Date(a.startTime),
        end: new Date(a.endTime),
      })),
    [appointmentsData]
  );

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
      <BaseCalendar onEventResize={handleEventResize} onSelectSlot={handleSelectSlot} onSelectEvent={handleSelectEvent} events={formatedAppointments ?? []} />
      <AppointmentDrawer />
      <ClientDrawer />
      <ServiceDrawer />
      <ExpertDrawer />
    </>
  );
};
