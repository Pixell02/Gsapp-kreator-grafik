import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import FontFaceObserver from "fontfaceobserver";
import useFabricCanvas from "./hooks/useFabricCanvas.js";
import usePlayerName from "./hooks/usePlayerName";
import useReserve from "./hooks/useReserve";
import useTeamName from "./hooks/useTeamName";
import useOpponentName from "./hooks/useOpponentName";
import useText from "./hooks/useText";

function StartingSquad(props) {
  const { poster } = useParams();
  const [yourTeamLogo, setYourTeamLogo] = useState(props.yourLogo);
  const [yourTeamImg, setYourTeamImg] = useState(props.yourTeamImage);
  const fabricRef = useRef();
  const { initFabric } = useFabricCanvas(fabricRef, props);
  const { squadPlayer } = usePlayerName(fabricRef, props);
  const { showReserve } = useReserve(fabricRef, props);
  const { teamLogo, secondTeamLogo, teamName } = useTeamName(fabricRef, props);
  const { opponentsName, opponentLogo } = useOpponentName(fabricRef);
  const { typePlace, yourKolejka, typeDate, yourLeague } = useText(
    fabricRef,
    props
  );
  const [width, setWidth] = useState()
  const [height, setHeight] = useState();

  useEffect(() => {
    const img = new Image();
    img.src = props.posterBackGround;
    setWidth(img.width)
    setHeight(img.height);
  },[props.posterBackGround])
  useEffect(() => {
    squadPlayer(props);
  }, [
    props.players,
    props.posterBackGround,
    props.themeOption,
    props.goalKeeper,
    props.capitan,
  ]);
  useEffect(() => {
    showReserve(props);
  }, [props.reserve, props.themeOption]);

  useEffect(() => {
    yourLeague();
  }, [props.league, props.themeOption, props.posterBackGround]);

  useEffect(() => {
    yourKolejka();
  }, [props.kolejka, props.posterBackGround, props.themeOption]);

  useEffect(() => {
    typePlace();
  }, [props.place, props.posterBackGround, props.themeOption]);

  useEffect(() => {
    initFabric();
  }, [props.posterBackGround]);


  useEffect(() => {
    teamLogo();
    teamName(props.yourLogo, poster);
  }, [props.themeOption, props.posterBackGround, props.radioChecked, props.yourTeamImage]);

  useEffect(() => {
    opponentLogo(props);
    opponentsName(props);
  }, [
    props.radioChecked,
    props.themeOption,
    props.posterBackGround,
    props.opponent,
  ]);

  useEffect(() => {
    typeDate();
  }, [props.date, props.posterBackGround, props.themeOption]);

  return <canvas id="canvas" ref={fabricRef} width={width} height={height} />;
}

export default StartingSquad;
