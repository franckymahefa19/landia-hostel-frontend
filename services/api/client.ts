
import { ClientInterface, PaginatedClient } from "@/types/ClientInterface";
import { api } from "./axios";
import { GetParams } from "@/types/MetaInterface";

export const getClient = async (params?: GetParams): Promise<PaginatedClient> => {
  const response = await api.get<PaginatedClient>("/client", {params});

  return response.data;
};

export const getClientById = async (id: number): Promise<ClientInterface> => {
    const response = await api.get(`/client/${id}`)

    return response.data
}

export const createClient = async (
  data: FormData
) => {
  const response = await api.post<ClientInterface>("/client", data);

  return response.data;
};

export const updateClient = async (
  id: number,
  data: FormData
): Promise<ClientInterface> => {
  const response = await api.patch<ClientInterface>(`/client/${id}`, data);

  return response.data;
};

export const deleteClient = async (id: number): Promise<void> => {
  await api.delete(`/client/${id}`);
};