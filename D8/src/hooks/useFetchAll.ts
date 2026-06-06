import { useCallback, useEffect, useState } from "react";
import { Product } from "../types/product.type";
import { productService } from "../services/product.service";

const executeFetch = async (
  signal: AbortSignal | undefined,
  onSuccess: (data: Product[]) => void,
  onError: (msg: string) => void,
) => {
  try {
    const res = await productService.getAll(undefined, signal);
    onSuccess(res.data);
  } catch (err) {
    if (err === "canceled") return;
    onError(
      typeof err === "object" && err !== null && "message" in err
        ? (err as any).message
        : String(err),
    );
  }
};
export const useFetchAll = () => {
  const [products, setProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);
    await executeFetch(signal, setProduct, setError);
    if (!signal?.aborted) setIsLoading(false);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchProduct(controller.signal);
    return () => controller.abort();
  }, [fetchProduct]);

  return { products, isLoading, error, refetch: fetchProduct, setProduct };
};
const parseError = (err: unknown): string => {
  if (typeof err === "object" && err !== null && "message" in err) {
    return (err as any).message;
  }
  return String(err);
};
