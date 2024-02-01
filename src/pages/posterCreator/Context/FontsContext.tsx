import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useCollection } from "../../../hooks/useCollection";

type FontOption = {
  label: string;
  value: string;
};

type ContextData = {
  fontOptions: FontOption[] | null;
};

const fontContext = createContext<ContextData | null>(null);

export const FontProvider = ({ children }: PropsWithChildren) => {
  const { documents: fonts } = useCollection("fonts");
  const [fontOptions, setFontOptions] = useState<FontOption[] | null>(null);

  useEffect(() => {
    if (!fonts) return;
    const option: FontOption[] = [];
    fonts.forEach((font) => {
      const fontFace = new FontFace(font.name, `url(${font.font})`);
      fontFace.load().then((font) => {
        document.fonts.add(font);
      });
      option.push({ label: font.name, value: font.name });
    });
    setFontOptions(option);
  }, [fonts]);

  return <fontContext.Provider value={{ fontOptions }}>{children}</fontContext.Provider>;
};

export const useFontContext = () => {
  const context = useContext<ContextData | null>(fontContext);
  if (!context) {
    throw Error("font context is undefined");
  }
  return context;
};
