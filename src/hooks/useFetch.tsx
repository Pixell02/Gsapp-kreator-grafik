import { useEffect, useState } from "react";

const useFetch = (link?: string | undefined) => {
  const [image, setImage] = useState<ArrayBuffer | string | null>(null);

  const handleFetch = async (link: string): Promise<string> => {
    try {
      const response = await fetch(link);

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result);
          } else {
            reject(new Error("Invalid result type"));
          }
        };

        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    const handleFetch = async (link: string) => {
      await fetch(link)
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            setImage(reader.result);
          };
        })
        .catch((error) => {
          console.error(error);
          setImage(null);
        });
    };
    if (!link || link === "") return setImage("");
    handleFetch(link);
  }, [link]);

  return { image, handleFetch };
};

export default useFetch;
