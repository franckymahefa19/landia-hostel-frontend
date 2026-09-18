export interface ClientType {
  id: number;
  nom: string;
  prenoms: string;
  adresse: string;
  tel: string;
  email: string;
  sexe: 'M' | 'F';
  nationalite: string;
  image: string;
}