export class CreateAppointmentDto {
  startTime: Date;
  endTime: Date;
  notes: string;
  clientId: number;
  expertId: number;
  serviceId: number;
}
