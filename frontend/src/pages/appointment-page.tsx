import { useGetAppointmentsQuery } from 'features/appointments/appointment-slice';
import { BaseCalendar } from 'features/calendar/base-calendar'

export const AppointmentsPage = () => {
  const { error, isLoading } = useGetAppointmentsQuery({ scheduleDate: new Date()});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured.</div>;
  return (
    <BaseCalendar />
  )
}
