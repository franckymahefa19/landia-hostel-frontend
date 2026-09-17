export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const isDateBetween = (date: Date, dateDebut: string, dateFin: string) => {
  const current = new Date(`${formatDate(date)}T00:00:00`);
  const debut = new Date(`${dateDebut}T00:00:00`);
  const fin = new Date(`${dateFin}T00:00:00`);

  return current >= debut && current <= fin;
};
