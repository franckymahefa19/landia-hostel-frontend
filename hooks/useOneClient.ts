import { getClientById } from "@/services/api/client";
import { ClientInterface } from "@/types/ClientInterface";
import { getApiErrorMessage } from "@/utils/GetApiError";
import { useEffect, useState } from "react";

export const useOneClient = (id: number) => {
  const [client, setClient] = useState<ClientInterface>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClient = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getClientById(id);
      setClient(data);
    } catch (error) {
      console.log(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };


  useEffect(()=>{
    fetchClient()
  }, [])

  return {
    client,
    loading,
    error
  }
};
