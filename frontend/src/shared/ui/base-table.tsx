import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableValue } from "primereact/datatable";
import React from "react";

export interface TableColumnProp {
  field: string;
  header: string;
}

export interface BaseTableProps<T> {
  onEdit: (data: T) => void;
  onDelete: (data: T) => void;
  columns?: TableColumnProp[];
  data: T[];
}

export const BaseTable = <T,>({ onEdit, onDelete, columns, data }: BaseTableProps<T>) => {
  // const onEdit = () => console.log(rowData);
  const actionBodyTemplate = (rowData: T) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => onEdit(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => onDelete(rowData)} />
      </React.Fragment>
    );
  };
  return (
    <div className="card">
      <DataTable value={data as DataTableValue[]} showGridlines stripedRows tableStyle={{ minWidth: "50rem" }}>
        {columns?.map((c: TableColumnProp) => (
          <Column key={c.field} field={c.field} header={c.header}></Column>
        ))}
        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: "12rem" }}></Column>
      </DataTable>
    </div>
  );
};
