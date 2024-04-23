export interface Appointment {
  id: number;
  startTime: string;
  endTime: string;
  clientId: number;
  serviceId: number;
  expertId: number;
  notes: string;
}

export interface FormattedAppointment extends Appointment {
  start: Date;
  end: Date;
}

export const DEFAULT_APPOINTMENT: Appointment = {
  id: 0,
  startTime: "",
  endTime: "",
  clientId: 0,
  serviceId: 0,
  expertId: 0,
  notes: "",
};
