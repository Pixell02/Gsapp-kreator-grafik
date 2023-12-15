import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../firebase/config';
import { BackgroundContext } from '../Context/BackgroundContext';
import { GlobalPropertiesContext } from '../Context/GlobalProperitesContext';
import { ManyBackgroundsContext } from '../Context/ManyBackgroundsContext';
import './SaveModal.css';
import Users from './Users';
import useSearchTeam from './hooks/useSearchTeam';
import { useLanguageContext } from '../../../context/LanguageContext';

export default function SaveModal({ isOpen, setIsOpen }) {
  const { language } = useLanguageContext();
  const navigate = useNavigate();
  const [id] = useState(uuidv4().replace(/-/g, ''));

  const [percentageProgress, setPercentageProgress] = useState();
  const [query, setQuery] = useState('');
  const [users, loading, error] = useSearchTeam(query);
  const { background, image } = useContext(BackgroundContext);

  const { manyBackgrounds } = useContext(ManyBackgroundsContext);
  const [radioValue, setRadioValue] = useState('');
  const [userPoster, setUserPoster] = useState({
    type: 'MATCH-POSTER',
  });
  const { globalProperties, setGlobalProperties } = useContext(GlobalPropertiesContext);
  useEffect(() => {
    setUserPoster(prevState => ({
      ...prevState,
      src: image,
      uuid: id,
      uid: radioValue,
    }));
    setGlobalProperties(prevState => ({
      ...prevState,
      uid: id,
    }));
  }, [background, id, radioValue, image]);

  const handleQueryChange = e => {
    setQuery(e.target.value);
  };

  const handleAddDoc = async () => {
    if (manyBackgrounds) {
      manyBackgrounds.forEach((background, i) => {
        const storage = getStorage();
        const metadata = {
          contentType: 'image/jpeg',
        };
        const player = ref(storage, `${userPoster.uid}/posters/${globalProperties.uid + i + 2}`);

        const uploadTask = uploadBytesResumable(player, background.file, metadata);

        uploadTask.on(
          'state_changed',
          snapshot => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setPercentageProgress('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('dodawanie...');
                break;
              default:
                console.log('default');
            }
          },
          error => {
            console.log(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              addDoc(collection(db, 'yourCatalog'), {
                color: background.color,
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
        contentType: 'image/jpeg',
      };
      const player = ref(storage, `${userPoster.uid}/posters/${userPoster.uuid}`);

      const uploadTask = uploadBytesResumable(player, image.file, metadata);

      uploadTask.on(
        'state_changed',
        snapshot => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentageProgress(progress.toFixed(0));
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              console.log('default');
          }
        },
        error => {
          console.log(error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref)
            .then(downloadURL => {
              if (image.additionalLayer) {
                const storage = getStorage();
                const metadata = {
                  contentType: 'image/jpeg',
                };
                const player = ref(
                  storage,
                  `${userPoster.uid}/posters/${globalProperties.uid}/${globalProperties.uid}`
                );

                const uploadTask = uploadBytesResumable(player, image.additionalLayer, metadata);

                uploadTask.on(
                  'state_changed',
                  snapshot => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setPercentageProgress('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                      case 'paused':
                        console.log('Upload is paused');
                        break;
                      case 'running':
                        console.log('dodawanie...');
                        break;
                      default:
                        console.log('default');
                    }
                  },
                  error => {
                    console.log(error);
                  },
                  async () => {
                    await getDownloadURL(uploadTask.snapshot.ref).then(additionalURL => {
                      setDoc(doc(collection(db, 'yourCatalog'), id), {
                        color: image.color,
                        name: userPoster.name,
                        src: downloadURL,
                        additionalLayer: additionalURL,
                        uid: userPoster.uid,
                        uuid: userPoster.uuid,
                      });
                    });
                  }
                );
              } else {
                setDoc(doc(collection(db, 'yourCatalog'), id), {
                  color: image.color,
                  name: userPoster.name,
                  src: downloadURL,
                  uid: userPoster.uid,
                  uuid: userPoster.uuid,
                });
              }

              setDoc(doc(collection(db, 'coords'), id), globalProperties ? globalProperties : { uid: id });
            })
            .then(() => {
              setTimeout(() => {
                navigate(`/${language}/creator/${userPoster.uuid}`);
              }, 500);
            });
        }
      );
    }
  };

  return (
    <div className={isOpen ? 'modal' : 'closed-modal'}>
      <div className="modal-window rounded">
        <div className="p-3  d-flex flex-column h-100 w-100">
          <p>Dodaj grafikę</p>
          <label>Znajdź drużynę</label>
          <input
            type="text"
            value={query}
            onChange={e => handleQueryChange(e)}
          />
          <div className="d-flex w-100 border h-100 overflow-auto">
            {loading && <div>Loading...</div>}
            {error && <div>{error.message}</div>}
            <Users
              users={users}
              radioValue={radioValue}
              setRadioValue={setRadioValue}
            />
          </div>
          <label>Nazwa wzoru</label>
          <input
            type="text"
            onChange={e =>
              setUserPoster(prevState => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
          {percentageProgress}
          <div className="btn-container justify-content-end h-100 align-items-end mb-3">
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-primary">
              Anuluj
            </button>
            <button
              onClick={handleAddDoc}
              className="btn btn-primary">
              Zapisz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
