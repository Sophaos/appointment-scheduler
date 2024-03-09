export class CreateClientDto {
  nickname: string;
  phoneNumber: string;
  rating: number;
  note: string;
  appointmentIds: number[];
}
