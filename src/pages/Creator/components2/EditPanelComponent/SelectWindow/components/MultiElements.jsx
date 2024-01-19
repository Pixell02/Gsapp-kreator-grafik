import Results from "./MultiElements/Results";
import SelectLeagueTeams from "./MultiElements/SelectLeagueTeams";
import SelectTeams from "./MultiElements/SelectTeams";
import UniversalNumberLayer from "./MultiElements/UniversalNumberLayer";
import UniversalTextLayer from "./MultiElements/UniversalTextLayer";
import useProperties from "./MultiElements/hooks/useProperties";

const MultiElements = ({ fabricRef, coords, selectedMatch, i }) => {
  const { properties } = useProperties(coords);
  return (
    <>
      <p>Mecz {selectedMatch}</p>
      {!coords.yourTeamLogoOne &&
        !coords.yourTeamNameOne &&
        (coords.yourOpponentNameOne || coords.opponentImageOne) && (
          <SelectLeagueTeams fabricRef={fabricRef} coords={coords} selectedMatch={selectedMatch} i={i} />
        )}
      {(coords.yourTeamLogoOne || coords.yourTeamNameOne) &&
        (coords.yourOpponentNameOne || coords.opponentImageOne) && (
          <SelectTeams fabricRef={fabricRef} coords={coords} selectedMatch={selectedMatch} i={i} />
        )}
      {coords.connectedTeams && (
        <SelectTeams fabricRef={fabricRef} coords={coords} selectedMatch={selectedMatch} i={i} />
      )}
      <Results fabricRef={fabricRef} coords={coords} selectedMatch={selectedMatch} i={i} />
      {coords?.TextOne?.map((item, iteration) => (
        <UniversalTextLayer
          key={iteration}
          properties={properties}
          fabricRef={fabricRef}
          coords={item}
          selectedMatch={selectedMatch}
          i={i}
        />
      ))}
      {coords?.NumberOne?.map((item, iteration) => (
        <UniversalNumberLayer
          key={iteration}
          properties={properties}
          fabricRef={fabricRef}
          coords={item}
          selectedMatch={selectedMatch}
          i={i}
        />
      ))}
    </>
  );
};

export default MultiElements;
