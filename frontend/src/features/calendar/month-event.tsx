import { Appointment } from "features/appointments/appointment";
import { Tag } from "primereact/tag";

export interface BaseEventProps {
  event: Appointment;
}

// EventProps<Appointment>;
export const MonthEvent = ({ event }: BaseEventProps) => {
  const { client, service } = event;
  return (
    <div className="flex flex-row place-content-between">
      <Tag value={client?.phoneNumber} />
      <Tag style={{ background: `#${service?.color}`, color: "black" }} value={service?.name} />
    </div>
  );
};
