/* eslint-disable @typescript-eslint/no-explicit-any */

import { View, Navigate as navigate } from "react-big-calendar";
import { ViewSelect } from "./view-select";
// import { ResourceSelect } from "./resource-select";
// import { useSelector } from "react-redux";
// import { selectView } from "./calendar-slice";
import { Button } from "primereact/button";
import { CalendarDateSelect } from "./calendar-date-select";
import { useDispatch, useSelector } from "react-redux";
import { selectView } from "./calendar-slice";
import { ResourceSelect } from "./resource-select";
import { setAppointmentModalOpen } from "features/appointments/appointment-slice";

export const CalendarToolbar = ({ onView, onNavigate }: { onView: any, onNavigate: any }) => {
  const dispatch = useDispatch();
  const view = useSelector(selectView);
  const goToBack = () => onNavigate(navigate.PREVIOUS);
  const goToNext = () => onNavigate(navigate.NEXT);
  const goToToday = () => onNavigate(navigate.TODAY);
  const changeView = (view: View) => onView(view);

  const openAppointmentModal = () => {
    dispatch(setAppointmentModalOpen(true));
  }
  
  return (
    <>
      <div className="flex justify-between w-100 mb-1 p-1 pt-2">
        <div className="flex flex-row flex-wrap gap-1">
          <Button size="small" onClick={goToBack} icon="pi pi-chevron-left" />
          <Button size="small" onClick={goToToday}>
            Today
          </Button>
          <CalendarDateSelect />
          <Button size="small" id="next-btn-icon" onClick={goToNext} icon="pi pi-chevron-right" />
        </div>
        <div className="flex flex-row flex-wrap gap-3">
          {(view === "day" || view === "week") && <ResourceSelect />}
          <Button severity="info" size="small" onClick={() => window.print()} icon="pi pi-print" label="Print"/>
          <Button size="small" onClick={openAppointmentModal} icon="pi pi-plus" label="Add New" />
          <ViewSelect onView={changeView} />
        </div>
      </div>
    </>
  );
};
