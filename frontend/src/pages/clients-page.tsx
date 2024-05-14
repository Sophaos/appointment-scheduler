import { useGetClientsQuery } from "features/clients/client-slice";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

export const ClientsPage = () => {
  const { data, error, isLoading } = useGetClientsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured.</div>;
  // console.log(data)
  return (
    <div className="card">
      <DataTable value={data} showGridlines stripedRows tableStyle={{ minWidth: "50rem" }}>
        <Column field="nickname" header="Nickname"></Column>
        <Column field="phoneNumber" header="Phone Number"></Column>
        <Column field="firstName" header="firstName"></Column>
        <Column field="lastName" header="lastName"></Column>
        <Column field="note" header="Note"></Column>
        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: "12rem" }}></Column>
      </DataTable>
    </div>
  );
};

const actionBodyTemplate = (rowData: any) => {
  return (
    <React.Fragment>
      <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => console.log(rowData)} />
      <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => console.log(rowData)} />
    </React.Fragment>
  );
};
