import { useEffect } from 'react';
import useTextLayer from './hooks/useTextLayer';

const TextLineInput = ({ coords, name, fabricRef, defaultValue }) => {
  const { textValue, setTextValue } = useTextLayer(fabricRef, coords, name);

  useEffect(() => {
    setTextValue(defaultValue);
  }, [defaultValue, setTextValue]);

  return (
    <div>
      <label>{name}</label>
      <input
        type="text"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      />
    </div>
  );
};

export default TextLineInput;
