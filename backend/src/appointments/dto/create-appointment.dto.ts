export class CreateAppointmentDto {
  title: string;
  start: Date;
  end: Date;
  notes: string;
  clientId: number;
  serviceIds: number[];
}
