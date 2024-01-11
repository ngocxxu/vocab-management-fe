import { useQuery } from "react-query";
import { httpClient } from "../settings";

const getAllVocab = async () => {
  const { data } = await httpClient.get(`/vocab`);
  return data;
};

export const useGetAllVocab = () => {
  return useQuery({
    queryKey: ["vocabs"],
    queryFn: getAllVocab,
  });
};
