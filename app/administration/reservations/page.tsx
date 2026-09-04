"use client";

import TextHeading from "@/components/TextHeading";
import React, { useRef, useState } from "react";
import { FaDoorClosed, FaPlus, FaSearch } from "react-icons/fa";
import { HiHome } from "react-icons/hi2";
import { IoBedOutline, IoCalendar } from "react-icons/io5";
import Card from "./components/Card";
import CardContainer from "@/components/Card-container";
import { FaBed, FaBedPulse } from "react-icons/fa6";

export const reservdescriptions = [
  "Gérez efficacement l'ensemble de vos réservations",
  "Ajoutez, modifiez et organisez vos réservations.",
  "Consultez les différentes status de réservations",
];

type PeriodeType = {
  debut: string;
  fin: string;
};

const Reservations = () => {
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

  // https://dribbble.com/shots/27135677-Bookings-Management-System-for-Hotels

  return (
    <div className="max-w-[1100px] mx-auto">
      <TextHeading title="réservations" descriptions={reservdescriptions} />
      <div className="mt-8">
        <Card />
      </div>

      <CardContainer>
        <h2 className="font-bold text-primary text-sm mb-2 ml-2">
          Liste des réservations
        </h2>
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-around text-xs gap-2">
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
              placeholder="Nom du chambre, client..."
            />
          </div>
          <div
            className="rounded-md border border-border flex items-center justify-center py-2.5 px-3 gap-4 cursor-pointer w-full sm:w-auto
          hover:bg-primary/80 hover:text-primary-foreground hover:border-primary-foreground active:scale-95 transition-all duration-300"
          >
            <FaBed className="w-4 h-4" />
            <p>Par chambre</p>
          </div>
          <div className="flex items-center gap-[10px] w-full sm:w-auto justify-center">
            <div
              className="border border-border rounded flex justify-center items-center px-2.5 py-2 relative z-50 gap-5 cursor-pointer min-w-[100px] flex-1
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
              className="border border-border rounded flex justify-center items-center px-2.5 py-2 relative z-50 gap-5 cursor-pointer min-w-[100px] flex-1
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
      </CardContainer>
    </div>
  );
};

export default Reservations;
