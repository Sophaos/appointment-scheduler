import { useGetExpertsQuery } from "features/experts/expert-slice";

export const ExpertsPage = () => {
  const { data, error, isLoading } = useGetExpertsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured.</div>;
  // console.log(data)

  return <div>ExpertsPage</div>;
};
