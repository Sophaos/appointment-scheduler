import { selectExperts } from "features/experts/expert-slice";
import { useDispatch, useSelector } from "react-redux";
import { selectResources, setResources } from "./calendar-slice";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";

export const ResourceSelect = () => {
  const dispatch = useDispatch();
  const resourcesOptions = useSelector(selectExperts);
  const resources = useSelector(selectResources);

  const handleChange = (event: MultiSelectChangeEvent) => {
    dispatch(setResources(event.target.value));
  };
  return <MultiSelect value={resources} onChange={handleChange} optionLabel="nickname" placeholder="Resource(s)" options={resourcesOptions} />;
};
