import { useLanguageContext } from "../../../context/LanguageContext";
import colors from "./locales/color.json";

type Options = {
  label: string;
  value: string;
};

export type Languages = {
  [key: string]: string;
  pl: string;
  en: string;
  es: string;
  fr: string;
  de: string;
};

const useColorOption = () => {
  const { language } = useLanguageContext();
  const color: { [key: string]: Languages } = colors;

  const options: Options[] = [
    { label: color.red[language || "en"], value: "czerwony" },
    { label: color.green[language || "en"], value: "zielony" },
    { label: color.blue[language || "en"], value: "niebieski" },
    { label: color.yellow[language || "en"], value: "żółty" },
    { label: color.purple[language || "en"], value: "fioletowy" },
    { label: color.turquoise[language || "en"], value: "turkusowy" },
    { label: color.brown[language || "en"], value: "brązowy" },
    { label: color.pink[language || "en"], value: "różowy" },
    { label: color.gray[language || "en"], value: "szary" },
    { label: color.white[language || "en"], value: "biały" },
    { label: color.black[language || "en"], value: "czarny" },
  ];

  return options;
};

export default useColorOption;
