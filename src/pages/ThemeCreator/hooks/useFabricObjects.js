import React, { useEffect, useState } from 'react'

const useFabricObjects = (fabricRef) => {

  const [objects, setObjects] = useState(null)

  useEffect(() => {
    console.log(fabricRef)
if(fabricRef.current?._objects) setObjects(fabricRef.current.getObjects())

  },[fabricRef.current?._objects, setObjects])

  return {objects}
}

export default useFabricObjects
