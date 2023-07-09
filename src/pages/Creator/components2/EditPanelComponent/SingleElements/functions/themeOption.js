import React from 'react'


const findThemeOption = (coords, themeOption, text) => {
  
  coords.themeOption.forEach((theme, i) => {
    if ((theme.color === themeOption.label) || (theme.label === themeOption.label)) {
      
      text.set({
        fill: theme.Fill
      })
    }
  })
  
}


export default findThemeOption