export type ReservationStatus = 'en attente' | 'confirmée' | 'annulée' | 'terminée';

export interface ReservationType {
  nomClient: string;
  nomChambre: string;
  dateDebut: string; // Format YYYY-MM-DD
  dateFin: string;   // Format YYYY-MM-DD
  adresseClient: string;
  phone: string;
  montant: number;
  status: ReservationStatus;
  imgClient: string;
  imgChambre: string;
}