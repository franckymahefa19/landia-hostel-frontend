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
import { IoSearch } from "react-icons/io5";
import rawData from "@/data/clients.json";
import { ClientType } from "@/utils/ClientType";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export function ClientDialog({
  open,
  onOpenChange,
  onClose,
  selectedClient,
  setSelectedClient,
}: {
  open: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  selectedClient: ClientType | null;
  setSelectedClient: (client: ClientType) => void;
}) {
  const clients: ClientType[] = rawData as ClientType[];

  const [search, setSearch] = useState<string>("");

  const data = useMemo(() => {
    const searchValue = search.trim();
    if (searchValue === "") {
      return clients;
    }
    return clients.filter((client) =>
      client.nom.toLocaleLowerCase().includes(searchValue),
    );
  }, [search]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[320px]">
        <DialogHeader>
          <DialogTitle className="text-sm">Sélectionner un client</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <div className="border border-border rounded-full flex items-center gap-2 px-3 bg-muted">
            <IoSearch className="w-4 h-4" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Rechercher..."
              className="w-full border-none outline-none py-2.5 px-1 text-xs"
            />
          </div>
          <ul className="mt-3 space-y-2 max-h-[300px] overflow-y-auto px-2 scrollbar-none">
            {data.map((client) => (
              <li
                key={client.id}
                onClick={()=>{
                    setSelectedClient(client)
                    onClose()
                }}
                className={cn(
                  "rounded border border-border hover:text-white hover:bg-principal",
                  "py-2.5 px-3 flex gap-1 text-xs text-muted-foreground cursor-pointer",
                  selectedClient?.id === client.id && "hover:bg-primary hover:text-primary-foreground bg-primary text-primary-foreground"
                )}
              >
                <span className="mr-2">{client.id}</span>
                <span>{client.prenoms}</span>
                <span>{client.nom}</span>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
