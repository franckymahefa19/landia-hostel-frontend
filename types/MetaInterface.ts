export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetParams {
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
}