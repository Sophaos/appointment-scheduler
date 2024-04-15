export interface Appointment {
  id: number;
  timeBegin: Date;
  duration: number;
  clientId: number;
  serviceId: number;
  expertId: number;
  notes: string;
}

export const DEFAULT_APPOINTMENT: Appointment = {
  id: 0,
  timeBegin: new Date(),
  duration: 60,
  clientId: 0,
  serviceId: 0,
  expertId: 0,
  notes: "",
};
