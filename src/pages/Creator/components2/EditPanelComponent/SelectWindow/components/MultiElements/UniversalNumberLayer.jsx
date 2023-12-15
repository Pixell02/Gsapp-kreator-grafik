import useTextLayer from './hooks/useTextLayer';

const UniversalNumberLayer = ({ fabricRef, coords, properties, selectedMatch }) => {
  const { textValue, setTextValue } = useTextLayer(fabricRef, coords, properties, selectedMatch);

  return (
    <div className="d-flex w-100 flex-column">
      <span>{coords.className}</span>
      <input
        type="text"
        value={textValue}
        onChange={e => setTextValue(e.target.value)}
      />
    </div>
  );
};

export default UniversalNumberLayer;
