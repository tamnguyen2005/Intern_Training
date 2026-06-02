import api from "../api/api";
import {
  PaginatedResult,
  GetProductQuery,
  Product,
} from "../types/product.type";
export const productService = {
  getAll: async (
    query?: GetProductQuery,
    signal?: AbortSignal,
  ): Promise<PaginatedResult<Product>> => {
    return api.get("/product", {
      params: query,
      signal: signal,
    });
  },
  getById: async (id: string | number): Promise<Product> => {
    return api.get(`/product/${id}`);
  },
  create: async (
    productData: Omit<Product, "id">,
  ): Promise<Product> => {
    return api.post("/product", productData);
  },
  update: async (
    id: string | number,
    productData: Partial<Product>,
  ): Promise<Product> => {
    return api.patch(`/product/${id}`, productData);
  },
  delete: async (id: string | number): Promise<void> => {
    return api.delete(`/product/${id}`);
  },
};
