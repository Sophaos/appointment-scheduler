import { FormattedAppointment } from "features/appointments/appointment";
import { AppointmentDrawer } from "features/appointments/appointment-drawer";
import { useGetAppointmentsQuery } from "features/appointments/appointment-slice";
import { BaseCalendar } from "features/calendar/base-calendar";
import { selectCalendarDate, selectDisplayedResources } from "features/calendar/calendar-slice";
import { ClientDrawer } from "features/clients/client-drawer";
import { ExpertDrawer } from "features/experts/expert-drawer";
import { useGetExpertsQuery } from "features/experts/expert-slice";
import { ServiceDrawer } from "features/services/service-drawer";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getEndtime } from "shared/utils/time-utils";

export const AppointmentsPage = () => {
  const date = useSelector(selectCalendarDate);
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "day";

  const { data: appointmentsData, error, isFetching: areAppointmentsFetching } = useGetAppointmentsQuery({ view: view === "agenda" ? "day" : view, date });
  const { isFetching: areExpertFetching } = useGetExpertsQuery();
  const displayedResources = useSelector(selectDisplayedResources);

  const isFetching = areAppointmentsFetching || areExpertFetching;

  const formatedAppointments: FormattedAppointment[] = useMemo(
    () =>
      appointmentsData?.map((a) => ({
        ...a,
        start: new Date(a.startTime),
        end: getEndtime(a.startTime, a.duration),
      })) ?? [],
    [appointmentsData]
  );

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>An error occured.</div>;

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
