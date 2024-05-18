import { setExpertDrawerVisibility } from "features/experts/expert-slice";
import { Tag } from "primereact/tag";
import React from "react";
import { useDispatch } from "react-redux";
// props: { index, label, resource }
export const ResourceHeader = ({ index, label, resource }) => {
  const dispatch = useDispatch();
  const editResource = () => {
    // TODO: should open right form too
    dispatch(setExpertDrawerVisibility(true));
  };
  return (
    <div className="my-1">
      <Tag onClick={editResource} style={{ background: `#${resource?.color}`, color: "white" }} value={resource?.nickname} />
    </div>
  );
};
