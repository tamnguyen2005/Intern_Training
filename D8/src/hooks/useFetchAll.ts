import { useCallback, useEffect, useState } from "react";
import { Product } from "../types/product.type";
import { productService } from "../services/product.service";

export const useFetchAll = () => {
  const [products, setProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchProduct = useCallback(async (signal?: AbortSignal) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await productService.getAll(undefined, signal);
      setProduct(data.data);
    } catch (err) {
      if (err === "canceled") {
        console.log(err);
        return;
      }
      if (typeof err === "object" && err !== null && "message" in err) {
        setError((err as any).message);
      } else setError(String(err));
    } finally {
      if (!signal?.aborted) setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    fetchProduct(controller.signal);
    return () => controller.abort();
  }, [fetchProduct]);
  return { products, isLoading, error, refetch: fetchProduct };
};
