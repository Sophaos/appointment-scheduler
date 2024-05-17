import { Client, DEFAULT_CLIENT } from "features/clients/client";
import { ClientDrawer } from "features/clients/client-drawer";
import { setClientDrawerVisibility, useGetClientsQuery } from "features/clients/client-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BaseTable, TableColumnProp } from "shared/ui/base-table";

export const ClientsPage = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetClientsQuery();

  const [id, setId] = useState(0);
  const item = id ? data?.find((i) => i.id === id) : DEFAULT_CLIENT;

  const columns: TableColumnProp[] = [
    { field: "nickname", header: "Nickname" },
    { field: "firstName", header: "First Name" },
    { field: "lastName", header: "Last Name" },
    { field: "phoneNumber", header: "Phone Number" },
    { field: "note", header: "Note" },
  ];

  const handleEdit = (row: Client) => {
    setId(row.id);
    dispatch(setClientDrawerVisibility(true));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured.</div>;

  return (
    <>
      <BaseTable onEdit={handleEdit} data={data ?? []} columns={columns} />;
      <ClientDrawer data={item} />
    </>
  );
};
