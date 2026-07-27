"use client";

import Image from "next/image";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Typewriter from "typewriter-effect";
import "swiper/css";
import "swiper/css/effect-fade";

const descriptions = [
  "Gérez votre hôtel en toute simplicité.",
  "Centralisez toutes vos opérations.",
  "Optimisez vos réservations.",
  "Suivez vos chambres en temps réel.",
  "Une gestion hôtelière moderne et intuitive.",
  "Simplifiez votre quotidien.",
  "Pilotez votre établissement efficacement.",
  "Tout votre hôtel sur une seule plateforme.",
  "Des outils pour un hôtel performant.",
  "Votre partenaire de gestion hôtelière.",
  "Facilitez chaque étape de votre activité.",
  "Une plateforme simple et puissante.",
  "La gestion de votre hôtel, réinventée.",
];

const IMAGES = [
  "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1678297270385-ad5067126607?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661875135365-16aab794632f?q=80&w=953&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];


const FormImage = () => {
  return (
    <div className="w-full h-full relative hidden xl:flex items-center">
        <div className="absolute inset-0">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            slidesPerView={1}
            className="h-full"
          >
            {IMAGES.map((image, index) => (
              <SwiperSlide key={index} className="h-full">
                <Image src={image} alt="Hotel" fill className="object-cover"/>
              </SwiperSlide>
            ))}
          </Swiper>                                         
        </div>

        <div className="absolute inset-0 z-10 bg-linear-to-b from-black/40 via-black/65 to-black/90"></div>
        <div className="px-8 z-30">
          <p className="text-gray-300 text-lg">Bienvenue sur</p>
          <h1 className="text-4xl font-bold text-shadow-2xs text-white">
            <span className="text-principal font-extrabold">Landia Hostel</span>{" "}
            Management
          </h1>
          <span className="text-gray-300 text-shadow-accent block mt-5">
            <Typewriter
              options={{
                strings: descriptions,
                autoStart: true,
                loop: true,
                delay: 30, // Vitesse d'écriture (en ms)
                deleteSpeed: 25, // Vitesse d'effacement (en ms)
              }}
            />
          </span>
        </div>
      </div>
  )
}

export default FormImage