export type TOption = {
  label: string;
  value: string;
};

export type ResponseAPI<T> = {
  data: T[];
} & TPagination;

export type TPagination = {
  currentPage: number;
  totalItems: number;
  totalPages: number;
};

export type TPage = {
  page: string;
  limit: string;
};
