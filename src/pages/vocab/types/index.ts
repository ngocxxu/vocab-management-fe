import { TOption } from "@/utils/types";

export type TExamples = {
  source: string;
  target: string;
};

export type TTextTarget = {
  text: string;
  wordType: string;
  explanationSource: string;
  explanationTarget: string;
  examples: TExamples[];
  grammar: string;
  subject: TOption[];
};

export type TVocab = {
  _id: string;
  sourceLanguage: string;
  targetLanguage: string;
  textSource: string;
  textTarget: TTextTarget[];
};
