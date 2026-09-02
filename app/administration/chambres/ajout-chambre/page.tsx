"use client";

import TextHeading from "@/components/TextHeading";
import { descriptions } from "../page";
import { useElementSize } from "@/hooks/useElementSize";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { IoMdAddCircle, IoMdAddCircleOutline } from "react-icons/io";
import { BiChevronsDown } from "react-icons/bi";
import { CgChevronDown } from "react-icons/cg";
import SelectType from "../components/SelectType";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddImages from "../components/AddImages";


type typeType = {
  id: string;
  nom: string;
};

const ChambreSchema = z.object({
  nom: z.string().min(1, "Le nom de la chambre est requis"),

  prix: z
    .number({
      error: "Le prix est obligatoire",
    })
    .min(1, "Le prix est invalide"),

  description: z.string(),

  etat: z.string().min(1, "L'état de la chambre est requis"),

  type: z.string().min(1, "Le type de la chambre est requis"),
});

type ChambreForm = z.infer<typeof ChambreSchema>;
const AddChambre = () => {
  const { ref, width } = useElementSize<HTMLFormElement>();
  const isMobile = width < 800;

  const [selectedImages, setSelectedImages] = useState<any>(null);

  const [files, setFiles] = useState<any>({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });
  const [preview, setPreview] = useState<any>({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  const handleFileChange = (e: any, index: number) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const urlobject = URL.createObjectURL(selectedFile);
      if (index === 1) {
        setFiles({ ...files, image1: selectedFile });
        setPreview({ ...preview, image1: urlobject });
      } else if (index === 2) {
        setFiles({ ...files, image2: selectedFile });
        setPreview({ ...preview, image2: urlobject });
      } else if (index === 3) {
        setFiles({ ...files, image3: selectedFile });
        setPreview({ ...preview, image3: urlobject });
      } else if (index === 4) {
        setFiles({ ...files, image4: selectedFile });
        setPreview({ ...preview, image4: urlobject });
      }
      setSelectedImages(urlobject);
    }
  };

  const changeImage = (): string => {
    if (selectedImages) {
      for (const [cle, valeur] of Object.entries(preview)) {
        if (valeur === selectedImages) {
          return cle;
        }
      }
    }
    return "";
  };

  const resetImages = () => {
    setSelectedImages(null);
    setFiles({
      image1: "",
      image2: "",
      image3: "",
      image4: "",
    });
    setPreview({
      image1: "",
      image2: "",
      image3: "",
      image4: "",
    });
  };

  const [focus, setFocus] = useState({
    nom: false,
    prix: false,
    etat: false,
    type: false,
    desc: false,
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<ChambreForm>({
    resolver: zodResolver(ChambreSchema),
    defaultValues: {
      nom: "",
      prix: undefined,
      description: "",
      etat: "",
      type: "",
    },
  });

  const submitData = async (data: ChambreForm) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Données du formulaire :", data);
    alert("chambre enregistré !!");
  };

  return (
    <div>
      <div className="hidden sm:block">
        <TextHeading descriptions={descriptions} />
      </div>
      <form
        onSubmit={handleSubmit(submitData)}
        ref={ref}
        className={`mt-6 max-w-[1000px] mx-auto grid gap-[15px] ${isMobile ? "grid-cols-1" : "grid-cols-[1fr_270px]"} mb-5 sm:mt-20`}
      >
        <div className="rounded-lg bg-card shadow p-4">
          <h2 className="text-primary text-md">Ajouter une chambre</h2>
          <p className="text-[10px] text-muted-foreground">
            Veuillez remplir les informations
          </p>

          <div
            className={`flex justify-center py-2 mt-10 border border-dashed border-border rounded-md ${isMobile ? "block" : "hidden"}`}
          >
            <div className="w-[250px]">
              <AddImages
                changeImage={changeImage}
                files={files}
                handleFileChange={handleFileChange}
                isMobile={isMobile}
                preview={preview}
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
                resetImages={resetImages}
                height="180px"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-[10px] w-full mt-8 items-start">
            <div className="flex-1 relative w-full">
              <label
                className={`mb-1 absolute text-[12px] ml-2 bg-card  px-3
                  ${focus.nom ? "top-[-10px] text-foreground font-semibold" : "top-[11px] text-muted-foreground capitalize"} transition-all duration-400`}
              >
                nom
              </label>

              <input
                type="text"
                {...register("nom")}
                onFocus={() => setFocus({ ...focus, nom: true })}
                onBlur={() => {
                  const nom = getValues("nom");

                  if (nom.trim() === "") {
                    setFocus({ ...focus, nom: false });
                  } else {
                    setFocus({ ...focus, nom: true });
                  }
                }}
                className="w-full rounded border px-4 py-3 outline-none text-xs"
              />

              {errors.nom && (
                <p className=" text-[10px] text-red-500">
                  {errors.nom.message}
                </p>
              )}
            </div>
            <div className="flex-1 relative w-full">
              <label
                className={`mb-1 absolute text-[12px] ml-2 bg-card  px-3
                  ${focus.prix ? "top-[-10px] text-foreground font-semibold" : "top-[11px] text-muted-foreground capitalize"} transition-all duration-400`}
              >
                prix
              </label>

              <input
                type="number"
                {...register("prix", {
                  valueAsNumber: true,
                })}
                onFocus={() => setFocus({ ...focus, prix: true })}
                onBlur={() => {
                  const prix = getValues("prix");

                  if (isNaN(prix)) {
                    setFocus({ ...focus, prix: false });
                  } else {
                    setFocus({ ...focus, prix: true });
                  }
                }}
                className="w-full rounded border px-4 py-3 outline-none text-xs"
              />

              {errors.prix && (
                <p className=" text-[10px] text-red-500">
                  {errors.prix.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-[10px] w-full mt-[10px] sm:mt-8 items-start">
            <div className="flex-1 relative w-full">
              <label
                className={`mb-1 absolute text-[12px] ml-2 bg-card  px-3
                  ${focus.type ? "top-[-10px] text-foreground font-semibold" : "top-[11px] text-muted-foreground capitalize"} transition-all duration-400`}
              >
                type
              </label>

              <input
                type="text"
                {...register("type")}
                readOnly
                onFocus={() => setFocus({ ...focus, type: true })}
                onBlur={() => {
                  const type = getValues("type");

                  if (type.trim() === "") {
                    setFocus({ ...focus, type: false });
                  } else {
                    setFocus({ ...focus, type: true });
                  }
                }}
                className="w-full rounded border px-4 py-3 outline-none text-xs"
              />
              <CgChevronDown
                size={16}
                className="text-muted-foreground/70 absolute top-[50%] translate-y-[-50%] right-2"
              />
              <SelectType
                trigger={<div className="absolute inset-0 cursor-pointer" />}
                getType={(type) => {
                  setValue("type", type.nom, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });

                  setFocus({ ...focus, type: true });
                }}
              />

              {errors.type && (
                <p className=" text-[10px] text-red-500">
                  {errors.type.message}
                </p>
              )}
            </div>
            <div className="flex-1 relative w-full">
              <Controller
                name="etat"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full rounded! border h-auto! px-4 py-3 outline-none text-xs">
                      <SelectValue placeholder="Sélectionnez un état"/>
                    </SelectTrigger>

                    <SelectContent >
                      <SelectItem
                        value="disponible"
                        className="py-3 px-3 text-xs"
                      >
                        Disponible
                      </SelectItem>

                      <SelectItem
                        value="en nettoyage"
                        className="py-3 px-3 text-xs"
                      >
                        En nettoyage
                      </SelectItem>

                      <SelectItem
                        value="en maintenance"
                        className="py-3 px-3 text-xs"
                      >
                        En maintenance
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.etat && (
                <p className=" text-[10px] text-red-500">
                  {errors.etat.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-[10px] sm:mt-8 relative w-full">
            <div className="flex-1 relative">
              <label
                className={`mb-1 absolute text-[12px] ml-2 bg-card  px-3 
                  ${focus.desc ? "top-[-10px] text-foreground font-semibold" : "top-[20px] text-muted-foreground capitalize"} transition-all duration-400`}
              >
                description
              </label>

              <textarea
                {...register("description")}
                onFocus={() => setFocus({ ...focus, desc: true })}
                onBlur={() => {
                  const desc = getValues("description");

                  if (desc.trim() === "") {
                    setFocus({ ...focus, desc: false });
                  } else {
                    setFocus({ ...focus, desc: true });
                  }
                }}
                className="w-full rounded border px-4 py-3 outline-none text-xs resize-none"
              ></textarea>

              {errors.description && (
                <p className=" text-[10px] text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`rounded-md bg-principal px-4 py-2 text-white disabled:opacity-60 mt-4 font-semibold w-[60%] block mx-auto 
                ${isSubmitting ? "scale-95" : ""} transition-transform duration-1000`}
          >
            {isSubmitting ? (
              <ClipLoader
                loading={isSubmitting}
                color={"var(--primary)"}
                size={20}
                aria-label="connexion..."
              />
            ) : (
              "Ajouter"
            )}
          </button>
        </div>
        <div
          className={`rounded-lg bg-card shadow p-3
             ${isMobile ? "hidden" : "block"}`}
        >
          <h2 className="text-sm font-medium mb-4">Images du chambre</h2>
          <AddImages
            changeImage={changeImage}
            files={files}
            handleFileChange={handleFileChange}
            isMobile={isMobile}
            preview={preview}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            resetImages={resetImages}
            height="200px"
          />
        </div>
      </form>
    </div>
  );
};

export default AddChambre;
