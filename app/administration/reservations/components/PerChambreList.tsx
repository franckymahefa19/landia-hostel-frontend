"use client"

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
import { fakeChambre } from "../../chambres/page";
import { useRouter } from "next/navigation";

export function PerChambreList({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const chambres = fakeChambre;

  const router = useRouter();

  const chambreClicked = (nom: string) => {
    router.push(`/administration/reservations/chambre/${nom}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sélectionner une chambre</DialogTitle>
        </DialogHeader>
        <ul className="space-y-2 mt-6">
          {chambres.map((chambre, index) => {
            return (
              <li
                onClick={()=>{
                    chambreClicked(chambre.nom)
                    onOpenChange(!open)
                }}
                key={index}
                className="w-full py-2 px-3 rounded text-card-foreground border border-border/90 
              cursor-pointer hover:bg-muted hover:text-primary transition-colors duration-300"
              >
                {chambre.nom}
              </li>
            );
          })}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
