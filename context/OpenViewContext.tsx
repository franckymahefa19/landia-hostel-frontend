"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Interface du contexte
interface OpenContextType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// 2. Création du contexte
const OpenContext = createContext<OpenContextType | undefined>(undefined);

// 3. Props du Provider
interface OpenProviderProps {
  children: ReactNode;
  initialState?: boolean;
}

// 4. Composant Provider
export const OpenProvider: React.FC<OpenProviderProps> = ({ 
  children, 
  initialState = false 
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <OpenContext.Provider value={{ isOpen, onOpen, onClose, toggle, setIsOpen }}>
      {children}
    </OpenContext.Provider>
  );
};

// 5. Hook personnalisé avec vérification du Provider
export const useOpen = (): OpenContextType => {
  const context = useContext(OpenContext);
  if (!context) {
    throw new Error('useOpen doit être utilisé à l\'intérieur d\'un OpenProvider');
  }
  return context;
};