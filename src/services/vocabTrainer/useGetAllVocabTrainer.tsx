import { TVocabTrainer } from "@/pages/vocab-trainer/types";
import { useQuery } from "react-query";
import { ResponseAPI, TPage } from "../../utils/types";
import { httpClient } from "../settings";
import { VOCAB_TRAINER_KEYS } from "./queryKeys";

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

  const { data } = await httpClient.get<ResponseAPI<TVocabTrainer>>(
    `/vocabTrainer?${params.toString()}`
  );
  return data;
};

export const useGetAllVocabTrainer = (pageOptions: TPage) => {
  return useQuery({
    queryKey: [VOCAB_TRAINER_KEYS.GET_VOCAB_TRAINER, pageOptions],
    queryFn: () => getAllVocab(pageOptions),
  });
};
