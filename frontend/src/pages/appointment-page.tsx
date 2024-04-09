import { selectAppointmentModalOpen, setAppointmentModalOpen, useGetAppointmentsQuery } from 'features/appointments/appointment-slice';
import { BaseCalendar } from 'features/calendar/base-calendar'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseDrawer } from 'shared/ui/base-drawer';

export const AppointmentsPage = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAppointmentsQuery();
  const appointmentModalOpen = useSelector(selectAppointmentModalOpen);

  const handleOpen = () => {
    dispatch(setAppointmentModalOpen(false));
  }

  return (
    <>
      <BaseDrawer isOpen={appointmentModalOpen} title="test" setIsOpen={handleOpen}>
        <div>Hello</div>
      </BaseDrawer>
    <BaseCalendar />
    </>
  )
}
