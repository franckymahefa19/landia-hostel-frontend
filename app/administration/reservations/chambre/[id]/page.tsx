"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { reservations } from "@/data/reservation";
import CardContainer from "@/components/Card-container";
import {
  FaCalendar,
  FaEdit,
  FaEye,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { IoTrash } from "react-icons/io5";
import { useParams } from "next/navigation";
import { GetDateDialog } from "../../components/getDateDialog";
import { Pagination } from "@/components/Pagination";
import { DeleteAlert } from "@/app/administration/components/DeleteAlert";
import data from "@/data/reservations.json";
import { ReservationType } from "@/utils/ReservationType";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useOpen } from "@/context/OpenViewContext";
import { ViewReservation } from "../../components/ViewReservation";

const results: ReservationType[] = data as ReservationType[];

type OnDeleteType = {
  isOpen: boolean;
  data: ReservationType | null;
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const isDateBetween = (date: Date, dateDebut: string, dateFin: string) => {
  const current = new Date(`${formatDate(date)}T00:00:00`);
  const debut = new Date(`${dateDebut}T00:00:00`);
  const fin = new Date(`${dateFin}T00:00:00`);

  return current >= debut && current <= fin;
};

const ITEMS_PER_PAGE = 5;

export default function MonCalendrier() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useOpen();

  const [range, setRange] = useState<DateRange | undefined>();
  const [month, setMonth] = useState<Date>(new Date());

  const [periode, setPeriode] = useState({
    du: "",
    au: "",
  });

  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = results.slice(startIndex, endIndex);

  const [activeReservation, setActiveReservation] =
    useState<ReservationType | null>(null);

  const handleOpenDetails = (res: ReservationType) => {
    setActiveReservation(res);
    onOpen();
  };

  const handleCloseDetails = () => {
    onClose();
    setActiveReservation(null);
  };

  const [openDelete, setOpenDelete] = useState<OnDeleteType>({
    isOpen: false,
    data: null,
  });

  const deleteReservation = () => {
    alert(`Réservation du ${openDelete.data?.dateDebut} supprimé`);
  };

  return (
    <div>
      <CardContainer>
        <h1 className="mb-4 text-sm font-bold">
          Les réservations du chambre {id}
        </h1>
        <div className="w-[50%] h-[300px] overflow-auto scrollbar-none mx-auto">
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
              confirmed: `${!range?.from && !range?.to && "!bg-green-400 dark:!bg-green-700 !text-white hover:!bg-transparent"}`,

              pending: `${!range?.from && !range?.to && "!bg-yellow-400 dark:!bg-yellow-700 !text-white hover:!bg-transparent"}`,
            }}
            className="w-full"
          />
        </div>
        <div className="mt-4 flex w-full justify-center items-center gap-5">
          <GetDateDialog
            periode={periode}
            setPeriode={setPeriode}
            trigger={
              <button
                className="flex justify-center items-center px-3 py-2 border border-primary/70 cursor-pointer rounded
             text-primary gap-2 text-xs  hover:text-primary-foreground hover:bg-primary transition-colors duration-300 ease-in-out"
              >
                <FaCalendar />
                Sélectionner une date
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
             disabled:bg-muted disabled:text-muted-foreground disabled:border-muted disabled:cursor-no-drop"
          >
            <IoTrash />
            Nettoyer
          </button>
        </div>
      </CardContainer>

      <CardContainer>
        <h2 className="font-bold text-primary text-sm mb-6 ml-2">
          Liste des réservations
        </h2>
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-end text-xs gap-2">
          <button
            className="rounded-full px-3 py-2 bg-primary text-primary-foreground flex justify-center items-center gap-3 cursor-pointer
           hover:bg-principal active:scale-95 transition-all duration-300 w-full sm:w-auto"
          >
            <FaPlus className="w-4 h-4 font-extralight" />
            <span className="font-semibold text-sm">réservation</span>
          </button>

          <div className="rounded-full w-full sm:w-[250px] border border-border relative">
            <FaSearch className="text-muted-foreground absolute top-[50%] translate-y-[-50%] left-3 w-4 h-4" />
            <input
              type="text"
              className="w-full py-2.5 pl-10 outline-none border-none text-primary"
              placeholder="Nom client..."
            />
          </div>
        </div>
        <div className="w-full overflow-x-auto px-2 pb-2 mt-4 mb-4">
          {/* Header */}
          <div
            className="
                  min-w-[700px]
                  grid grid-cols-6
                  px-4 py-4
                  text-xs uppercase
                  text-muted-foreground
                "
          >
            <div className="text-center">Client</div>
            <div className="text-center">Chambre</div>
            <div className="text-center">Début</div>
            <div className="text-center">Fin</div>
            <div className="text-center">Status</div>
            <div className="text-center">Action</div>
          </div>

          {/* Rows */}
          <div className="min-w-[700px] space-y-3">
            {currentItems.map((res, index) => (
              <div
                key={index}
                className="
                        grid grid-cols-6
                        items-center
                        bg-card/70
                        hover:bg-card
                        rounded-lg
                        px-4 py-4
                       shadow-[0_1px_4px_rgba(0,0,0,0.16)]
                       dark:shadow-[0_1px_4px_rgba(255,255,255,0.16)]
                       hover:shadow-md
                       transition-all
                       duration-300
                        group
                      "
              >
                <div className="text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300 text-center">
                  {res.nomClient}
                </div>
                <div className="text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300 text-center">
                  {res.nomChambre}
                </div>
                <div className="text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300 text-center">
                  {res.dateDebut}
                </div>
                <div className="text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300 text-center">
                  {res.dateFin}
                </div>
                <div className="text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300 text-center">
                  <span
                    className={`px-2 py-0.5 rounded-lg text-xs
                 ${
                   res.status === "en attente"
                     ? "bg-yellow-50/40 border border-yellow-300/30 text text-yellow-500"
                     : res.status === "confirmée"
                       ? "bg-green-50/40 border border-green-300/30 text text-green-500"
                       : res.status === "annulée"
                         ? "bg-red-50/40 border border-red-300/30 text text-red-500"
                         : "bg-fuchsia-50/40 border border-fuchsia-300/30 text-fuchsia-500"
                 }`}
                  >
                    {res.status}
                  </span>
                </div>

                <div className="flex justify-center items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <FaEye
                          onClick={() => handleOpenDetails(res)}
                          size={12}
                          className="opacity-15 group-hover:opacity-100 transition-all duration-700 text-muted-foreground group-hover:text-green-500 cursor-pointer"
                        />
                      }
                    />
                    <TooltipContent>
                      <p className="text-[10px]">Voir détails</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <FaEdit
                          size={12}
                          className="opacity-15 group-hover:opacity-100 transition-all duration-700 text-muted-foreground group-hover:text-blue-500 cursor-pointer"
                        />
                      }
                    />
                    <TooltipContent>
                      <p className="text-[10px]">Modifier</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <FaTrash
                          onClick={() =>
                            setOpenDelete({ isOpen: true, data: res })
                          }
                          size={12}
                          className="opacity-15 group-hover:opacity-100 transition-all duration-700 text-muted-foreground group-hover:text-destructive cursor-pointer"
                        />
                      }
                    />
                    <TooltipContent>
                      <p className="text-[10px]">Supprimer</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            ))}
            {activeReservation && (
              <ViewReservation
                reservation={activeReservation}
                open={isOpen}
                onOpenChange={(open) => {
                  if (!open) handleCloseDetails();
                }}
              />
            )}

            <DeleteAlert
              onActive={deleteReservation}
              open={openDelete.isOpen}
              onOpenChange={(open) => {
                if (!open) setOpenDelete({ isOpen: false, data: null });
              }}
            />
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </CardContainer>
    </div>
  );
}
