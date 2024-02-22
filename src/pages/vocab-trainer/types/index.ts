export type TVocabTrainer = {
  _id: string;
  nameTest: string;
  statusTest: string;
  duration: string;
  updatedAt: string;
  countTime: number;
  wordResults: TWordResults[];
};

export type TWordResults = {
  userSelect: string;
  systemSelect: string;
  status: string;
};

export type TFormInputsVocabTrainer = {
  nameTest: string;
  wordSelects: string[];
};
