import useResults from './hooks/useResults';

const Results = ({ fabricRef, coords, selectedMatch }) => {
  const { hostResult, setHostResult, guestResult, setGuestResult } = useResults(fabricRef, coords, selectedMatch);

  return (
    <>
      {(coords.connectedResultsOne || coords.yourTeamResultOne || coords.opponentTeamResultOne) && (
        <div className="w-100 d-flex flex-row align-items-center">
          <input
            name="host"
            type="number"
            value={hostResult}
            onChange={e => setHostResult(e.target.value)}
          />
          <span>-</span>
          <input
            name="guest"
            type="number"
            value={guestResult}
            onChange={e => setGuestResult(e.target.value)}
          />
        </div>
      )}
    </>
  );
};

export default Results;
