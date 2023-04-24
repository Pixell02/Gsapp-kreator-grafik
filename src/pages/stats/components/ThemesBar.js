import React from 'react'
import Select from 'react-select'
import { langOptions, sportOptions } from '../../../components/options'

export default function ThemesBar({handleLangChange, handleSportChange }) {
  return (
    <div className="w-100">
      <div className="d-flex flex-row">
      <div>
        <label>
          {" "}
          wybierz sport
          <Select options={sportOptions} defaultInputValue='football' onChange={handleSportChange} />
        </label>
      </div>
      <div className="ml-5">
        <label>
          {" "}
          wybierz język
          <Select options={langOptions} defaultInputValue='pl'  onChange={handleLangChange} />
        </label>
      </div>
      </div>
    </div>
  )
}
