import React, { useEffect, useRef, useState } from 'react'
import { opponentTeamResult, yourTeamResult } from './hooks/ResultTable/manyResults';
import hostLogo from './hooks/TimeTable/hostLogo';
import hostName from './hooks/TimeTable/hostName';
import opponentLogos from './hooks/TimeTable/opponentLogos';
import opponentNames from './hooks/TimeTable/opponentNames';
import teamLogos from './hooks/TimeTable/teamLogos';
import useFabricCanvas from './hooks/useFabricCanvas';
import useText from './hooks/useText';
import useTimeTable from './hooks2/useTimeTable';

export default function ResultTable(props) {
  const fabricRef = useRef();
  const { initFabric } = useFabricCanvas(fabricRef, props)
  const { loops } = useTimeTable(Array(4).fill({}))
  const { typePlace, yourKolejka, typeDate, yourLeague } = useText(fabricRef, props)
  useEffect(() => {
    initFabric()
  }, [props.posterBackGround])
  
  const [width, setWidth] = useState()
  const [height, setHeight] = useState();

  useEffect(() => {
    const img = new Image();
    img.src = props.posterBackGround;
    setWidth(img.width)
    setHeight(img.height);
  },[props.posterBackGround])

  useEffect(() => {
    hostLogo(fabricRef, props, loops)
    hostName(fabricRef, props, loops)
  },[props.selectHostLogoValues, props.selectHostNameValues, props.selectNamesValues, props.selectLogoValues])

  useEffect(() => {
    teamLogos(fabricRef, props, loops);
  }, [props.yourLogo, props.radioValues, props.posterBackGround]);

  
  useEffect(() => {
    opponentNames(fabricRef, props, loops);
    opponentLogos(fabricRef, props, loops);
  }, [props.selectHostLogoValues, props.selectHostNameValues,props.selectNamesValues, props.selectLogoValues, props.radioValues, loops, props.posterBackGround]);

  useEffect(() => {
    yourTeamResult(fabricRef, props, loops);
    opponentTeamResult(fabricRef, props, loops);
  },[props.opponentTeamResultsValue, props.yourTeamResultsValue, props.radioValues])

  useEffect(() => {
    yourKolejka()
  },[props.kolejka])

  return <canvas id="canvas" className="resposive-canvas" width={width} height={height} ref={fabricRef}
/> 
}
