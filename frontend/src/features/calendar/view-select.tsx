import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useSearchParams } from "react-router-dom";
import { getFormattedDate } from "shared/utils/time-utils";

export const ViewSelect = ({ onView }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view") || "day";
  const calendarDate = searchParams.get("date") || getFormattedDate(new Date());

  const handleChange = (event: DropdownChangeEvent) => {
    setSearchParams({ date: calendarDate, view: event.target.value });
    onView(event.target.value);
  };

  const views = [
    { name: "Month", code: "month" },
    { name: "Week", code: "week" },
    { name: "Day", code: "day" },
    { name: "Agenda", code: "agenda" },
  ];
  return <Dropdown value={view} optionValue="code" onChange={handleChange} options={views} optionLabel="name" placeholder="Select a View" />;
};
