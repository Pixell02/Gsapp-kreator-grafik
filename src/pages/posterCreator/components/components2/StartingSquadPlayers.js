import React from 'react'

export default function StartingSquadPlayers({coords}) {
  return (
    <div>
       <div>Nazwa obiektu : {coords.className}</div>
      <div>X: {coords.x}</div>
      <div>Y: {coords.y}</div>
      <div>szerokość: {(coords.Width * coords.scaleX).toFixed(2)}</div>
      <div>kolor czcionki: {coords.Fill}</div>
      <div>czcionka: {coords.FontFamily}</div>
      <div>rozmiar czcionki : {coords.FontSize}</div>
      <div>punkt odniesienia X : {coords.OriginX} </div>
      <div>punkt odniesienia Y : {coords.OriginY} </div>
    </div>
  )
}
