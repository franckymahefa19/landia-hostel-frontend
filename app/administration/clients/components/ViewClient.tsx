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
import { ClientInterface } from "@/types/ClientInterface";
import { ClientType } from "@/utils/ClientType";
import Image from "next/image";
import rawData from "@/data/clients.json";
import { defaultUser } from "../page";


const fakeClients: ClientType[] = rawData as ClientType[];

export function ViewClient({
  open,
  onOpenChange,
  client,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: ClientInterface;
}) {

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Detail du client</SheetTitle>
        </SheetHeader>
        <div className="px-3 pl-6 mb-4">
          <h2 className="text-muted-foreground text-xs">Image</h2>
          <div className="w-full h-[150px] rounded-md relative mt-2 overflow-hidden">
            <Image
              src={client.image ? `${process.env.NEXT_PUBLIC_API_URL}${client.image}` : defaultUser}
              fill
              alt="client"
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="mt-8 px-4 rounded-md shadow py-3">
            <h2 className="text-muted-foreground text-xs">Nom</h2>
            <p className="text-right text-sm mt-2">{client.nom}</p>
          </div>

          <div className="mt-4 px-4 rounded-md shadow py-3">
            <h2 className="text-muted-foreground text-xs">Prénoms</h2>
            <p className="text-right text-sm mt-2">{client.prenom}</p>
          </div>

          <div className="mt-4 px-4 rounded-md shadow py-3">
            <h2 className="text-muted-foreground text-xs">Sexe</h2>
            <p className="text-right text-sm mt-2">{client.sexe}</p>
          </div>

          <div className="mt-4 px-4 rounded-md shadow py-3">
            <h2 className="text-muted-foreground text-xs">Email</h2>
            <p className="text-right text-sm mt-2">{client.email}</p>
          </div>

          <div className="mt-4 px-4 rounded-md shadow py-3">
            <h2 className="text-muted-foreground text-xs">Adresse</h2>
            <p className="text-right text-sm mt-2">{client.adresse}</p>
          </div>

          <div className="mt-4 px-4 rounded-md shadow py-3">
            <h2 className="text-muted-foreground text-xs">Phone</h2>
            <p className="text-right text-sm mt-2">{client.tel}</p>
          </div>

          <div className="mt-4 px-4 rounded-md shadow py-3">
            <h2 className="text-muted-foreground text-xs">Nationalité</h2>
            <p className="text-right text-sm mt-2">{client.nationalite}</p>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}
