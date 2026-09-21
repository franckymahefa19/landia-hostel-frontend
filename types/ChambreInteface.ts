import { Meta } from "./MetaInterface";

export interface ChambreInterface {
  id: number;
  nom: string;
  description?: string;
  etat: string;
  prix: number;
  type: any;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
}

export interface PaginatedChambre {
  data: ChambreInterface[];
  meta: Meta
}
