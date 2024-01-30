import { useMutation, useQueryClient } from "react-query";
import { httpClient } from "../settings";
import { VOCAB_KEYS } from "./queryKeys";
import { useToast } from "@/components/ui/use-toast";

const deleteMultiVocab = async (ids: string[]) => {
  const { data } = await httpClient.post(`/vocab/deleteIds`, ids);
  return data;
};

export const useDeleteMultiVocab = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => deleteMultiVocab(ids),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_KEYS.GET_VOCAB]);
      toast({
        title: "Success",
        description: "Deleted all successfully",
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
