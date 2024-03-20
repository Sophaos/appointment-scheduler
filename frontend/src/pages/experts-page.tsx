import { useGetExpertsQuery } from 'features/experts/expert-slice';
import React from 'react'

export const ExpertsPage = () => {
  const { error, isLoading } = useGetExpertsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured.</div>;
  return (
    <div>ExpertsPage</div>
  )
}
