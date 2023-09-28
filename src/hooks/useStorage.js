import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const useStorage = () => {
  const storage = getStorage();
  const metadata = {
    contentType: "image/png",
  };

  const handleAddImage = (image, link) => {
    const path = ref(storage, link);
    const uploadTask = uploadBytesResumable(path, image, metadata);

    return new Promise(async (resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
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

  return { handleAddImage };
};

export default useStorage;
