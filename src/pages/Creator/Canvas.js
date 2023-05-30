import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import useFabricCanvas from './hooks/useFabricCanvas';
import useTimeTable from './hooks2/useTimeTable';
import useText from './hooks/useText';
import hostLogo from './hooks/TimeTable/hostLogo';
import hostName from './hooks/TimeTable/hostName';
import teamLogos from './hooks/TimeTable/teamLogos';
import yourTeamLogos from './hooks/TimeTable/yourTeamLogos';
import selectedTeam from './hooks/TimeTable/selectedTeam';
import manyLeagues from './hooks/TimeTable/manyLeagues';
import connectedText from './hooks/TimeTable/connectedText';
import typeMonth from './hooks/TimeTable/typeMonth';
import manyDatas from './hooks/TimeTable/manyDatas';
import opponentLogos from './hooks/TimeTable/opponentLogos';
import opponentNames from './hooks/TimeTable/opponentNames';

import { opponentTeamResult, yourTeamResult } from './hooks/ResultTable/manyResults';
import connectedResults from './hooks/ResultTable/connectedResults';

function Canvas(props) {
  
  const [width, setWidth] = useState()
  const [height, setHeight] = useState();
  const {initFabric} = useFabricCanvas(props.fabricRef, props);
  const { loops } = useTimeTable(Array(4).fill({}));
  const { yourLeague } = useText(props.fabricRef, props);
  
  useEffect(() => {
    const img = new Image();
    img.src = props.posterBackGround;
    setWidth(img.width)
    setHeight(img.height);
    initFabric();
  }, [props.posterBackGround])
  
  useEffect(() => {
    
    hostLogo(props.fabricRef, props, loops)
    hostName(props.fabricRef, props, loops)
  },[props.selectHostLogoValues, props.selectHostNamesValues, props.selectNamesValues, props.selectLogoValues, loops, props.radioValues])
  
  useEffect(() => {
    
    if (props.coords.imageType === "withImage") {
     
      if (props.coords.type !== "yourLogo") {
        
        teamLogos(props.fabricRef, props, loops);
      } else {
       
        yourTeamLogos(props.fabricRef, props, loops)
      }
    }
  }, [props.yourLogo, props.posterBackGround, props.radioValues, props.selectValues, props.yourTeamImage, props.selectNamesValues
  ]);
 
  useEffect(() => {
    selectedTeam(props.fabricRef, props, loops);
  },[props.selectTeamValue, props.posterBackGround])
  useEffect(() => {
    yourLeague();
  }, [props.league]);

  useEffect(() => {
    manyLeagues(props.fabricRef, props, loops)
  }, [props.yourLeagueOne, props.manyLeaguesValues])
  
  useEffect(() => {
    connectedText(props.fabricRef, props, loops)
  },[props.selectHostNameValues,props.selectNamesValues, props.radioValues])
  
  useEffect(() => {
    opponentNames(props.fabricRef, props, loops);
    opponentLogos(props.fabricRef, props, loops)
  }, [props.selectHostLogoValues, props.selectHostNameValues,props.selectNamesValues, props.selectLogoValues, props.radioValues, loops, props.posterBackGround]);
  useEffect(() => {
    manyDatas(props.fabricRef, props, loops);
  }, [props.textInputValues, props.posterBackGround]);

  useEffect(() => {
    typeMonth(props.fabricRef, props);
  }, [props.month, props.posterBackGround]);

  useEffect(() => {
    if (props.coords.resultType !== "connected") {
      yourTeamResult(props.fabricRef, props, loops);
      opponentTeamResult(props.fabricRef, props, loops);
    } else {
      connectedResults(props.fabricRef, props, loops)
    }
  },[props.opponentTeamResultsValue, props.yourTeamResultsValue, props.radioValues, loops])


  return (
    <canvas
        id="canvas"
        className="resposive-canvas"
        crossOrigin="anonymous"
        ref={props.fabricRef}
        width={width}
        height={height}
      />
  )
}

export default Canvas
