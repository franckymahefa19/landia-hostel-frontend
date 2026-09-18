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
import { DeleteAlert } from "../components/DeleteAlert";
import rawData from "@/data/clients.json";
import { ClientType } from "@/utils/ClientType";
import { ViewClient } from "./components/ViewClient";
import Image from "next/image";
import { useOpen } from "@/context/OpenViewContext";

const clients: ClientType[] = rawData as ClientType[];

export const clientdescriptions = [
  "Gérez efficacement l'ensemble de vos clients",
  "Ajoutez, modifiez et organisez vos clients.",
  "Consultez leur réservations, suivez leur flux en temps réel",
];

const ITEMS_PER_PAGE = 5;

type OnDeleteType = {
  isOpen: boolean;
  data: ClientType | null;
};
const Clients = () => {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useOpen();
  const [activeClient, setActiveClient] = useState<ClientType | null>(null);

  const handleOpenDetails = (res: ClientType) => {
    setActiveClient(res);
    onOpen();
  };

  const handleCloseDetails = () => {
    onClose();
    setActiveClient(null);
  };

  const [openDelete, setOpenDelete] = useState<OnDeleteType>({
    isOpen: false,
    data: null,
  });

  const deleteClient = () => {
    alert(`Client ${openDelete.data?.nom} supprimé`);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(clients.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = clients.slice(startIndex, endIndex);

  return (
    <div>
      <TextHeading title="clients" descriptions={clientdescriptions} />
      <div className="mt-6 w-full flex flex-col-reverse lg:flex-row lg:justify-between lg:items-end text-sm">
        <div className="flex items-end gap-3 text-sm">
          <h2 className="text-primary">Toutes les clients</h2>
          <p className="text-[10px] text-muted-foreground/80">
            2 005 résultats
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3 self-center lg:self-end mb-3 lg:mb-0">
          <button
            onClick={() => router.push("/administration/clients/ajout-client")}
            className="flex justify-center items-center gap-2 text-primary-foreground bg-primary rounded-lg px-4 py-2.5 cursor-pointer text-xs font-medium active:scale-95 duration-150"
          >
            <IoAdd size={16} className="font-bold" />
            <span className="hidden lg:block">Ajouter un client</span>
          </button>
          <div className="max-w-[180px] sm:max-w-[250px] gap-2 border border-border rounded-md flex items-center px-3 overflow-hidden">
            <FaSearch size={15} className="text-muted-foreground" />
            <input
              type="text"
              className="py-3 px-1 flex-1 outline-none min-w-0 text-xs"
              placeholder="Entrer le nom du client"
            />
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto px-2 pb-2 mt-6">
        {/* Header */}
        <div
          className="
                min-w-[700px]
                grid grid-cols-5
                px-4 py-4
                text-xs uppercase
                text-muted-foreground
              "
        >
          <div>Image</div>
          <div>Nom</div>
          <div>Prenom</div>
          <div>Phone</div>
          <div className="text-center">Action</div>
        </div>

        {/* Rows */}
        <div className="min-w-[700px] space-y-3">
          {currentItems.map((client, index) => (
            <div
              key={index}
              className="
                                  grid grid-cols-5
                                  items-center
                                  bg-card/70
                                  hover:bg-card
                                  rounded-lg
                                  px-4 py-2
                                 shadow-[0_1px_4px_rgba(0,0,0,0.16)]
                                 dark:shadow-[0_1px_4px_rgba(255,255,255,0.16)]
                                 hover:shadow-md
                                 transition-all
                                 duration-300
                                  group
                                "
            >
              <div className="text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                <div className="rounded-full relative bg-border overflow-hidden w-12 h-12">
                  <Image
                    alt="client"
                    src={client.image}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                {client.nom}
              </div>
              <div className="text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                {client.prenoms}
              </div>
              <div className="text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                {client.adresse.length > 20
                  ? `${client.adresse.slice(0, 20)}...`
                  : client.adresse}
              </div>

              <div className="flex justify-center items-center gap-2">
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <FaEye
                        onClick={() => handleOpenDetails(client)}
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
                      onClick={()=>setOpenDelete({isOpen: true, data: client})}
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
          {activeClient && (
            <ViewClient
              client={activeClient}
              open={isOpen}
              onOpenChange={(open) => {
                if (!open) handleCloseDetails();
              }}
            />
          )}
          <DeleteAlert
            onActive={deleteClient}
            open={openDelete.isOpen}
            onOpenChange={(open) => {
              if (!open) setOpenDelete({ isOpen: false, data: null });
            }}
          />
        </div>
      </div>
      <div className="my-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Clients;
