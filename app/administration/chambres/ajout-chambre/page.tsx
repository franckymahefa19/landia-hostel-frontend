"use client";

import TextHeading from "@/components/TextHeading";
import { descriptions } from "../page";
import { useElementSize } from "@/hooks/useElementSize";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

// https://dribbble.com/shots/27649818-E-commerce-Branding-Management-Flow-Seller-Admin-UI

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
  const isMobile = width < 600;

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
    formState: { errors, isSubmitting },
    reset,
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
      <TextHeading descriptions={descriptions} />
      <form
        onSubmit={handleSubmit(submitData)}
        ref={ref}
        className={`mt-6 max-w-[1000px] mx-auto grid gap-[15px] ${isMobile ? "grid-cols-1" : "grid-cols-[65%_1fr] "}`}
      >
        <div className="rounded-lg bg-card shadow p-4">
          <h2 className="text-primary text-md">Ajouter une chambre</h2>
          <p className="text-[10px] text-muted-foreground">
            Veuillez remplir les informations
          </p>
          <div className="flex gap-[10px] w-full mt-10 items-start">
            <div className="flex-1 relative">
              <label
                className={`mb-1 absolute text-[12px] ml-2 bg-background  px-3
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
            <div className="flex-1 relative">
              <label
                className={`mb-1 absolute text-[12px] ml-2 bg-background  px-3
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

          <div className="flex gap-[10px] w-full mt-8 items-start">
            <div className="flex-1 relative">
              <label
                className={`mb-1 absolute text-[12px] ml-2 bg-background  px-3
                  ${focus.type ? "top-[-10px] text-foreground font-semibold" : "top-[11px] text-muted-foreground capitalize"} transition-all duration-400`}
              >
                type
              </label>

              <input
                type="text"
                {...register("type")}
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

              {errors.type && (
                <p className=" text-[10px] text-red-500">
                  {errors.type.message}
                </p>
              )}
            </div>
            <div className="flex-1 relative">
              <label
                className={`mb-1 absolute text-[12px] ml-2 bg-background  px-3
                  ${focus.etat ? "top-[-10px] text-foreground font-semibold" : "top-[11px] text-muted-foreground capitalize"} transition-all duration-400`}
              >
                état
              </label>

              <input
                type="text"
                {...register("etat")}
                onFocus={() => setFocus({ ...focus, etat: true })}
                onBlur={() => {
                  const etat = getValues("etat");

                  if (etat.trim() === "") {
                    setFocus({ ...focus, etat: false });
                  } else {
                    setFocus({ ...focus, etat: true });
                  }
                }}
                className="w-full rounded border px-4 py-3 outline-none text-xs"
              />

              {errors.etat && (
                <p className=" text-[10px] text-red-500">
                  {errors.etat.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 relative w-full">
            <div className="flex-1 relative">
              <label
                className={`mb-1 absolute text-[12px] ml-2 bg-background  px-3 
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
              className={
                `rounded-md bg-principal px-4 py-2 text-white disabled:opacity-60 mt-4 font-semibold w-[60%] block mx-auto 
                ${isSubmitting ? 'scale-95' : ''} transition-transform duration-1000`
              }
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
          className={`rounded-lg bg-card shadow ${isMobile ? "hidden" : "block"}`}
        ></div>
      </form>
    </div>
  );
};

export default AddChambre;
