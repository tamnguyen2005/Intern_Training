import { useCallback, useEffect, useState } from "react";
import { Product } from "../types/product.type";
import { productService } from "../services/product.service";

export const useFetchById = (id: number | string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchById = useCallback(
    async (signal: AbortSignal) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await productService.getById(id, signal);
        setProduct(data);
      } catch (err) {
        if (err === "canceled") {
          console.log(err);
          return;
        }
        if (typeof err === "object" && err !== null && "message" in err) {
          setError((err as any).message);
        } else setError(String(err));
      } finally {
        if (!signal.aborted) setIsLoading(false);
      }
    },
    [id],
  );
  useEffect(() => {
    const controller = new AbortController();
    fetchById(controller.signal);
    return () => controller.abort();
  }, [fetchById]);
  return { product, isLoading, error, refetch: fetchById };
};
