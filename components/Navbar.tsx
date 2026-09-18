"use client";

import Image from "next/image";
import React from "react";
import { IoChevronDown } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { useTheme } from "next-themes";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  const buttonTrigger = (
    <button className="flex items-center gap-2.5 py-1.5 px-3 rounded-2xl bg-principal/15 cursor-pointer">
      <div className="w-[30px] h-[30px] rounded-full overflow-hidden relative">
        <Image
          src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          fill
          className="object-cover"
        />
      </div>
      <h2 className="text-sm font-bold ml-2">Jenny Victoria</h2>
      <IoChevronDown size={16} className="text-primary" />
    </button>
  );

  const { theme, setTheme } = useTheme();

  console.log("theme : ", theme);

  return (
    <div className="w-full h-[70px] flex justify-between md:justify-end items-center px-4 md:px-12 gap-3 fixed top-0 left-0 right-0 backdrop-blur-3xl z-50">
      <SidebarTrigger className="md:hidden" />
      <div className="flex items-center gap-3">
        <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="relative border border-border rounded-md p-2 flex items-center justify-center bg-muted cursor-pointer">
            <HiOutlineSun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
            <HiOutlineMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")} className="py-2 px-2.5">
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")} className="py-2 px-2.5">
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")} className="py-2 px-2.5">
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger render={buttonTrigger} />
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <div className="py-1.5 px-3 flex justify-between w-full">
                <p>Profile</p>
                <FaUser size={16} className="text-foreground" />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="py-1.5 px-3 flex justify-between w-full">
                <p>Déconnexion</p>
                <FaSignOutAlt size={16} className="text-foreground" />
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
