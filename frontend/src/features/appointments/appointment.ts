import { Client } from "features/clients/client";
import { Expert } from "features/experts/expert";
import { Service } from "features/services/service";

export interface Appointment {
  id: number;
  startTime: string;
  endTime: string;
  client?: Client;
  service?: Service;
  expert?: Expert;
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
  client: undefined,
  service: undefined,
  expert: undefined,
  notes: "",
};
