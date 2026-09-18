import { Meta } from "./MetaInterface";

export interface ChambreInterface {
  id: number;
  nom: string;
  description: string;
  etat: string;
  prix: number;
  type: any;
}

export interface PaginatedChambre {
  data: ChambreInterface[];
  meta: Meta
}
