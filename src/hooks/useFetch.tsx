import { useEffect, useState } from "react";

const useFetch = (link: string | undefined) => {
  const [image, setImage] = useState<ArrayBuffer | string | null>(null);
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

  return { image };
};

export default useFetch;
