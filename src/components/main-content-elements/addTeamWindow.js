import { useRef ,useState, useEffect } from 'react'
import './addTeamWindow.css'
import bin from '../../img/binIcon.png'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'


function AddTeamWindow()  {
  const [firstTeamName, setFirstTeamName] = useState('')
  const [secondTeamName, setSecondTeamName] = useState('')
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
        setPreview(null);
        alert("maksymalna wielkość obrazu to 150KB")
      }
    } else {
      setPreview(null);
    }
  }, [image])
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, 'Teams'), {
      firstTeamName: firstTeamName,
      secondTeamName: secondTeamName,
      logo: preview,
      uid: user.uid
    })
  }

    return (
      <div className="overlay">
        <div className='add-window'>
          <form onSubmit={handleSubmit}>
            <label for = "firstTeamName">Pierwsza część nazwy drużyny</label>
            <input type='text' onChange={(e) => setFirstTeamName(e.target.value)} value={firstTeamName} className = 'firstTeamName' required />
            <label for = "firstTeamName">Druga część nazwy drużyny</label>
            <input type='text' onChange={(e) => setSecondTeamName(e.target.value)} value={secondTeamName} className = 'secondTeamName' required />
            <button 
              onClick={onButtonClick}
              className='btn primary-btn add-img'
              >
                Dodaj logo
              </button>
            <input type="file"
             style={{display:"none"}}
               ref={fileInputRef}
               accept="image/png"
               onChange={(e) => {
                const file = e.target.files[0];
                if(file) {
                  setImage(file );
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
              <button className='btn primary-btn'>Anuluj</button>
              <button className='btn primary-btn'>Zapisz</button>
            </div>
          </form>
        </div>
      </div>
    )
}

export default AddTeamWindow