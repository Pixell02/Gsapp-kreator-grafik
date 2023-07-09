import React from "react";


export default function StartingSquad({coords, setIsModalOpen}) {
 
  return (
    <div className="d-flex flex-column mt-5">
      {coords && coords.playerOne && (
        <button className="btn" onClick={() => setIsModalOpen({id: 1, open:true})}>
          Wyjściowa 11
        </button>
      )}
      {coords && coords.reserveOne && (
 
          <button className="btn mt-3" onClick={() => setIsModalOpen({id: 2, open:true})}>Dodaj Rezerwowych</button>        
      )}
      {/* {coords && (coords.reserveOne || coords.playerOne) && (
        <>
          <label>Bramkarz 1</label>

          <Select options={playerOptions} onChange={getGoalKeeper} />

          <label>Kapitan</label>

          <Select options={playerOptions} onChange={getCapitan} />
        </>
      )} */}
    </div>
  );
}
