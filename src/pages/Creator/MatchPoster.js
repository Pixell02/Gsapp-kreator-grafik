
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useParams } from "react-router-dom";
import useFabricCanvas from "./hooks/useFabricCanvas.js";
import FontFaceObserver from "fontfaceobserver";
import useTeamName from "./hooks/useTeamName.js";
import useText from "./hooks/useText.js";
import useOpponentName from "./hooks/useOpponentName.js";
import { opponentResult } from "./hooks/opponentResult.js";
import { yourResult } from "./hooks/yourTeamResult.js";
import opponentGoals from "./hooks/opponentGoals.js";
import yourTeamGoals from "./hooks/useYourTeamGoal.js";
import additionalText from "./hooks/additionalText.js";

function MatchPoster(props) {
  
  const { poster } = useParams();
  
  const [yourTeamLogo, setYourTeamLogo] = useState(props.yourLogo);
  const fabricRef = useRef();
  const {initFabric, initFabricScale} = useFabricCanvas(fabricRef, props);
  const {teamLogo, secondTeamLogo, teamName} = useTeamName(fabricRef, props);
  const {opponentsName, opponentLogo} = useOpponentName(fabricRef);
  const { typePlace, yourKolejka, typeDate, yourLeague } = useText(fabricRef, props)
  const [width, setWidth] = useState()
  const [height, setHeight] = useState();
  console.log(fabricRef)
  
  useEffect(() => {
    const img = new Image();
    img.src = props.posterBackGround;
    setWidth(img.width)
    setHeight(img.height);
  },[props.posterBackGround])
  useEffect(() => {
    opponentGoals(fabricRef, props);
  },[props.opponentGoal, props.opponentGoalMinute, props.radioChecked, props.themeOption,props.posterBackGround])

  useEffect(() => {
    
    yourTeamGoals(fabricRef, props)
  },[props.yourTeamGoal, props.yourTeamGoalMinute, props.radioChecked, props.themeOption, props.posterBackGround])

  useEffect(() => {
    
    additionalText(fabricRef, props)
  },[fabricRef, props])
 
  
  useEffect(() => {
    yourKolejka();
  },[props.posterBackGround, props.themeOption, props.kolejka])
    

 
  useEffect(() => {
    yourLeague();
  }, [props.league, props.themeOption, props.posterBackGround]);

 
  useEffect(() => {
    
      if (props.coords.type !== "scalable") {
        initFabric();
      } else {
        initFabricScale();
      }
   
  }, [props.posterBackGround, props.coords]);
  
 

  useEffect(() => {
    
    teamLogo();
     teamName(props.yourLogo, poster);
  }, [props.radioChecked, props.themeOption, props.yourTeamImage, props.posterBackGround]);
  
  useEffect(() => {
    secondTeamLogo(props.yourTeamImage);
  }, [props.posterBackGround, props.yourLogo]);

  useEffect(() => {
    opponentLogo(props);
  }, [
    props.radioChecked,
    props.themeOption,
    props.opponent,
    props.posterBackGround,
  ]);

  useEffect(() => {
    opponentsName(props, poster);
  }, [
    props.radioChecked,
    props.themeOption,
    props.opponentName,
    props.posterBackGround,
  ]);
  useEffect(() => {
  typeDate();
},[props.posterBackGround, props.radioChecked, props.date])
  
useEffect(() => {
  typePlace();
},[props.posterBackGround, props.radioChecked, props.place])
  
 useEffect(() => {
  yourResult(fabricRef, props);
  opponentResult(fabricRef, props);
 },[props.posterBackGround, props.radioChecked, props.yourTeamResult, props.yourOpponentResult])
  

  return (
    <>
      <canvas
        id="canvas"
        className="resposive-canvas"
        crossOrigin="anonymous"
        ref={props.fabricRef}
        width={width}
        height={height}
      />
    </>
  );
}

export default MatchPoster;
