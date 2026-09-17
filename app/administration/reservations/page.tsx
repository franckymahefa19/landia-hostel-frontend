"use client";

import TextHeading from "@/components/TextHeading";
import React, { useRef, useState } from "react";
import {
  FaDoorClosed,
  FaEdit,
  FaEye,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { HiHome } from "react-icons/hi2";
import { IoBedOutline, IoCalendar } from "react-icons/io5";
import Card from "./components/Card";
import CardContainer from "@/components/Card-container";
import { FaBed, FaBedPulse } from "react-icons/fa6";
import data from "@/data/reservations.json";
import { ViewReservation } from "./components/ViewReservation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DeleteAlert } from "../components/DeleteAlert";
import { Pagination } from "@/components/Pagination";
import { ReservationType } from "@/utils/ReservationType";
import { useOpen } from "@/context/OpenViewContext";
import { PerChambreList } from "./components/PerChambreList";
import { AddReservation } from "./components/AddReservation";

export const reservdescriptions = [
  "Gérez efficacement l'ensemble de vos réservations",
  "Ajoutez, modifiez et organisez vos réservations.",
  "Consultez les différentes status de réservations",
];

type PeriodeType = {
  debut: string;
  fin: string;
};

type OnDeleteType = {
  isOpen: boolean;
  data: ReservationType | null;
};

const ITEMS_PER_PAGE = 5;

const reservations: ReservationType[] = data as ReservationType[];

const Reservations = () => {
  const { isOpen, onOpen, onClose } = useOpen();
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

  const [chambreList, setChambreList] = useState<boolean>(false);

  const [periode, setPeriode] = useState<PeriodeType>({
    debut: "",
    fin: "",
  });
  const debRef = useRef<HTMLInputElement>(null);
  const finRef = useRef<HTMLInputElement>(null);

  const handleDateShow = (ref: any) => {
    if (ref.current) {
      if ("showPicker" in HTMLInputElement.prototype) {
        ref.current.showPicker();
      } else {
        ref.current.focus();
      }
    }
  };

  const handleFin = () => {
    if (periode.debut !== "") {
      handleDateShow(finRef);
    }
  };

  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(reservations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = reservations.slice(startIndex, endIndex);

  const [openAdd, setOpenAdd] = useState<boolean>(false);

  return (
    <div className={`max-w-[1100px] mx-auto`}>
      {chambreList && (
        <PerChambreList open={chambreList} onOpenChange={setChambreList} />
      )}

      <AddReservation
        open={openAdd}
        onOpenChange={() => setOpenAdd(!open)}
        onClose={() => setOpenAdd(false)}
      />

      <TextHeading title="réservations" descriptions={reservdescriptions} />
      <div className="mt-8">
        <Card />
      </div>

      <CardContainer>
        <h2 className="font-bold text-primary text-sm mb-6 ml-2">
          Liste des réservations
        </h2>
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-around text-xs gap-2">
          <button
            onClick={()=>setOpenAdd(true)}
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
              placeholder="Nom du chambre, client..."
            />
          </div>
          <div
            onClick={() => setChambreList(true)}
            className="rounded-md border border-border flex items-center justify-center py-2.5 px-3 gap-4 cursor-pointer w-full sm:w-auto
          hover:bg-primary/80 hover:text-primary-foreground hover:border-primary-foreground active:scale-95 transition-all duration-300"
          >
            <FaBed className="w-4 h-4" />
            <p>Par chambre</p>
          </div>
          <div className="flex items-center gap-[10px] w-full sm:w-auto justify-center flex-wrap">
            <div
              className="border border-border rounded flex justify-center items-center px-2.5 py-2 relative z-50 gap-5 cursor-pointer min-w-[170px] flex-1
              hover:bg-primary/80 hover:text-primary-foreground hover:border-primary-foreground active:scale-95 transition-all duration-300"
              onClick={() => handleDateShow(debRef)}
            >
              <IoCalendar className="w-4 h-4" />
              <input
                ref={debRef}
                type="date"
                className="opacity-0 absolute inset-0"
                value={periode.debut}
                onChange={(e) =>
                  setPeriode({
                    ...periode,
                    debut: e.target.value,
                  })
                }
              />
              <span>{periode.debut !== "" ? periode.debut : "début"}</span>
            </div>

            <div
              className="border border-border rounded flex justify-center items-center px-2.5 py-2 relative z-50 gap-5 cursor-pointer min-w-[170px]  flex-1
              hover:bg-primary/80 hover:text-primary-foreground hover:border-primary-foreground active:scale-95 transition-all duration-300"
              onClick={handleFin}
            >
              <IoCalendar className="w-4 h-4" />
              <input
                ref={finRef}
                type="date"
                min={periode.debut}
                className="opacity-0 absolute inset-0"
                value={periode.fin}
                onChange={(e) =>
                  setPeriode({
                    ...periode,
                    fin: e.target.value,
                  })
                }
              />
              <span>{periode.fin !== "" ? periode.fin : "fin"}</span>
            </div>
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
};

export default Reservations;
