import "./WorkSpace.css";
import PlayersOption from "./PlayersList";
import { useCollection } from "../../../hooks/useCollection";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import html2canvas from "html2canvas";
import Select from "react-select";
import FabricCanvas from "./Canvas";
import background from '../../../img/back.png'

function WorkSpace() {
  const { poster } = useParams();
  const { user } = useAuthContext();

  const exportImg = () => {
    const image = document.querySelector(".canvas-container")
    html2canvas(image, {
      scale: 2
    })
    .then((canvas) => {
      const link = document.createElement("a");
      
      link.download = "image.jpg"
      link.href = canvas.toDataURL();
      link.click();
    });
  }

  
  const {documents: Logo} = useCollection("Teams", ["uid", "==", user.uid]);
  
  const { documents: Opponent } = useCollection("Opponents", ["uid", "==", user.uid]);
  
  let options;
  if (Opponent) {
    options = Opponent.map((opponent) => ({
      value: opponent.img,
      label: opponent.firstName + " " + opponent.secondName,
    }));
  }
  const [opponent, setOpponent] = useState();
  const [opponentName, setOpponentName] = useState();
  
  const [posters, setPosters] = useState();

  useEffect(() => {
    const addBackground = () => {
      
      const docRef = doc(db, "piecesOfPoster", poster)
      getDoc(docRef)
       .then((doc) => {
        const result = doc.data();
        
        setPosters(result)
       })
    }
    addBackground();
  },[])

const [yourLogo, setYourLogo] = useState();
 


  const setOpponentLogo = (option) => {
    
    setOpponent(option.value);
    setOpponentName(option.label);
  };

  const [typeDate, setTypeDate] = useState('');
 
  const date = (e) => {
    setTypeDate(e.target.value)
    }

    
  return (
    <div className="workspace-container">
      <div className="preview-container">
        { posters && Logo &&  <FabricCanvas poster={posters} opponent={opponent} yourLogo={Logo} date={typeDate} opponentName={opponentName} />}
      </div>
      <div className="tools-container">
        <div className="workspace-title">
        <span className="workspace-title-container">Kreator</span>
        </div>
        <div className="ms-5 me-5 mt-3">
          <label>Data i miejsce</label>
          <input type="text"  onChange={date} value={typeDate}  className="date-type"/>
          <label>Przeciwnicy</label>
          {Opponent && <Select options={options} onChange={setOpponentLogo} />}
          <button className="btn primary-btn save" onClick={() => exportImg()}>Zapisz</button>
          
        </div>
        <img src={background} />
      </div>
    </div>
  );
}

export default WorkSpace;
