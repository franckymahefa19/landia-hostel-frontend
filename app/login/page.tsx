"use client";

import FormImage from "@/components/FormImage";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import logo from "@/public/assets/logoLH.png";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const loginSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

type loginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: loginFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Données du formulaire :", data);
  };

  return (
    <div className="w-[90%] sm:w-[70%] xl:w-[85%] h-[600px] mx-auto bg-white shadow rounded-xl xl:grid xl:grid-cols-2 overflow-hidden">
      <FormImage />
      <div className="flex flex-col justify-center px-[10%] md:px-28 relative h-full">
        <div className="absolute top-2 left-0 w-full flex justify-between py-6 px-10 items-center">
          <Image src={logo} alt="" width={40} height={40} />
          <h2 className="font-medium uppercase">login</h2>
        </div>
        <h1 className="text-center text-4xl font-bold">Bonjour!</h1>
        <p className="max-w-[85%] text-center mx-auto mt-3 text-muted-foreground text-sm">
          Pour vous connecter à votre compte, renseigner votre adresse email et
          votre mot de passe
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-14 flex flex-col gap-[25px]">
            <div className="relative">
              <div className="absolute left-[15px] text-muted-foreground top-0 bottom-0 flex items-center">
                <FaEnvelope className="text-muted-foreground text-sm" />
              </div>
              <input
                id="email"
                type="text"
                {...register("email")}
                placeholder="Votre email"
                className="px-6 pl-12 py-4 text-sm bg-muted w-full rounded-xl outline-none"
              />
              {errors.email && (
                <p
                  style={{ color: "red", margin: "3px 0 0" }}
                  className="text-[10px]"
                >
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="relative">
              <div className="absolute left-[15px] text-muted-foreground top-0 bottom-0 flex items-center">
                <FaLock className="text-muted-foreground text-sm" />
              </div>
              <div className="absolute right-[15px] text-muted-foreground top-0 bottom-0 flex items-center">
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => setHiddenPassword(!hiddenPassword)}
                >
                  {hiddenPassword ? (
                    <FaEye className="text-muted-foreground text-sm" />
                  ) : (
                    <FaEyeSlash className="text-muted-foreground text-sm" />
                  )}
                </button>
              </div>
              <input
                id="password"
                type={hiddenPassword ? "password" : "text"}
                {...register("password")}
                placeholder="Votre mot de passe"
                className="px-6 pl-12 py-4 text-sm bg-muted w-full rounded-xl outline-none"
              />
              {errors.password && (
                <p
                  style={{ color: "red", margin: "4px 0 0" }}
                  className="text-[10px]"
                >
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <p className="text-muted-foreground text-xs mt-2 hover:underline cursor-pointer">
            Mot de passe oublié?
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground rounded-lg py-3 font-medium mt-6 cursor-pointer"
          >
            {isSubmitting ? (
              <ClipLoader
                loading={isSubmitting}
                color={'var(--principal)'}
                size={20}
                aria-label="connexion..."
              />
            ) : (
              "Se connecter"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
