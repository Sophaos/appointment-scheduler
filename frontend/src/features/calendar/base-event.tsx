import { Appointment } from "features/appointments/appointment";
import React from "react";

export interface BaseEventProps {
  event: Appointment;
}

export const BaseEvent = ({ event }: BaseEventProps) => {
  const { client, expert } = event;
  return (
    <div className="flex flex-row flex-wrap space-x-2">
      <div>{client?.phoneNumber}</div>
      <div>{client?.nickname}</div>
      <div>{expert?.nickname}</div>
    </div>
  );
};
