import { useMutation, useQueryClient } from "react-query";
import { httpClient } from "../settings";
import { VOCAB_KEYS } from "./queryKeys";
import { useToast } from "@/components/ui/use-toast";
import { TVocab } from "@/pages/vocab/types";

export type TPutVocabs = {
  data: Omit<TVocab, "id">;
  id: string;
};

const postVocab = async (item: TPutVocabs) => {
  const res = await httpClient.put(`/vocab/${item.id}`, item.data);
  return res;
};

export const usePutVocab = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  return useMutation({
    mutationFn: (item: TPutVocabs) => postVocab(item),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_KEYS.GET_VOCAB]);
      toast({
        title: "Success",
        description: "Updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed, please try again",
      });
    },
  });
};
