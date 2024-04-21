export interface Appointment {
  id: number;
  startTime: Date;
  endTime: Date;
  clientId: number;
  serviceId: number;
  expertId: number;
  notes: string;
}

export const DEFAULT_APPOINTMENT: Appointment = {
  id: 0,
  startTime: new Date(),
  endTime: new Date(),
  clientId: 0,
  serviceId: 0,
  expertId: 0,
  notes: "",
};
