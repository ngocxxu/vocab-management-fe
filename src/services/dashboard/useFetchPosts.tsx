import { useQuery } from "react-query";
import { httpClient } from "../settings";

const fetchPosts = async () => {
  const { data } = await httpClient.get(`/vocab`);
  return data;
};

export const useFetchPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    onSuccess: () => {
      // console.log({ data });
    },
  });
};
