import React from 'react'
import ItemContainer from '../../../components/main-content-elements/ItemContainer'
import Title from '../../../components/main-content-elements/Title'
import { useCollection } from '../../../hooks/useCollection'
import "./MainYourCatalog.css";
export default function MainYourCatalog() {

    let favorite = [];

  return (
    <div className='main-content'>
      <Title title="Twój katalog" />
      <div className='ml-5' >
      <ItemContainer>
        {favorite.length != 0 ?
         favorite.map((favorite) => (
            <p>cos</p>
         ))
         : <p style={{color: "gray", fontSize:"15px"}}>Brak zawartości</p>}
      </ItemContainer>
      </div>
    </div>
  )
}
