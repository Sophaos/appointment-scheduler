import { useGetClientsQuery } from 'features/clients/client-slice';
import React from 'react'

export const ClientsPage = () => {

  const { data, error, isLoading } = useGetClientsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured.</div>;
  console.log(data)
  return (
    <div>ClientsPage</div>
  )
}
