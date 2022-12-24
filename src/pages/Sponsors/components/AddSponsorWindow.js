import { useRef ,useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import '../../YourTeams/components/addTeamWindow.css'
import bin from '../../../img/binIcon.png'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import { useAuthContext } from '../../../hooks/useAuthContext'



function AddSponsorWindow({open, onClose})  {
  
  const { id } = useParams();
  const [sponsorName, setSponsorName] = useState('')
  const [number, setNumber] = useState(null)
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
    if(!sponsorName || !number) {
      alert("puste pole");
    } else if (!preview) {
      alert("brak zdjecia");
    } else {
      await addDoc(collection(db, 'Sponsors'), {
        firstName: sponsorName,
        number: number,
        img: preview,
        uid: id
      })
      onClose(true)
      setSponsorName('')
      setNumber('')
      setImage(null)
    }
      
  }
    return (
      <div className={open ? "active-modal" : "modal"} >
        <div className='add-window' >
          
            <label for = "firstPlayerName">Nazwa sponsora</label>
            <input type='text' onChange={(e) => setSponsorName(e.target.value)} value={sponsorName} className = 'firstPlayerName' />
            <label for = "Number">Który z kolei ma się pokazywać</label>
            <input type='number' onChange={(e) => setNumber(e.target.value)} value={number} className = 'Number' />
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
            {preview && <img src={preview} className = "image" />}
              </div>
              <div className='bin-container'>
               {preview && <img src={bin} onClick= {() => setPreview(null)}/>}
              </div>
            </div>
            <div className='buttons-container'>
              <button onClick={() => {
                onClose()
                setSponsorName('')
                setNumber('')
                setImage(null)
              }
                } className='btn primary-btn'>Anuluj</button>
              <button onClick={handleSubmit} className='btn primary-btn'>Zapisz</button>
            </div>
          
        </div>
      </div>
    )
}

export default AddSponsorWindow;