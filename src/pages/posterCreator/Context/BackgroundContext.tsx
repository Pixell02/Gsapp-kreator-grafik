import { DocumentData, doc, getDoc } from "firebase/firestore";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase/config";
import { useCollection } from "../../../hooks/useCollection";
import { useDoc } from "../../../hooks/useDoc";

export const BackgroundContext = createContext<backgroundProps | null>(null);

type newBackground = {
  file: File;
  color: string;
  src: string;
};

type backgroundProps = {
  color: string;
  setColor: (value: string) => void;
  backgrounds: DocumentData[];
  setBackgrounds: (value: DocumentData[]) => void;
  image: DocumentData | null;
  setImage: (value: DocumentData | null) => void;
  newBackgrounds: newBackground[];
  setNewBackgrounds: (value: newBackground[]) => void;
};

export function BackgroundProvider({ children }: PropsWithChildren) {
  const { id } = useParams();
  const { documents: theme } = useDoc("piecesOfPoster", ["uid", "==", id || ""]);
  const [image, setImage] = useState<DocumentData | null>(null);
  useEffect(() => {
    if (!id) return;
    const docRef = doc(db, "yourCatalog", id);
    getDoc(docRef).then((doc) => {
      setImage(doc.data() as DocumentData);
    });
  }, [id]);

  useEffect(() => {
    if (!theme) return;
    setImage(theme);
  }, [theme]);

  const { documents: individual } = useCollection("yourCatalog", ["uuid", "==", id || ""]);
  const { documents: poster } = useCollection("piecesOfPoster", ["uuid", "==", id || ""]);
  const [backgrounds, setBackgrounds] = useState<DocumentData[]>([]);
  const [newBackgrounds, setNewBackgrounds] = useState<newBackground[]>([]);
  useEffect(() => {
    if (individual && individual.length > 0) {
      const filteredPoster = individual.filter((item) => item?.src !== image?.src);
      setBackgrounds(filteredPoster);
    } else if (poster && poster.length > 0) {
      setBackgrounds(poster);
    } else {
      setBackgrounds([]);
    }
  }, [individual, poster]);

  const [color, setColor] = useState<string>("");
  return (
    <BackgroundContext.Provider
      value={{ color, setColor, backgrounds, setBackgrounds, newBackgrounds, setNewBackgrounds, image, setImage }}
    >
      {children}
    </BackgroundContext.Provider>
  );
}

export const useBackgroundContext = () => {
  const context = useContext(BackgroundContext);

  if (!context) {
    throw Error("background context");
  }
  return context;
};
