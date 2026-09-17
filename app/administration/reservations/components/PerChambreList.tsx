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
import { fakeChambre } from "@/data/fakeChambre";
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";

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
        <div className="relative w-full rounded-full bg-muted text-primary mt-4">
          <IoSearch className="w-4 h-4 absolute top-[50%] translate-y-[-50%] ml-3"/>
          <input type="text" className="w-full py-2.5 px-3 pl-10 border-none outline-none" placeholder="Rechercher..." />
        </div>
        <ul className="space-y-2">
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
