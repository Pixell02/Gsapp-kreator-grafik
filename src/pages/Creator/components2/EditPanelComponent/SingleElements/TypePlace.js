import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import typePlace from './typePlace/typePlace';

export default function TypePlace({ fabricRef, coords, themeOption, posterBackground }) {
  const [place, setPlace] = useState("");
 
  useEffect(() => {
    if (fabricRef.current?.backgroundImage && place !== "") {
      
      typePlace(fabricRef, coords, place, themeOption)
    }
  }, [fabricRef.current, place, posterBackground]);

 
  return (
    <div>
      <label>Miejsce</label>
      <input type="text" value={place} onChange={e => setPlace(e.target.value)} />
    </div>
  )
}
