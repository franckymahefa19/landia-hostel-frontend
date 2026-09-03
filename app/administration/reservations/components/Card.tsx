import CardContainer from "@/components/Card-container";
import { FaCircleCheck, FaLock, FaLockOpen, FaBan } from "react-icons/fa6";
import { HiCalendarDays } from "react-icons/hi2";

const Card = () => {
  return (
    <CardContainer>
      <div className="mb-2 px-2.5 py-1.5 border border-border rounded-md flex items-center justify-between gap-3 w-28 bg-card cursor-default">
        <HiCalendarDays size={15} className="text-card-foreground" />
        <p className="text-[11px] text-card-foreground">Aujourd'hui</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        <div className=" border border-purple-300/20 bg-purple-100/15 rounded-lg  px-4 py-2.5 shadow flex justify-between items-center">
          <div className="w-10 h-10 rounded-full flex justify-center items-center bg-purple-300/25">
            <FaLock size={20} className="text-purple-500" />
          </div>
          <div>
            <p className="font-bold text-right text-lg mb-1">50</p>
            <p className="text-[10px] text-right">Chambres occupés</p>
          </div>
        </div>
        <div className=" border border-green-300/20 bg-green-100/15 rounded-lg  px-4 py-2.5 shadow flex justify-between items-center">
          <div className="w-10 h-10 rounded-full flex justify-center items-center bg-green-300/25">
            <FaLockOpen size={20} className="text-green-500" />
          </div>
          <div>
            <p className="font-bold text-right text-lg mb-1">35</p>
            <p className="text-[10px] text-right">Chambres libres</p>
          </div>
        </div>
        <div className=" border border-fuchsia-300/20 bg-fuchsia-100/15 rounded-lg  px-4 py-2.5 shadow flex justify-between items-center">
          <div className="w-10 h-10 rounded-full flex justify-center items-center bg-fuchsia-300/25">
            <FaCircleCheck size={20} className="text-fuchsia-500" />
          </div>
          <div>
            <p className="font-bold text-right text-lg mb-1">42</p>
            <p className="text-[10px] text-right">Réservations terminé</p>
          </div>
        </div>
        <div className=" border border-yellow-300/20 bg-yellow-100/15 rounded-lg  px-4 py-2.5 shadow flex justify-between items-center">
          <div className="w-10 h-10 rounded-full flex justify-center items-center bg-yellow-300/25">
            <FaBan size={20} className="text-yellow-500" />
          </div>
          <div>
            <p className="font-bold text-right text-lg mb-1">19</p>
            <p className="text-[10px] text-right">Réservations annulés</p>
          </div>
        </div>
      </div>
    </CardContainer>
  );
};

export default Card;
