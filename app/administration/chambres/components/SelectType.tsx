import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

type typeType = {
  id: string;
  nom: string;
};

const FAKE_TYPE: typeType[] = [
  {
    id: "a",
    nom: "Type chambre 1",
  },
  {
    id: "b",
    nom: "Type chambre 2",
  },
  {
    id: "c",
    nom: "Type chambre 3",
  },
  {
    id: "d",
    nom: "Type chambre 4",
  },
];

const SelectType = ({ trigger, getType }: { trigger: React.ReactNode, getType: (type:typeType)=>void }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (type: typeType) => {
    setOpen(false)
    getType(type)
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selectionnez un type de chambre</DialogTitle>
          <ul className="space-y-1.5 mt-4">
            {FAKE_TYPE.map((type) => (
              <li
                key={type.id}
                onClick={() => handleSelect(type)}
                className="px-4 py-3 text-foreground/75 rounded-md hover:text-foreground border border-border
                     hover:bg-muted transition-all duration-300 cursor-pointer"
              >
                {type.nom}
              </li>
            ))}
          </ul>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SelectType;
