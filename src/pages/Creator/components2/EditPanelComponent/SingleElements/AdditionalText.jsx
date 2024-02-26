import { useEffect } from "react";
import useTextboxLayer from "../../../hooks/useTextboxLayer";

export default function AdditionalText({ fabricRef, coords }) {
  const { textValue, setTextValue } = useTextboxLayer(coords, fabricRef);

  useEffect(() => {
    if (!coords.text) return;
    setTextValue(coords.text);
  }, [coords]);

  return <textarea value={textValue} onChange={(e) => setTextValue(e.target.value)} />;
}
