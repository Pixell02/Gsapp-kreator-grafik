import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/config";

const useFont = (fontFamily: string) => {
  const [fontFace, setFontFace] = useState<FontFace | null>(null);

  useEffect(() => {
    if (!fontFamily) return;
    const q = query(collection(db, "fonts"), where("name", "==", fontFamily));
    const handleGetDoc = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const font = doc.data();
        const fontFace = new FontFace(font.name, `url(${font.font})`);
        setFontFace(fontFace);
      });
    };
    handleGetDoc();
  }, [fontFamily]);

  return { fontFace };
};

export default useFont;
