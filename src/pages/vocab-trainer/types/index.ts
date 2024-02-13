export type TVocabTrainer = {
  _id: string;
  nameTest: string;
  status: string;
  duration: string;
  updatedAt: string;
  countTime: number;
  wordResults: TWordResults[];
};

export type TWordResults = {
  numberQuestion: number;
  userSelect: string;
  systemSelect: string;
};

export type TFormInputsVocabTrainer = {
  nameTest: string;
  wordSelects: string[];
};
