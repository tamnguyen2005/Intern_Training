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
    return api.get("/products", {
      params: query,
      signal: signal,
    });
  },
  getById: async (
    id: string | number,
    signal?: AbortSignal,
  ): Promise<Product> => {
    return api.get(`/products/${id}`, {
      signal: signal,
    });
  },
  create: async (productData: Omit<Product, "id">): Promise<Product> => {
    return api.post("/products", productData);
  },
  update: async (
    id: string | number,
    productData: Partial<Product>,
  ): Promise<Product> => {
    return api.patch(`/products/${id}`, productData);
  },
  delete: async (id: string | number): Promise<void> => {
    return api.delete(`/products/${id}`);
  },
};
