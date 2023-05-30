import React, { useContext } from 'react'
import { useCollection } from '../../../hooks/useCollection'
import './saveThemeModal.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { v4 as uuidv4 } from "uuid";
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import { GlobalPropertiesContext } from '../../posterCreator/Context/GlobalProperitesContext'
import { BackgroundContext } from '../../posterCreator/Context/BackgroundContext'
import { ManyBackgroundsContext } from '../../posterCreator/Context/ManyBackgroundsContext'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../../../firebase/config'

export default function SaveThemeModal({ isOpen, setIsOpen }) {
  const { documents: catalog } = useCollection("catalog")
  const { globalProperties, setGlobalProperties } = useContext(GlobalPropertiesContext)
  const { background, image } = useContext(BackgroundContext);
  const { manyBackgrounds } = useContext(ManyBackgroundsContext);
  
  const myId = uuidv4().replace(/-/g, "");
  const navigate = useNavigate();
  const [id, setId] = useState();
  useEffect(() => {
    setId(myId);
  }, [])
  useEffect(() => {
    setGlobalProperties((prevState) => ({
      ...prevState,
      uid: id
    }));
  },[image, catalog])
  const [catalogOption, setCatalogOption] = useState([]);
  const [savedThemeName, setSavedThemeName] = useState("");
  const [selectedTheme, setSelectedTheme] = useState();
  const [themeName, setThemeName] = useState("");
  const [percentageProgress, setPercentageProgress] = useState();
  
  const handleThemeSelect = (option) => {
    setSelectedTheme(option.value);
    setSavedThemeName(option.label);
  }
  console.log(globalProperties)

  useEffect(() => {
    if (catalog) {
      const options = catalog.map((option) => (
        {
        label: option.theme + " " + option.sport + " " + option.lang,
        value: option.id
      }));
      setCatalogOption(options);
    }
    
  },[catalog])
  
 

  const handleAddDoc = async () => {
    
    if (manyBackgrounds) {
      manyBackgrounds.forEach((background, i) => {
        const storage = getStorage();
        const metadata = {
          contentType: "image/jpeg",
        };
        const player = ref(storage, `${savedThemeName}/${themeName}/${background.name}`);

        const uploadTask = uploadBytesResumable(player, background.file, metadata);

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
              addDoc(collection(db, "piecesOfPoster"), {
                color: background.name,
                src: downloadURL,
                uuid: globalProperties.uid,
              });
            });
          }
        );
      });
    }
   
    if (image) {
      const storage = getStorage();
      const metadata = {
        contentType: "image/jpeg",
      };
      const player = ref(storage, `${savedThemeName}/${themeName}/${image.name}`);

      const uploadTask = uploadBytesResumable(player, image.file, metadata);

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
            setDoc(doc(collection(db, "piecesOfPoster"), globalProperties.uid), {
              color: image.name,
              name: themeName,
              src: downloadURL,
              themeId: selectedTheme,
              uid: globalProperties.uid,
              uuid: globalProperties.uid,
            });
            setDoc(doc(collection(db, "coords"), globalProperties.uid), globalProperties ? globalProperties : { uid: id });
          }).then(() => {
            setTimeout(() => {
              navigate(`/creator/${globalProperties.uid}`)
            },500)
            
          })
        }
      );
      
    }
  };

  
  return (
    <div className='modal-container'>
      <div className='modal-window p-3'>
        <p>Dodaj motyw</p>
        <span>motyw</span>
        <Select options={catalogOption} onChange={(option) => handleThemeSelect(option)} />
        <span>Nazwa wzoru</span>
        <input type='text' value={themeName} onChange={(e) => setThemeName(e.target.value)} />
        {percentageProgress}
        <div className='btn-container w-100 h-50'>
          <div className='w-100 d-flex justify-content-end align-items-end'>
          <button className='btn' onClick={setIsOpen}>Anuluj</button>
          <button className='btn' onClick={handleAddDoc}>Zapisz</button>
          </div>
      </div>
      </div>
    </div>
  )
}
