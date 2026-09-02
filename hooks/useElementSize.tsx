import { useState, useEffect, useRef } from "react";

export function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Crée l'observateur pour capter les changements de taille
    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      
      // Récupère la largeur de la boîte de contenu (contentBox)
      const { inlineSize } = entries[0].contentBoxSize[0];
      setWidth(inlineSize);
    });

    observer.observe(element);

    // Nettoyage à la destruction du composant
    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, width };
}
