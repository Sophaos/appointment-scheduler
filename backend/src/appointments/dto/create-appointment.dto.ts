export class CreateAppointmentDto {
  startTime: Date;
  duration: number;
  notes: string;
  clientId: number;
  expertId: number;
  serviceId: number;
  status: string;
}
