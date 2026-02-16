import { useEffect, useState } from "react";
import { fetchHistory } from "@/lib/api";
import type { HistoryResponse } from "@/lib/types";

export function usePaginatedHistory(page: number, limit: number) {
  const [data, setData] = useState<HistoryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetchHistory(page, limit)
      .then((res) => {
        if (mounted) setData(res);
      })
      .catch((err) => {
        if (mounted) setError(err?.message ?? "Erreur de chargement.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [page, limit]);

  return { data, loading, error };
}
