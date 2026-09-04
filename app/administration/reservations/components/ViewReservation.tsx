import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useOpen } from "@/context/OpenViewContext";
import { ReservationType } from "@/utils/ReservationType";
import Image from "next/image";

export function ViewReservation({
  reservation,
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: ReservationType;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Detail du reservation</SheetTitle>
        </SheetHeader>
        <div className="px-3 pl-6 mb-4">
          <h2 className="text-muted-foreground text-xs">Images</h2>
          <div className="w-full h-[150px] rounded-md relative mt-2 overflow-hidden">
            <Image
              src={reservation.imgChambre}
              fill
              alt="reservation"
              className="object-cover"
            />
            <div className="absolute w-20 h-20 rounded-full overflow-hidden z-20 bottom-0 left-2 shadow-md shadow-accent">
              <Image
                src={reservation.imgClient}
                fill
                alt="reservation"
                className="object-cover"
              />
            </div>
          </div>
          <div className="mt-8 px-4 rounded-md shadow py-3">
            <h2 className="text-muted-foreground text-xs">Client</h2>
            <p className="text-right text-sm mt-2">{reservation.nomClient}</p>
          </div>

          <div className="mt-4 px-4 rounded-md shadow py-3">
            <h2 className="text-muted-foreground text-xs">Chambre</h2>
            <p className="text-right text-sm mt-2">{reservation.nomChambre}</p>
          </div>

          <div className="mt-4 px-4 rounded-md shadow py-3">
            <h2 className="text-muted-foreground text-xs">Status</h2>
            <p className="text-right text-sm mt-2">{reservation.status}</p>
          </div>

          <div className="mt-4 px-4 rounded-md shadow py-3">
            <h2 className="text-muted-foreground text-xs">Date début</h2>
            <p className="text-right text-sm mt-2">{reservation.dateDebut}</p>
          </div>

          <div className="mt-4 px-4 rounded-md shadow py-3">
            <h2 className="text-muted-foreground text-xs">Date fin</h2>
            <p className="text-right text-sm mt-2">{reservation.dateFin}</p>
          </div>

          <div className="mt-4 px-4 rounded-md shadow py-3">
            <h2 className="text-muted-foreground text-xs">Montant</h2>
            <p className="text-right text-sm mt-2">{reservation.montant} $</p>
          </div>

          <div className="mt-4 px-4 rounded-md shadow py-3">
            <h2 className="text-muted-foreground text-xs">Adresse</h2>
            <p className="text-right text-sm mt-2">
              {reservation.adresseClient}
            </p>
          </div>

          <div className="mt-4 px-4 rounded-md shadow py-3">
            <h2 className="text-muted-foreground text-xs">Phone</h2>
            <p className="text-right text-sm mt-2">{reservation.phone}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
