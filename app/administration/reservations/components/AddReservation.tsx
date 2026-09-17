import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { reservations } from "@/data/reservation";
import { formatDate, isDateBetween } from "@/utils/IsDateBetween";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { FaCalendar, FaUser } from "react-icons/fa";
import { IoBedSharp, IoTrash } from "react-icons/io5";
import { ClientDialog } from "./ClientDialog";
import { ClientType } from "@/utils/ClientType";
import { ChambreDialog } from "./ChambreDialog";
import { ChambreType } from "@/utils/ChambreType";
import { GetDateDialog } from "./getDateDialog";
import { ResumeReservation } from "./ResumeReservation";


type PeriodeType = {
  du: string;
  au: string;
};

export function AddReservation({
  open,
  onOpenChange,
  onClose,
}: {
  open: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [month, setMonth] = useState<Date>(new Date());

  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);
  const [selectedChambre, setSelectedChambre] = useState<ChambreType | null>(
    null,
  );
  const [openClient, setOpenClient] = useState<boolean>(false);
  const [openChambre, setOpenChambre] = useState<boolean>(false);
  const [openResume, setOpenResume] = useState<boolean>(false);

  const [periode, setPeriode] = useState<PeriodeType>({
      du: "",
      au: "",
    });

   useEffect(()=>{
      if(!range?.from || !range.to){
        return
      }
      setPeriode({
        du: formatDate(range.from),
        au: formatDate(range.to)
      })
    }, [range])

    const submit = () => {
        if(periode.du !== "" && periode.au !== "" && selectedChambre !== null && selectedClient !== null){
            setOpenResume(true)
            onClose()
        }
        else {
            alert("Informations manquantes !")
        }
    }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <ClientDialog
        open={openClient}
        onOpenChange={() => setOpenClient(!openClient)}
        onClose={() => setOpenClient(false)}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
      />

      <ChambreDialog
        open={openChambre}
        onOpenChange={() => setOpenChambre(!openChambre)}
        onClose={() => setOpenChambre(false)}
        selectedChambre={selectedChambre}
        setSelectedChambre={setSelectedChambre}
      />

      <ResumeReservation 
        open={openResume}
        onOpenChange={() => setOpenResume(!openResume)}
        onClose={() => setOpenResume(false)}
        periode={periode}
        selectedChambre={selectedChambre}
        selectedClient={selectedClient}
      />

      <form>
        <DialogContent className="md:min-w-[300px]">
          <DialogHeader>
            <DialogTitle>Ajouter une réservation</DialogTitle>
          </DialogHeader>
          <div className="">
            <div className="w-full">
              <Calendar
                mode="range"
                selected={range}
                onSelect={setRange}
                month={month}
                onMonthChange={setMonth}
                modifiers={{
                  confirmed: (date) =>
                    reservations.some(
                      (reservation) =>
                        reservation.status === "confirmed" &&
                        isDateBetween(
                          date,
                          reservation.dateDebut,
                          reservation.dateFin,
                        ),
                    ),

                  pending: (date) =>
                    reservations.some(
                      (reservation) =>
                        reservation.status === "pending" &&
                        isDateBetween(
                          date,
                          reservation.dateDebut,
                          reservation.dateFin,
                        ),
                    ),
                }}
                modifiersClassNames={{
                  confirmed: `${"!bg-green-400 dark:!bg-green-700 !text-white hover:!bg-transparent"}`,

                  pending: `${"!bg-yellow-400 dark:!bg-yellow-700 !text-white hover:!bg-transparent"}`,
                }}
                className="w-full"
              />
              <div className="flex w-full justify-end items-center gap-2">
                <GetDateDialog
                  periode={periode}
                  setPeriode={setPeriode}
                  trigger={
                    <button
                      className="flex justify-center items-center px-3 py-2 border border-primary/40 cursor-pointer rounded
                           text-primary gap-2 text-xs  hover:text-primary-foreground hover:bg-primary transition-colors duration-300 ease-in-out"
                    >
                      <FaCalendar />
                    </button>
                  }
                  getPeriode={(periode) => {
                    setRange({
                      from: new Date(periode.du),
                      to: new Date(periode.au),
                    });
                    setMonth(new Date(periode.du));
                  }}
                />
                <button
                  onClick={() => {
                    setRange({ from: undefined, to: undefined });
                    setPeriode({ du: "", au: "" });
                  }}
                  disabled={range?.from === undefined}
                  className="flex justify-center items-center px-3 py-2 border border-destructive/70 cursor-pointer rounded
                           text-destructive gap-2 text-xs  hover:text-primary-foreground hover:bg-destructive transition-colors duration-300 ease-in-out
                           disabled:bg-muted disabled:text-muted-foreground disabled:border-muted disabled:cursor-no-drop disabled:border"
                >
                  <IoTrash />
                </button>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2 mt-4">
              <button
                onClick={() => setOpenClient(true)}
                className="flex-1 border border-border rounded flex items-center justify-center gap-3 text-xs py-3 px-4 text-muted-foreground
                cursor-pointer hover:bg-primary hover:text-primary-foreground active:scale-95 transition-all duration-300"
              >
                <FaUser className="w-3 h-3" />
                <span className="">
                  {selectedClient !== null
                    ? `${selectedClient.prenoms} ${selectedClient.nom}`
                    : "client"}
                </span>
              </button>

              <button
                onClick={() => setOpenChambre(true)}
                className="flex-1 border border-border rounded flex items-center justify-center gap-3 text-xs py-3 px-4 text-muted-foreground
                cursor-pointer hover:bg-primary hover:text-primary-foreground active:scale-95 transition-all duration-300"
              >
                <IoBedSharp className="w-3 h-3" />
                <span className="">
                  {selectedChambre !== null
                    ? `${selectedChambre.nom}`
                    : "chambre"}
                </span>
              </button>
            </div>
          </div>
          <DialogFooter>
            <DialogClose
              onClick={() => {
                setSelectedChambre(null);
                setSelectedClient(null);
                setPeriode({ du: "", au: "" });
                setRange({ from: undefined, to: undefined });
              }}
              render={<Button variant="outline">Annuler</Button>}
            />
            <Button onClick={submit}>Valider</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
