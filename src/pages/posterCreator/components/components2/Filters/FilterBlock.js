import React from 'react'

const FilterBlock = ({filters, handleFiltersChange, handleValuesChange, className, name}) => {
  return (
    <div className="d-flex flex-column mt-2">
        <div className="w-100">
          <label>
            <input
              type="checkbox"
              className={className}
              checked={filters[className]}
              onChange={(e) => handleFiltersChange(e.target.className)}
            />{" "}
          <span>{name}</span>
          </label>
      </div>
      {filters[className] && (
        <div>
          <input
            step={1}
            type="range"
            className={className}
            onChange={(e) => handleValuesChange(e.target.className, e.target.value)}
          />
          <span>{filters[className]?.value}</span>
        </div>
      )}
        
      </div>
  )
}

export default FilterBlock
