"use client";

import { getChambre } from "@/services/api/chambre";
import { ChambreInterface, PaginatedChambre } from "@/types/ChambreInteface";
import { GetParams, Meta } from "@/types/MetaInterface";
import { useEffect, useState } from "react";


export const useChambre = (params?: GetParams) => {
  const [chambres, setChambres] = useState<ChambreInterface[]>([]);
  const [meta, setMeta] = useState<Meta>()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChambres = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getChambre(params);

      setChambres(data.data);
      setMeta(data.meta)
    } catch (error) {
      console.error("Erreur lors de la récupération des chambres :", error);

      setError("Impossible de récupérer les chambres.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChambres();
  }, [params?.page, params?.search]);

  return {
    chambres,
    meta,
    loading,
    error,
    refetch: fetchChambres,
  };
};