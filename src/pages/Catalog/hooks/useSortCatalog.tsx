import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";

const useSortCatalog = (catalog: DocumentData[] | null) => {
  const [isOpen, setIsOpen] = useState<DocumentData[] | null>(null);

  useEffect(() => {
    if (catalog) {
      const updatedCatalog: DocumentData[] = catalog.map((item) => ({ ...item, expanded: false }));
      setIsOpen(
        updatedCatalog.sort((a, b) => {
          const themeA = a.theme.toLowerCase();
          const themeB = b.theme.toLowerCase();
          const regex = /^motyw (\d+)$/;
          const matchA = themeA.match(regex);
          const matchB = themeB.match(regex);
          if (matchA && matchB) {
            const numberA = parseInt(matchA[1]);
            const numberB = parseInt(matchB[1]);
            return numberA - numberB;
          } else if (matchA) {
            return -1;
          } else if (matchB) {
            return 1;
          }
          return 0;
        })
      );
    }
  }, [catalog]);
  return { isOpen, setIsOpen };
};

export default useSortCatalog;
