import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useIsTheme = () => {
  const location = useLocation();
  const [hasTheme, setHasTheme] = useState(false);
  useEffect(() => {
    const theme = extractThemeFromURL(location.pathname);
    setHasTheme(theme !== null);
  }, [location]);

  const extractThemeFromURL = (pathname) => {
    const parts = pathname.split("/");
    const themeIndex = parts.indexOf("theme");
    if (themeIndex !== -1 && themeIndex < parts.length - 1) {
      return parts[themeIndex + 1];
    }
    return null; // Jeśli nie znaleziono wartości theme w adresie URL
  };
  return { hasTheme };
};

export default useIsTheme;
