import React from "react";
import Results from "./MultiElements/Results";
import SelectLeagueTeams from "./MultiElements/SelectLeagueTeams";
import SelectTeams from "./MultiElements/SelectTeams";
import UniversalNumberLayer from "./MultiElements/UniversalNumberLayer";
import UniversalTextLayer from "./MultiElements/UniversalTextLayer";
import YourTeams from "./MultiElements/YourTeams";
import useProperties from "./MultiElements/hooks/useProperties";

const MultiElements = ({ fabricRef, coords, selectedMatch }) => {
  const { properties } = useProperties(coords);
  return (
    <div>
      <p>Mecz {selectedMatch}</p>
      {(coords.yourTeamLogoOne || coords.yourTeamNameOne) &&
        (!coords.yourOpponentNameOne || !coords.opponentImageOne) && (
          <YourTeams
            fabricRef={fabricRef}
            coords={coords}
            selectedMatch={selectedMatch}
          />
        )}
      {!coords.yourTeamLogoOne &&
        !coords.yourTeamNameOne &&
        (coords.yourOpponentNameOne || coords.opponentImageOne) && (
          <SelectLeagueTeams
            fabricRef={fabricRef}
            coords={coords}
            selectedMatch={selectedMatch}
          />
        )}
      {(coords.yourTeamLogoOne || coords.yourTeamNameOne) &&
        (coords.yourOpponentNameOne || coords.opponentImageOne) && (
          <SelectTeams
            fabricRef={fabricRef}
            coords={coords}
            selectedMatch={selectedMatch}
          />
        )}
      {coords.connectedTeams && (
        <SelectTeams
          fabricRef={fabricRef}
          coords={coords}
          selectedMatch={selectedMatch}
        />
      )}
      <Results
        fabricRef={fabricRef}
        coords={coords}
        selectedMatch={selectedMatch}
      />
      {coords?.TextOne?.map((item) => (
        <UniversalTextLayer
          fabricRef={fabricRef}
          properties={properties}
          coords={item}
          selectedMatch={selectedMatch}
        />
      ))}
      {coords?.NumberOne?.map((item) => (
        <UniversalNumberLayer
          fabricRef={fabricRef}
          properties={properties}
          coords={item}
          selectedMatch={selectedMatch}
        />
      ))}
    </div>
  );
};

export default MultiElements;
