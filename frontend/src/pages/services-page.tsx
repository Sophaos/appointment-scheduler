import { useGetServicesQuery } from "features/services/service-slice";
import { BaseTable, TableColumnProp } from "shared/ui/base-table";

export const ServicesPage = () => {
  const { data, error, isLoading } = useGetServicesQuery();

  const columns: TableColumnProp[] = [
    { field: "name", header: "name" },
    { field: "duration", header: "Duration" },
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
