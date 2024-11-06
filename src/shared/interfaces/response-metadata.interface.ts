export interface ResponseMetadata {
  total: number;
  limit: number;
  offset: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}