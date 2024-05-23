import { DEFAULT_SERVICE, Service } from "features/services/service";
import { ServiceDrawer } from "features/services/service-drawer";
import { setServiceDrawerVisibility, useGetServicesQuery } from "features/services/service-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BaseTable, TableColumnProp } from "shared/ui/base-table";

export const ServicesPage = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetServicesQuery();
  const [id, setId] = useState(0);
  const item = id ? data?.find((i) => i.id === id) : DEFAULT_SERVICE;

  const columns: TableColumnProp[] = [
    { field: "name", header: "Name" },
    { field: "duration", header: "Duration" },
    { field: "color", header: "Color" },
  ];

  const handleEdit = (row: Service) => {
    dispatch(setServiceDrawerVisibility(true));
    setId(row.id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured.</div>;
  return (
    <>
      <BaseTable onEdit={handleEdit} data={data ?? []} columns={columns} />;
      <ServiceDrawer data={item} />
    </>
  );
};
