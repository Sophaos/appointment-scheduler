import { Appointment } from "features/appointments/appointment";
import { Badge } from "primereact/badge";
import { Tag } from "primereact/tag";

export interface BaseEventProps {
  event: Appointment;
}

// EventProps<Appointment>;
export const BaseEvent = ({ event }: BaseEventProps) => {
  const { client, expert, service } = event;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row flex-wrap gap-1">
        <Tag value={client?.phoneNumber} />
        <Tag severity="info" value={client?.nickname} rounded className="p-overlay-badge">
          {client?.note && <Badge severity="danger"></Badge>}
        </Tag>
      </div>
      <div className="flex flex-row flex-wrap gap-1">
        <Tag style={{ background: `#${service?.color}`, color: "black" }} value={service?.name} />
        <Tag style={{ background: `#${expert?.color}` }} value={expert?.nickname} rounded />
      </div>
    </div>
  );
};
