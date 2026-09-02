"use client";

import { Pagination } from "@/components/Pagination";
import TextHeading from "@/components/TextHeading";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEdit, FaEye, FaSearch, FaTrash } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { ViewChambre } from "./components/ViewChambre";
import { DeleteAlert } from "../components/DeleteAlert";

export const descriptions = [
  "Gérez efficacement l'ensemble de vos chambres",
  "Ajoutez, modifiez et organisez vos chambres.",
  "Consultez leur disponibilité, suivez leur état en temps réel",
];

const fakeChambre = [
  {
    nom: "B10",
    type: "luxe",
    etat: "libre",
  },
  {
    nom: "B10",
    type: "luxe",
    etat: "libre",
  },
  {
    nom: "B10",
    type: "luxe",
    etat: "libre",
  },
  {
    nom: "B10",
    type: "luxe",
    etat: "libre",
  },
  {
    nom: "B10",
    type: "luxe",
    etat: "libre",
  },
  {
    nom: "B10",
    type: "luxe",
    etat: "libre",
  },
];

const Chambres = () => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 8;

  return (
    <div>
      <TextHeading descriptions={descriptions} />
      <div className="mt-6 w-full flex flex-col-reverse lg:flex-row lg:justify-between lg:items-end text-sm">
        <div className="flex items-end gap-3 text-sm">
          <h2 className="text-primary">Toutes les chambres</h2>
          <p className="text-[10px] text-muted-foreground/80">
            1 555 résultats
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3 self-center lg:self-end mb-3 lg:mb-0">
          <button
            onClick={() =>
              router.push("/administration/chambres/ajout-chambre")
            }
            className="flex justify-center items-center gap-2 text-primary-foreground bg-primary rounded-lg px-4 py-2.5 cursor-pointer text-xs font-medium active:scale-95 duration-150"
          >
            <IoAdd size={16} className="font-bold" />
            <span className="hidden lg:block">Ajouter une chambre</span>
          </button>
          <div className="max-w-[180px] sm:max-w-[250px] gap-2 border border-border rounded-md flex items-center px-3 overflow-hidden">
            <FaSearch size={15} className="text-muted-foreground" />
            <input
              type="text"
              className="py-3 px-1 flex-1 outline-none min-w-0 text-xs"
              placeholder="Entrer le nom de la chambre"
            />
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto px-2 pb-2 mt-6">
        {/* Header */}
        <div
          className="
      min-w-[700px]
      grid grid-cols-4
      px-4 py-4
      text-xs uppercase
      text-muted-foreground
    "
        >
          <div>Nom</div>
          <div>Type</div>
          <div>État</div>
          <div className="text-center">Action</div>
        </div>

        {/* Rows */}
        <div className="min-w-[700px] space-y-3">
          {fakeChambre.map((chambre, index) => (
            <div
              key={index}
              className="
                        grid grid-cols-4
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
              <div className="text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                {chambre.nom}
              </div>
              <div className="text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                {chambre.type}
              </div>
              <div className="text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                {chambre.etat}
              </div>

              <div className="flex justify-center items-center gap-2">
                <ViewChambre
                  trigger={
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <FaEye
                            size={12}
                            className="opacity-15 group-hover:opacity-100 transition-all duration-700 text-muted-foreground group-hover:text-green-500 cursor-pointer"
                          />
                        }
                      />
                      <TooltipContent>
                        <p className="text-[10px]">Voir détails</p>
                      </TooltipContent>
                    </Tooltip>
                  }
                  chambre={chambre}
                />

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

                <DeleteAlert
                  trigger={
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <FaTrash
                            size={12}
                            className="opacity-15 group-hover:opacity-100 transition-all duration-700 text-muted-foreground group-hover:text-destructive cursor-pointer"
                          />
                        }
                      />
                      <TooltipContent>
                        <p className="text-[10px]">Supprimer</p>
                      </TooltipContent>
                    </Tooltip>
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Chambres;
