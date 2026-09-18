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
import { ChambreInterface } from "@/types/ChambreInteface";
import { ChambreType } from "@/utils/ChambreType";
import Image from "next/image";
import { useState } from "react";

const FAKE_IMAGES = [
  "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1092&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export const setImage = (path: string | undefined) => {
  if (!path) return "";

  return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
};

export function ViewChambre({
  chambre,
  open,
  onOpenChange,
}: {
  chambre: ChambreInterface;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    chambre.image1
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Detail du chambre</SheetTitle>
        </SheetHeader>
        <div className="px-4">
          <h2 className="text-muted-foreground text-xs">Images</h2>
          <div className="w-full h-[150px] rounded-md relative mt-2 overflow-hidden">
            {selectedImage ? (
              <Image
                src={setImage(selectedImage)}
                fill
                alt="chambre"
                className="object-cover"
                unoptimized
              />
            ) : (
              <p className="absolute inset-0 flex justify-center items-center text-[10px] text-muted-foreground">
                Aucune image
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {chambre.image1 && (
              <div
                onClick={() => setSelectedImage(chambre.image1)}
                className={`rounded overflow-hidden relative h-16 ${selectedImage === chambre.image1 ? "border-2 border-principal" : "border border-border"}`}
              >
                <Image
                  src={setImage(chambre.image1)}
                  fill
                  alt="chambre"
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            {chambre.image2 && (
              <div
                onClick={() => setSelectedImage(chambre.image2)}
                className={`rounded overflow-hidden relative h-16 ${selectedImage === chambre.image2 ? "border-2 border-principal" : "border border-border"}`}
              >
                <Image
                  src={setImage(chambre.image2)}
                  fill
                  alt="chambre"
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            {chambre.image3 && (
              <div
                onClick={() => setSelectedImage(chambre.image3)}
                className={`rounded overflow-hidden relative h-16 ${selectedImage === chambre.image3 ? "border-2 border-principal" : "border border-border"}`}
              >
                <Image
                  src={setImage(chambre.image3)}
                  fill
                  alt="chambre"
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            {chambre.image4 && (
              <div
                onClick={() => setSelectedImage(chambre.image4)}
                className={`rounded overflow-hidden relative h-16 ${selectedImage === chambre.image4 ? "border-2 border-principal" : "border border-border"}`}
              >
                <Image
                  src={setImage(chambre.image4)}
                  fill
                  alt="chambre"
                  className="object-cover"
                />
              </div>
            )}
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
            <p className="text-right text-sm mt-2">{chambre.description}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
