"use client"

import TextHeading from "@/components/TextHeading";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { clientdescriptions } from "../page";

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

  const submitData = async (data: ClientForm) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Données du formulaire :", data);
    alert("client enregistré !!");
  };

  return (
    <div>
      <div className="hidden sm:block">
        <TextHeading descriptions={clientdescriptions} />
      </div>
      <form
        onSubmit={handleSubmit(submitData)}
        className={`mt-6 max-w-[1000px] mx-auto mb-5 sm:mt-20 rounded-lg bg-card shadow p-4`}
      >
        <h2 className="text-primary text-md">Ajouter un client</h2>
        <p className="text-[10px] text-muted-foreground">
          Veuillez remplir les informations
        </p>

        <div className="w-full h-[200px] border border-dashed border-border rounded-lg mt-4">

        </div>
      </form>
    </div>
  );
};

export default AjoutClient;
