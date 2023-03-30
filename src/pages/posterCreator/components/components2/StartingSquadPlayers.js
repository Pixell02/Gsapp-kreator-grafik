import React from 'react'

export default function StartingSquadPlayers({coords}) {
  return (
    <div>
       <div>Nazwa obiektu : {coords.className}</div>
      <div>X: {coords.x}</div>
      <div>Y: {coords.y}</div>
      <div>szerokość: {(coords.width * coords.scaleX).toFixed(2)}</div>
      <div>kolor czcionki: {coords.fill}</div>
      <div>czcionka: {coords.fontFamily}</div>
      <div>rozmiar czcionki : {coords.fontSize}</div>
      <div>punkt odniesienia X : {coords.originX} </div>
      <div>punkt odniesienia Y : {coords.originY} </div>
    </div>
  )
}
