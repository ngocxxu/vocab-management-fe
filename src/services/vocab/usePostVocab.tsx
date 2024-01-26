import { useMutation, useQueryClient } from "react-query";
import { TVocab } from "../../pages/vocab";
import { httpClient } from "../settings";
import { VOCAB_KEYS } from "./queryKeys";
import { useToast } from "@/components/ui/use-toast";

const postVocab = async (data: Omit<TVocab, "id">) => {
  const res = await httpClient.post(`/vocab`, data);
  return res;
};

export const usePostVocab = () => {
  const { toast } = useToast();
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<TVocab, "id">) => postVocab(data),
    onSuccess: () => {
      client.invalidateQueries([VOCAB_KEYS.GET_VOCAB]);
      toast({
        title: "Success",
        description: "Created successfully",
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
