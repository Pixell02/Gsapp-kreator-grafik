import React, { useContext } from 'react'
import TeamContext from '../context/teamContext'

const useTeamContext = () => {
  
  const context = useContext(TeamContext)
  if (!context) {
    throw Error("TeamContext")
  }
  
  
  return context
}

export default useTeamContext
