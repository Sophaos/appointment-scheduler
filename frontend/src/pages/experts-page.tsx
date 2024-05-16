import { useGetExpertsQuery } from "features/experts/expert-slice";
import { BaseTable, TableColumnProp } from "shared/ui/base-table";

export const ExpertsPage = () => {
  const { data, error, isLoading } = useGetExpertsQuery();

  const columns: TableColumnProp[] = [
    { field: "nickname", header: "Nickanme" },
    { field: "color", header: "Color" },
  ];

  const handleEdit = () => {
    console.log("handle edit");
  };

  const handleDelete = () => {
    console.log("handle delete");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured.</div>;
  return <BaseTable onEdit={handleEdit} onDelete={handleDelete} data={data ?? []} columns={columns} />;
};
