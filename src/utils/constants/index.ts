import { statusList } from "@/pages/vocab/constants";

export const LIMIT_PAGE_10 = "10";
export const DEAULT_PAGE = "1";
export const defaultStatus = [...statusList.map((item) => item.value)];
export const ROUTER_VOCAB_TRAINER = "/vocab-trainer";

export const colorData = [
  {
    status: "Passed",
    background: "#ECFDF3",
    text: "#037847",
    dot: "#14BA6D",
  },
  {
    status: "Failed",
    background: "#FBE7E8",
    text: "#A30D11",
    dot: "#F82C5D",
  },
  {
    status: "Pending",
    background: "#F2F4F7",
    text: "#4B5675",
    dot: "#99A1B7",
  },
];
