import { useCallback, useEffect, useState } from "react";
import { Product } from "../types/product.type";
import { productService } from "../services/product.service";

const executeFetchById = async (
  id: number | string,
  signal: AbortSignal,
  onSuccess: (data: Product) => void,
  onError: (msg: string) => void,
) => {
  try {
    const data = await productService.getById(id, signal);
    onSuccess(data);
  } catch (err) {
    if (err === "canceled") return;
    onError(
      typeof err === "object" && err !== null && "message" in err
        ? (err as any).message
        : String(err),
    );
  }
};

export const useFetchById = (id: number | string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchById = useCallback(
    async (signal: AbortSignal) => {
      setIsLoading(true);
      setError(null);
      await executeFetchById(id, signal, setProduct, setError);
      if (!signal.aborted) setIsLoading(false);
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
