import { useContext } from "react";
import { GlobalPropertiesContext } from "../../Context/GlobalProperitesContext";

const useGlobalPropertiesContext = () => {
  const context = useContext(GlobalPropertiesContext);
  if (!context) {
    throw Error("globalProperties ;");
  }

  return context;
};

export default useGlobalPropertiesContext;
