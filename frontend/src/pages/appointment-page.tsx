import { FormattedAppointment } from "features/appointments/appointment";
import { AppointmentDrawer } from "features/appointments/appointment-drawer";
import { useGetAppointmentsQuery } from "features/appointments/appointment-slice";
import { BaseCalendar } from "features/calendar/base-calendar";
import { selectCalendarDate, selectDisplayedResources, selectPeriod } from "features/calendar/calendar-slice";
import { ClientDrawer } from "features/clients/client-drawer";
import { ExpertDrawer } from "features/experts/expert-drawer";
import { useGetExpertsQuery } from "features/experts/expert-slice";
import { ServiceDrawer } from "features/services/service-drawer";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getEndtime } from "shared/utils/time-utils";

export const AppointmentsPage = () => {
  const date = useSelector(selectCalendarDate);
  const period = useSelector(selectPeriod);
  const { data: appointmentsData, error, isLoading } = useGetAppointmentsQuery({ period, date });
  const { isFetching: areExpertLoading } = useGetExpertsQuery();
  const displayedResources = useSelector(selectDisplayedResources);

  const formatedAppointments: FormattedAppointment[] = useMemo(
    () =>
      appointmentsData?.map((a) => ({
        ...a,
        start: new Date(a.startTime),
        end: getEndtime(a.startTime, a.duration),
      })) ?? [],
    [appointmentsData]
  );

  return (
    <>
      <BaseCalendar data={appointmentsData ?? []} events={formatedAppointments} resources={displayedResources} />
      <AppointmentDrawer />
      <ClientDrawer />
      <ServiceDrawer />
      <ExpertDrawer />
    </>
  );
};
