import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useSearchParams } from "react-router-dom";

export const ViewSelect = ({ onView }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view") || "day";

  const handleChange = (event: DropdownChangeEvent) => {
    setSearchParams({ view: event.target.value });
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
