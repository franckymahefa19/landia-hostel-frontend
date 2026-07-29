"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import { LayoutDashboard, Bed, Calendar, Users } from "lucide-react";
import { FaCalendar } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/administration/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Chambres",
    url: "/administration/chambres",
    icon: Bed,
  },
  {
    title: "Réservations",
    url: "/administration/reservations",
    icon: Calendar,
  },
  {
    title: "Clients",
    url: "/administration/clients",
    icon: Users,
  },
];

export function AppSidebar() {
  const { open, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-0 mt-2">
        {open ? (
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                x: -50,
              },
              show: {
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.2,
                  duration: 0.5,
                },
              },
            }}
            initial="hidden"
            animate="show"
            className="flex h-14 items-center justify-between pr-2"
          >
            <div className="flex flex-col items-start ml-5">
              <span className="font-bold leading-none text-xl text-principal">
                Landia Hostel
              </span>
              <span className="text-sm leading-none">Management</span>
            </div>
            <SidebarTrigger />
          </motion.div>
        ) : (
          <div
            className="flex items-center justify-center h-14 cursor-e-resize"
            onClick={toggleSidebar}
          >
            <Image
              src="/assets/logoLH.png"
              alt="Landia Hostel"
              width={28}
              height={28}
            />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="mt-3">
          <SidebarGroupContent>
            <SidebarGroupLabel className="text-muted-foreground">
              Navigation
            </SidebarGroupLabel>
            <SidebarMenu className="space-y-1.5 mt-1">
              {items.map((item) => {
                const isActive = pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <Link href={item.url}>
                      <SidebarMenuButton
                        className={`py-6 cursor-pointer px-8 transition-all ease-in duration-200 active:scale-85 hover:bg-primary/30 hover:text-primary
                          ${isActive && "bg-principal/80 text-primary-foreground hover:bg-principal/80 hover:text-primary-foreground active:text-primary-foreground active:bg-principal/80"}`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Landia Hostel
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
