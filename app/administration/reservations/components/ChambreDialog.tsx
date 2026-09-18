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
import { ChambreType } from "@/utils/ChambreType";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { fakeChambre } from "@/data/fakeChambre";

export function ChambreDialog({
  open,
  onOpenChange,
  onClose,
  selectedChambre,
  setSelectedChambre,
}: {
  open: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  selectedChambre: ChambreType | null;
  setSelectedChambre: (chambre: ChambreType) => void;
}) {

  const [search, setSearch] = useState<string>("");

  const data = useMemo(() => {
    const searchValue = search.trim();
    if (searchValue === "") {
      return fakeChambre;
    }
    return fakeChambre.filter((chambre) =>
      chambre.nom.toLocaleLowerCase().includes(searchValue),
    );
  }, [search]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[320px]">
        <DialogHeader>
          <DialogTitle className="text-sm">Sélectionner un chambre</DialogTitle>
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
            {data.map((chambre, index) => (
              <li
                key={index}
                onClick={()=>{
                    setSelectedChambre(chambre)
                    onClose()
                }}
                className={cn(
                  "rounded border border-border hover:text-white hover:bg-principal",
                  "py-2.5 px-3 flex gap-1 text-xs text-muted-foreground cursor-pointer text-center",
                  selectedChambre?.nom === chambre.nom && "hover:bg-primary hover:text-primary-foreground bg-primary text-primary-foreground"
                )}
              >
                <span>{chambre.nom}</span>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
