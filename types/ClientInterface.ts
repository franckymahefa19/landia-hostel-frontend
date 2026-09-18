import { Meta } from "./MetaInterface";

export interface ClientInterface {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  tel: string;
  email: string;
  sexe: 'M' | 'F';
  nationalite: string;
  image?: string;
}


export interface PaginatedClient {
  data: ClientInterface[];
  meta: Meta
}
