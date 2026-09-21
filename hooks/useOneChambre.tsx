
import { getChambreById } from "@/services/api/chambre";
import { ChambreInterface } from "@/types/ChambreInteface";
import { getApiErrorMessage } from "@/utils/GetApiError";
import { useEffect, useState } from "react";

export const useOneChambre = (id: number) => {
  const [chambre, setChambre] = useState<ChambreInterface>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChambre = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getChambreById(id);
      setChambre(data);
    } catch (error) {
      console.log(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };


  useEffect(()=>{
    fetchChambre()
  }, [])

  return {
    chambre,
    loading,
    error
  }
};
