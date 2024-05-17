import { DEFAULT_EXPERT, Expert } from "features/experts/expert";
import { ExpertDrawer } from "features/experts/expert-drawer";
import { setExpertDrawerVisibility, useGetExpertsQuery } from "features/experts/expert-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BaseTable, TableColumnProp } from "shared/ui/base-table";

export const ExpertsPage = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetExpertsQuery();

  const [id, setId] = useState(0);
  const item = id ? data?.find((i) => i.id === id) : DEFAULT_EXPERT;

  const columns: TableColumnProp[] = [
    { field: "nickname", header: "Nickanme" },
    { field: "color", header: "Color" },
  ];

  const handleEdit = (row: Expert) => {
    dispatch(setExpertDrawerVisibility(true));
    setId(row.id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured.</div>;
  return (
    <>
      <BaseTable onEdit={handleEdit} data={data ?? []} columns={columns} />;
      <ExpertDrawer data={item} />
    </>
  );
};
