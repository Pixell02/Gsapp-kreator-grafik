import React, { useContext, useEffect, useState } from "react";
import useSearchTeam from "./hooks/useSearchTeam";
import "./SaveModal.css";
import Users from "./Users";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { BackgroundContext } from "../Context/BackgroundContext";
import { GlobalPropertiesContext } from "../Context/GlobalProperitesContext";
import { useNavigate } from "react-router-dom";
import { ManyBackgroundsContext } from "../Context/ManyBackgroundsContext";

export default function SaveModal({ isOpen, setIsOpen }) {
  const myId = uuidv4().replace(/-/g, "");
  const navigate = useNavigate();
  const [id, setId] = useState();
  useEffect(() => {
    setId(myId);
  }, [])
  const [percentageProgress, setPercentageProgress] = useState();
  const [query, setQuery] = useState("");
  const [users, loading, error] = useSearchTeam(query);
  const { background, image } = useContext(BackgroundContext);
  const { manyBackgrounds } = useContext(ManyBackgroundsContext);
  const [radioValue, setRadioValue] = useState("");
  const [userPoster, setUserPoster] = useState({
    type: "MATCH-POSTER"
  });
  console.log(manyBackgrounds);
  useEffect(() => {
    setUserPoster((prevState) => ({
      ...prevState,
      src: background,
      uuid: id,
      uid: radioValue
    }));
    setGlobalProperties((prevState) => ({
      ...prevState,
      uid: id
    }));
  }, [background, id, radioValue]);
    
  const { globalProperties, setGlobalProperties } = useContext(GlobalPropertiesContext);
  
  
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };
 
  const handleAddDoc = async () => {
    
    if (manyBackgrounds) {
      manyBackgrounds.forEach((background, i) => {
        const storage = getStorage();
        const metadata = {
          contentType: "image/jpeg",
        };
        const player = ref(storage, `${globalProperties.uid}/posters/${globalProperties.uid + i + 2}`);

        const uploadTask = uploadBytesResumable(player, background, metadata);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setPercentageProgress("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("dodawanie...");
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              addDoc(collection(db, "yourCatalog"), {
                color: `tło ${i + 2}`,
                src: downloadURL,
                uuid: globalProperties.uid,
              });
            });
          }
        );
      });
    }
   
    if (userPoster.src) {
      const storage = getStorage();
      const metadata = {
        contentType: "image/jpeg",
      };
      const player = ref(storage, `${userPoster.uid}/posters/${userPoster.uuid}`);

      const uploadTask = uploadBytesResumable(player, image, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setDoc(doc(collection(db, "yourCatalog"), id), {
              color: manyBackgrounds ? "tło 1": null,
              name: userPoster.name,
              src: downloadURL,
              type: userPoster.type,
              uid: userPoster.uid,
              uuid: userPoster.uuid,
            });
            setDoc(doc(collection(db, "coords"), id), globalProperties);
          }).then(() => {
            setTimeout(() => {
              navigate(`/creator/${userPoster.uuid}`)
            },500)
            
          })
        }
      );
      
      
      
    }
  };

  return (
    <div className={isOpen ? "modal" : "closed-modal"}>
      <div className="modal-window rounded">
        <div className="p-3  d-flex flex-column h-100 w-100">
          <p>Dodaj grafikę</p>
          <label>Znajdź drużynę</label>
          <input type="text" value={query} onChange={(e) => handleQueryChange(e)} />
          <div className="d-flex w-100 border h-100 overflow-auto">
            {loading && <div>Loading...</div>}
            {error && <div>{error.message}</div>}
            <Users users={users} radioValue={radioValue} setRadioValue={setRadioValue} />
          </div>
          <label>Nazwa wzoru</label>
          <input type="text" onChange={(e) => setUserPoster((prevState) => ({
            ...prevState,
            name: e.target.value
          }))} />
          <label>Typ wzoru</label>
          <select
            name="textAlign"
            className="form-control w-100"
            defaultValue="MATCH-POSTER"
            onChange={(e) => setUserPoster((prevState) => ({
              ...prevState, 
              type: e.target.value
            }))}
          >
            <option value="MATCH-POSTER">zapowiedź meczu / dzień meczowy</option>
            <option value="RESULT">wynik</option>
            <option value="STARTING-SQUAD">skład wyjściowy</option>
            <option value="GOOOOL">GOL</option>
          </select>
          {percentageProgress}
          <div className="btn-container justify-content-end h-100 align-items-end mb-3">
            <button onClick={() => setIsOpen(false)} className="btn btn-primary">
              Anuluj
            </button>
            <button onClick={handleAddDoc} className="btn btn-primary">
              Zapisz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
