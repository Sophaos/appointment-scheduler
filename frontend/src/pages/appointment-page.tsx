import { useGetAppointmentsQuery } from 'features/appointments/appointment-slice';
import { BaseCalendar } from 'features/calendar/base-calendar'

export const AppointmentsPage = () => {
  const { data, error, isLoading } = useGetAppointmentsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured.</div>;
  console.log(data)

  return (
    <BaseCalendar />
  )
}
