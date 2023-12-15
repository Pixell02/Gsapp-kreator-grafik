import { useContext } from "react";
import { BackgroundContext } from "../../Context/BackgroundContext";

const useBackgroundContext = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw Error("background Context");
  }

  return context;
};

export default useBackgroundContext;
