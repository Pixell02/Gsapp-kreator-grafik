import { useRef ,useState, useEffect } from 'react'
import '../../YourTeamPanel/components/addTeamWindow.css'
import bin from '../../../img/binIcon.png'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useParams } from 'react-router-dom'



function AddOpponentWindow({open, onClose})  {

  const { id } = useParams()
  
  const [firstOpponentName, setFirstOpponentName] = useState('')
  const [secondOpponentName, setSecondOpponentName] = useState('')
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
      if(Math.round(image.size/1024) < 1000) {
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
    if(!firstOpponentName || !secondOpponentName) {
      alert("puste pole")
    }  else if (!preview) {
      alert("brak obrazu")
    } else {
      await addDoc(collection(db, 'Opponents'), {
        firstName: firstOpponentName,
        secondName: secondOpponentName,
        img: preview,
        uid: user.uid
      })
      onClose(true)
      setFirstOpponentName('')
      setSecondOpponentName('')
      setImage(null)
    }
  }
    return (
      <div className={open ? "active-modal" : "modal"} >
        <div className='add-window' >
          
            <label >Pierwsza część nazwy przeciwnika</label>
            <input type='text' onChange={(e) => setFirstOpponentName(e.target.value)} value={firstOpponentName} className = 'firstOpponentName' required/>
            <label >Druga część nazwy przeciwnika</label>
            <input type='text' onChange={(e) => setSecondOpponentName(e.target.value)} value={secondOpponentName} className = 'secondOpponentName' required/>
            <button 
              onClick={onButtonClick}
              className='btn primary-btn add-img'
              >
                Dodaj Logo
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
               {preview && <img src={preview} className="image"  />}
              </div>
              <div className='bin-container'>
               {preview && <img src={bin} onClick= {() => setPreview(null)} />}
              </div>
            </div>
            <div className='buttons-container'>
              <button onClick={() => {
                onClose()
                setFirstOpponentName('')
                setSecondOpponentName('')
                setImage(null)
              }
                } className='btn primary-btn'>Anuluj</button>
              <button onClick={handleSubmit} className='btn primary-btn'>Zapisz</button>
            </div>
          
        </div>
      </div>
    )
}

export default AddOpponentWindow;