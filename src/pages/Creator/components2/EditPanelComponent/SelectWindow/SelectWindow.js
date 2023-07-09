import React from 'react'
import StartingPlayers from './components/StartingPlayers'
import ReservePlayers from './components/ReservePlayers'


const SelectWindow = ({ isModalOpen, setIsModalOpen, fabricRef, coords, themeOption }) => {
  console.log(themeOption)
  return (
    <div>
      {isModalOpen.id === 1 && (
        <StartingPlayers fabricRef={fabricRef} coords={coords} themeOption={themeOption} />
      )}
      {isModalOpen.id === 2 && (
        <ReservePlayers  fabricRef={fabricRef} coords={coords} themeOption={themeOption} />
      )}
      <button className='w-100 btn mt-5' onClick={() => setIsModalOpen({id: null, open: false})}>
        Zamknij
      </button>
    </div>
  )
}

export default SelectWindow
