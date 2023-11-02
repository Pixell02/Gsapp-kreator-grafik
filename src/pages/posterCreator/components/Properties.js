import React from "react";
import { ImageFiltersProvider } from "../Context/ImageFiltersContext";
import ImageFilterProperties from "./components2/ImageFilterProperties";
import ImageProperties from "./components2/ImageProperties";
import PlayerImageProperties from "./components2/PlayerImageProperties";
import PlayerNameProperties from "./components2/PlayerNameProperties";
import TextBoxUniversalProperties from "./components2/TextBoxUniversalProperties";
import TextProperties from "./components2/TextProperties";
import TextUniversalProperties from "./components2/TextUniversalProperties";
import TextboxProperties from "./components2/TextboxProperties";
import useGlobalPropertiesContext from "./hooks/useGlobalPropertiesContext";

export default function Properties({ fabricRef }) {
  const { globalProperties } = useGlobalPropertiesContext();
  console.log(globalProperties);
  return (
    <div className="overflow-scroll d-flex h-100">
      <ImageFiltersProvider>
        <ImageProperties fabricRef={fabricRef} />
        <ImageFilterProperties fabricRef={fabricRef} />
        <TextProperties fabricRef={fabricRef} />
        <TextboxProperties fabricRef={fabricRef} />
        <PlayerNameProperties fabricRef={fabricRef} />
        <TextUniversalProperties fabricRef={fabricRef} />
        <TextBoxUniversalProperties fabricRef={fabricRef} />
        <PlayerImageProperties fabricRef={fabricRef} />
      </ImageFiltersProvider>
    </div>
  );
}
