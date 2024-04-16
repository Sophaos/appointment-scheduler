import { useGetServicesQuery } from "features/services/service-slice";
import React from "react";

export const ServicesPage = () => {
  const { data, error, isLoading } = useGetServicesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured.</div>;
  // console.log(data)

  return <div>ServicesPage</div>;
};
