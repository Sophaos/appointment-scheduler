import { FormattedAppointment } from "features/appointments/appointment";
import { AppointmentDrawer } from "features/appointments/appointment-drawer";
import { useGetAppointmentsQuery } from "features/appointments/appointment-slice";
import { BaseCalendar } from "features/calendar/base-calendar";
import { ClientDrawer } from "features/clients/client-drawer";
import { ExpertDrawer } from "features/experts/expert-drawer";
import { ServiceDrawer } from "features/services/service-drawer";
import { useMemo } from "react";

export const AppointmentsPage = () => {
  const { data: appointmentsData, error, isLoading } = useGetAppointmentsQuery();

  const formatedAppointments: FormattedAppointment[] = useMemo(
    () =>
      appointmentsData?.map((a) => ({
        ...a,
        start: new Date(a.startTime),
        end: new Date(a.endTime),
      })) ?? [],
    [appointmentsData]
  );

  return (
    <>
      <BaseCalendar data={appointmentsData ?? []} events={formatedAppointments} />
      <AppointmentDrawer />
      <ClientDrawer />
      <ServiceDrawer />
      <ExpertDrawer />
    </>
  );
};
