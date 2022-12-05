import { useRef ,useState, useEffect } from 'react'
import './addTeamWindow.css'
import bin from '../../img/binIcon.png'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'



function AddPlayerWindow({open, onClose})  {
  
  const [firstPlayerName, setFirstPlayerName] = useState('')
  const [secondPlayerName, setSecondPlayerName] = useState('')
  const [number, setNumber] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const { user } = useAuthContext()
  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    fileInputRef.current.click();
  }
  
  useEffect (() => {
    if(image) {
      if(Math.round(image.size/1024) < 150) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        }
       reader.readAsDataURL(image); 
      } else {
        setPreview(null)
        alert("maksymalna wielkość obrazu to 150KB")
      }
    } else {
      setPreview(null)
    }
  }, [image])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
      await addDoc(collection(db, 'Players'), {
        firstPlayerName: firstPlayerName,
        secondPlayerName: secondPlayerName,
        logo: preview,
        uid: user.uid
      })
      onClose(true)
      setFirstPlayerName('')
      setSecondPlayerName('')
      setImage(null)
  }
    return (
      <div className={open ? "active-modal" : "modal"} >
        <div className='add-window' >
          
            <label for = "firstPlayerName">Imię</label>
            <input type='text' onChange={(e) => setFirstPlayerName(e.target.value)} value={firstPlayerName} className = 'firstPlayerName' required/>
            <label for = "firstPlayerName">Nazwisko</label>
            <input type='text' onChange={(e) => setSecondPlayerName(e.target.value)} value={secondPlayerName} className = 'secondPlayerName' required/>
            <label for = "Number">Numer zawodnika</label>
            <input type='number' onChange={(e) => setNumber(e.target.value)} value={number} className = 'Number' required/>
            <button 
              onClick={onButtonClick}
              className='btn primary-btn add-img'
              >
                Dodaj Zdjęcie
              </button>
            <input type="file"
             style={{display:"none"}}
               ref={fileInputRef}
               accept="image/png"
               onChange={(e) => {
                const file = e.target.files[0];
                if(file) {
                  setImage(file);
                } else {
                  setImage(null);
                }
               }}
               />
            <div className='add-logo-window'>
              <div className='image-container'>
               {preview && <img src={preview} />}
              </div>
              <div className='bin-container'>
               {preview && <img src={bin} />}
              </div>
            </div>
            <div className='buttons-container'>
              <button onClick={() => {
                onClose()
                firstPlayerName('')
                secondPlayerName('')
                image(null)
              }
                } className='btn primary-btn'>Anuluj</button>
              <button onClick={handleSubmit} className='btn primary-btn'>Zapisz</button>
            </div>
          
        </div>
      </div>
    )
}

export default AddPlayerWindow;