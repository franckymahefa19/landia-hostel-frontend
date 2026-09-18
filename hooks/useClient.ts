import { getClient } from "@/services/api/client";
import { ClientInterface, PaginatedClient } from "@/types/ClientInterface";
import { GetParams, Meta } from "@/types/MetaInterface";
import { getApiErrorMessage } from "@/utils/GetApiError";
import { useEffect, useState } from "react";

export const useClient = (params?: GetParams) => {
  const [clients, setClients] = useState<ClientInterface[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getClient(params);
      setClients(response.data);
      setMeta(response.meta);
    } catch (err) {
      console.log(getApiErrorMessage(error));
      setError("Impossible de récupérer les clients.")
    } finally {
        setLoading(false)
    }
  };

  useEffect(() => {
    fetchClients();
  }, [params?.search, params?.page]);


  return {
    clients,
    meta,
    loading,
    error,
    refetch: fetchClients
  }
};
