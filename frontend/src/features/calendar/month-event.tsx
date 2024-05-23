import { Appointment } from "features/appointments/appointment";
import { Badge } from "primereact/badge";
import { Tag } from "primereact/tag";

export interface BaseEventProps {
  event: Appointment;
}

// EventProps<Appointment>;
export const MonthEvent = ({ event }: BaseEventProps) => {
  const { client } = event;
  return (
    <div className="flex flex-row place-content-between">
      <Tag value={client?.phoneNumber} />
      <Tag severity="info" value={client?.nickname} rounded className="p-overlay-badge">
        {client?.note && <Badge severity="danger"></Badge>}
      </Tag>
    </div>
  );
};
