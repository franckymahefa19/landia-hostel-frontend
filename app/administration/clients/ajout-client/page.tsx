"use client";

import TextHeading from "@/components/TextHeading";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { clientdescriptions } from "../page";
import { useState } from "react";
import { FaHandPointUp } from "react-icons/fa";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClipLoader } from "react-spinners";

export const clientSchema = z.object({
  nom: z
    .string({ error: "Le nom est requis" })
    .min(1, "Le nom ne peut pas être vide")
    .trim(),

  prenoms: z.string(),

  adresse: z
    .string({ error: "L'adresse est requise" })
    .min(1, "L'adresse ne doit pas être vide")
    .trim(),

  tel: z
    .string({ error: "Le téléphone est requis" })
    .regex(
      /^\+?[0-9\s-]{8,}$/,
      "Le numéro de téléphone doit être dans un format valide",
    ),

  email: z
    .string({ error: "L'email est requis" })
    .email("L'adresse email n'est pas valide")
    .toLowerCase()
    .trim(),

  sexe: z
    .string({ error: "Le sexe est requis" })
    .min(1, "Le sexe ne peut pas être vide")
    .trim(),

  nationalite: z
    .string()
    .min(2, "La nationalité doit contenir au moins 2 caractères")
    .trim(),

  image: z.string({ error: "L'URL de l'image est requise" }),
});

type ClientForm = z.infer<typeof clientSchema>;

