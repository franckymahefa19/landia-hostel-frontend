"use client"

import { useOpen } from "@/context/OpenViewContext";
import { ThemeProvider } from "./theme-provider";

export function MainBody({children}: {children: React.ReactNode}) {
  const { isOpen } = useOpen();
  console.log(isOpen)
  return (
    <body className={`min-h-full flex flex-col  ${isOpen ? 'overflow-hidden': 'overflow-auto'}`}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </body>
  );
}