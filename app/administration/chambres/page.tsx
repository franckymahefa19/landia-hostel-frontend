import TextHeading from "@/components/TextHeading";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaEdit, FaEye, FaSearch, FaTrash } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";

const descriptions = [
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
        <div className="flex gap-2 sm:gap-3 items-center self-center lg:self-end mb-3 lg:mb-0">
          <button className="flex justify-center items-center gap-2 text-primary-foreground bg-primary rounded-lg px-4 py-2.5 cursor-pointer text-xs font-medium active:scale-95 duration-150">
            <IoAdd size={16} className="font-bold" />
            <span className="hidden lg:block">Ajouter une chambre</span>
          </button>
          <div className="max-w-[180px] sm:max-w-[250px] gap-2 border border-border rounded-md flex items-center px-3 overflow-hidden">
            <FaSearch size={15} color="text-primary" />
            <input
              type="text"
              className="py-3 px-3 flex-1 outline-none min-w-0"
              placeholder="Entrer le nom de la chambre"
            />
          </div>
        </div>
      </div>
      <table className="text-xs border-separate border-spacing-y-2 w-full">
        <thead className="uppercase text-muted-foreground font-medium">
          <tr>
            <td className="py-2 px-4">nom</td>
            <td className="py-2 px-4">type</td>
            <td className="py-2 px-4">état</td>
            <td className="py-2 px-4 w-[150px] text-center">action</td>
          </tr>
        </thead>
        <tbody>
          {fakeChambre.map((chambre, index) => {
            return (
              <tr
                key={index}
                className="mb-2 last:mb-0 py-3 shadow group hover:scale-105 cursor-pointer transition-all duration-300"
              >
                <td className="py-5 px-4 rounded-l-lg bg-card">
                  {chambre.nom}
                  {index + 1}
                </td>
                <td className="py-5 px-4 bg-card">{chambre.type}</td>
                <td className="py-5 px-4 bg-card">{chambre.etat}</td>
                <td className="py-5 px-4 w-[150px] rounded-r-lg bg-card flex justify-center gap-2">
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <FaEye
                          size={12}
                          className="opacity-15 group-hover:opacity-100 transition-all duration-700 text-muted-foreground group-hover:text-green-500"
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
                          className="opacity-15 group-hover:opacity-100 transition-all duration-700 text-muted-foreground group-hover:text-blue-500"
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
                          size={12}
                          className="opacity-15 group-hover:opacity-100 transition-all duration-700 text-muted-foreground group-hover:text-destructive"
                        />
                      }
                    />
                    <TooltipContent>
                      <p className="text-[10px]">Supprimer</p>
                    </TooltipContent>
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Chambres;
