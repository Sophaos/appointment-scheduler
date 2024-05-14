import { Tag } from "primereact/tag";
import React from "react";
// props: { index, label, resource }
export const ResourceHeader = ({ index, label, resource }) => {
  return (
    <div className="my-1">
      <Tag style={{ background: `#${resource?.color}`, color: "white" }} value={resource?.nickname} />
    </div>
  );
};
