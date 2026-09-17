import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChambreType } from "@/utils/ChambreType";
import { ClientType } from "@/utils/ClientType";

type PeriodeType = {
  du: string;
  au: string;
};

export function ResumeReservation({
  open,
  onOpenChange,
  onClose,
  periode,
  selectedClient,
  selectedChambre
}: {
  open: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  periode: PeriodeType;
  selectedClient: ClientType | null;
  selectedChambre: ChambreType | null;
}) {
  return (
    <Dialog  open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Informations de la réservation</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 mt-2 border-t border-border pt-4">
            <div className="px-2 py-1.5 rounded-md shadow border border-border/30 dark:border-border text-[10px]">
                <h2 className="uppercase text-muted-foreground/70 tracking-wide">
                    id
                </h2>
                <p className="mt-2 text-xs">5001</p>
            </div>
            <div className="px-2 py-1.5 rounded-md shadow border border-border/30 dark:border-border text-[10px]">
                <h2 className="uppercase text-muted-foreground/70 tracking-wide">
                    client
                </h2>
                <p className="mt-2 text-xs">{selectedClient?.prenoms} {selectedClient?.nom}</p>
            </div>
            <div className="px-2 py-1.5 rounded-md shadow border border-border/30 dark:border-border text-[10px]">
                <h2 className="uppercase text-muted-foreground/70 tracking-wide">
                    chambre
                </h2>
                <p className="mt-2 text-xs">{selectedChambre?.nom}</p>
            </div>
            <div className="px-2 py-1.5 rounded-md shadow border border-border/30 dark:border-border text-[10px]">
                <h2 className="uppercase text-muted-foreground/70 tracking-wide">
                    Date de début
                </h2>
                <p className="mt-2 text-xs">{periode.du}</p>
            </div>
            <div className="px-2 py-1.5 rounded-md shadow border border-border/50 dark:border-border text-[10px]">
                <h2 className="uppercase text-muted-foreground/70 tracking-wide">
                    Date de fin
                </h2>
                <p className="mt-2 text-xs">{periode.au}</p>
            </div>
            <div className="px-2 py-1.5 rounded-md shadow border border-border/50 dark:border-border text-[10px]">
                <h2 className="uppercase text-muted-foreground/70 tracking-wide">
                    Montant
                </h2>
                <p className="mt-2 text-xs">35000 Ar</p>
            </div>
        </div>
        <DialogFooter>
          <DialogClose
          onClick={()=>onClose()}
          render={<Button variant="outline">Annuler</Button>} />
          <Button onClick={()=>{
            alert("Enregistré !!!")
            onClose()
          }}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
