import { useDispatch, useSelector } from "react-redux";
import { selectPeriod, setPeriod } from "./calendar-slice";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

export const ViewSelect = ({ onView }) => {
  const dispatch = useDispatch();
  const view = useSelector(selectPeriod);

  const handleChange = (event: DropdownChangeEvent) => {
    dispatch(setPeriod(event.target.value));

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
