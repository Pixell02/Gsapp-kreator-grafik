import React from 'react'

const useFilters = () => {

  const handleAddFilters = (coords) => {

    if (!coords.themeOption) {
      coords.filters = [];
    }
  }

  return {handleAddFilters}
}

export default useFilters
