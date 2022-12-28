import { useRef ,useState, useEffect } from 'react'
import './addTeamWindow.css'
import bin from '../../../img/binIcon.png'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import { useAuthContext } from '../../../hooks/useAuthContext'



function AddTeamWindow({open, onClose})  {
  
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
        setPreview(null)
        alert("maksymalna wielkość obrazu to 150KB")
      }
    } else {
      setPreview(null)
    }
  }, [image])
  
  const handleSubmit = (e) => {
      e.preventDefault();
      if(!firstTeamName || !secondTeamName) {
        return alert('puste pole')
      } else if (!preview){
        return alert('brak obrazu')
      } else {
      addDoc(collection(db, 'Teams'), {
        firstName: firstTeamName,
        secondName: secondTeamName,
        img: preview,
        uid: user.uid
      })
      onClose(true)
      setFirstTeamName('')
      setSecondTeamName('')
      setImage(null)
      }
  }


    return (
      <div className={open ? "active-modal" : "modal"} >
        <div className='add-window' >
          {/* <form onSubmit={handleSubmit}> */}
            <label >Pierwsza część nazwy drużyny</label>
            <input type='text' onChange={(e) => setFirstTeamName(e.target.value)} value={firstTeamName} className = 'firstTeamName' required/>
            <label >Druga część nazwy drużyny</label>
            <input type='text' onChange={(e) => setSecondTeamName(e.target.value)} value={secondTeamName} className = 'secondTeamName' required/>
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
                  setImage(file);
                } else {
                  setImage(null);
                }
               }}
               />
            <div className='add-logo-window'>
              <div className='image-container'>
               {preview && <img src={preview} className="image" />}
              </div>
              <div className='bin-container'>
               {preview && <img src={bin} onClick= {() => setPreview(null)} />}
              </div>
            </div>
            <div className='buttons-container'>
              <button onClick={() => {
                onClose()
                setFirstTeamName('')
                setSecondTeamName('')
                setImage(null)
              }
                } className='btn primary-btn'>Anuluj</button>
              <button onClick={handleSubmit} className='btn primary-btn'>Zapisz</button>
            </div>
          {/* </form> */}
        </div>
      </div>
    )
}

export default AddTeamWindow