const AjoutClient = () => {
  const [preview, setPreview] = useState<any>("");
  const [file, setFile] = useState<any>("");

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<ClientForm>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      nom: "",
      prenoms: "",
      sexe: "",
      email: "",
      tel: "",
      nationalite: "",
      image: "",
      adresse: "",
    },
  });

  const handleFileChange = (e: any) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setFile(selectedImage);
      setPreview(URL.createObjectURL(selectedImage));
    }
  };

  const [focus, setFocus] = useState({
    nom: false,
    prenoms: false,
    sexe: false,
    email: false,
    tel: false,
    nationalite: false,
    adresse: false,
  });

  const submitData = async (data: ClientForm) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Données du formulaire :", data);
    alert("client enregistré !!");
  };

  return (
    <div>
      <div className="hidden sm:block">
        <TextHeading title="clients" descriptions={clientdescriptions} />
      </div>
      <form
        onSubmit={handleSubmit(submitData)}
        className={`mt-6 max-w-[1000px] mx-auto mb-5 sm:mt-14 rounded-lg bg-card shadow p-4`}
      >
        <h2 className="text-primary text-md">Ajouter un client</h2>
        <p className="text-[10px] text-muted-foreground">
          Veuillez remplir les informations
        </p>

        <div className="w-full h-[150px] border border-dashed border-border rounded-lg mt-4 flex justify-center relative">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer z-20"
            onChange={(e) => handleFileChange(e)}
          />
          {file === "" ? (
            <p className="h-full flex items-center text-xs italic text-muted-foreground cursor-pointer">
              <FaHandPointUp size={14} className="mr-2" />
              Cliquer ici pour charger l'image
            </p>
          ) : (
            <div className="w-[280px] h-full bg-muted relative">
              {preview && (
                <Image
                  src={preview}
                  alt="client"
                  fill
                  className="object-cover z-10"
                />
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-[10px] w-full mt-8 items-start">
          <div className="flex-1 relative w-full">
            <label
              htmlFor="nom"
              className={`mb-1 absolute text-[12px] ml-2 bg-card  px-3 cursor-text
                  ${focus.nom ? "top-[-10px] text-foreground font-semibold" : "top-[11px] text-muted-foreground capitalize"} transition-all duration-400`}
            >
              nom
            </label>

            <input
              id="nom"
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
              <p className=" text-[10px] text-red-500">{errors.nom.message}</p>
            )}
          </div>
          <div className="flex-1 relative w-full">
            <label
              htmlFor="prenoms"
              className={`mb-1 absolute text-[12px] ml-2 bg-card  px-3 cursor-text
                  ${focus.prenoms ? "top-[-10px] text-foreground font-semibold" : "top-[11px] text-muted-foreground capitalize"} transition-all duration-400`}
            >
              prenoms
            </label>

            <input
              id="prenoms"
              type="text"
              {...register("prenoms")}
              onFocus={() => setFocus({ ...focus, prenoms: true })}
              onBlur={() => {
                const prenoms = getValues("prenoms");

                if (prenoms.trim() === "") {
                  setFocus({ ...focus, prenoms: false });
                } else {
                  setFocus({ ...focus, prenoms: true });
                }
              }}
              className="w-full rounded border px-4 py-3 outline-none text-xs"
            />

            {errors.prenoms && (
              <p className=" text-[10px] text-red-500">
                {errors.prenoms.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-[10px] w-full mt-8 items-start">
          <div className="flex-1 relative w-full">
            <Controller
              name="sexe"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full rounded! border h-auto! px-4 py-3 outline-none text-xs">
                    <SelectValue placeholder="Sexe" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Homme" className="py-3 px-3 text-xs">
                      Homme
                    </SelectItem>

                    <SelectItem value="Femme" className="py-3 px-3 text-xs">
                      Femme
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.sexe && (
              <p className=" text-[10px] text-red-500">{errors.sexe.message}</p>
            )}
          </div>
          <div className="flex-1 relative w-full">
            <label
              htmlFor="email"
              className={`mb-1 absolute text-[12px] ml-2 bg-card  px-3 cursor-text
                  ${focus.email ? "top-[-10px] text-foreground font-semibold" : "top-[11px] text-muted-foreground capitalize"} transition-all duration-400`}
            >
              email
            </label>

            <input
              id="email"
              type="text"
              {...register("email")}
              onFocus={() => setFocus({ ...focus, email: true })}
              onBlur={() => {
                const email = getValues("email");
                if (email.trim() === "") {
                  setFocus({ ...focus, email: false });
                } else {
                  setFocus({ ...focus, email: true });
                }
              }}
              className="w-full rounded border px-4 py-3 outline-none text-xs"
            />

            {errors.email && (
              <p className=" text-[10px] text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-[10px] w-full mt-8 items-start">
          <div className="flex-1 relative w-full">
            <label
              htmlFor="adresse"
              className={`mb-1 absolute text-[12px] ml-2 bg-card  px-3 cursor-text
                  ${focus.adresse ? "top-[-10px] text-foreground font-semibold" : "top-[11px] text-muted-foreground capitalize"} transition-all duration-400`}
            >
              adresse
            </label>

            <input
              id="adresse"
              type="text"
              {...register("adresse")}
              onFocus={() => setFocus({ ...focus, adresse: true })}
              onBlur={() => {
                const adresse = getValues("adresse");

                if (adresse.trim() === "") {
                  setFocus({ ...focus, adresse: false });
                } else {
                  setFocus({ ...focus, adresse: true });
                }
              }}
              className="w-full rounded border px-4 py-3 outline-none text-xs"
            />

            {errors.adresse && (
              <p className=" text-[10px] text-red-500">
                {errors.adresse.message}
              </p>
            )}
          </div>
          <div className="flex-1 relative w-full">
            <label
              htmlFor="phone"
              className={`mb-1 absolute text-[12px] ml-2 bg-card  px-3 cursor-text
                  ${focus.tel ? "top-[-10px] text-foreground font-semibold" : "top-[11px] text-muted-foreground capitalize"} transition-all duration-400`}
            >
              phone
            </label>

            <input
              id="phone"
              type="text"
              {...register("tel")}
              onFocus={() => setFocus({ ...focus, tel: true })}
              onBlur={() => {
                const tel = getValues("tel");

                if (tel.trim() === "") {
                  setFocus({ ...focus, tel: false });
                } else {
                  setFocus({ ...focus, tel: true });
                }
              }}
              className="w-full rounded border px-4 py-3 outline-none text-xs"
            />

            {errors.tel && (
              <p className=" text-[10px] text-red-500">{errors.tel.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-[10px] w-full mt-8 items-start">
          <div className="flex-1 relative w-full">
            <label
              htmlFor="nationalite"
              className={`mb-1 absolute text-[12px] ml-2 bg-card  px-3 cursor-text
                  ${focus.nationalite ? "top-[-10px] text-foreground font-semibold" : "top-[11px] text-muted-foreground capitalize"} transition-all duration-400`}
            >
              nationalité
            </label>

            <input
              id="nationalite"
              type="text"
              {...register("nationalite")}
              onFocus={() => setFocus({ ...focus, nationalite: true })}
              onBlur={() => {
                const nationalite = getValues("nationalite");

                if (nationalite.trim() === "") {
                  setFocus({ ...focus, nationalite: false });
                } else {
                  setFocus({ ...focus, nationalite: true });
                }
              }}
              className="w-full rounded border px-4 py-3 outline-none text-xs"
            />

            {errors.nationalite && (
              <p className=" text-[10px] text-red-500">
                {errors.nationalite.message}
              </p>
            )}
          </div>
          <div className="flex-1 relative w-full">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`rounded-md bg-principal px-4 py-2 text-white disabled:opacity-60 font-semibold w-[60%] block mx-auto
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
        </div>
      </form>
    </div>
  );
};

export default AjoutClient;
