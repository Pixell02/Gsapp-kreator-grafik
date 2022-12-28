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

function WorkSpace() {
  const { id } = useParams();
  const { poster } = useParams();
  const { user } = useAuthContext();

  const exportImg = () => {
    const image = document.querySelector(".canvas-container")
    html2canvas(image, {
      scale: 2
    })
    .then((canvas) => {
      console.log(canvas.width)
      const link = document.createElement("a");
      
      link.download = "image.png"
      link.href = canvas.toDataURL();
      link.click();
    });
  }

  const { documents: Players } = useCollection("Players", ["uid", "==", id]);

  const { documents: Sponsors } = useCollection("Sponsors", [
    "uid",
    "==",
    id
  ]); 

  const { documents: Opponent } = useCollection("Opponents", ["uid", "==", id]);
  let options;
  if (Opponent) {
    options = Opponent.map((opponent) => ({
      value: opponent.img,
      label: opponent.firstName + " " + opponent.secondName,
    }));
  }
  const [opponent, setOpponent] = useState();
  const [opponentName, setOpponentName] = useState();
  const [yourLogo, setYourLogo] = useState([]);
  useEffect(() => {
    const addYourLogo = async () => {
    const docRef = doc(db, "Teams", id)
    await getDoc(docRef)
     .then((doc) => {
      const result = doc.data();
      setYourLogo(result)
     })
  }
  addYourLogo()
  },[])
  
  const { documents: Posters } = useCollection("piecesOfPoster", [
    "uid",
    "==",
    poster,
  ]);

  const setOpponentLogo = (option) => {
    
    setOpponent(option.value);
    setOpponentName(option.label);
  };

  const [typeDate, setTypeDate] = useState('');

  const date = (e) => {
    setTypeDate(e.target.value)
    console.log(typeDate)
  }

  return (
    <div className="workspace-container">
      <div className="preview-container">
        { Posters   &&  <FabricCanvas poster={Posters} opponent={opponent} yourLogo={yourLogo} date={typeDate} opponentName={opponentName} Sponsors={Sponsors} />}
      </div>
      <div className="tools-container">
        <div className="ms-5 me-5 mt-3">
          <label>Data i miejsce</label>
          <input type="text" onChange={date}/>
          <label>Przeciwnicy</label>
          {Opponent && <Select options={options} onChange={setOpponentLogo} />}
          <button className="btn primary-btn save" onClick={() => exportImg()}>Zapisz</button>
        </div>
      </div>
    </div>
  );
}

export default WorkSpace;
