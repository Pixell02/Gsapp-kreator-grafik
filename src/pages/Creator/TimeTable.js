import React, { useEffect, useRef, useState } from "react";
import hostLogo from "./hooks/TimeTable/hostLogo";
import hostName from "./hooks/TimeTable/hostName";
import manyDatas from "./hooks/TimeTable/manyDatas";
import opponentLogos from "./hooks/TimeTable/opponentLogos";
import opponentNames from "./hooks/TimeTable/opponentNames";
import selectedTeam from "./hooks/TimeTable/selectedTeam";
import teamLogos from "./hooks/TimeTable/teamLogos";
import typeMonth from "./hooks/TimeTable/typeMonth";
import yourTeamLogos from "./hooks/TimeTable/yourTeamLogos";
import useFabricCanvas from "./hooks/useFabricCanvas";
import useText from "./hooks/useText";
import useTimeTable from "./hooks2/useTimeTable";
import manyLeagues from "./hooks/TimeTable/manyLeagues";
import connectedText from "./hooks/TimeTable/connectedText";

export default function TimeTable(props) {
  const fabricRef = useRef();
  const { initFabric } = useFabricCanvas(fabricRef, props);
  const { loops } = useTimeTable(Array(4).fill({}));
  const { typePlace, yourKolejka, typeDate, yourLeague } = useText(fabricRef, props);
  
  const [width, setWidth] = useState()
  const [height, setHeight] = useState();

  useEffect(() => {
    const img = new Image();
    img.src = props.posterBackGround;
    setWidth(img.width)
    setHeight(img.height);
  },[props.posterBackGround])

  useEffect(() => {
    initFabric();
  }, [props.posterBackGround]);

  useEffect(() => {
    hostLogo(fabricRef, props, loops)
    hostName(fabricRef, props, loops)
  },[props.selectHostLogoValues, props.selectHostNameValues, props.selectNamesValues, props.selectLogoValues])

  useEffect(() => {
    
    if (props.coords.imageType === "withImage") {
     
      if (props.coords.type !== "yourLogo") {
        
        teamLogos(fabricRef, props, loops);
      } else {
        
        yourTeamLogos(fabricRef, props, loops)
      }
    }
  }, [props.yourLogo, props.posterBackGround, props.radioValues, props.selectValues, props.yourTeamImage, props.selectNamesValues
  ]);
 
  useEffect(() => {
    selectedTeam(fabricRef, props, loops);
  },[props.selectTeamValue, props.posterBackGround])
  useEffect(() => {
    yourLeague();
  }, [props.league]);

  useEffect(() => {
    manyLeagues(fabricRef, props, loops)
  }, [props.yourLeagueOne, props.manyLeaguesValues])
  
  useEffect(() => {
    connectedText(fabricRef, props, loops)
  },[props.selectHostNameValues,props.selectNamesValues, props.radioValues])
  
  useEffect(() => {
    opponentNames(fabricRef, props, loops);
    opponentLogos(fabricRef, props, loops)
  }, [props.selectHostLogoValues, props.selectHostNameValues,props.selectNamesValues, props.selectLogoValues, props.radioValues, loops, props.posterBackGround]);
  useEffect(() => {
    manyDatas(fabricRef, props, loops);
  }, [props.textInputValues, props.posterBackGround]);

  useEffect(() => {
    typeMonth(fabricRef, props);
  }, [props.month, props.psoterBackGround]);

  return <canvas id="canvas" ref={fabricRef} />;
}
