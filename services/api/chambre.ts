import { ChambreInterface, PaginatedChambre } from "@/types/ChambreInteface";
import { api } from "./axios";
import { GetParams } from "@/types/MetaInterface";

export const getChambre = async (params?: GetParams): Promise<PaginatedChambre> => {
  const response = await api.get<PaginatedChambre>("/chambre", {params});

  return response.data;
};

export const getChambreById = async (id: number): Promise<ChambreInterface> => {
  const response = await api.get<ChambreInterface>(`/chambre/${id}`);

  return response.data;
};

export const createChambre = async (
  data: FormData,
): Promise<ChambreInterface> => {
  const response = await api.post<ChambreInterface>("/chambre", data);

  return response.data;
};

export const updateChambre = async (
  id: number,
  data: Partial<Omit<ChambreInterface, "id">>
): Promise<ChambreInterface> => {
  const response = await api.patch<ChambreInterface>(`/chambre/${id}`, data);

  return response.data;
};

export const deleteChambre = async (id: number): Promise<void> => {
  await api.delete(`/chambre/${id}`);
};