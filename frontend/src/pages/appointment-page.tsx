import { AppointmentDrawer } from 'features/appointments/appointment-drawer';
import { useGetAppointmentsQuery } from 'features/appointments/appointment-slice';
import { BaseCalendar } from 'features/calendar/base-calendar'
import { ClientDrawer } from 'features/clients/client-drawer';
import { ExpertDrawer } from 'features/experts/expert-drawer';
import { ServiceDrawer } from 'features/services/service-drawer';


export const AppointmentsPage = () => {
  const { data, error, isLoading } = useGetAppointmentsQuery();

  return (
    <>
      <BaseCalendar />
      <AppointmentDrawer />
      <ClientDrawer />
      <ServiceDrawer />
      <ExpertDrawer />
    </>
  )
}
