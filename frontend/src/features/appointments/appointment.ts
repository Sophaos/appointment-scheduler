import { Client } from "features/clients/client";
import { Expert } from "features/experts/expert";
import { Service } from "features/services/service";

export interface Appointment {
  id: number;
  startTime: string;
  duration: number;
  client?: Client;
  service?: Service;
  expert?: Expert;
  notes: string;
  status: string;
}

export interface FormattedAppointment extends Appointment {
  start: Date;
}

export const DEFAULT_APPOINTMENT: Appointment = {
  id: 0,
  startTime: new Date(new Date().setHours(10, 0, 0, 0)).toString(),
  duration: 30,
  client: undefined,
  service: undefined,
  expert: undefined,
  notes: "",
  status: "IDLE",
};
