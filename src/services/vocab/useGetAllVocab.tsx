import { useQuery } from "react-query";
import { ResponseAPI, TPage } from "../../utils/types";
import { httpClient } from "../settings";
import { VOCAB_KEYS } from "./queryKeys";
import { TVocab } from "@/pages/vocab/types";

const getAllVocab = async (pageOptions: TPage) => {
  const params = new URLSearchParams();

  Object.entries(pageOptions).map(([key, value]) => {
    if (typeof value === "string") {
      if (value !== undefined) {
        params.append(`${key}`, value.toString());
      }
    } else {
      if (value !== undefined && (value as string[]).length > 0) {
        (value as string[]).forEach((item) => {
          params.append(`${key}`, item);
        });
      }
    }
  });

  const { data } = await httpClient.get<ResponseAPI<TVocab>>(
    `/vocab?${params.toString()}`
  );
  return data;
};

export const useGetAllVocab = (pageOptions: TPage) => {
  return useQuery({
    queryKey: [VOCAB_KEYS.GET_VOCAB, pageOptions],
    queryFn: () => getAllVocab(pageOptions),
  });
};
