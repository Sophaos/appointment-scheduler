export interface Appointment {
  id: number;
  timeBegin: string;
  duration: number;
  clientId: number;
  serviceId: number;
  expertId: number;
  notes: string;
}

export const DEFAULT_APPOINTMENT: Appointment = {
  id: 0,
  timeBegin: "",
  duration: 60,
  clientId: 0,
  serviceId: 0,
  expertId: 0,
  notes: "",
};
