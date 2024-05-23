import { TOption } from '@/utils/types';

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

export type TFormTestVocabTrainer = {
  id: string;
  duration: number;
  wordTestSelects: {
    idWord: string;
    userSelect?: string;
  }[];
};

export type TQuestion = {
  content: string[];
  options: TOption[];
  order: number;
  type: string;
};
