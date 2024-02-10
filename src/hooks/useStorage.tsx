import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";

const useStorage = () => {
  const [progressInfo, setProgress] = useState("");

  const storage = getStorage();
  const metadata = {
    contentType: "application/octet-stream",
  };

  const handleAddImage = (image: File, link: string) => {
    const path = ref(storage, link);
    const uploadTask = uploadBytesResumable(path, image, metadata);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress.toFixed(2));
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("default");
              break;
          }
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            console.log(error);
            reject(error);
          }
        }
      );
    });
  };

  const uploadImage = async (item: string | File, link: string) => {
    if (item === null || item === "") return { src: "" };
    else if (typeof item === "string") return { src: item };
    else if (typeof item === "object") {
      const downloadURL = await handleAddImage(item, link);

      return {
        src: downloadURL as string,
      };
    }
  };

  return { handleAddImage, progressInfo, uploadImage };
};

export default useStorage;
