import { useMutation, useQueryClient } from "react-query";
import { httpClient } from "../settings";
import { VOCAB_KEYS } from "./queryKeys";
import { useToast } from "@/components/ui/use-toast";

const deleteVocab = async (id: string) => {
  const { data } = await httpClient.delete(`/vocab/${id}`);
  return data;
};

export const useDeleteVocab = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteVocab(id),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_KEYS.GET_VOCAB]);
      toast({
        title: "Success",
        description: "Deleted successfully",
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
