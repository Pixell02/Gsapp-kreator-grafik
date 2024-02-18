import useSponsorProperties from "../hooks/properties/useSponsorProperties";

const SponsorProperties = ({ fabricRef }) => {
  const { coords, setCoords, handleInputChange } = useSponsorProperties(fabricRef);

  const handleVisibleChange = () => {
    const activeObject = fabricRef.current.getActiveObject();
    activeObject.set("fill", null);
    fabricRef.current.renderAll();
    setCoords((prev) => ({ ...prev, Fill: null }));
  };
  return (
    <>
      {coords?.type === "SponsorBlock" && (
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
              w:{" "}
              <input type="number" value={coords.Height} className="w-50" name="Height" onChange={handleInputChange} />
            </div>
          </div>
          <div className="d-flex w-100">
            kolor: <input type="color" value={coords.Fill} className="w-25" name="Fill" onChange={handleInputChange} />
          </div>
          <div className="d-flex w-100">
            <label>
              <input type="checkbox" checked={coords.Fill === null} onChange={handleVisibleChange} />
              <span>Przeźroczystość</span>
            </label>
          </div>
        </div>
      )}
    </>
  );
};

export default SponsorProperties;
