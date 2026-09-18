import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChambreType } from "@/utils/ChambreType";
import Image from "next/image";
import { useState } from "react";

const FAKE_IMAGES = [
  "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1092&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export function ViewChambre({
  chambre,
  open,
  onOpenChange,
}: {
  chambre: ChambreType;
   open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [selectedImage, setSelectedImage] = useState<string>(FAKE_IMAGES[0]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Detail du chambre</SheetTitle>
        </SheetHeader>
        <div className="px-4">
          <h2 className="text-muted-foreground text-xs">Images</h2>
          <div className="w-full h-[150px] rounded-md relative mt-2 overflow-hidden">
            <Image
              src={selectedImage}
              fill
              alt="chambre"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {FAKE_IMAGES.map((image, index) => (
              <div
                key={index}
                onClick={()=>setSelectedImage(image)}
                className={`rounded overflow-hidden relative h-16 ${selectedImage === image ? 'border-2 border-principal' : 'border border-border'}`}
              >
                <Image
                  src={image}
                  fill
                  alt="chambre"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-8 px-4 rounded-md shadow py-3">
            <h2 className="text-muted-foreground text-xs">Nom du chambre</h2>
            <p className="text-right text-sm mt-2">{chambre.nom}</p>
          </div>
          <div className="mt-4 px-4 rounded-md shadow py-3">
            <h2 className="text-muted-foreground text-xs">Type du chambre</h2>
            <p className="text-right text-sm mt-2">{chambre.type}</p>
          </div>

          <div className="mt-4 px-4 rounded-md shadow py-3">
            <h2 className="text-muted-foreground text-xs">Etat du chambre</h2>
            <p className="text-right text-sm mt-2">{chambre.etat}</p>
          </div>

          <div className="mt-4 px-4 rounded-md shadow py-3 mb-3">
            <h2 className="text-muted-foreground text-xs">Description</h2>
            <p className="text-right text-sm mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Animi explicabo eligendi, itaque voluptate laudantium quas nobis aliquam suscipit temporibus assumenda! Rem suscipit possimus cum.
               Praesentium.</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
