"use client";

import { variantMotion } from "@/utils/variantMotion";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FaBed,
  FaCalendar,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaUser,
} from "react-icons/fa";


export default function Home() {
  const router = useRouter();
  return (
    <div className="relative">
      <div className="w-full h-screen lg:h-[80vh] relative flex items-center bg-black">
        <Image
          src="https://plus.unsplash.com/premium_photo-1661884238187-1c274b3c3413?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <motion.div
          variants={variantMotion("down", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2, once: false }}
          className="flex py-6 px-10 md:px-16 text-white/95 absolute top-0 left-0 w-full z-20 justify-between items-center border-b border-white/40"
        >
          <h1 className="uppercase font-bold">Landia Hostel Management</h1>
          <div className="flex gap-4">
            <FaFacebook size={22} className="cursor-pointer" />
            <FaTwitter size={22} className="cursor-pointer" />
            <FaInstagram size={22} className="cursor-pointer" />
          </div>
        </motion.div>
        <div className="relative z-20 text-white w-full lg:w-[65%] px-[5%] lg:px-0 mx-auto flex flex-col items-center lg:items-start">
          <motion.div
            variants={variantMotion("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.2, once: false }}
          >
            <h1 className="text-center sm:text-start text-3xl md:text-5xl font-extrabold text-shadow-2xs">
              La fluididé d'organisation,
            </h1>
            <h1 className="text-center sm:text-start text-3xl md:text-5xl font-extrabold text-shadow-2xs">
              la simpicité de gestion.
            </h1>
          </motion.div>
          <motion.p
            variants={variantMotion("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.2, once: false }}
            className="max-w-[550px] mt-5 text-white/90 text-center lg:text-start"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
            praesentium fugiat, vero quibusdam nesciunt doloremque vitae omnis?
            Saepe magnam cumque voluptatibus ducimus accusantium. Facere harum,
            officia sunt sit sequi ipsa provident enim sint molestias vero?
          </motion.p>
          <motion.div
            variants={variantMotion("up", 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.2, once: false }}
          >
            <button
              className="bg-transparent border border-white rounded-md py-3 px-5 mt-5 uppercase font-bold cursor-pointer hover:backdrop-blur-lg active:scale-80 transition-transform duration-300"
              onClick={() => router.push("/login")}
            >
              Se connecter
            </button>
          </motion.div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-around z-100 lg:absolute -bottom-[80px] lef-0 w-full gap-[20px] px-[20px] mt-8 lg:mt-0">
        <motion.div
          variants={variantMotion("right", 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2, once: false }}
          className="lg:max-w-[400px] py-4 px-4 rounded-lg border border-principal bg-white flex flex-col justify-center items-center flex-1"
        >
          <FaBed size={35} className="mb-3 text-principal" />
          <h2 className="text-xl text-center font-bold">
            Gestion des chambres
          </h2>
          <p className="text-center text-sm mt-2">
            Suivi du statut des chambres, affectations des chambres aux
            réservations.
          </p>
        </motion.div>
        <motion.div
          variants={variantMotion("up", 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2, once: false }}
          className="lg:max-w-[400px] py-4 px-4 rounded-lg border border-principal bg-white flex flex-col justify-center items-center flex-1"
        >
          <FaCalendar size={35} className="mb-3 text-principal" />
          <h2 className="text-xl text-center font-bold">
            Gestion des réservations
          </h2>
          <p className="text-center text-sm mt-2">
            Gestion des dates de réservations, suivi du statut des réservations
            et historique..
          </p>
        </motion.div>
        <motion.div
          variants={variantMotion("left", 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2, once: false }}
          className="lg:max-w-[400px] py-4 px-4 rounded-lg border border-principal bg-white flex flex-col justify-center items-center flex-1"
        >
          <FaUser size={35} className="mb-3 text-principal" />
          <h2 className="text-xl text-center font-bold">Gestion des clients</h2>
          <p className="text-center text-sm mt-2">
            Management des clients, suivi et enregistrement de nouveaux clients.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
