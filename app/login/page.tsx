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
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { variantMotion } from "@/utils/variantMotion";

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

  const router = useRouter();
  const onSubmit = async (data: loginFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Données du formulaire :", data);
    if (data) {
      router.push("/administration/dashboard");
    }
  };

  return (
    <div className="w-[90%] sm:w-[70%] xl:w-[85%] h-[600px] mx-auto bg-white shadow rounded-xl xl:grid xl:grid-cols-2 overflow-hidden">
      <FormImage />
      <div className="flex flex-col justify-center px-[10%] md:px-28 relative h-full">
        <div className="absolute top-2 left-0 w-full flex justify-between py-6 px-10 items-center">
          <motion.div
            variants={variantMotion("right", 0.1)}
            initial="hidden"
            animate="show"
          >
            <Image src={logo} alt="" width={40} height={40} />
          </motion.div>
          <motion.h2
            variants={variantMotion("left", 0.1)}
            initial="hidden"
            animate="show"
            className="font-medium uppercase"
          >
            login
          </motion.h2>
        </div>
        <motion.h1
          variants={variantMotion("up", 0.1)}
          initial="hidden"
          animate="show"
          className="text-center text-4xl font-bold"
        >
          Bonjour!
        </motion.h1>
        <motion.p
          variants={variantMotion("up", 0.3)}
          initial="hidden"
          animate="show"
          className="max-w-[85%] text-center mx-auto mt-3 text-muted-foreground text-sm"
        >
          Pour vous connecter à votre compte, renseigner votre adresse email et
          votre mot de passe
        </motion.p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-14 flex flex-col gap-[25px]">
            <motion.div
              variants={variantMotion("up", 0.5)}
              initial="hidden"
              animate="show"
              className="relative"
            >
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
            </motion.div>
            <motion.div
              variants={variantMotion("up", 0.7)}
              initial="hidden"
              animate="show"
              className="relative"
            >
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
            </motion.div>
          </div>
          <motion.p
            variants={variantMotion("up", 0.9)}
            initial="hidden"
            animate="show"
            className="text-muted-foreground text-xs mt-2 hover:underline cursor-pointer"
          >
            Mot de passe oublié?
          </motion.p>
          <motion.div
            variants={variantMotion("up", 0.9)}
            initial="hidden"
            animate="show"
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground rounded-lg py-3 font-medium mt-5 cursor-pointer active:scale-90 transition-transform duration-300"
            >
              {isSubmitting ? (
                <ClipLoader
                  loading={isSubmitting}
                  color={"var(--principal)"}
                  size={20}
                  aria-label="connexion..."
                />
              ) : (
                "Se connecter"
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default Login;
