import { useGetClientsQuery } from "features/clients/client-slice";
import { BaseTable, TableColumnProp } from "shared/ui/base-table";

export const ClientsPage = () => {
  const { data, error, isLoading } = useGetClientsQuery();
  const columns: TableColumnProp[] = [
    { field: "nickname", header: "Nickname" },
    { field: "firstName", header: "First Name" },
    { field: "lastName", header: "Last Name" },
    { field: "phoneNumber", header: "Phone Number" },
    { field: "note", header: "Note" },
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
