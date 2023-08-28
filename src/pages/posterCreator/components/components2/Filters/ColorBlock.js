import React from 'react'

const ColorBlock = (props) => {
  const { filters, className, handleAlphaChange, handleFiltersChange, handleValuesChange, mode, name, handleModeChange } = props;
  
  const options = [
    { label: 'dodaj', value: 'add'},
    { label: 'pomnóż', value: 'multiply' },
    { label: 'odejmij', value: 'subtract'},
    { label: 'ekran', value: 'screen'},
    { label: 'rozjaśnienie', value: 'lighten'},
    { label: 'ciemniej', value: 'darken' },
    { label: 'overlay', value: 'overlay'},
    { label: 'wykluczenie', value: 'exclusion' },
    { label: 'odcień', value: 'tint'},
    { label: 'różnica', value: 'diff'},
  ]

  return (
    <div className="d-flex flex-column mt-2">
        <div className="w-100">
          <label>
            <input
              type="checkbox"
              className={className}
              checked={filters[className]}
              onChange={(e) => handleFiltersChange(e.target.className, e.target.checked)}
            />{" "}
          <span>{name}</span>
          </label>
      </div>
      {filters[className] && (
        <>
        <select className="form-control" value={mode} onChange={(e) => handleModeChange(e.target.value, "blendColor")}>
        {options.map(option => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
        <div className='mt-2 mb-2'>
          <input
            type="color"
            className={className}
            onChange={(e) => handleValuesChange(e.target.className, e.target.value)}
          />
          <span>{filters[className]?.value}</span>
      </div>
      <div>
          <input
            step={1}
            type="range"
            className={className}
            onChange={(e) => handleAlphaChange(e.target.className, e.target.value)}
          />
          <span>{filters[className]?.alpha}</span>
        </div>
        </>
      )}
      
      </div>
  )
}

export default ColorBlock
