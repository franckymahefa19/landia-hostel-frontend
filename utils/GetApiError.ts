import axios from "axios";

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? "Une erreur est survenue.";
  }

  return `Une erreur est survenue : ${error}`;
};