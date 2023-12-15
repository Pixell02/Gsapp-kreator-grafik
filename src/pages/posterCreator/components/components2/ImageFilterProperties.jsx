import React, { useState } from "react";
import useImageProperties from "../hooks/properties/useImageProperties";
import useImageFilters from "../hooks/useImageFilters";
import ColorBlock from "./Filters/ColorBlock";
import FilterBlock from "./Filters/FilterBlock";

const ImageFilterProperties = ({ fabricRef }) => {
  const { coords, handleInputChange } = useImageProperties(fabricRef);
  const { filters, handleCheckFilter, handleAlphaChange, handleValuesChange, handleModeChange } = useImageFilters(
    fabricRef,
    coords
  );
  const [elements] = useState([
    { className: "brightness", name: "jasność" },
    { className: "contrast", name: "kontraskt" },
    { className: "saturation", name: "nasycenie" },
  ]);
  return (
    <>
      {coords?.type === "FilteredImage" && (
        <div>
          <div>Nazwa obiektu : {coords.className}</div>
          <div className="d-flex">
            <div>
              X: <input type="number" value={coords.Left} className="w-50" name="Left" onChange={handleInputChange} />
            </div>
            <div>
              Y: <input type="number" value={coords.Top} className="w-50" name="Top" onChange={handleInputChange} />
            </div>
          </div>
          <div className="d-flex">
            <div>
              sz:
              <input type="number" value={coords.Width} className="w-50" name="Width" onChange={handleInputChange} />
            </div>
            <div>
              w: <input type="number" value={coords.Height} className="w-50" name="Height" onChange={handleInputChange} />
            </div>
          </div>
          <div className="d-flex w-50">
            <div>
              kąt: <input type="number" value={coords.Angle} className="w-50" name="Angle" onChange={handleInputChange} />
            </div>
          </div>
          <div className="d-flex flex-column mt-2">
            {elements.map((element) => (
              <FilterBlock
                filters={filters}
                handleFiltersChange={handleCheckFilter}
                handleValuesChange={handleValuesChange}
                className={element?.className}
                name={element?.name}
              />
            ))}
            <div className="d-flex flex-column mt-2">
              <ColorBlock
                filters={filters}
                handleFiltersChange={handleCheckFilter}
                handleValuesChange={handleValuesChange}
                className={"blendColor"}
                name={"mieszaj kolor"}
                mode={filters?.blendColor?.mode}
                handleModeChange={handleModeChange}
                handleAlphaChange={handleAlphaChange}
              />
            </div>
            <div className="d-flex flex-column mt-2">
              <label>
                <input
                  type="checkbox"
                  className="grayScale"
                  checked={filters?.grayScale}
                  onChange={(e) => handleCheckFilter(e.target.className, e.target.checked)}
                />{" "}
                <span>odcień szarości</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageFilterProperties;
