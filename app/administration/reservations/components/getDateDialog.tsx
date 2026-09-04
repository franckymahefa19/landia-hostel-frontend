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
import { useState } from "react";

export function GetDateDialog({
  trigger,
  getPeriode,
  periode,
  setPeriode,
}: {
  trigger: React.ReactElement;
  getPeriode: (param: any) => void;
  periode: any;
  setPeriode: ({du , au}: {du: string; au: string}) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger render={trigger} />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Sélectionner une date</DialogTitle>
            <DialogDescription>
              Sélectionner une période pour voir les réservations associés
            </DialogDescription>
          </DialogHeader>
          <div>
            <label
              htmlFor=""
              className="block mb-2 text-xs text-muted-foreground"
            >
              Du :{" "}
            </label>
            <input
              type="date"
              value={periode.du}
              onChange={(e) => setPeriode({ ...periode, du: e.target.value })}
              className="w-full py-1.5 px-2 border border-border rounded "
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="block mb-2 text-xs text-muted-foreground"
            >
              Au :{" "}
            </label>
            <input
              type="date"
              value={periode.au}
              min={periode.du}
              onChange={(e) => setPeriode({ ...periode, au: e.target.value })}
              className="w-full py-1.5 px-2 border border-border rounded "
            />
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Retour</Button>} />
            <Button
              type="submit"
              disabled={!periode.du || !periode.au}
              onClick={() => {
                setOpen(false);
                getPeriode(periode);
              }}
            >
              Valider
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
