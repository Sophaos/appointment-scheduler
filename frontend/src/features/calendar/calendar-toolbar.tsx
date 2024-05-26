/* eslint-disable @typescript-eslint/no-explicit-any */

import { View, Navigate as navigate } from "react-big-calendar";
import { ViewSelect } from "./view-select";
import { Button } from "primereact/button";
import { CalendarDateSelect } from "./calendar-date-select";
import { ResourceSelect } from "./resource-select";
import { AddButton } from "./add-button";
import { useSearchParams } from "react-router-dom";

export const CalendarToolbar = ({ onView, onNavigate }: { onView: any; onNavigate: any }) => {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "day";
  const goToBack = () => onNavigate(navigate.PREVIOUS);
  const goToNext = () => onNavigate(navigate.NEXT);
  const goToToday = () => onNavigate(navigate.TODAY);
  const changeView = (view: View) => onView(view);

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
          <AddButton />
          <ViewSelect onView={changeView} />
        </div>
      </div>
    </>
  );
};
