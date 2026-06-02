export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface GetProductQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "asc" | "desc" | "ASC" | "DESC";
}
export interface PaginationMeta {
  currentPage: number;
  itemCount: number;
  itemPerPage: number;
  totalItem: number;
  totalPage: number;
}
export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}
